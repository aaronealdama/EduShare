import React, { useState } from "react";
import EmailAPI from "../utils/EmailAPI";
import NavBar from "../components/NavBar";
import "../css/Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    emailAddress: "",
    message: "",
  });
  function handleSubmit(event) {
    event.preventDefault();
    EmailAPI(form);
    setForm({
      name: "",
      emailAddress: "",
      message: "",
    });
  }
  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }
  return (
    <div>
      <NavBar />
      <div className="Contact">
        <div className="Contact-row">
          <form className="Contact-form" onSubmit={handleSubmit}>
            <div className="Contact-inputDiv">
              <label htmlFor="name" className="Contact-label">
                Name
              </label>
              <input
                id="name"
                className="Contact-input"
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="Contact-inputDiv">
              <label htmlFor="emailAddress" className="Contact-label">
                Email Address
              </label>
              <input
                id="emailAddress"
                className="Contact-input"
                name="emailAddress"
                onChange={handleChange}
              />
            </div>
            <div className="Contact-inputDiv">
              <label htmlFor="message" className="Contact-label">
                Message
              </label>
              <textarea
                id="message"
                className="Contact-textarea"
                name="message"
                onChange={handleChange}
              ></textarea>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="Contact-btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
