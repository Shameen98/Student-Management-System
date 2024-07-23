import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import StudentImg from "../assets/StudentImg.jpg";
import SummaryCard from "../component/SummaryCard";
import ReactPaginate from "react-paginate";

const Home = () => {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

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

  const handleStudentIdChange = (event) => {
    setStudentId(event.target.value);
  };

  const handleSearchById = () => {
    axios
      .get(`http://localhost:8070/student/get/${studentId}`)
      .then((res) => {
        setStudentData(res.data);
      })
      .catch((err) => {
        console.log(err);
        setStudentData(null);
      });
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Calculate the indices for the current page
  const offset = currentPage * itemsPerPage;
  const currentStudents = students.slice(offset, offset + itemsPerPage);

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-center align-items-center">
        <div className="row mb-3 d-flex justify-content-center align-items-center w-100">
          {/* Image */}
          <div className="col-md-6 text-center text-md-right mb-3 mb-md-0">
            <img
              src={StudentImg}
              alt="Student image"
              className="img-fluid img"
            />
          </div>
          {/* Heading */}
          <div className="col-md-4 text-center text-md-left">
            <h2 className="heading ">Welcome to</h2>
            <h2 className="heading">
              <b>STUDENT MANAGEMENT</b>
            </h2>
            <h1 className="heading">
              <b>SYSTEM</b>
            </h1>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        {/* Search */}
        <div className="col-md-7">
          <div className="search-by-id mb-4">
            <input
              type="text"
              placeholder="Enter Student ID"
              value={studentId}
              onChange={handleStudentIdChange}
              className="form-control"
            />
            <div className="d-flex justify-content-center">
              <button
                onClick={handleSearchById}
                className="btn btn-primary mt-2"
              >
                Search
              </button>
            </div>
          </div>

          {/* Display searched details */}
          {studentData && (
            <div className="student-card card mb-3">
              <div className="card-body">
                <h5 className="card-title">Student Details</h5>
                <p className="card-text">
                  <strong>ID:</strong> {studentData.stuId}
                </p>
                <p className="card-text">
                  <strong>Name:</strong> {studentData.name}
                </p>
                <p className="card-text">
                  <strong>Age:</strong> {studentData.age}
                </p>
                <p className="card-text">
                  <strong>Gender:</strong> {studentData.gender}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Summary card - Total No. of students */}
        <div className="col-md-3 mx-auto">
          <SummaryCard totalStudents={students.length} />
        </div>
      </div>

      <div className="text-center">
        <p className="lead">Explore the list of students enrolled.</p>
      </div>

      {/* Student details table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th style={{ width: "25%" }} scope="col">
                Registration Number
              </th>
              <th style={{ width: "25%" }} scope="col">
                Full Name
              </th>
              <th style={{ width: "25%" }} scope="col">
                Age
              </th>
              <th style={{ width: "25%" }} scope="col">
                Gender
              </th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student) => (
              <tr key={student.stuId}>
                <td>{student.stuId}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="d-flex justify-content-center">
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(students.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default Home;
