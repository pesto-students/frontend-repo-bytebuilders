import React, { useEffect, useState } from 'react';
import './ClockComponent.css';
import { format } from 'date-fns';

export default function ClockComponent() {
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState('');
  const [timeString, setTimeString] = useState({ time: '', per: '' });

  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const formateString = () => {
    const str = time.toLocaleTimeString(undefined, options);
    // const [timePart, period] = str
    //   .match(/([\d:]+) ([APM]+)/)
    //   .slice(1);
    const formattedDate = format(new Date(), 'eeee, do MMMM');
    setDate(formattedDate);
    setTimeString({ time: str });
  };

  useEffect(() => {
    // Update the time every minute
    const intervalId = setInterval(() => {
      setTime(new Date());
      formateString();
    }, 60000);

    // Initialize the time and date on component mount
    formateString();

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="dashtimedate">
      <div className="dashtime">
        {timeString.time}
        {/* <span>{timeString.per}</span> */}
      </div>
      <div className="dashdate">{date}</div>
    </div>
  );
}
