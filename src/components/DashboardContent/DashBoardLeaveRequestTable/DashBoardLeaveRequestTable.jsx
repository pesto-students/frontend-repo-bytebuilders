import React from 'react';
import './DashBoardLeave.css';
import { Link } from 'react-router-dom';
export default function DashBoardLeaveRequestTable() {
  return (
    <table>
      <thead style={{ border: 'none' }}>
        <tr>
          <th>Duration</th>
          <th>Type </th>
          <th>Days</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>May 1 - May 2 </td>
          <td> Casual Leave</td>
          <td> 10 </td>
          <td className="approvalStatus"> Approved</td>
          <td>
            <Link>more</Link>
          </td>
        </tr>
        <tr>
          <td>May 1 - May 2 </td>
          <td> Casual Leave</td>
          <td> 10 </td>
          <td>
            <div className="approvalStatus">Approved</div>
          </td>
          <td>
            <Link>more</Link>
          </td>
        </tr>
        <tr>
          <td>May 1 - May 2 </td>
          <td> Casual Leave</td>
          <td> 10 </td>
          <td className="approvalStatus"> Approved</td>
          <td>
            <Link>more</Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
