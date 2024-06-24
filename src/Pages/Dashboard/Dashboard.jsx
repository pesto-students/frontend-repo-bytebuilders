import React, { useEffect } from 'react';
import './Dashboard.css';
import { useSelector } from 'react-redux';
import ClockComponent from '../../components/ClockComponent/ClockComponent';
import Dashboardcontent from '../../components/DashboardContent/Dashboardcontent';
import Loading from '../Loading/Loading';

export default function Dashboard() {
  const user = useSelector((state) => state.user);
  const isLoading = useSelector((state) => state.isLoading);
  console.log('isLoading', isLoading);
  useEffect(() => {
    console.log('In DashBoard', user);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
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
      )}
    </>
  );
}
