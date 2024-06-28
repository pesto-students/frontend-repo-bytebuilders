import React, { useEffect, useState } from 'react';
import './Designation.css';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import {
  addDesignations,
  getAlldesignations,
} from '../../api/designationapi';
import DepartmentDesignationTable from '../../components/DepartmentDesignation Table/DepartmentDesignationTable';
import Loading from '../../components/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { disableLoading, enableLoading } from '../../Redux/userSlice';

export default function Designation() {
  const [designationList, setDesignationList] = useState([]);
  const [designation, setDesignation] = useState('');
  const [addStatus, setAddStatus] = useState(false);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error',
  });
  const loading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const designations = async () => {
    try {
      dispatch(enableLoading());
      const desig = await getAlldesignations();
      setDesignationList(desig.data);
      setError('');
    } catch (error) {
      handleApiError(error);
    } finally {
      setTimeout(() => {
        dispatch(disableLoading());
      }, 1000);
    }
  };

  const designationadd = async (e) => {
    try {
      if (e) {
        e.preventDefault();
      }

      if (!designation) {
        setSnackbar({
          open: true,
          message: 'Please enter a Designation Name',
          severity: 'error',
        });
        return;
      }
      dispatch(enableLoading());
      const res = await addDesignations(designation);
      const desig = await getAlldesignations();
      setDesignationList(desig.data);
      setDesignation('');
      setAddStatus(false);
      setSnackbar({
        open: true,
        message: 'Designation added successfully',
        severity: 'success',
      });
    } catch (error) {
      let errorMessage =
        'Failed to add designation. Please try again.';
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 404) {
          errorMessage = error.response.data.message;
        } else {
          errorMessage = `Server Error: ${error.response.status}. Please try again later.`;
        }
      } else if (error.request) {
        errorMessage =
          'Network error. Please check your internet connection.';
      } else {
        errorMessage =
          'An unexpected error occurred. Please try again later.';
      }
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error',
      });
    } finally {
      setTimeout(() => {
        dispatch(disableLoading());
      }, 1000);
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
    <>
      {loading ? (
        <Loading />
      ) : (
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
            <Alert
              onClose={handleSnackbarClose}
              severity={snackbar.severity}
              sx={{ width: '100%' }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </div>
      )}
    </>
  );
}
