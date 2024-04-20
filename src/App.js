import React from "react";
import { Routes,Route } from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import Profile from "./pages/Profile";

const App = () => {
  return <Routes>
    <Route path="/" element={<AuthForm/>}/>
    <Route path="/profile" element={<Profile/>}/>
  </Routes>
};

export default App;
