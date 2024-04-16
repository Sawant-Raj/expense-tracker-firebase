import { useRef, useState } from "react";
import classes from "./AuthForm.module.css";
import auth from "../../firebase/Config";
import Home from "../../pages/Home";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleIsLoggedIn = () => {
    setIsLoggedIn(!isLoggedIn);
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    if (confirmPasswordInputRef.current) {
      confirmPasswordInputRef.current.value = "";
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = isLoggedIn
      ? confirmPasswordInputRef.current.value
      : "";

    if (isLoggedIn) {
      if (enteredPassword !== enteredConfirmPassword) {
        alert("Passwords do not match!");
        return;
      }
    }

    try {
      const response = await auth.signInWithEmailAndPassword(
        enteredEmail,
        enteredPassword
      );
      
      setIsAuthenticated(true);
      localStorage.setItem("uid",response.user.uid)
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      {!isAuthenticated ? ( // Render the AuthForm if not authenticated
        <section className={classes.auth}>
          <h1>{isLoggedIn ? "Sign Up" : "Login"}</h1>
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
            {isLoggedIn && (
              <div className={classes.control}>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  ref={confirmPasswordInputRef}
                  required
                />
              </div>
            )}
            <div className={classes.actions}>
              <button>{isLoggedIn ? "Create Account" : "Login"}</button>
            </div>
          </form>
          <div className={classes.footer}>
            <p>
              {isLoggedIn
                ? "Already have an account"
                : "Don't have an account?"}{" "}
              <button onClick={toggleIsLoggedIn}>
                {isLoggedIn ? "Login" : "Sign Up"}
              </button>
            </p>
          </div>
        </section>
      ) : (
        <Home /> // Render the Home component if authenticated
      )}
    </>
  );
};

export default AuthForm;
