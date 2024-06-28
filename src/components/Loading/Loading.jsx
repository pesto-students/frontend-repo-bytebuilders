import React, { useEffect } from 'react';
import './Loading.css';
export default function Loading() {
  useEffect(() => {
    console.log('In Loading');
  }, []);
  return (
    <div className="loader">
      <div></div>
    </div>
  );
}
