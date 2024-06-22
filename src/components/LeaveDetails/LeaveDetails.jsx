import React, { useEffect, useState } from 'react';
import './LeaveDetails.css';
import { Link } from 'react-router-dom';
import LeaveStatus from './LeaveStatus/LeaveStatus';

import { processLeaveAPI } from '../../api/leaveapi';
import { useSelector } from 'react-redux';
export default function LeaveDetails({
  setLeaveDetailsStatus,
  role,
  leaveDetails,
  getList,
  setResponseStatus = null,
  responseStatus = null,
  setMessageStatus = null,
}) {
  const [leave, setLeave] = useState({
    leave_type: '',
    start_date: '',
    end_date: '',
    leaveStatus: '',
    apply_date: '',
    reason: '',
    approvedBy: null,
    days: 0,
    leaveId: '',
  });

  const user = useSelector((state) => state.user);

  const processLeave = async (status) => {
    try {
      const data = { leave_id: leave.leaveId, action: status };

      const res = await processLeaveAPI(data);
      setResponseStatus({
        status: 'OK',
        message: `Leave Has been ${status}ed successfully.`,
      });

      getList();
      setMessageStatus();
      setLeaveDetailsStatus(false);
    } catch (error) {
      setResponseStatus({
        status: 'NOT OK',
        message: `We are Facing issue to process Request.`,
      });
      setMessageStatus();
    }
  };

  useEffect(() => {
    setLeave(leaveDetails);
  }, []);

  return (
    <div className="LeaveDetails">
      <div className="topLeaveDetailsContainer">
        <div className="leavetitlecontainer">
          <div className="leavetitlestatus">
            <div className="stat">{leave.leave_type} Leave</div>
            <LeaveStatus status={leave.leaveStatus} />
          </div>
          <Link onClick={() => setLeaveDetailsStatus(false)}>
            <img src="./close.svg" />
          </Link>
        </div>
        <div className="leaveDtailsContent">
          <b>Your Request Includes</b>
          <div className="leavedetailsdate">
            <span>Start Date - </span>
            <span style={{ color: '#4982eb' }}>
              {leave.start_date}
            </span>
          </div>
          <div className="leavedetailsdate">
            <span>End Date - </span>
            <span style={{ color: '#4982eb' }}>{leave.end_date}</span>
          </div>
          <div className="leavedetailsdate">
            <span>No Of Days - </span>
            <span style={{ color: '#4982eb' }}>{leave.days}</span>
          </div>
          <b>Reason</b>
          <input
            type="text"
            value={
              role === 'Manager' ? leave.leaveReason : leave.reason
            }
            readOnly
          />
          <div className="bottomLeaveDetailsContainer">
            <span>Applied on {leave.apply_date}</span>
            {leave.leaveStatus === 'new' && role === 'Employee' && (
              <button onClick={() => processLeave('cancel')}>
                Cancel
              </button>
            )}
          </div>
        </div>
        {role === 'Manager' &&
          user.canAcceptOrRejectLeaves &&
          leave.leaveStatus === 'new' && (
            <div className="actioncontainer">
              <button
                onClick={() => processLeave('reject')}
                className="actionbutton"
                style={{ background: '#FD5252' }}
              >
                Reject
              </button>
              <button
                onClick={() => processLeave('approve')}
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
