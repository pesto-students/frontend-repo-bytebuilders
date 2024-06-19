import React from 'react';
import './HomePage.css';
export default function HomePage() {
  return (
    <div className="homepageContainer">
      <div className="homepageText">
        <div className="homepagetitelText">
          Unlock the Power of Seamless
        </div>
        <div className="homepagetitlemiddle">
          Human Resources Management
        </div>
        <p>
          Welcome to HRMS, where innovation meets efficiency in Human
          Resources Management.
        </p>
      </div>
      <div className="homepageImage">
        <img src="homePage.svg" alt="" />
      </div>
    </div>
  );
}
