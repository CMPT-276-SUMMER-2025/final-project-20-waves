import React from "react";
<<<<<<< HEAD
import "../css/style.css";
=======

import "./Home.css"

>>>>>>> 021408c4cd9f9a7689106742486918af4f57e259
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