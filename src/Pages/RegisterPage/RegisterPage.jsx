import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import Welcome from '../../components/welcome/Welcome';
import { adminPermission } from '../../Data/Permission';
import WelcomeRight from '../../components/welcome/WelcomeRight/WelcomeRight';
import { registerUserAPI } from '../../api/userAPI';
import { useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function RegisterPage() {
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const navigate = useNavigate();

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const validateFullName = (fullName) => /^[A-Za-z\s]+$/.test(fullName);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) => password.length >= 6;

  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) && dateString.split('-').length === 3;
  };

  const validateDateOfBirth = (dateOfBirth) => {
    if (!isValidDate(dateOfBirth)) return false;
    const currentYear = new Date().getFullYear();
    const minDate = new Date(currentYear - 60, 0, 1); // January 1 of currentYear - 60
    const maxDate = new Date(currentYear - 18, 11, 31); // December 31 of currentYear - 18
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    return birthDate >= minDate && birthDate <= maxDate && birthDate <= today;
  };

  const validateJoiningDate = (joiningDate) => {
    if (!isValidDate(joiningDate)) return false;
    const today = new Date();
    const joinDate = new Date(joiningDate);
    return joinDate <= today;
  };

  const handleBlur = (field, value) => {
    let tempErrors = { ...errors };

    switch (field) {
      case 'fullName':
        tempErrors.fullName = validateFullName(value) ? '' : 'Full Name must contain only alphabets';
        break;
      case 'email':
        tempErrors.email = validateEmail(value) ? '' : 'Email is not valid';
        break;
      case 'password':
        tempErrors.password = validatePassword(value) ? '' : 'Password must be at least 6 characters long';
        break;
      case 'phone':
        tempErrors.phone = validatePhone(value) ? '' : 'Phone number is not valid';
        break;
      case 'employeeIdentificationCode':
        tempErrors.employeeIdentificationCode = value ? '' : 'Employee Identification Code is required';
        break;
      case 'joiningDate':
        tempErrors.joiningDate = validateJoiningDate(value) ? '' : 'Joining Date must not be in the future or invalid';
        break;
      case 'organisationName':
        tempErrors.organisationName = value ? '' : 'Organisation Name is required';
        break;
      case 'dateOfBirth':
        tempErrors.dateOfBirth = validateDateOfBirth(value) ? '' : 'Age should be between 18 to 60 or invalid date';
        break;
      default:
        break;
    }

    setErrors(tempErrors);

    // Show Snackbar if there are errors
    if (tempErrors[field] && value.trim() !== '') {
      setSnackbar({ open: true, message: tempErrors[field], severity: 'error' });
    } else {
      setSnackbar({ ...snackbar, open: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      password: formData.get('password'),
      phone: formData.get('phone'),
      employeeIdentificationCode: formData.get('employeeIdentificationCode'),
      joiningDate: formData.get('joiningDate'),
      organisationName: formData.get('organisationName'),
      dateOfBirth: formData.get('dateOfBirth')
    };

    const formValid = Object.values(errors).every((x) => x === '');

    if (formValid) {
      try {
        const response = { ...data, ...adminPermission };

        await registerUserAPI(response);
        setSnackbar({ open: true, message: 'Registration successful', severity: 'success' });
        navigate('/login');
      } catch (error) {
        setSnackbar({ open: true, message: 'User is not registered, please try again', severity: 'error' });
      }
    } else {
      setSnackbar({ open: true, message: 'Please fix the errors in the form.', severity: 'error' });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="registerPage">
      <div className="registerleft">
        <Welcome />
        <form onSubmit={handleSubmit}>
          <div className="inputArea">
            <div className="registerinput">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                onBlur={(e) => handleBlur('fullName', e.target.value)}
              />
            </div>
            <div className="registerinput">
              <label>Date Of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                max={getMaxDateOfBirth()}
                onBlur={(e) => handleBlur('dateOfBirth', e.target.value)}
              />
            </div>
            <div className="registerinput">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onBlur={(e) => handleBlur('email', e.target.value)}
              />
            </div>
            <div className="registerinput">
              <label>Contact number</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                onBlur={(e) => handleBlur('phone', e.target.value)}
              />
            </div>
            <div className="registerinput">
              <label>Employee Identification Code</label>
              <input
                type="text"
                name="employeeIdentificationCode"
                placeholder="Enter your employee ID"
                onBlur={(e) => handleBlur('employeeIdentificationCode', e.target.value)}
              />
            </div>
            <div className="registerinput">
              <label>Joining Date in Company/ Organisation</label>
              <input
                type="date"
                name="joiningDate"
                max={getTodayDate()}
                onBlur={(e) => handleBlur('joiningDate', e.target.value)}
              />
            </div>
            <div className="registerinput">
              <label>Organisation Name</label>
              <input
                type="text"
                name="organisationName"
                placeholder="Enter your organisation name"
                onBlur={(e) => handleBlur('organisationName', e.target.value)}
              />
            </div>
            <div className="registerinput">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onBlur={(e) => handleBlur('password', e.target.value)}
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
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </div>
      <WelcomeRight />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

function getMaxDateOfBirth() {
  const currentYear = new Date().getFullYear();
  const maxDate = new Date(currentYear - 18, 11, 31); // December 31 of currentYear - 18
  return maxDate.toISOString().split('T')[0];
}

function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}
