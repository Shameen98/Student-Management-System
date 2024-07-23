import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "black" }}
    >
      <div className="container-fluid">
        {/* <span className="navbar-brand">Navbar</span> */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            className="navbar-toggler-icon "
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba(255, 255, 255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E")`,
            }}
          ></span>
        </button>
        <div
          className="collapse navbar-collapse mx-auto px-3"
          id="navbarNavDropdown"
          style={{ marginLeft: "15px" }}
        >
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link" style={{ color: "white" }}>
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add" className="nav-link" style={{ color: "white" }}>
                ADD
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/delete"
                className="nav-link"
                style={{ color: "white" }}
              >
                DELETE
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/update"
                className="nav-link"
                style={{ color: "white" }}
              >
                UPDATE
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/login" className="nav-link" style={{ color: "white" }}>
                LOGIN
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
