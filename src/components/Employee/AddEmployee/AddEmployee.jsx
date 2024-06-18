import React, { useState } from 'react';
import './AddEmployee.css';
import AddEmployeeForm from '../AddEmployeeForm/AddEmployeeForm';

import { addUserData } from '../../../Data/Permission';
import { addEmployee } from '../../../api/userAPI';
import { useNavigate } from 'react-router-dom';
export default function AddEmployee() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '1234567',
    employeeIdentificationCode: '',
    joiningDate: '',
    dateOfBirth: '',
    phone: '',
    organisationName: '',
    medicalLeaveDays: 0,
    casualLeaveDays: 0,
    salary: 0,
    basicSalary: 0,
    hra: 0,
    pf: 0,
    specialAllowances: 0,
    currency: '',
  });
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('In handle change');
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSumbmit = async (e) => {
    e.preventDefault();

    const response = { ...formData, ...addUserData };
    //console.log(response);
    const employee = await addEmployee(response, token);
    navigate('/organisation');
  };
  return (
    <div className="addemployeeContainer">
      <h1> AddEmployee</h1>
      <AddEmployeeForm
        formData={formData}
        handleSumbmit={handleSumbmit}
        handleChange={handleChange}
      />
    </div>
  );
}
