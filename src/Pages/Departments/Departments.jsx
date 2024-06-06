import React, { useEffect, useState } from 'react';
import './Departments.css';
import { Await, Link } from 'react-router-dom';
import {
  addDepartments,
  getAllDepartments,
} from '../../api/departmentapi';
export default function Departments() {
  const [addStatus, setAddStatus] = useState(false);
  const [departmentList, setDepartmentList] = useState([]);
  const [department, setDepartment] = useState('');
  const token = localStorage.getItem('token');
  const departments = async () => {
    const depart = await getAllDepartments(token);

    setDepartmentList(depart.data);
  };

  const departmentadd = async (e) => {
    e.preventDefault();

    const res = await addDepartments(department, token);

    const depart = await getAllDepartments(token);

    setDepartmentList(depart.data);

    setAddStatus(false);
  };

  useEffect(() => {
    departments();
  }, []);
  return (
    <div className="departments">
      <h1>Departments</h1>

      {departmentList.length > 0 && (
        <table id="customTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Organisation</th>
              <th>Employees</th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {departmentList.map((department) => (
              <tr key={department._id}>
                <td data-label="Name">{department.name}</td>
                <td data-label="Created on">
                  {department.organisationName}
                </td>
                <td data-label="Employees">
                  {department.users.length}
                </td>
                {/* <td className="remove">
                  <Link>Remove</Link>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="adddept">
        {addStatus ? (
          <>
            <input
              type="text"
              placeholder="Department name"
              name="name"
              onChange={(e) => setDepartment(e.target.value)}
              value={department}
            />
            <button onClick={departmentadd}>Add Department</button>
          </>
        ) : (
          <button onClick={() => setAddStatus(true)}>
            Add Department
          </button>
        )}
      </div>
    </div>
  );
}
