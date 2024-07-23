import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddStudent.css";

const UpdateStudent = () => {
  const [stuId, setStuId] = useState("");
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

  const handleSearch = (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:8070/student/get/${stuId}`)
      .then((res) => {
        if (res.data) {
          setName(res.data.name);
          setAge(res.data.age.toString()); // Convert age to string if it's stored as a number
          setGender(res.data.gender);
        } else {
          alert("Student not found");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error fetching student details");
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedStudent = {
      name,
      age: Number(age), // Convert age back to number
      gender,
    };

    axios
      .put(`http://localhost:8070/student/update/${stuId}`, updatedStudent)
      .then((res) => {
        alert(res.data.status);
      })
      .catch((err) => {
        alert("Error updating student");
      });
  };

  if (!isLoggedIn) {
    return null; // Or display a loading spinner while checking login status
  }

  return (
    <div className="form-container mt-5">
      <h2 className="text-center">Update Student</h2>
      <form onSubmit={handleSearch}>
        <div className="mb-3">
          <label htmlFor="stuId">Student ID</label>
          <input
            type="text"
            className="form-control"
            id="stuId"
            placeholder="Enter student ID"
            value={stuId}
            onChange={(e) => setStuId(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary mb-3 ">
            Search
          </button>
        </div>
      </form>

      {stuId && (
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age">Age</label>
            <input
              type="text"
              className="form-control"
              id="age"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              className="form-control"
              id="gender"
              placeholder="Enter gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateStudent;
