import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import Dashboardcontent from '../../components/DashboardContent/Dashboardcontent';
import { useSelector } from 'react-redux';

import ClockComponent from '../../components/ClockComponent/ClockComponent';

export default function Dashboard() {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log('In DashBoard', user);
  }, [user]);
  return (
    <>
      <div className="dashboard">
        <div className="dashtitle">
          <div className="dashwelcome">
            <h1>DashBoard</h1>
            <i>Hello, {user.fullName}....</i>
          </div>
          <div className="dashtimedatestatus">
            <ClockComponent />
          </div>
        </div>
        <Dashboardcontent />
      </div>
    </>
  );
}
