import React, { useEffect, useState } from 'react';
import './DashBoardLeave.css';
import { Link } from 'react-router-dom';
import { getLeaveHistoryAPI } from '../../../api/leaveapi';
import LeaveStatus from '../../LeaveDetails/LeaveStatus/LeaveStatus';
import { differenceInDays, format, parseISO } from 'date-fns';
import { useDispatch } from 'react-redux';
import {
  disableLoading,
  enableLoading,
} from '../../../Redux/userSlice';
export default function DashBoardLeaveRequestTable() {
  const [leaveList, setLeaveList] = useState([]);
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const getLeave = async () => {
    try {
      dispatch(enableLoading());
      const res = await getLeaveHistoryAPI();

      const updatedList = res.map((obj) => ({
        ...obj,
        start_date: format(parseISO(obj.start_date), 'yyyy-mm-dd'),
        end_date: format(parseISO(obj.end_date), 'yyyy-mm-dd'),
        apply_date: format(parseISO(obj.apply_date), 'yyyy-mm-dd'),
        days: differenceInDays(obj.end_date, obj.start_date) + 1,
      }));
      const list = updatedList.filter(
        (leave) => leave.leaveStatus === 'approved'
      );

      setLeaveList(updatedList);
      setError('');
    } catch (error) {
      if (error.response) {
        setError(error.response.message);
      } else {
        setError(error.message);
      }
    } finally {
      setTimeout(() => {
        dispatch(disableLoading());
      }, 3000);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      if (!leaveList.length) {
        getLeave();
      }
    });
  }, []);
  return (
    <>
      {error && <p style={{ color: '#FF3F3F' }}></p>}
      <div className="leverequestTableDashBoard">
        {leaveList.length != 0 ? (
          <>
            <table style={{ border: 'none' }}>
              <thead>
                <tr>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Type</th>
                  <th>Days</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveList.map((leave) => (
                  <tr key={leave.leaveId}>
                    <td>{leave.start_date}</td>
                    <td>{leave.end_date}</td>
                    <td>{leave.leave_type}</td>
                    <td>{leave.days}</td>
                    <td>
                      <LeaveStatus status={leave.leaveStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <h3>No Leave Data Available</h3>
        )}
      </div>
    </>
  );
}
