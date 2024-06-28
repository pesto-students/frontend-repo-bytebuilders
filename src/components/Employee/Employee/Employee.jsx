import React, { useEffect, useState } from 'react';
import './Employee.css';
import { useParams } from 'react-router-dom';
import { getUser, updateUser } from '../../../api/userAPI';
import EmployeeDetails from '../EmployeeDetails/EmployeeDetails';
import { useSelector } from 'react-redux';

export default function Employee() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [editflag, setEditflag] = useState(false);
  const [error, setError] = useState('');
  const storedUser = useSelector((state) => state.user);
  const [responseStatus, setResponseStatus] = useState({
    status: 'OK',
    message: '',
  });
  const setMessageStatus = () => {
    setTimeout(() => {
      setMessageStatus({
        status: 'OK',
        message: '',
      });
    }, 3000);
  };

  const editUser = async () => {
    try {
      const data = { ...user, password: 'gwqguwgq12' };
      if (!data.reportingManager && data.isAdmin) {
        data.reportingManager = storedUser.fullName;
      }
      const userdata = await updateUser(data);

      const { password, ...updatedUser } = userdata;
      setMessageStatus({
        status: 'OK',
        message: 'Employee Updated successfullly.....',
      });
      setResponseStatus();
      setError('');
    } catch (error) {
      if (error.response) {
        setError(error.response.message);
      } else {
        setError(error.message);
      }
    }

    setEditflag(false);
  };

  const handleClick = () => {
    console.log('In Handle Click', editflag);
    !editflag ? setEditflag(true) : editUser();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const getEmployee = async () => {
    try {
      const res = await getUser(id);
      setUser(res.data);
      setError('');
    } catch (error) {
      if (error.response) {
        setError(error.response.message);
      } else {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      getEmployee();
    }
  }, []);
  return (
    <div className="employeeContainer">
      <EmployeeDetails
        user={user}
        handleChange={handleChange}
        editflag={editflag}
        handleClick={handleClick}
        setUser={setUser}
        setMessageStatus={setMessageStatus}
        responseStatus={responseStatus}
        setResponseStatus={setResponseStatus}
      />
    </div>
  );
}
