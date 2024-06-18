import { setUserLogin } from "../reducer/authSlice";

export const loginAction = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCiO4cr0uWYxd25aKyzRkvXpYzsRM_YYrE",
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

      localStorage.setItem("token", data.idToken);
      localStorage.setItem("email", email);
      dispatch(setUserLogin());
    } catch (error) {
      throw error;
    }
  };
};

export const signUpAction = (email, password) => {
  return async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCiO4cr0uWYxd25aKyzRkvXpYzsRM_YYrE",
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
      throw error;
    }
  };
};
