import React, { useEffect, useState } from 'react';
import './LeaveDetails.css';
import { Link } from 'react-router-dom';
import LeaveStatus from './LeaveStatus/LeaveStatus';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { processLeaveAPI } from '../../api/leaveapi';
import { useSelector } from 'react-redux';

export default function LeaveDetails({
  setLeaveDetailsStatus,
  role,
  leaveDetails,
  getList,
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

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('success');

  const user = useSelector((state) => state.user);

  const processLeave = async (status) => {
    try {
      const data = { leave_id: leave.leaveId, action: status };

      const res = await processLeaveAPI(data);
      getList();
      setLeaveDetailsStatus(false);

      // Show success snackbar
      handleSnackbar('success', `Leave has been ${status}ed successfully.`);
    } catch (error) {
      // Show error snackbar if necessary
      if (error.response && error.response.data && error.response.data.message) {
        handleSnackbar('error', error.response.data.message);
      } else {
        handleSnackbar('error', 'Failed to process leave request.');
      }
    }
  };

  const handleSnackbar = (type, message) => {
    setSnackbarType(type);
    setSnackbarMessage(message);
    setSnackbarOpen(true);

    // Automatically close the Snackbar after 4 seconds
    setTimeout(() => {
      setSnackbarOpen(false);
    }, 4000);
  };

  useEffect(() => {
    setLeave(leaveDetails);
  }, [leaveDetails]);

  return (
    <div className="LeaveDetails">
      <div className="topLeaveDetailsContainer">
        <div className="leavetitlecontainer">
          <div className="leavetitlestatus">
            <div className="stat">{leave.leave_type} Leave</div>
            <LeaveStatus status={leave.leaveStatus} />
          </div>
          <Link onClick={() => setLeaveDetailsStatus(false)}>
            <img src="./close.svg" alt="Close" />
          </Link>
        </div>
        <div className="leaveDetailsContent">
          <b>Your Request Includes</b>
          <div className="leavedetailsdate">
            <span>Start Date - </span>
            <span style={{ color: '#4982eb' }}>{leave.start_date}</span>
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
            value={role === 'Manager' ? leave.leaveReason : leave.reason}
            readOnly
          />
          <div className="bottomLeaveDetailsContainer">
            <span>Applied on {leave.apply_date}</span>
            {leave.leaveStatus === 'new' && role === 'Employee' && (
              <button onClick={() => processLeave('cancel')}>Cancel</button>
            )}
          </div>
        </div>
        {role === 'Manager' && user.canAcceptOrRejectLeaves && leave.leaveStatus === 'new' && (
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

      {/* Snackbar for displaying status messages */}
      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setSnackbarOpen(false)} severity={snackbarType}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}