import React from 'react';
import './EmployeeCard.css';
export default function EmployeeCard({ Employee, onClick = null }) {
  return (
    <div className="employeeCard" onClick={onClick}>
      <span>{Employee.fullName}</span>
      <span>
        {Employee.designation ? Employee.designation : 'Manager'}
      </span>
      <span>{Employee.email}</span>
    </div>
  );
}
