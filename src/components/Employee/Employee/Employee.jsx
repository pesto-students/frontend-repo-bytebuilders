import React, { useEffect, useState } from 'react';
import './Employee.css';
import { useParams } from 'react-router-dom';
import { getUser, updateUser } from '../../../api/userAPI';
import EmployeeDetails from '../EmployeeDetails/EmployeeDetails';

export default function Employee() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [editflag, setEditflag] = useState(false);

  const editUser = async () => {
    try {
      const data = { ...user, password: 'gwqguwgq12' };
      const userdata = await updateUser(data);

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
      const res = await getUser(id);
      setUser(res.data);
    } catch (error) {
      console.log(error);
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
      />
    </div>
  );
}
