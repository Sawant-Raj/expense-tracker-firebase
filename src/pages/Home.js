import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";
import AuthContext from "../store/auth-context";

const Home = () => {
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  const verifyEmail = async () => {
    const idToken = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAnCX0mjm-Uhts56l6CZ04wdOhQXI4E-iw",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: idToken,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("There was an error verifying your email.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");

    navigate("/");
    authCtx.userEmail = "";
  };

  return (
    <>
      <header className={classes.header}>
        <p className={classes.para}>Welcome to Expense Tracker!!!</p>
        <p className={`${classes.para} ${classes.box} ${classes.font}`}>
          Your Profile is Incomplete.
          <Link to="/profile" className={classes.link}>
            Complete Now
          </Link>
        </p>
        <button onClick={verifyEmail} className={classes.verifyButton}>
          Verify Email
        </button>
        <button onClick={logoutHandler} className={classes.logoutButton}>
          Logout
        </button>
      </header>
      <div className={classes.line}></div>
    </>
  );
};

export default Home;
