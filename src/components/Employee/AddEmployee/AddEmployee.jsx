import React, { useState } from 'react';
import './AddEmployee.css';
import AddEmployeeForm from '../AddEmployeeForm/AddEmployeeForm';
import { addUserData } from '../../../Data/Permission';
import { addEmployee } from '../../../api/userAPI';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

export default function AddEmployee() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '1234567',
    isReportingManager: false,
    reportingManager: '',
    designation: '',
    employeeIdentificationCode: '',
    joiningDate: '',
    dateOfBirth: '',
    phone: '',
    isPayrollExecutive: false,
    medicalLeaveDays: 0,
    casualLeaveDays: 0,
    salary: 0,
    basicSalary: 0,
    hra: 0,
    pf: 0,
    specialAllowances: 0,
    currency: '',
  });

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'isReportingManager' || name === 'isPayrollExecutive') {
      const checked = e.target.checked;
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    handleBlur(name, value);
  };

  const handleSumbmit = async (e, setSnackbar) => {
    e.preventDefault();
    const formValid = Object.values(errors).every((x) => x === '');
    if (formValid) {
      setLoading(true); // Start loading
      try {
        const response = { ...formData, ...addUserData };
        await addEmployee(response);
        setSnackbar({ open: true, message: 'Employee added successfully', severity: 'success' });
        setLoading(false); // Stop loading
        navigate('/organisation');
      } catch (error) {
        setLoading(false); // Stop loading
        setSnackbar({ open: true, message: 'Failed to add employee, please try again', severity: 'error' });
      }
    } else {
      setSnackbar({ open: true, message: 'Please fix the errors in the form.', severity: 'error' });
    }
  };

  return (
    <div className="addemployeeContainer">
      <h1> Add Employee</h1>
      <AddEmployeeForm
        formData={formData}
        handleSumbmit={handleSumbmit}
        handleChange={handleChange}
      />
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
