import { useRef } from "react";
import classes from "./AuthForm.module.css";
import auth from "../../firebase/Config";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    if (enteredPassword !== enteredConfirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await auth.createUserWithEmailAndPassword(
        enteredEmail,
        enteredPassword
      );
      console.log(response);
      console.log("User created successfully:", response.user.uid);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <section className={classes.auth}>
        <h1>Sign Up</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <input
              type="email"
              id="email"
              placeholder="Email"
              ref={emailInputRef}
              required
            />
          </div>
          <div className={classes.control}>
            <input
              type="password"
              id="password"
              placeholder="Password"
              ref={passwordInputRef}
              required
            />
          </div>
          <div className={classes.control}>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              ref={confirmPasswordInputRef}
              required
            />
          </div>
          <div className={classes.actions}>
            <button>Create Account</button>
          </div>
        </form>
      </section>
      <div className={classes.footer}>
        <p>
          Already have an account? <button>Login</button>
        </p>
      </div>
    </>
  );
};

export default AuthForm;
