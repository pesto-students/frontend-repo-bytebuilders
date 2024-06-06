import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <div className="navbarContainer">
      <div className="rightbox">
        <Link>
          <img src="./logo.svg" alt="" />
        </Link>
      </div>
      {/* <div className="centerbox"></div> */}
      <div className="leftbox">
        <Link to="/register">Sign Up</Link>
        <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}
