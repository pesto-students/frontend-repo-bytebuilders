import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parseISO, isSameDay } from 'date-fns';
import './Calender.css'; // Import the custom CSS file
import { Tooltip as ReactTooltip } from 'react-tooltip';

// Define the list of holidays with their names
const holidays = [
  { date: '2024-01-01', name: "New Year's Day" },
  { date: '2024-07-04', name: 'Independence Day' },
  { date: '2024-12-25', name: 'Christmas' },
  // Add more holidays as needed
].map((holiday) => ({ ...holiday, date: parseISO(holiday.date) }));

export default function Calender() {
  const [selectedDate, setSelectedDate] = useState(null);

  const highlightHolidays = (date) => {
    const holiday = holidays.find((holiday) =>
      isSameDay(date, holiday.date)
    );
    return holiday ? 'holiday-highlight' : undefined;
  };

  const getHolidayName = (date) => {
    const holiday = holidays.find((holiday) =>
      isSameDay(date, holiday.date)
    );

    return holiday ? holiday.name : '';
  };

  return (
    <div>
      <h1>Select a Date</h1>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dayClassName={highlightHolidays}
        renderDayContents={(day, date) => (
          <div>
            <span data-tip={getHolidayName(date)}>{day}</span>
            <ReactTooltip />
          </div>
        )}
        calendarClassName="custom-calendar"
        inline
      />
    </div>
  );
}
