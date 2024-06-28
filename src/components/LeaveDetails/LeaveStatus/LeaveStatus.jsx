import React from 'react';
import './LeaveStatus.css';
export default function LeaveStatus({ status }) {
  return (
    <div
      className="leavestatus"
      style={
        status === 'new'
          ? {
              background: '#2EC9FE40',
              // color: '#2EC9FE',
            }
          : status === 'rejected' || status === 'cancelled'
          ? {
              background: '#EE404C40',
              // color: '#EE404C',
            }
          : {
              background: '#30d14340',
              // color: '#30D143',
            }
      }
    >
      {status === 'new' ? 'Pending' : status}
      <img
        src={
          status === 'new'
            ? './pending.svg'
            : status === 'rejected' || status === 'cancelled'
            ? './reject.svg'
            : './approve.svg'
        }
        alt=""
      />
    </div>
  );
}
