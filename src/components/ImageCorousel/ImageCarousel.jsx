// src/components/ImageCarousel.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ImageCarousel.css'; // Import custom CSS

const ImageCarousel = () => {
  return (
    <Carousel
      showThumbs={false}
      autoPlay
      infiniteLoop
      showStatus={false}
      interval={4000}
      transitionTime={600}
      dynamicHeight
      showArrows
      swipeable
      emulateTouch
      stopOnHover
      className="custom-carousel" // Custom class name
    >
      <div className="carousel-slide">
        <img src="./caro1.jpg" alt="Slide 1" />
        <p className="legend">
          "Great vision without great people is irrelevant." - Jim
          Collins
        </p>
      </div>
      <div className="carousel-slide">
        <img src="./caro2.jpg" alt="Slide 2" />
        <p className="legend">
          "Automation applied to an efficient operation will magnify
          the efficiency." - Bill Gates
        </p>
      </div>
      <div className="carousel-slide">
        <img src="./caro3.jpg" alt="Slide 3" />
        <p className="legend">
          "The only way to do great work is to love what you do." -
          Steve Jobs
        </p>
      </div>
    </Carousel>
  );
};

export default ImageCarousel;
