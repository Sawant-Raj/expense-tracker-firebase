import React from "react";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";

const Home = () => {
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
      </header>
      <div className={classes.line}></div>
    </>
  );
};

export default Home;
