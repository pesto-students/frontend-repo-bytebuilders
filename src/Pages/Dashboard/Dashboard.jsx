import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import Dashboardcontent from '../../components/DashboardContent/Dashboardcontent';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import ClockComponent from '../../components/ClockComponent/ClockComponent';

export default function Dashboard() {
  const data = useSelector((state) => state.user);

  const user = JSON.parse(localStorage.getItem('user'));

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
            {/* <div className="dashstatus">
              Status
              <div className="statusline"></div>
              <div className="statuscapsulecontainer">
                <div
                  className="statuscapsule"
                  style={{
                    color: '#30D143',
                    background: '#30d14340',
                  }}
                >
                  In Office
                </div>
                <div
                  className="statuscapsule"
                  style={{ color: '#FF3F3F' }}
                >
                  On Leave
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <Dashboardcontent />
      </div>
    </>
  );
}
