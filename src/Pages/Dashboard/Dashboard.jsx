import React, { useEffect } from 'react';
import './Dashboard.css';
import { useSelector } from 'react-redux';
import ClockComponent from '../../components/ClockComponent/ClockComponent';
import Dashboardcontent from '../../components/DashboardContent/Dashboardcontent';
import Loading from '../../components/Loading/Loading';

export default function Dashboard() {
  const user = useSelector((state) => state.user);
  const isLoading = useSelector((state) => state.isLoading);

  useEffect(() => {}, [user]);

  return (
    <>
      {/* {isLoading ? (
        <Loading />
      ) : ( */}
      <div className="dashboard">
        <div className="dashtitle">
          <div className="dashwelcome">
            <h1>{user.organisationName}</h1>
            <br></br>
            <i>Hello, {user.fullName}...</i>
          </div>
          <div className="dashtimedatestatus">
            <ClockComponent />
          </div>
        </div>
        <Dashboardcontent />
      </div>
      {/* )} */}
    </>
  );
}
