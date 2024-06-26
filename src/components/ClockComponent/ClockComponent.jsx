import React, { useEffect, useState } from 'react';
import './ClockComponent.css';
import { format } from 'date-fns';

export default function ClockComponent() {
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState('');
  const [is24HourFormat, setIs24HourFormat] = useState(false);

  const updateTimeAndDate = () => {
    const currentTime = new Date();
    setTime(currentTime);
    const formattedDate = format(currentTime, 'eeee, do MMMM');
    setDate(formattedDate);
  };

  useEffect(() => {
    // Update the time every second
    const intervalId = setInterval(updateTimeAndDate, 1000);

    // Initialize the time and date on component mount
    updateTimeAndDate();

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const toggleTimeFormat = () => {
    setIs24HourFormat((prevFormat) => !prevFormat);
  };

  const formatTime = (time) => {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: !is24HourFormat,
    };
    return time.toLocaleTimeString(undefined, options);
  };

  return (
    <div className="dashtimedate">
      <div className="dashtime">{formatTime(time)}</div>
      <div className="dashdate">{date}</div>
      <label className="switch">
        <input
          type="checkbox"
          checked={is24HourFormat}
          onChange={toggleTimeFormat}
        />
        <span className="slider round"></span>
      </label>
      <div className="formatLabel">
        {is24HourFormat ? '24-Hour Format' : '12-Hour Format'}
      </div>
    </div>
  );
}
