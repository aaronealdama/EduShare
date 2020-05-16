import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import LoginAPI from "../../utils/LoginAPI";
import LoginContext from "../../components/context/LoginContext";

function LoginForm() {
  const { loggedIn, toggleFalse, toggleChange, username } = useContext(LoginContext);
  const [redirect, setRedirect] = useState(false);
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
        toggleChange(username);    
        setLoginInput({
          username: "",
          password: "",
        });
        setRedirect(true);
      } else {
        toggleFalse();
      }
    });
  }
  console.log(username, loggedIn);
  return (
    <div>
      {redirect === true ? <Redirect to="/home" /> : ""}
      {loggedIn === false ? <h1>User not found</h1> : ""}
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="username"
          value={loginInput.username}
          placeholder="Username"
        />
        <input
          onChange={handleChange}
          name="password"
          value={loginInput.password}
          placeholder="Password"
        />
        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
