import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  userEmail: "",
  loginHandler: () => {},
  signUpHandler: () => {},
});

export const AuthContextProvider = (props) => {
  const [userEmail, setUserEmail] = useState("");

  const navigate=useNavigate();

  const loginHandler = async (email, password) => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAnCX0mjm-Uhts56l6CZ04wdOhQXI4E-iw",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("data is", data);

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      setUserEmail(email);

      localStorage.setItem("token", data.idToken);

      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  const signUpHandler = async (email, password) => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAnCX0mjm-Uhts56l6CZ04wdOhQXI4E-iw",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("data is", data);

      if (!response.ok) {
        throw new Error(data.error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const contextValue = {
    userEmail: userEmail,
    loginHandler: loginHandler,
    signUpHandler: signUpHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
