import React, { useState } from "react";
import "./Carousel.css"; // Import the CSS file for styles

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 5 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 5 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-row space-x-5 carousel-container">
      <div className="carousel">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 20}%)` }}
        >
          {images.map((src, index) => (
            <div key={index} className="carousel-item">
              <img src={src} alt={`Carousel ${index}`} />
            </div>
          ))}
        </div>
        <button className="carousel-button left" onClick={handlePrev}>
          ◄
        </button>
        <button className="carousel-button right" onClick={handleNext}>
          ►
        </button>
      </div>
    </div>
  );
};

export default Carousel;
