import React, { useEffect } from 'react';
import './Dropdown.css';
export default function Dropdown({
  options,
  name,
  value,
  handleChange,
}) {
  useEffect(() => {
    console.log(options);
  }, []);
  return (
    <>
      <select name={name} value={value} onChange={handleChange}>
        <option value="">Select an Option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
