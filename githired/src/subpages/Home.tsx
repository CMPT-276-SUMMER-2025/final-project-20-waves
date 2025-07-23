import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../css/Home.css";

const images = [
  '/images/Home1.png',
  '/images/Home2.png',
  '/images/Home3.jpg',
];

const cardsData = [
  {
    id: 1,
    image: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Card+1",
    title: "Job Search",
    description: "This is the second card description.",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/150/00FF00/FFFFFF?text=Card+2",
    title: "Portfolio",
    description: "This is the second card description.",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Card+3",
    title: "Interview",
    description: "This is the third card description.",
  },
];

const Home: React.FC = () => {
  const [bgIndex, setBgIndex] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  // Rotate background images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Rotate cards every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % cardsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div>
      {/* Background Images */}
      <div className="background-rotator">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            className={`bg-image ${index === bgIndex ? 'visible' : ''}`}
            alt={`background-${index}`}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="home-container">
        <img src="/images/Logo.png" alt="Logo" className="home-logo" />
        <div>
          <Link to="/login" className="home-btn">Login</Link>
          <Link to="/signup" className="home-btn">Sign Up</Link>
        </div>
      </div>

      {/* Card Slider */}
      <div className="card-slider-container">
        {cardsData.map((card, index) => (
          <div
            key={card.id}
            className={`card-slide ${
              index === currentIndex ? "active" : index === prevIndex ? "exit" : ""
            }`}
          >
            <img
              src={card.image}
              alt={card.title}
            />
            <div className="card-slide-content">
                <h2>{card.title}</h2>
                <p>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
