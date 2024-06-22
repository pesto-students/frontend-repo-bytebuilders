import React, { useEffect, useState } from 'react';
import './Leaves.css';
import { Link } from 'react-router-dom';
import LeaveDetails from '../../components/LeaveDetails/LeaveDetails';
import AddLeave from '../../components/LeaveDetails/AddLeave/AddLeave';
import { useSelector } from 'react-redux';
import { getLeaveHistoryAPI } from '../../api/leaveapi';
import LeaveStatus from '../../components/LeaveDetails/LeaveStatus/LeaveStatus';
import { differenceInDays, format, parseISO } from 'date-fns';

export default function Leaves() {
  const [leaveDetailsStatus, setLeaveDetailsStatus] = useState(false);
  const [addLeaveStatus, setAddLeaveStatus] = useState(false);
  const [leaveList, setLeaveList] = useState([]);
  const [leaveDetails, setLeaveDetails] = useState({});
  const [responseStatus, setResponseStatus] = useState({
    status: 'OK',
    message: '',
  });

  const user = useSelector((state) => state.user);

  const role = 'Employee';
  const getLeaveHistory = async () => {
    try {
      const res = await getLeaveHistoryAPI();
      const updatedList = res.map((obj) => ({
        ...obj,
        start_date: format(parseISO(obj.start_date), 'yyyy-mm-dd'),
        end_date: format(parseISO(obj.end_date), 'yyyy-mm-dd'),
        apply_date: format(parseISO(obj.apply_date), 'yyyy-mm-dd'),
        days: differenceInDays(obj.end_date, obj.start_date) + 1,
      }));

      setLeaveList(updatedList);
    } catch (error) {}
  };

  const leaveAssign = (leave) => {
    setLeaveDetails(leave);
    setLeaveDetailsStatus(true);
  };
  const setMessageStatus = () => {
    setTimeout(() => {
      setMessageStatus({
        status: 'OK',
        message: '',
      });
    }, 3000);
  };

  useEffect(() => {
    if (!leaveList.length) {
      getLeaveHistory();
    }
  }, []);
  return (
    <div className="leavecontainer">
      <div className="leavenumcontainer">
        <div className="leaveNum">
          <div className="leavetype">
            <span>{user?.casualLeaveDays}</span>
            <span>Causal Leave</span>
          </div>
          <div className="leavetype">
            <span>{user?.lopLeaveDays}</span>
            <span>Earned Leave</span>
          </div>
          <div className="leavetype">
            <span>{user?.medicalLeaveDays}</span>
            <span>Medical Leave</span>
          </div>
        </div>
        <div className="addLeavebutton">
          <button onClick={() => setAddLeaveStatus(true)}>
            Apply for Leave
          </button>
        </div>
      </div>
      {leaveList.length ? (
        <div className="leavelist">
          {responseStatus.message && (
            <p
              style={
                responseStatus.status === 'OK'
                  ? { color: '#30D143' }
                  : { color: '#ED715F' }
              }
            >
              {responseStatus.message}
            </p>
          )}
          {leaveList.length != 0 && (
            <div className="myleave">
              <label htmlFor="myleave"> My Leave</label>
              <div className="line"></div>

              <table style={{ border: 'none' }}>
                <thead>
                  <tr>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Type</th>
                    <th>Days</th>
                    <th>Status</th>
                    <th></th>
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
                      <td>
                        <Link onClick={() => leaveAssign(leave)}>
                          more
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <p style={{ color: '#FF3F3F' }}>No Leave Applied</p>
      )}
      {leaveDetailsStatus && (
        <LeaveDetails
          setLeaveDetailsStatus={setLeaveDetailsStatus}
          getList={getLeaveHistory}
          role={role}
          responseStatus={responseStatus}
          setResponseStatus={setResponseStatus}
          setMessageStatus={setMessageStatus}
          leaveDetails={leaveDetails}
        />
      )}
      {addLeaveStatus && (
        <AddLeave
          setAddLeaveStatus={setAddLeaveStatus}
          getLeaveHistory={getLeaveHistory}
        />
      )}
    </div>
  );
}
