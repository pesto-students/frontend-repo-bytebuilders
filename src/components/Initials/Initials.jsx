import React, { useEffect, useState } from 'react';
import './Initials.css';

export default function Initials({ name }) {
  const [initials, setInitials] = useState('');
  const [backColour, setBackColour] = useState('');
  const colorlist = [
    '#FFB3B3',
    '#ABE8B5',
    '#BDBCFF',
    '#D26CDB',
    '#5FA832',
  ];

  const createInitials = () => {
    const words = name.trim().split(' ');
    let str = '';
    if (words.length === 1) {
      str = words[0].charAt(0).toUpperCase();
    } else {
      str = words
        .map((word) => word.charAt(0).toUpperCase())
        .join('');
    }

    setInitials(str.length > 1 ? str.slice(0, 2) : str);
  };

  const selectColour = () => {
    const randomIndex = Math.floor(Math.random() * colorlist.length);
    setBackColour(colorlist[randomIndex]);
  };

  useEffect(() => {
    createInitials();
    selectColour();
  }, [name]);

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
  };

  return (
    <div className="container">
      {/* <div
        className="initialCircle"
        // style={{ backgroundColor: backColour }}
      >
      </div> */}
      <button className="logoutButton" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}
