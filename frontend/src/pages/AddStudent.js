import React, { useState } from "react";
import axios from "axios";
import "./AddStudent.css";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

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

  return (
    <form className="form-container mt-5" onSubmit={sendData}>
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

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default AddStudent;
