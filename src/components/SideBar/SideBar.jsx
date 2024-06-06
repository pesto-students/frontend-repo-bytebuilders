import React from 'react';
import './SideBar.css';
import { Link } from 'react-router-dom';
export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="detailContainer">
        <Link to="/dashboard">
          <img src="/profilephoto.svg" alt="" />
        </Link>

        <span>David Holland</span>
        <span>Manager</span>
      </div>
      <div className="sidebarline"></div>
      <div className="sidebarcontent">
        <Link to="/myteam">
          <img src="./team.svg" alt="" /> My Team
        </Link>
        <Link to="/departments">
          <img src="./departments.svg" alt="" /> Departments
        </Link>
        <Link to="/leaves">
          <img src="./calender.svg" alt="" /> Leaves
        </Link>
        <Link to="/attendance">
          <img src="./attendance.svg" alt="" /> Attendance
        </Link>
        <Link to="#payslips">
          <img src="./payslips.svg" alt="" /> Pay Slip
        </Link>
        <Link to="/myactions">
          <img src="myactions.svg" alt="" /> My Action
        </Link>
        <Link to="#profile">
          <img src="./profile.svg" alt="" /> My Profile
        </Link>
      </div>
    </div>
  );
}
