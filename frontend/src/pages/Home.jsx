import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const getData = () => {
      axios
        .get("http://localhost:8070/student")
        .then((res) => {
          setStudents(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);

  return (
    <div className="container text-center mt-5">
      <h1>Student Management System</h1>
      <h3>Student List</h3>

      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th style={{ width: "33%" }} scope="col">
              Name
            </th>
            <th style={{ width: "33%" }} scope="col">
              Age
            </th>
            <th style={{ width: "33%" }} scope="col">
              Gender
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
