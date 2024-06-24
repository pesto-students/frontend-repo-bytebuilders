import React, { useEffect, useState } from 'react';
import './Designation.css';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { addDesignations, getAlldesignations } from '../../api/designationapi';
import DepartmentDesignationTable from '../../components/DepartmentDesignation Table/DepartmentDesignationTable';

export default function Designation() {
  const [designationList, setDesignationList] = useState([]);
  const [designation, setDesignation] = useState('');
  const [addStatus, setAddStatus] = useState(false);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const designations = async () => {
    try {
      const desig = await getAlldesignations();
      setDesignationList(desig.data);
      setError('');
    } catch (error) {
      handleApiError(error);
    }
  };

  const designationadd = async (e) => {
    try {
      if (designation) {
        e.preventDefault();
        const res = await addDesignations(designation);
        const desig = await getAlldesignations();
        setDesignationList(desig.data);
        setDesignation('');
        setAddStatus(false);
        setSnackbar({ open: true, message: 'Designation added successfully', severity: 'success' });
      } else {
        setError('Please Enter Designation Name....');
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
    if (!designationList.length) {
      designations();
    }
  }, []);

  return (
    <div className="designations">
      <h1>Designations</h1>
      {error && <p style={{ color: '#FF3F3F' }}>{error}</p>}
      <DepartmentDesignationTable
        name={'Designation'}
        List={designationList}
        setValue={setDesignation}
        addValue={designationadd}
        setAddStatus={setAddStatus}
        addStatus={addStatus}
        inValue={designation}
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