import React, { useState } from 'react';
import './Attendance.css';
export default function Attendance() {
  const [leaveStatus, setLeaveStatus] = useState(false);
  const [checkIn, setCheckIn] = useState(false);
  return (
    <div className="attendanceContainer">
      <div className="attendancetopbox">
        <div className="attendancedtimedateBox">
          <span>Today</span>
          <span>17:30 AM</span>
          <span>Sunday, 28 April</span>
        </div>
        <div className="attendancecheckbox">
          <div className="attendacestatus">
            <span>Status</span>
            <div className="line"></div>
            <div className="attendanvcecheck">
              <div
                className="checkbullet"
                style={{
                  color: '#30D143',
                  background: leaveStatus ? '' : '#30d14340',
                }}
              >
                In Office
              </div>
              <div
                className="checkbullet"
                style={{
                  color: '#FF3F3F',
                  background: leaveStatus ? '#FF3F3F40' : '',
                }}
              >
                On Leave
              </div>
            </div>
          </div>
          <div className="attendancecheckbutton">
            <button
              onClick={() => setCheckIn(false)}
              style={
                checkIn
                  ? { color: '#30D143', background: '#30d14340' }
                  : { color: '#A6A6A6', background: '#D8D8D8' }
              }
            >
              Check In
            </button>
            <button
              onClick={() => setCheckIn(true)}
              style={
                checkIn
                  ? { color: '#A6A6A6', background: '#D8D8D8' }
                  : { color: '#FF3F3F', background: '#FF3F3F40' }
              }
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
      <div className="attendanceList">
        <b>My Attendance</b>
        <table className="attendancetable">
          <thead>
            <tr>
              <th> Date</th>
              <th> Status</th>
              <th> Check In</th>
              <th>Check out</th>
              <th>Worked</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mon , 01 Jan 2024</td>
              <td>
                <div>Present</div>
              </td>
              <td>10:00</td>
              <td>18:00</td>
              <td>8hr</td>
            </tr>
            <tr>
              <td>Mon , 01 Jan 2024</td>
              <td>
                <div>Present</div>
              </td>
              <td>10:00</td>
              <td>18:00</td>
              <td>8hr</td>
            </tr>
            <tr>
              <td>Mon , 01 Jan 2024</td>
              <td>
                <div>Present</div>
              </td>
              <td>10:00</td>
              <td>18:00</td>
              <td>8hr</td>
            </tr>
            <tr>
              <td>Mon , 01 Jan 2024</td>
              <td>
                <div>Present</div>
              </td>
              <td>10:00</td>
              <td>18:00</td>
              <td>8hr</td>
            </tr>
            <tr>
              <td>Mon , 01 Jan 2024</td>
              <td>
                <div>Present</div>
              </td>
              <td>10:00</td>
              <td>18:00</td>
              <td>8hr</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
