import React, { useEffect, useState } from 'react';
import './AddLeave.css';
import { Link } from 'react-router-dom';
import Dropdown from '../../Dropdown/Dropdown';
import { addleave } from '../../../api/leaveapi';
export default function AddLeave({
  setAddLeaveStatus,
  getLeaveHistory,
}) {
  const [selectedOption, setSelectedOptions] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    leave_type: '',
    start_date: '',
    end_date: '',
    leave_reason: '',
  });
  const [days, setDays] = useState(0);

  const validate = () => {
    if (!formData.leave_type) {
      setError(' Leave Type is required');
      return false;
    }
    if (!formData.start_date) {
      setError('Start date required');
      return false;
    }
    if (!formData.end_date) {
      setError('End date required');
      return false;
    }
    if (!formData.leave_reason) {
      setError('Reason required');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendFormData = async (e) => {
    e.preventDefault();
    try {
      if (validate()) {
        const token = localStorage.getItem('token');

        await addleave(formData, token);
        getLeaveHistory();
        setAddLeaveStatus(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const options = ['casual', 'medical', 'lop'];

  useEffect(() => {
    const start = new Date(formData.start_date);
    const end = new Date(formData.end_date);
    const diffTime = Math.abs(end - start) + 1;
    if (start > end) {
      setError('Start date is greater than End Date');
      return;
    }

    const noofdays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (noofdays) {
      setDays(noofdays);
    }
  }, [formData.end_date]);

  return (
    <div className="addleavecontainer">
      <div className="topcontaineraddleave">
        <b>Leave Request</b>
        <Link onClick={() => setAddLeaveStatus(false)}>
          <img src="./close.svg" alt="" />
        </Link>
      </div>
      <form onSubmit={sendFormData}>
        <div className="addleavecontent">
          <div className="addleaveleft">
            <div className="addleaveinputbox">
              <label htmlFor="leave type">Leave Type</label>
              <Dropdown
                options={options}
                name="leave_type"
                value={formData.leave_type}
                handleChange={handleChange}
              />
            </div>
            <div className="addleaveinputbox">
              <label htmlFor="startdate">Start Date</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
              />
            </div>
            <div className="addleaveinputbox">
              <label htmlFor="end_date">End Date</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
              />
            </div>
            <div className="addleaveinputbox">
              <label htmlFor="Reason">Reason</label>
              <input
                type="text"
                name="leave_reason"
                style={{ height: ' 9vh' }}
                value={formData.leave_reason}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="addleaveright">
            <div className="addleavedays">
              <b>Your Request Includes</b>
              <div className="addleavedaysstat">
                <b>Start Date</b>
                <span>{formData.start_date}</span>
              </div>
              <div className="addleavedaysstat">
                <b>End Date</b>
                <span>{formData.end_date}</span>
              </div>
              <div className="line"></div>
              <div className="addleavedaysstat">
                <b>Days</b>
                <span>{days}</span>
              </div>
            </div>
            <div className="addleavebuttons">
              <button type="submit">Apply For Leave</button>
            </div>
          </div>
        </div>
      </form>
      <span style={{ color: '#FD5252' }}>{error}</span>
    </div>
  );
}
