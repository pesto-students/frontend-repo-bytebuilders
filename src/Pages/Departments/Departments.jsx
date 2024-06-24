import React, { useEffect, useState } from 'react';
import './Departments.css';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import { addDepartments, getAllDepartments } from '../../api/departmentapi';
import DepartmentDesignationTable from '../../components/DepartmentDesignation Table/DepartmentDesignationTable';

export default function Departments() {
  const [departmentList, setDepartmentList] = useState([]);
  const [department, setDepartment] = useState('');
  const [addStatus, setAddStatus] = useState(false);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const departments = async () => {
    try {
      const depart = await getAllDepartments();
      setDepartmentList(depart.data);
      setError('');
    } catch (error) {
      handleApiError(error);
    }
  };

  const departmentadd = async (e) => {
    e.preventDefault();
    try {
      if (department) {
        const res = await addDepartments(department);
        const depart = await getAllDepartments();
        setDepartmentList(depart.data);
        setDepartment('');
        setAddStatus(false);
        setSnackbar({ open: true, message: 'Department added successfully', severity: 'success' });
      } else {
        setError('Please Enter Department Name.....');
        setAddStatus(false);
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleApiError = (error) => {
    if (error.response) {
      setError(error.response.data.message || 'Something went wrong');
    } else {
      setError(error.message || 'Network Error');
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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}