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
  const [leaveStatus, setLeaveStatus] = useState(false);
  const [checkIn, setCheckIn] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [attendanceList, setAttendanceList] = useState([]);
  const [error, setError] = useState('');
  const [hoverInfo, setHoverInfo] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of items per page
  const [loading, setLoading] = useState(true); // Loading state

  const getAttendance = async () => {
    try {
      const list = await getPunchDataAPI();

      setAttendanceList(list);
      if (list.length) {
        const today = list[list.length - 1];

        const checkstatus = Math.floor(today.punchTimes.length % 2)
          ? setCheckIn(false)
          : setCheckIn(true);
        
        if (today.isHoliday || today.isWeekend || today.isOnLeave) {
          setLeaveStatus(true);
        }
      }

      setError('');
    } catch (error) {
      if (error.response) {
        setError(error.response.message);
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  const handleMouseIn = (e, punchTimes) => {
    const rect = e.target.getBoundingClientRect();
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
    // Check if the last punch in the array is a punch out, otherwise show "MISSING"
    if (punchTimes.length % 2 === 1) {
      return "MISSING";
    } else {
      return punchTimes[punchTimes.length - 1];
    }
  };

  const handleMouseOut = (e) => {
    setHoverInfo({ ...hoverInfo, visible: false });
  };

  const handleCheckIn = async () => {
    try {
      const res = await punchInAPI();
      getAttendance();
      setError('');
    } catch (error) {
      handleError(error);
    }
  };

  const handleCheckOut = async () => {
    try {
      const res = await punchOutAPI();
      getAttendance();
      setError('');
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    if (error.response) {
      setError(error.response.message);
    } else {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!attendanceList.length) {
      getAttendance();
    }
  }, []);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = attendanceList.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
              Punch In
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
              Punch Out
            </button>
          </div>
        </div>
      </div>
      <b>My Attendance</b>
      {error && <p style={{ color: '#FF3F3F' }}>{error}</p>}
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
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
              {currentItems.map((attendance) => (
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
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastItem >= attendanceList.length}
            >
              Next
            </button>
          </div>
          {hoverInfo.visible && (
            <HoverBox
              top={hoverInfo.y}
              left={hoverInfo.x}
              content={hoverInfo.content}
            />
          )}
        </div>
      )}
    </div>
  );
}
