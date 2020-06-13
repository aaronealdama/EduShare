import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import SignupAPI from "../../utils/SignupAPI";
import "./index.css";

function SignupForm() {
  const [signup, setSignup] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });
  const [state, setState] = useState({
    exists: null,
    redirect: false,
  });
  function handleChange(event) {
    setSignup({
      ...signup,
      [event.target.name]: event.target.value,
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    SignupAPI.find(signup).then((res) => {
      console.log(res);
      if (res.data.message === "user does not exist") {
        SignupAPI.signup(signup);
        setSignup({
          first_name: "",
          last_name: "",
          email: "",
          username: "",
          password: "",
        });
        setState({
          ...state,
          redirect: true,
        });
      } else if (res.message === "user already exists") {
        setState({
          ...state,
          exists: true,
        });
      }
    });
  }
  function userExists() {
    return (
      <div>
        <h2>Username already exists</h2>
      </div>
    );
  }
  return (
    <div>
      {state.redirect === true ? <Redirect to="/login" /> : ""}
      {state.exists === true ? userExists : ""}
      <div className="SignupForm-container">
        <form onSubmit={handleSubmit}>
          <div className="SignupForm-col">
            <div className="SignupForm-labelContainer">
              <label className="SignupForm-label" for="first_name">
                First Name
              </label>
            </div>
            <input
              type="text"
              className="SignupForm-input"
              onChange={handleChange}
              name="first_name"
              value={signup.first_name}
              placeholder="First Name"
              id="first_name"
            />
            <div className="SignupForm-labelContainer">
              <label className="SignupForm-label" for="last_name">
                Last Name
              </label>
            </div>
            <input
              type="text"
              className="SignupForm-input"
              onChange={handleChange}
              name="last_name"
              value={signup.last_name}
              placeholder="Last Name"
              id="last_name"
            />
            <div className="SignupForm-labelContainer">
              <label className="SignupForm-label" for="email">
                Email
              </label>
            </div>
            <input
              type="text"
              className="SignupForm-input"
              onChange={handleChange}
              name="email"
              value={signup.email}
              placeholder="Email"
              id="email"
            />
            <div className="SignupForm-labelContainer">
              <label className="SignupForm-label" for="username">
                Username
              </label>
            </div>
            <input
              type="text"
              className="SignupForm-input"
              onChange={handleChange}
              name="username"
              value={signup.username}
              placeholder="Username"
              id="username"
            />
            <div className="SignupForm-labelContainer">
              <label className="SignupForm-label" for="password">
                Password
              </label>
            </div>
            <input
              type="password"
              className="SignupForm-input"
              onChange={handleChange}
              name="password"
              value={signup.password}
              placeholder="Password"
              id="password"
            />
          </div>
          <div className="SignupForm-row">
            <button className="SignupForm-btn">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
