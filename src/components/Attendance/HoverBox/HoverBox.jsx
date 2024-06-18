import React from 'react';
import './HoverBox.css';
export default function HoverBox({ top, left, content }) {
  return (
    <div
      className="hover-box"
      style={{
        top: top,
        left: left,
      }}
    >
      {content.map((punch, index) => (
        <div className="punchcontainer">
          {Math.floor(index % 2) === 0 ? (
            <span style={{ color: '#30D143' }}>IN</span>
          ) : (
            <span style={{ color: '#FF6F6F' }}>OUT</span>
          )}
          <span> {punch}</span>
        </div>
      ))}
    </div>
  );
}
