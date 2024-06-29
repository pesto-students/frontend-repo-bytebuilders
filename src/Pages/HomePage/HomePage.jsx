// src/components/HomePage.js
import React, { useEffect } from 'react';
import './HomePage.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ImageCarousel from '../../components/ImageCorousel/ImageCarousel';

export default function HomePage() {
  const isAuthenticated = useSelector(
    (state) => state.isAuthenticated
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="homepageContainer">
      <div className="homepageTextcontainer">
        <div className="homepageText">
          <div className="homepagetitelText">
            Unlock the Power of Seamless
          </div>
          <div className="homepagetitlemiddle">
            Human Resources Management
          </div>
          <p>
            Welcome to HRMS, where innovation meets efficiency in
            <br />
            Human Resources Management.
          </p>
        </div>
        <div className="homepageImage">
          <img src="homePage.svg" alt="" />
        </div>
      </div>
      {/* <div className="carouselConatiner">
        <ImageCarousel />
      </div> */}
      <div className="homapageDetails homapageDetailsmobile1">
        <div className="homeimage">
          <img src="./caro1.jpg" alt="" />
        </div>
        <div className="homeText">
          <p>
            Manage all your employee records in one place . Track
            employee hours and attendance with ease.
          </p>
        </div>
      </div>
      <div className="homapageDetails homapageDetailsmobile2">
        <div className="homeText">
          <p>
            Our system empower organizations of all sizes to optimize
            their HR operations and focus on strategic initiatives for
            growth and success.
          </p>
        </div>
        <div className="homeimage">
          <img src="./caro2.jpg" alt="" />
        </div>
      </div>
      <div className="homapageDetails homapageDetailsmobile1">
        <div className="homeimage">
          <img src="./caro3.jpg" alt="" />
        </div>
        <div className="homeText">
          <p>
            Organizations gain access to powerful tools for improving
            productivity, enhancing employee satisfaction, and
            ensuring regulatory compliance.
          </p>
        </div>
      </div>
    </div>
  );
}
