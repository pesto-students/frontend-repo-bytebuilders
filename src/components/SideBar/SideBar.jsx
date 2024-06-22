import React from 'react';
import './SideBar.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function SideBar() {
  const user = useSelector((state) => state.user);

  // useEffect(() => {
  //   //
  // }, [user]);
  return (
    <div className="sidebar">
      <div className="detailContainer">
        <span>{user.fullName}</span>
        <span>{user.designation}</span>
      </div>
      <div className="sidebarline"></div>
      <div className="sidebarcontent">
        <Link to="/dashboard">
          <img src="./team.svg" alt="" /> Dashboard
        </Link>
        <Link to="/myteam">
          <img src="./team.svg" alt="" /> My Team
        </Link>
        <Link to="/organisation">
          <img src="./team.svg" alt="" /> Organisation
        </Link>
        <Link to="/departments">
          <img src="./departments.svg" alt="" /> Departments
        </Link>
        <Link to="/designation">
          <img src="./departments.svg" alt="" /> Designation
        </Link>
        <Link to="/leaves">
          <img src="./calender.svg" alt="" /> Leaves
        </Link>
        <Link to="/holiday">
          <img src="./calender.svg" alt="" /> Holiday
        </Link>
        <Link to="/attendance">
          <img src="./attendance.svg" alt="" /> Attendance
        </Link>
        {user.isAdmin || user.isPayrollExecutive ? (
          <Link to={'/payroll'}>
            <img src="./payslips.svg" alt="" />
            Payroll
          </Link>
        ) : (
          <Link to={'/payslips'}>
            <img src="./payslips.svg" alt="" />
            Payslip
          </Link>
        )}
        <Link to="/myactions">
          <img src="myactions.svg" alt="" /> My Action
        </Link>
        <Link to="/profile">
          <img src="./profile.svg" alt="" /> My Profile
        </Link>
      </div>
    </div>
  );
}
