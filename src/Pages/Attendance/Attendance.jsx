import React, { useEffect, useState } from 'react';
import './Attendance.css';
import {
  getPunchDataAPI,
  punchInAPI,
  punchOutAPI,
} from '../../api/attendenceapi';
import HoverBox from '../../components/Attendance/HoverBox/HoverBox';
import ClockComponent from '../../components/ClockComponent/ClockComponent';

export default function Attendance() {
  const token = localStorage.getItem('token');
  const [leaveStatus, setLeaveStatus] = useState(false);

  const [checkIn, setCheckIn] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [attendanceList, setAttendanceList] = useState([]);
  const [hoverInfo, setHoverInfo] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: [],
  });
  const getAttendance = async () => {
    const list = await getPunchDataAPI(token);

    setAttendanceList(list);
    if (list.length) {
      const today = list[list.length - 1];

      const checkstatus = Math.floor(today.punchTimes.length % 2)
        ? setCheckIn(false)
        : setCheckIn(true);
      console.log('checkstatus', checkstatus);
      console.log(Math.floor(today.punchTimes.length % 2));
      if (today.isHoliday || today.isWeekend || today.isOnLeave) {
        setLeaveStatus(true);
      }
    }
  };
  const handleMouseIn = (e, punchTimes) => {
    const rect = e.target.getBoundingClientRect();
    console.log(punchTimes);
    setHoverInfo({
      visible: punchTimes.length ? true : false,
      x: rect.left,
      y: rect.bottom,
      content: punchTimes,
    });
  };
  const statusOffice = (attendance) => {
    const status = attendance.isHoliday
      ? 'Holiday'
      : attendance.isWeekend
      ? 'Weekend'
      : attendance.isOnLeave
      ? 'Leave'
      : attendance.punchTimes.length
      ? 'Present'
      : 'Absent';
    return status;
  };
  const punchOutTime = (punchTimes) => {
    return Math.floor(punchTimes.length % 2)
      ? punchTimes[punchTimes.length - 2]
      : punchTimes[punchTimes.length - 1];
  };

  const handleMouseOut = (e) => {
    setHoverInfo({ ...hoverInfo, visible: false });
  };

  const handleCheckIn = async () => {
    const res = await punchInAPI();
    getAttendance();
  };

  const handleCheckOut = async () => {
    const res = await punchOutAPI();

    getAttendance();
  };
  useEffect(() => {
    getAttendance();
  }, []);
  return (
    <div className="attendanceContainer">
      <div className="attendancetopbox">
        <ClockComponent />
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
              disabled={isButtonDisabled}
              onClick={handleCheckIn}
              style={
                checkIn
                  ? { color: '#30D143', background: '#30d14340' }
                  : { color: '#A6A6A6', background: '#D8D8D8' }
              }
            >
              Check In
            </button>
            <button
              disabled={isButtonDisabled}
              onClick={handleCheckOut}
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
      <b>My Attendance</b>
      <div className="attendanceList">
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
            {attendanceList.map((attendance) => (
              <tr
                key={attendance.date}
                style={
                  attendance.isHoliday || attendance.isWeekend
                    ? { background: '#2EC9FE40' }
                    : {}
                }
              >
                <td>{attendance.date}</td>
                <td>
                  <div>{statusOffice(attendance)}</div>
                </td>
                <td>{attendance.punchTimes[0]}</td>
                <td>{punchOutTime(attendance.punchTimes)}</td>
                <td
                  onMouseEnter={(e) =>
                    handleMouseIn(e, attendance.punchTimes)
                  }
                  onMouseLeave={(e) => handleMouseOut(e)}
                >
                  {attendance.netHourInOffice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {hoverInfo.visible && (
          <HoverBox
            top={hoverInfo.y}
            left={hoverInfo.x}
            content={hoverInfo.content}
          />
        )}
      </div>
    </div>
  );
}
