import React from "react";

import "/style.css";
import "./Home.css"

import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Welcome to</h1>
      <img src="images/Logo.png" alt="Logo" className="home-logo" />
      <div className="home-buttons">
        <Link to="/login" className="home-btn">Login</Link>
        <Link to="/signup" className="home-btn">Sign Up</Link>
      </div>
    </div>
  );
};

export default Home;