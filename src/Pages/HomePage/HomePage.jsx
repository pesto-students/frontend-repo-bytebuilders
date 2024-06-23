import React, { useEffect } from 'react';
import './HomePage.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function HomePage() {
  const isAuthenticated = useSelector(
    (state) => state.isAuthenticated
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, []);
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
