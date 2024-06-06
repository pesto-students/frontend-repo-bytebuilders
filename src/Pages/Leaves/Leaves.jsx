import React, { useEffect, useState } from 'react';
import './Leaves.css';
import { Link } from 'react-router-dom';
import LeaveDetails from '../../components/LeaveDetails/LeaveDetails';
import AddLeave from '../../components/LeaveDetails/AddLeave/AddLeave';
import { useSelector } from 'react-redux';
import { getLeaveHistoryAPI } from '../../api/leaveapi';

export default function Leaves() {
  const [leaveDetailsStatus, setLeaveDetailsStatus] = useState(false);
  const [addLeaveStatus, setAddLeaveStatus] = useState(false);
  const [leaveListNew, setLeaveListNew] = useState([]);
  const user = useSelector((state) => state.user);

  const role = 'Employee';
  const getLeaveHistory = async () => {
    const token = localStorage.getItem('token');
    const res = await getLeaveHistoryAPI(token);
    const leaveHistory = res.filter(
      (leave) => leave.leaveStatus !== 'new'
    );
    const newLeave = res.filter(
      (leave) => leave.leaveStatus === 'new'
    );
    console.log(newLeave);
    setLeaveListNew(newLeave);
    console.log(leaveListNew);
  };
  useEffect(() => {
    getLeaveHistory();
  });
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
      <div className="leavelist">
        {leaveListNew}
        {leaveListNew.length != 0 && (
          <div className="myleave">
            <label htmlFor="myleave"> My Leave</label>
            <div className="line"></div>

            <table style={{ border: 'none' }}>
              <thead>
                <tr>
                  <th>Duration</th>
                  <th>Type</th>
                  <th>Days</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>May 1 - May 10 </td>
                  <td>Causaul Leave</td>
                  <td>10 </td>
                  <td>
                    <div
                      className="leavestatus"
                      style={{
                        background: '#30d14340',
                        color: '#30D143',
                      }}
                    >
                      Approved
                    </div>
                  </td>
                  <td>
                    <Link onClick={() => setLeaveDetailsStatus(true)}>
                      more
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>May 1 - May 10 </td>
                  <td>Causaul Leave</td>
                  <td>10 </td>
                  <td>
                    <div
                      className="leavestatus"
                      style={{
                        background: '#30d14340',
                        color: '#30D143',
                      }}
                    >
                      Approved
                    </div>
                  </td>
                  <td>
                    <Link onClick={() => setLeaveDetailsStatus(true)}>
                      more
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>May 1 - May 10 </td>
                  <td>Causaul Leave</td>
                  <td>10 </td>
                  <td>
                    <div
                      className="leavestatus"
                      style={{
                        background: '#30d14340',
                        color: '#30D143',
                      }}
                    >
                      Approved
                    </div>
                  </td>
                  <td>
                    <Link onClick={() => setLeaveDetailsStatus(true)}>
                      more
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>May 1 - May 10 </td>
                  <td>Causaul Leave</td>
                  <td>10 </td>
                  <td>
                    <div
                      className="leavestatus"
                      style={{
                        background: '#30d14340',
                        color: '#30D143',
                      }}
                    >
                      Approved
                    </div>
                  </td>
                  <td>
                    <Link onClick={() => setLeaveDetailsStatus(true)}>
                      more
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        <div className="myleave">
          <label htmlFor="myleave"> Leave History</label>
          <div className="line"></div>
          <table style={{ border: 'none' }}>
            <thead>
              <tr>
                <th>Duration</th>
                <th>Type</th>
                <th>Days</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>May 1 - May 10 </td>
                <td>Causaul Leave</td>
                <td>10 </td>
                <td>
                  <div
                    className="leavestatus"
                    style={{
                      background: '#30d14340',
                      color: '#30D143',
                    }}
                  >
                    Approved
                  </div>
                </td>
                <td>
                  <Link onClick={() => setLeaveDetailsStatus(true)}>
                    more
                  </Link>
                </td>
              </tr>
              <tr>
                <td>May 1 - May 10 </td>
                <td>Causaul Leave</td>
                <td>10 </td>
                <td>
                  <div
                    className="leavestatus"
                    style={{
                      background: '#30d14340',
                      color: '#30D143',
                    }}
                  >
                    Approved
                  </div>
                </td>
                <td>
                  <Link onClick={() => setLeaveDetailsStatus(true)}>
                    more
                  </Link>
                </td>
              </tr>
              <tr>
                <td>May 1 - May 10 </td>
                <td>Causaul Leave</td>
                <td>10 </td>
                <td>
                  <div
                    className="leavestatus"
                    style={{
                      background: '#30d14340',
                      color: '#30D143',
                    }}
                  >
                    Approved
                  </div>
                </td>
                <td>
                  <Link onClick={() => setLeaveDetailsStatus(true)}>
                    more
                  </Link>
                </td>
              </tr>
              <tr>
                <td>May 1 - May 10 </td>
                <td>Causaul Leave</td>
                <td>10 </td>
                <td>
                  <div
                    className="leavestatus"
                    style={{
                      background: '#30d14340',
                      color: '#30D143',
                    }}
                  >
                    Approved
                  </div>
                </td>
                <td>
                  <Link onClick={() => setLeaveDetailsStatus(true)}>
                    more
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {leaveDetailsStatus && (
        <LeaveDetails
          setLeaveDetailsStatus={setLeaveDetailsStatus}
          role={role}
        />
      )}
      {addLeaveStatus && (
        <AddLeave setAddLeaveStatus={setAddLeaveStatus} />
      )}
    </div>
  );
}
