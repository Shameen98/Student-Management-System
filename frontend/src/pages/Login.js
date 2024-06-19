import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstLogin, setFirstLogin] = useState(false);

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8070/auth/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.status) {
          // Navigate to the AddStudent page
          navigate("/add");
        } else {
          console.log("Login failed:", res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container sign-up-form mt-5">
      <form onSubmit={handleSubmit}>
        <h2 className="text-center">Login</h2>

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
            Login
          </button>
        </div>
        <div>
          <p>
            Don't have an account ? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
