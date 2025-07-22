import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../css/Home.css"

const images = [
  '/images/Home1.png',
  '/images/Home2.png',
  '/images/Home3.jpg',
];

const Home: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change every 5 seconds
      return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="background-rotator">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            className={`bg-image ${index === currentIndex ? 'visible' : ''}`}
            alt={`background-${index}`}
          />
        ))}
      </div>

      <div className="home-container">
        <h1>Welcome to</h1>
        <img src="/images/Logo.png" alt="Logo" className="home-logo" />
        <div className="home-buttons">
          <Link to="/login" className="home-btn">Login</Link>
          <Link to="/signup" className="home-btn">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;