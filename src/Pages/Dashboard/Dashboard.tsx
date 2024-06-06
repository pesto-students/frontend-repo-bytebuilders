import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import Dashboardcontent from '../../components/DashboardContent/Dashboardcontent';
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const data = useSelector((state: any) => state.user);
  console.log(data);
  return (
    <>
      <div className="dashboard">
        <div className="dashtitle">
          <div className="dashwelcome">
            <h1>DashBoard</h1>
            <i>Hello, David....</i>
          </div>
          <div className="dashtimedatestatus">
            <div className="dashtimedate">
              <div className="dashtime">
                11:11 <span>AM</span>
              </div>
              <div className="dashdate">Sunday, 28 april</div>
            </div>
            <div className="dashstatus">
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
            </div>
          </div>
        </div>
        <Dashboardcontent />
      </div>
    </>
  );
}
