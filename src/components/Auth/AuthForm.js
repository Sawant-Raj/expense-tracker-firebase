import { useContext, useRef, useState } from "react";
import classes from "./AuthForm.module.css";
import Home from "../../pages/Home";
import AuthContext from "../../store/auth-context";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [verifyEmailButton, setVerifyEmailButton] = useState(false);

  const authCtx = useContext(AuthContext);

  const toggleIsLogin = () => {
    setIsLogin(!isLogin);
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    if (confirmPasswordInputRef.current) {
      confirmPasswordInputRef.current.value = "";
    }
  };

  const loginHandler = async () => {
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = !isLogin
      ? confirmPasswordInputRef.current.value
      : "";

    if (isLogin) {
      authCtx.loginHandler(enteredEmail, enteredPassword);
      
      setVerifyEmailButton(true);
    } else {
      if (enteredPassword !== enteredConfirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      authCtx.signUpHandler(enteredEmail, enteredPassword);
      setIsLogin(true);

      emailInputRef.current.value = "";
      passwordInputRef.current.value = "";
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    loginHandler();
  };

  return (
    <>
      {!authCtx.userEmail ? (
        <section className={classes.auth}>
          <h1>{isLogin ? "Login" : "Sign Up"}</h1>
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
            {!isLogin && (
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
              <button type="submit">
                {isLogin ? "Login" : "Create Account"}
              </button>
            </div>
          </form>
          <div className={classes.footer}>
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account"}
              <button onClick={toggleIsLogin}>
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>
        </section>
      ) : (
        <Home />
      )}
    </>
  );
};

export default AuthForm;
