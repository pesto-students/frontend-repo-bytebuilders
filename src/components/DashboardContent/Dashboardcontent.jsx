import React from 'react';
import './DashboardContent.css';
import DashBoardLeaveRequestTable from './DashBoardLeaveRequestTable/DashBoardLeaveRequestTable';
export default function Dashboardcontent() {
  return (
    <div>
      <div className="dashleaverequestable">
        <h3>Leave Request</h3>
        <div className="line"></div>
        <DashBoardLeaveRequestTable />
      </div>
    </div>
  );
}
