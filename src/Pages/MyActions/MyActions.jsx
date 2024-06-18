import React, { useEffect, useState } from 'react';
import './MyActions.css';
import { Link } from 'react-router-dom';
import LeaveDetails from '../../components/LeaveDetails/LeaveDetails';
import { leaveRequestAPI } from '../../api/leaveapi';
import { differenceInDays, format, parseISO } from 'date-fns';
export default function MyActions() {
  const [leaveDetailsStatus, setLeaveDetailsStatus] = useState(false);
  const [leaveDetails, setLeaveDetails] = useState({});
  const [requestList, setRequestList] = useState([{}]);
  const [listStatus, setListStatus] = useState(false);
  const role = 'Manager';
  const leaveAssign = (leave) => {
    setLeaveDetails(leave);
    setLeaveDetailsStatus(true);
  };
  const getLeaveRequestList = async () => {
    const token = localStorage.getItem('token');
    const res = await leaveRequestAPI(token);

    const list = res.data
      .filter((obj) => obj.leaveStatus === 'new')
      .map((obj) => ({
        ...obj,
        start_date: format(parseISO(obj.start_date), 'yyyy-mm-dd'),
        end_date: format(parseISO(obj.end_date), 'yyyy-mm-dd'),
        apply_date: format(parseISO(obj.apply_date), 'yyyy-mm-dd'),
        days: differenceInDays(obj.end_date, obj.start_date) + 1,
      }));

    setRequestList(list);
    setListStatus(true);
    console.log(requestList.length);
  };
  useEffect(() => {
    getLeaveRequestList();
  }, []);
  return (
    <div className="myactions">
      <b>My Actions</b>
      {listStatus && (
        <div className="myactionlist">
          <table style={{ border: 'none' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {requestList.map((leave) => (
                <tr key={leave.leaveId}>
                  <td>{leave.userName}</td>
                  <td> {leave.leave_type}</td>

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
      {leaveDetailsStatus && (
        <LeaveDetails
          setLeaveDetailsStatus={setLeaveDetailsStatus}
          getList={getLeaveRequestList}
          role={role}
          leaveDetails={leaveDetails}
        />
      )}
    </div>
  );
}
