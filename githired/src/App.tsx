import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import JobSearch from './subpages/JobSearch';
import Portfolio from './subpages/Portfolio';
import Interview from './subpages/Interview';
import Home from './subpages/Home';


const NavBar: React.FC = () => {
  const location = useLocation();

  if (location.pathname === '/') {
    return (
      <nav className="nav-links">
        <Link to="/job-search">JobSearch</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/interview">Interview</Link>
      </nav>
    );
  } else {
    return (
      <nav className="nav-links">
        <Link to="/">
          <img
            src="images/Logo.png"
            alt="Home"
            style={{ height: '100px' }}
          />
        </Link>
      </nav>
    );
  }
};

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job-search" element={<JobSearch />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/interview" element={<Interview />} />
      </Routes>
    </Router>
  );
};

export default App;