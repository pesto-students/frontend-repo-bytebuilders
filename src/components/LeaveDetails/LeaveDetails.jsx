import React from 'react';
import './LeaveDetails.css';
import { Link } from 'react-router-dom';
export default function LeaveDetails({
  setLeaveDetailsStatus,
  role,
}) {
  return (
    <div className="LeaveDetails">
      <div className="topLeaveDetailsContainer">
        <div className="leavetitlecontainer">
          <div className="leavetitlestatus">
            <div className="stat">Sick Leave</div>
            <div
              className="leavestatus"
              style={{
                background: '#30d14340',
                color: '#30D143',
              }}
            >
              Approved
            </div>
          </div>
          <Link onClick={() => setLeaveDetailsStatus(false)}>
            <img src="./close.svg" />
          </Link>
        </div>
        <div className="leaveDtailsContent">
          <b>Your Request Includes</b>
          <div className="leavedetailsdate">
            <span>Start Date - </span>
            <span style={{ color: '#4982eb' }}>04/03/2024</span>
          </div>
          <div className="leavedetailsdate">
            <span>End Date - </span>
            <span style={{ color: '#4982eb' }}>14/03/2024</span>
          </div>
          <div className="leavedetailsdate">
            <span>No Of Days - </span>
            <span style={{ color: '#4982eb' }}>10</span>
          </div>
          <b>Reason</b>
          <input
            type="text"
            value={'Will be on leave due to Fever'}
            readOnly
          />
          <div className="bottomLeaveDetailsContainer">
            <span>Applied on 01 march 2024</span>
            {role === 'Employee' && (
              <button onClick={() => setLeaveDetailsStatus(false)}>
                Cancel
              </button>
            )}
          </div>
        </div>
        {role === 'Manager' && (
          <div className="actioncontainer">
            <button
              className="actionbutton"
              style={{ background: '#FD5252' }}
            >
              Reject
            </button>
            <button
              className="actionbutton"
              style={{ background: '#6399FD' }}
            >
              Approve
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
