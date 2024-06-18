import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./AuthForm.module.css";
import Home from "../../pages/Home";
import { useDispatch } from "react-redux";
import { loginAction, signUpAction } from "../../store/actions/authActions";

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const toggleIsLogin = () => {
    setIsLogin(!isLogin);
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    if (confirmPasswordInputRef.current) {
      confirmPasswordInputRef.current.value = "";
    }
    setError(""); // Clear error when toggling form
  };

  const loginHandler = async () => {
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      try {
        await dispatch(loginAction(enteredEmail, enteredPassword));
        navigate("/home");
      } catch (error) {
        alert(error.message);
      }
    } else {
      const enteredConfirmPassword = confirmPasswordInputRef?.current?.value;
      if (enteredPassword !== enteredConfirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      try {
        await dispatch(signUpAction(enteredEmail, enteredPassword));
        setIsLogin(true);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    loginHandler();
  };

  return (
    <>
      {!localStorage.getItem("token") ? (
        <section className={classes.auth}>
          <h1>{isLogin ? "Login" : "Sign Up"}</h1>
          {error && <p className={classes.error}>{error}</p>}
          <form onSubmit={submitHandler}>
            <div className={classes.control}>
              <input
                type="email"
                placeholder="Email"
                ref={emailInputRef}
                required
              />
            </div>
            <div className={classes.control}>
              <input
                type="password"
                placeholder="Password"
                ref={passwordInputRef}
                required
              />
            </div>
            {!isLogin && (
              <div className={classes.control}>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  ref={confirmPasswordInputRef}
                  required
                />
              </div>
            )}
            {isLogin && (
              <div className={classes["forgot-password-container"]}>
                <Link to="/forgotPassword">Forgot Password?</Link>
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
              {isLogin ? "Don't have an account?" : "Already have an account?"}
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




// if (isLogin) {
//       authCtx.loginHandler(enteredEmail, enteredPassword);
//     } else {
//       if (enteredPassword !== enteredConfirmPassword) {
//         alert("Passwords do not match!");
//         return;
//       }

//       authCtx.signUpHandler(enteredEmail, enteredPassword);
//       setIsLogin(true);

//       emailInputRef.current.value = "";
//       passwordInputRef.current.value = "";
//     }
