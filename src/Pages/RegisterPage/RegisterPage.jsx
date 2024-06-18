import React, { useEffect, useState } from 'react';
import Welcome from '../../components/welcome/Welcome';
import WelcomeRight from '../../components/welcome/WelcomeRight/WelcomeRight';
import './RegisterPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { adminPermission } from '../../Data/Permission';
import { registerUserAPI } from '../../api/userAPI';
export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    employeeIdentificationCode: '',
    joiningDate: '',
    dateOfBirth: '',
    phone: '',
    organisationName: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSumbmit = async (e) => {
    e.preventDefault();

    const reponse = { ...formData, ...adminPermission };
    console.log(reponse);
    const data = await registerUserAPI(reponse);
    navigate('/login');
  };

  return (
    <div className="registerPage">
      <div className="registerleft">
        <Welcome />
        <form onSubmit={handleSumbmit}>
          <div className="inputArea">
            <div className="registerinput">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="registerinput">
              <label>Date Of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div className="registerinput">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="registerinput">
              <label>Contact number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="registerinput">
              <label>Employee Identification Code</label>
              <input
                type="text"
                name="employeeIdentificationCode"
                value={formData.employeeIdentificationCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="registerinput">
              <label>Joining Date</label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="registerinput">
              <label>Organisation Name</label>
              <input
                type="text"
                name="organisationName"
                value={formData.organisationName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="registerinput">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
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
