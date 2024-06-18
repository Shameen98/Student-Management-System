import React, { useState } from "react";
import "../App.css";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8070/auth/signup", {
        username,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container sign-up-form mt-5">
      <form onSubmit={handleSubmit}>
        <h2 className="text-center">Sign Up</h2>

        <div className="mt-3">
          <label htmlFor="username">Username : </label>
          <br />
          <input
            type="text"
            placeholder="Username"
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>

        <div className="mt-3">
          <label htmlFor="email">Email : </label>
          <br />
          <input
            type="email"
            placeholder="Email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div className="mt-3">
          <label htmlFor="password">Password : </label>
          <br />
          <input
            type="password"
            placeholder="********"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        <div className="mt-3 text-center">
          <button type="submit" className="btn btn-primary start-50">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
