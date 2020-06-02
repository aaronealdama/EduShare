import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import LoginAPI from "../../utils/LoginAPI";
import UserAPI from '../../utils/UserAPI';
import LoginContext from "../context/LoginContext";
import "./index.css";

function LoginForm() {
  const { loggedIn, toggleFalse, toggleUser } = useContext(LoginContext);
  const [loginInput, setLoginInput] = useState({
    username: "",
    password: "",
  });
  function handleChange(event) {
    setLoginInput({
      ...loginInput,
      [event.target.name]: event.target.value,
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    LoginAPI.login(loginInput).then((res) => {
      if (res.data.message === "found user") {
        const username = res.config.data.split(",")[0].split(":")[1];    
        UserAPI.getUser(JSON.parse(username))
        .then(res => {
          toggleUser(res)
          setLoginInput({
            username: "",
            password: "",
          });        
        })
      } else {
        toggleFalse();
      }
    });
  }
  
  return (
    <div>
      {loggedIn ? <Redirect to="/home" /> : ""}
      {loggedIn === false ? <h1>User not found</h1> : ""}
      <div className="LoginForm-container">
        <form onSubmit={handleSubmit}>
          <div className="LoginForm-col">
              <label for="username" className="LoginForm-label">Username</label>
              <input
                type="text"
                className="LoginForm-input"
                onChange={handleChange}
                name="username"
                value={loginInput.username}
                placeholder="Username"
                id="username"
              />
              <label for="password" className="LoginForm-label">Password</label>
              <input
                type="password"
                className="LoginForm-input"
                onChange={handleChange}
                name="password"
                value={loginInput.password}
                placeholder="Password"
                id="password"
              />
            <button className="LoginForm-btn">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
