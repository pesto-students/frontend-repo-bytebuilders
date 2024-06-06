import React from 'react';
import Welcome from '../../components/welcome/Welcome';
import WelcomeRight from '../../components/welcome/WelcomeRight/WelcomeRight';
import './RegisterPage.css';
import { Link } from 'react-router-dom';
export default function RegisterPage() {
  const handleSumbmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
  };

  return (
    <div className="registerPage">
      <div className="registerleft">
        <Welcome />
        <form>
          <div className="inputArea">
            <div className="registerinput">
              <label>Full Name</label>
              <input type="text" name="fullName" />
            </div>
            <div className="registerinput">
              <label>Date Of Birth</label>
              <input type="date" name="dob" />
            </div>
            <div className="registerinput">
              <label>Email</label>
              <input type="email" name="email" />
            </div>
            <div className="registerinput">
              <label>Contact number</label>
              <input type="text" name="phone" />
            </div>
          </div>
          <div className="registerbuttonContainer">
            <button type="submit" className="registerbutton">
              Sign Up
            </button>
          </div>
        </form>
        <div className="registerline"></div>
        <span className="signupLink">
          Already have Account? <Link to={'/login'}>Login</Link>
        </span>
      </div>
      <WelcomeRight />
    </div>
  );
}
