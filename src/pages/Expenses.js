import React, { useRef, useState } from "react";
import classes from "./Expenses.module.css";

const Expenses = () => {
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();

  const [expenses, setExpenses] = useState([]);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = +amountInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;

    const newExpense = {
      id: Math.random().toString(),
      amount: enteredAmount,
      description: enteredDescription,
      category: enteredCategory,
    };

    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

    amountInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    categoryInputRef.current.value = "";
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
            <option value="Petrol">Petrol</option>
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Expenses;
