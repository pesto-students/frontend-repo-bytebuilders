import React, { useState } from 'react';
import './MyActions.css';
import { Link } from 'react-router-dom';
import LeaveDetails from '../../components/LeaveDetails/LeaveDetails';
export default function MyActions() {
  const [leaveDetailsStatus, setLeaveDetailsStatus] = useState(false);
  const role = 'Manager';
  return (
    <div className="myactions">
      <div className="myactionlist">
        <b>My Actions</b>
        <table style={{ border: 'none' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Designation</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td> Caual Leave</td>
              <td>SDE I</td>
              <td>
                <Link onClick={() => setLeaveDetailsStatus(true)}>
                  more
                </Link>
              </td>
            </tr>
            <tr>
              <td>John Doe</td>
              <td> Caual Leave</td>
              <td>SDE I</td>
              <td>
                <Link onClick={() => setLeaveDetailsStatus(true)}>
                  more
                </Link>
              </td>
            </tr>

            <tr>
              <td>John Doe</td>
              <td> Caual Leave</td>
              <td>SDE I</td>
              <td>
                <Link onClick={() => setLeaveDetailsStatus(true)}>
                  more
                </Link>
              </td>
            </tr>
            <tr>
              <td>John Doe</td>
              <td> Caual Leave</td>
              <td>SDE I</td>
              <td>
                <Link onClick={() => setLeaveDetailsStatus(true)}>
                  more
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {leaveDetailsStatus && (
        <LeaveDetails
          setLeaveDetailsStatus={setLeaveDetailsStatus}
          role={role}
        />
      )}
    </div>
  );
}
