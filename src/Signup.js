import React, { useState } from "react";

const email_validation = (email) => {
  const pattern = /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
  return pattern.test(email); //true or false
};

const username_validation = (username) => {
  const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9]*)[a-zA-Z0-9]+$/g;
  return pattern.test(username) && username.length < 30;
};

const password_validation = (password) => {
  return password.length >= 6 ? true : false;
};

function Signup() {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  //for succesful messages
  const [msgCssClass, setMsgCssClass] = useState("warning-text");
  // warning of login useState
  const [error, setError] = useState({
    warning: false,
    message: "",
    field: ""
  });

  const handleChange = (e) => {
    // setError("");
    const name = e.target.name;
    const value = e.target.value;
    //setting the value to use state object
    setUser({ ...user, [name]: value }); // ... keeps the previous value and then stores other
  };
  //new code ...improvements needed
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.username && user.email && user.password) {
      if (username_validation(user.username)) {
        if (email_validation(user.email)) {
          if (password_validation(user.password)) {
            setMsgCssClass("success-text");
            setError({ warning: false, message: "Success", field: "" });
          } else {
            setMsgCssClass("warning-text");
            setError({
              warning: true,
              message: "Password must be atleast 6 characters.",
              field: "password"
            });
          }
        } else {
          setMsgCssClass("warning-text");
          setError({
            warning: true,
            message: "Please enter a valid email.",
            field: "email"
          });
        }
      } else {
        setMsgCssClass("warning-text");
        setError({
          warning: true,
          message:
            "Username can only contain alphanumeric character and cannot be longer than 20 characters.",
          field: "username"
        });
      }
    } else {
      setMsgCssClass("warning-text");
      setError({
        warning: true,
        message: "Noo! don't leave them empty :(",
        field: "all"
      });
    }
  };

  return (
    <div className="container">
      <h2>Register Now!</h2>
      <form>
        <input
          type="text"
          placeholder="Username"
          autoComplete="off"
          maxLength="30"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          name="username"
          className={
            error.field === "username" || error.field === "all"
              ? "input_cred warning-border"
              : "input_cred"
          }
          value={user.username}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="email"
          name="email"
          maxLength="80"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          className={
            error.field === "email" || error.field === "all"
              ? "input_cred warning-border"
              : "input_cred"
          }
          value={user.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          className={
            error.field === "password" || error.field === "all"
              ? "input_cred warning-border"
              : "input_cred"
          }
          value={user.password}
          onChange={handleChange}
        />
        <div className="register-class">
          Have an Account?
          <span>Login</span>
        </div>
        <button className="btn-signin" onClick={handleSubmit}>
          Register
        </button>
      </form>
      <p className={msgCssClass}>{error.message}</p>
    </div>
  );
}

export default Signup;
