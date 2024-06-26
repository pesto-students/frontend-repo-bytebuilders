import React from 'react';
import './DashboardContent.css';
import DashBoardLeaveRequestTable from './DashBoardLeaveRequestTable/DashBoardLeaveRequestTable';
import { useNavigate } from 'react-router-dom';
import OnLeaveEmployee from '../OnLeaveEmployee/OnLeaveEmployee';
import DashBoardTeam from './DashBoardTeam/DashBoardTeam';
import DashBoardCelebration from '../DashBoardCelebration/DashBoardCelebration';
export default function Dashboardcontent() {
  const navigate = useNavigate();

  return (
    <div className="dashboardcontent">
      <div className="dashleaverequestable">
        <div className="leavetabletitledash">
          <h3>Leave Request</h3>
          <span onClick={() => navigate('/leaves')}>View all</span>
        </div>
        <div className="line"></div>
        <DashBoardLeaveRequestTable />
      </div>
      <div className="dashteamleave">
        <div className="dashteamleaveTitle">
          <h3>On Leave Today</h3>
        </div>
        <div className="line"></div>
        <OnLeaveEmployee />
      </div>
      <div className="dashleaverequestable">
        <div className="leavetabletitledash">
          <h3>My Team</h3>
          <span onClick={() => navigate('/myteam')}>View all</span>
        </div>
        <div className="line"></div>
        <DashBoardTeam />
      </div>
      <div className="dashteamleave">
        <div className="dashteamleaveTitle">
          <h3>Who was born today  🍰 </h3>
        </div>
        <div className="line"></div>
        <DashBoardCelebration />
      </div>
    </div>
  );
}
