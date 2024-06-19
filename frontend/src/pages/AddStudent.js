import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddStudent.css";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8070/auth/loggedin", { withCredentials: true })
      .then((res) => {
        if (res.data.status) {
          setIsLoggedIn(true);
        } else {
          navigate("/login"); // Redirect to login page if not logged in
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/login"); // Handle error by redirecting to login page
      });
  }, [navigate]);

  const sendData = (e) => {
    e.preventDefault();

    const newStudent = {
      name,
      age,
      gender,
    };
    axios
      .post("http://localhost:8070/student/add", newStudent)
      .then(() => {
        alert("Student successfully added");
      })
      .catch((err) => {
        alert(err);
      });
  };

  if (!isLoggedIn) {
    return null; // Or display a loading spinner while checking login status
  }

  return (
    <form className="form-container mt-5" onSubmit={sendData}>
      <h2 className="text-center">Add Student</h2>
      <div className="mb-3">
        <label for="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Enter name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label for="age">Age</label>
        <input
          type="text"
          className="form-control"
          id="age"
          placeholder="Enter age"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label for="gender">Gender</label>
        <input
          type="text"
          className="form-control"
          id="gender"
          placeholder="Enter gender"
          onChange={(e) => {
            setGender(e.target.value);
          }}
        />
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddStudent;
