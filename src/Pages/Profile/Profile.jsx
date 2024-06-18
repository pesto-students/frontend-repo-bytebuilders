import React, { useEffect, useState } from 'react';
import './Profile.css';
import { format, parseISO } from 'date-fns';
import { getUser, updateUser } from '../../api/userAPI';
import EmployeeDetails from '../../components/Employee/EmployeeDetails/EmployeeDetails';

export default function Profile() {
  const [editflag, setEditflag] = useState(false);
  const token = localStorage.getItem('token');
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user'))
  );

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
  const getUserDetails = async () => {
    const res = await getUser(user._id, token);
    setUser(res.data);
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="profile">
      <h1>My Profile</h1>
      <EmployeeDetails
        user={user}
        handleChange={handleChange}
        editflag={editflag}
        handleClick={handleClick}
      />
    </div>
  );
}
