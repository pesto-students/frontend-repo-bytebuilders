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
  const [error, setError] = useState('');
  const [responseStatus, setResponseStatus] = useState({
    status: 'OK',
    message: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of items per page
  const [sortOrder, setSortOrder] = useState('desc'); // Initial sort order

  const user = useSelector((state) => state.user);
  const role = 'Employee';

  const getLeaveHistory = async () => {
    try {
      const res = await getLeaveHistoryAPI();
      let sortedList = res.map((obj) => ({
        ...obj,
        start_date: format(parseISO(obj.start_date), 'yyyy-MM-dd'),
        end_date: format(parseISO(obj.end_date), 'yyyy-MM-dd'),
        apply_date: format(parseISO(obj.apply_date), 'yyyy-MM-dd'),
        days: differenceInDays(parseISO(obj.end_date), parseISO(obj.start_date)) + 1,
      }));

      // Sort by apply_date based on sortOrder
      sortedList.sort((a, b) => {
        const dateA = parseISO(a.apply_date);
        const dateB = parseISO(b.apply_date);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });

      setLeaveList(sortedList);
    } catch (error) {
      if (error.response) {
        setError(error.response.message);
      } else {
        setError(error.message);
      }
    }
  };

  const leaveAssign = (leave) => {
    setLeaveDetails(leave);
    setLeaveDetailsStatus(true);
  };

  const setMessageStatus = () => {
    setTimeout(() => {
      setResponseStatus({
        status: 'OK',
        message: '',
      });
    }, 3000);
  };

  useEffect(() => {
    getLeaveHistory(); // Fetch leave history when component mounts
  }, []);

  // Handle pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = leaveList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Toggle sorting order and re-fetch data
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    getLeaveHistory(); // Re-fetch data with new sort order
  };

  return (
    <div className="leavecontainer">
      <div className="leavenumcontainer">
        <div className="leaveNum">
          <div className="leavetype">
            <span>{user?.casualLeaveDays}</span>
            <span>Casual Leave</span>
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
          {error && <p style={{ color: '#FF3F3F' }}>{error}</p>}
          {currentItems.length !== 0 && (
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
                    <th>
                      <button onClick={toggleSortOrder}>
                        Apply Date {sortOrder === 'asc' ? '▲' : '▼'}
                      </button>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((leave) => (
                    <tr key={leave.leaveId}>
                      <td>{leave.start_date}</td>
                      <td>{leave.end_date}</td>
                      <td>{leave.leave_type}</td>
                      <td>{leave.days}</td>
                      <td>
                        <LeaveStatus status={leave.leaveStatus} />
                      </td>
                      <td>{leave.apply_date}</td>
                      <td>
                        <Link onClick={() => leaveAssign(leave)}>
                          more
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="pagination">
                {leaveList.length > itemsPerPage && (
                  <ul>
                    {Array(Math.ceil(leaveList.length / itemsPerPage))
                      .fill()
                      .map((_, index) => (
                        <li
                          key={index + 1}
                          onClick={() => paginate(index + 1)}
                          className={currentPage === index + 1 ? 'active' : ''}
                        >
                          {index + 1}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p style={{ color: '#FF3F3F' }}>No Leave Applied</p>
      )}

      {/* Leave details modal */}
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

      {/* Add leave modal */}
      {addLeaveStatus && (
        <AddLeave
          setAddLeaveStatus={setAddLeaveStatus}
          getLeaveHistory={getLeaveHistory}
        />
      )}
    </div>
  );
}