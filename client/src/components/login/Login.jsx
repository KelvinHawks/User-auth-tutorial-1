import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { AuthContext } from "../../context/context";

function Login() {
  const navigate = useNavigate();
  const { success, userInfo, login } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  console.log(userInfo);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    login(inputValue);
    setInputValue({ email: "", password: "" });
  };

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [navigate, success]);

  return (
    <div className="App">
      <h3>Hi {userInfo?.username}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={inputValue.email}
          placeholder="email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={inputValue.password}
          placeholder="password"
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Login;
