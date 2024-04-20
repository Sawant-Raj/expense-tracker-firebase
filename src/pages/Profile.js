import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faImage } from "@fortawesome/free-solid-svg-icons";
import classes from "./Profile.module.css";
import AuthContext from "../store/auth-context";

const Profile = () => {
  const nameInputRef = useRef();
  const photoUrlInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredPhotoUrl = photoUrlInputRef.current.value;

    const email = authCtx.userEmail.replace(/[.@]/g, "");
    try {
      const response = await fetch(
        `https://expense-tracker-60840-default-rtdb.firebaseio.com/${email}/contact-details.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: enteredName,
            photoUrl: enteredPhotoUrl,
          }),
        }
      );

      nameInputRef.current.value = "";
      photoUrlInputRef.current.value = "";
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <header className={classes.header}>
        <p className={classes.para}>Winners never quit, Quitters never win.</p>
        <p className={`${classes.para} ${classes.box} ${classes.font}`}>
          Your Profile is <strong>64%</strong> completed. A complete profile has
          higher chances of landing a job.
          <Link to="/profile" className={classes.link}>
            Complete Now
          </Link>
        </p>
      </header>
      <div className={classes.line}></div>
      <form onSubmit={submitHandler} className={classes.form}>
        <div>
          <h2>Contact Details</h2>
        </div>
        <div>
          <div>
            <label htmlFor="name">
              <FontAwesomeIcon icon={faUser} /> Full Name:
            </label>
            <input type="text" id="name" ref={nameInputRef} />
          </div>
          <div>
            <label htmlFor="photoUrl">
              <FontAwesomeIcon icon={faImage} /> Profile Photo URL:
            </label>
            <input type="text" id="photoUrl" ref={photoUrlInputRef} />
          </div>
        </div>
        <div className={classes.buttonContainer}>
          <button className={classes.cancelButton}>Cancel</button>
          <button type="submit" className={classes.updateButton}>
            Update
          </button>
        </div>
      </form>
    </>
  );
};

export default Profile;