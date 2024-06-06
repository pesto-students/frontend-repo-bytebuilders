import React, { useEffect, useState } from 'react';
import './AddLeave.css';
import { Link } from 'react-router-dom';
import Dropdown from '../../Dropdown/Dropdown';
export default function AddLeave({ setAddLeaveStatus }) {
  const [selectedOption, setSelectedOptions] = useState('');
  const [formData, setFormData] = useState({
    type: '',
    startdate: '',
    enddate: '',
    reason: '',
  });
  const [days, setDays] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendFormData = (e) => {
    e.preventDefault();
    console.log(formData);
    setAddLeaveStatus(false);
  };
  const options = ['Sick Leave', 'Earned Leave', 'causual Leave'];

  useEffect(() => {
    const start = new Date(formData.startdate);
    const end = new Date(formData.enddate);
    const diffTime = Math.abs(end - start);
    if (start > end) {
      return;
    }

    const noofdays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (noofdays) {
      setDays(noofdays);
    }
  }, [formData.enddate]);
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
                name="type"
                value={formData.type}
                handleChange={handleChange}
              />
            </div>
            <div className="addleaveinputbox">
              <label htmlFor="startdate">Start Date</label>
              <input
                type="date"
                name="startdate"
                value={formData.startdate}
                onChange={handleChange}
              />
            </div>
            <div className="addleaveinputbox">
              <label htmlFor="enddate">End Date</label>
              <input
                type="date"
                name="enddate"
                value={formData.enddate}
                onChange={handleChange}
              />
            </div>
            <div className="addleaveinputbox">
              <label htmlFor="Reason">Reason</label>
              <input
                type="text"
                name="reason"
                style={{ height: ' 9vh' }}
                value={formData.reason}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="addleaveright">
            <div className="addleavedays">
              <b>Your Request Includes</b>
              <div className="addleavedaysstat">
                <b>Start Date</b>
                <span>{formData.startdate}</span>
              </div>
              <div className="addleavedaysstat">
                <b>End Date</b>
                <span>{formData.enddate}</span>
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
    </div>
  );
}
