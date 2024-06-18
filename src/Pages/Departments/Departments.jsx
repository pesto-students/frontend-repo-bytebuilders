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
    setDepartment('');

    setAddStatus(false);
  };

  useEffect(() => {
    departments();
  }, []);
  return (
    <div className="departments">
      <h1>Departments</h1>

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
