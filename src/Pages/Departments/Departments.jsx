import React, { useEffect, useState } from 'react';
import './Departments.css';
import { Await, Link } from 'react-router-dom';
import {
  addDepartments,
  getAllDepartments,
} from '../../api/departmentapi';
import DepartmentDesignationTable from '../../components/DepartmentDesignation Table/DepartmentDesignationTable';
export default function Departments() {
  const [departmentList, setDepartmentList] = useState([]);
  const [department, setDepartment] = useState('');
  const [addStatus, setAddStatus] = useState(false);
  const [error, setError] = useState('');
  const departments = async () => {
    try {
      const depart = await getAllDepartments();
      setDepartmentList(depart.data);
    } catch (error) {
      if (error.response) {
        setError(error.response.message);
      } else {
        setError(error.message);
      }
    }
  };

  const departmentadd = async (e) => {
    try {
      if (department) {
        e.preventDefault();

        const res = await addDepartments(department);

        const depart = await getAllDepartments();

        setDepartmentList(depart.data);
        setDepartment('');
        setError('');
        setAddStatus(false);
      } else {
        setError('Please Enter Department Name.....');
        setAddStatus(false);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.message);
      } else {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    if (!departmentList.length) {
      departments();
    }
  }, []);
  return (
    <div className="departments">
      <h1>Departments</h1>
      {error && <p style={{ color: '#FF3F3F' }}>{error}</p>}
      <DepartmentDesignationTable
        name={'Department'}
        List={departmentList}
        setValue={setDepartment}
        addValue={departmentadd}
        setAddStatus={setAddStatus}
        addStatus={addStatus}
        inValue={department}
      />
    </div>
  );
}
