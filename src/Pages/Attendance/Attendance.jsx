import React, { useEffect, useState } from 'react';
import './Attendance.css';
import {
  getPunchDataAPI,
  punchInAPI,
  punchOutAPI,
} from '../../api/attendenceapi';
import HoverBox from '../../components/Attendance/HoverBox/HoverBox';
import ClockComponent from '../../components/ClockComponent/ClockComponent';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

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
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // To differentiate between success and error messages

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
      handleError(error);
    } finally {
      setLoading(false);
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
    if (punchTimes.length % 2 === 1) {
      return 'MISSING';
    } else {
      return punchTimes[punchTimes.length - 1];
    }
  };

  const handleMouseOut = () => {
    setHoverInfo({ ...hoverInfo, visible: false });
  };

  const handleCheckIn = async () => {
    try {
      await punchInAPI();
      await getAttendance();
      setSnackbarMessage('Punched In successfully.');
      setSnackbarSeverity('success');
    } catch (error) {
      handleError(error);
      setSnackbarMessage("please punch out before punch in")
    }
  };

  const handleCheckOut = async () => {
    try {
      await punchOutAPI();
      await getAttendance();
      setSnackbarMessage('Punched Out successfully.');
      setSnackbarSeverity('success');
    } catch (error) {
      handleError(error);
      setSnackbarMessage("please punch in before punch out")
    }
  };

  const handleError = (error) => {
    if (error.response) {
      setError(error.response.message);
      setSnackbarMessage(error.response.message);
    } else {
      setError(error.message);
      setSnackbarMessage(error.message);
    }
    setSnackbarSeverity('error');
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
      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={2500}
        onClose={() => setSnackbarMessage('')}
      >
        <SnackbarContent
          message={snackbarMessage}
          style={{
            backgroundColor: snackbarSeverity === 'success' ? '#43A047' : '#D32F2F',
          }}
        />
      </Snackbar>
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
        <div className="loader">
          <div></div>
        </div>
      ) : (
        <div className="attendanceList">
          <table className="attendancetable">
            <thead>
              <tr>
                <th> Date</th>
                <th> Status</th>
                <th> Check In</th>
                <th>Check out</th>
                <th>Total Worked</th>
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
                    onMouseLeave={handleMouseOut}
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
