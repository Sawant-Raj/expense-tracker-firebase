import React, { useEffect, useRef, useState } from "react";
import classes from "./Expenses.module.css";

const Expenses = () => {
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();

  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  const email = localStorage.getItem("email").replace(/[.@]/g, "");

  console.log("Email in expenses is", email);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(
          `https://expense-tracker-new-9d398-default-rtdb.firebaseio.com/${email}/expenses.json`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch expenses.");
        }

        const data = await response.json();

        if (data) {
          const loadedExpenses = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));

          console.log(loadedExpenses, "are the expenses");
          setExpenses(loadedExpenses);
        }
      } catch (error) {
        alert(error.message);
      }
    };
    fetchExpenses();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredAmount = +amountInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;

    const newExpense = {
      amount: enteredAmount,
      description: enteredDescription,
      category: enteredCategory,
    };

    try {
      let response;
      if (editingExpense) {
        response = await fetch(
          `https://expense-tracker-new-9d398-default-rtdb.firebaseio.com/${email}/expenses/${editingExpense.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify(newExpense),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update expense.");
        }

        const data = await response.json();
        console.log("Data of expense is ", data);

        setExpenses((prevExpenses) => [...prevExpenses, data]);

        setEditingExpense(null);
      } else {
        response = await fetch(
          `https://expense-tracker-new-9d398-default-rtdb.firebaseio.com/${email}/expenses.json`,
          {
            method: "POST",
            body: JSON.stringify(newExpense),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add expense.");
        }

        const data = await response.json();
        console.log("Data of expense is ", data);

        setExpenses((prevExpenses) => [
          ...prevExpenses,
          { id: data.name, ...newExpense },
        ]);
      }
    } catch (error) {
      alert(error.message);
    }

    amountInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    categoryInputRef.current.value = "";
  };

  console.log(expenses, "are my expenses after edit");

  const deleteHandler = async (id) => {
    try {
      const response = await fetch(
        `https://expense-tracker-new-9d398-default-rtdb.firebaseio.com/${email}/expenses/${id}.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete expense.");
      }

      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const editHandler = (id) => {
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    setEditingExpense(expenseToEdit);

    const updatedExpenses = expenses.filter((expense) => expense.id !== id);

    amountInputRef.current.value = expenseToEdit.amount;
    descriptionInputRef.current.value = expenseToEdit.description;
    categoryInputRef.current.value = expenseToEdit.category;

    setExpenses(updatedExpenses);
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Enter Expense</h2>
      <form onSubmit={submitHandler} className={classes["expenses-form"]}>
        <div>
          <input
            type="number"
            placeholder="Amount"
            ref={amountInputRef}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Description"
            ref={descriptionInputRef}
            required
          />
        </div>
        <div>
          <select ref={categoryInputRef} required>
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Fuel">Fuel</option>
            <option value="Salary">Salary</option>
          </select>
        </div>
        <button type="submit">Add Expense</button>
      </form>

      <div className={classes["expenses-list"]}>
        <h2>Expenses List</h2>
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              Amount: {expense.amount}, Description: {expense.description},
              Category: {expense.category}
              <button onClick={() => editHandler(expense.id)}>Edit</button>
              <button onClick={() => deleteHandler(expense.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Expenses;
