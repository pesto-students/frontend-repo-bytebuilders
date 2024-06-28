import React, { useEffect } from 'react';
import './Dropdown.css';
export default function Dropdown({
  options,
  name,
  value,
  handleChange,
}) {
  useEffect(() => {
    console.log('In DropDown', options);
    console.log(
      `{value ? value : 'Select an Option'}`,
      value ? value : 'Select an Option'
    );
    console.log('value', value);
  }, []);
  return (
    <>
      <select name={name} value={value} onChange={handleChange}>
        <option value={value}>
          {value ? value : 'Select an Option'}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
