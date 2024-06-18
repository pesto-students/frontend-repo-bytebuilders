import React, { useEffect, useState } from 'react';
import './Employee.css';
import { useParams } from 'react-router-dom';
import { getUser, updateUser } from '../../../api/userAPI';
import EmployeeDetails from '../EmployeeDetails/EmployeeDetails';

export default function Employee() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [editflag, setEditflag] = useState(false);
  const token = localStorage.getItem('token');

  const editUser = async () => {
    try {
      const userdata = await updateUser(user, token);

      const { password, ...updatedUser } = userdata;
    } catch (error) {
      console.log(error);
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
      const token = localStorage.getItem('token');
      const res = await getUser(id, token);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployee();
  }, []);
  return (
    <div className="employeeContainer">
      <EmployeeDetails
        user={user}
        handleChange={handleChange}
        editflag={editflag}
        handleClick={handleClick}
        setUser={setUser}
      />
    </div>
  );
}
