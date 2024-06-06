import React from 'react';
import './Welcome.css';
import { Link } from 'react-router-dom';
export default function Welcome({
  h1message = 'Welcome Back',
  spanmessage = 'Please Enter your details',
}) {
  return (
    <div className="welcomeTitle">
      <Link to="/">
        <img src="./logo.svg" alt="" />
      </Link>
      <br />

      <h1>{h1message}</h1>
      <span>{spanmessage}</span>
    </div>
  );
}
