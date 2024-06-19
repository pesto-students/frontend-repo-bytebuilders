import React, { useEffect, useState } from 'react';
import './Profile.css';
import { format, parseISO } from 'date-fns';
import { getUser, updateUser } from '../../api/userAPI';
import EmployeeDetails from '../../components/Employee/EmployeeDetails/EmployeeDetails';
import { useSelector } from 'react-redux';

export default function Profile() {
  const [editflag, setEditflag] = useState(false);

  const [user, setUser] = useState(
    useSelector((state) => state.user)
  );

  const editUser = async () => {
    try {
      const userdata = await updateUser(user);

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
    console.log(name, value);
    setUser({
      ...user,
      [name]: value,
    });
  };
  const getUserDetails = async () => {
    try {
      const res = await getUser(user._id);
      setUser(res.data);
    } catch (error) {}
  };
  useEffect(() => {
    if (Object.keys(user) === 0) {
      getUserDetails();
    }
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
