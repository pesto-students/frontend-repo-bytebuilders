import React, { useEffect, useState } from 'react';
import './Employee.css';
import { useParams } from 'react-router-dom';
import { getUser, updateUser } from '../../../api/userAPI';
import EmployeeDetails from '../EmployeeDetails/EmployeeDetails';

export default function Employee() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [editflag, setEditflag] = useState(false);
  const [error, setError] = useState('');
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
