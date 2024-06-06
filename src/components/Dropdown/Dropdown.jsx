import React from 'react';
import './Dropdown.css';
export default function Dropdown({
  options,
  name,
  value,
  handleChange,
}) {
  return (
    <>
      <select name={name} value={value} onChange={handleChange}>
        <option value="" disabled>
          Select an Option
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
