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

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === 'isReportingManager' ||
      name === 'isPayrollExecutive'
    ) {
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
  };
  const handleSumbmit = async (e) => {
    e.preventDefault();

    try {
      const response = { ...formData, ...addUserData };

      const employee = await addEmployee(response);
      navigate('/organisation');
    } catch (error) {}
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
