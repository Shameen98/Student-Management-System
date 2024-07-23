import React from "react";
import "./SummaryCard.css"; // Add styles for the card here

const SummaryCard = ({ totalStudents }) => {
  return (
    <div className="summary-card">
      <h3>Total Number of </h3>
      <h3>Students</h3>
      <p className="student-count">{totalStudents}</p>
    </div>
  );
};

export default SummaryCard;
