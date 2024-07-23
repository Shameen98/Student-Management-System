import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddStudent.css";

const DeleteStudent = () => {
  const [stuId, setStuId] = useState("");
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

  const handleDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:8070/student/delete/${stuId}`)
      .then((res) => {
        alert(res.data.status);
      })
      .catch((err) => {
        alert("Error deleting student"); 
      });
  };

  if (!isLoggedIn) {
    return null; // Or display a loading spinner while checking login status
  }

  return (
    <form className="form-container mt-5" onSubmit={handleDelete}>
      <h2 className="text-center">Delete Student</h2>
      <div className="mb-3">
        <label htmlFor="stuId">Student ID</label>
        <input
          type="text"
          className="form-control"
          id="stuId"
          placeholder="Enter student ID"
          onChange={(e) => {
            setStuId(e.target.value);
          }}
        />
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-danger">
          Delete
        </button>
      </div>
    </form>
  );
};

export default DeleteStudent;