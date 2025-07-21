import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import JobSearch from './subpages/JobSearch';
import Portfolio from './subpages/Portfolio';
import Interview from './subpages/Interview';
import Home from './subpages/Home';

const NavBar: React.FC = () => {
  const location = useLocation();
    return (
      <nav className="nav-links">
        <Link to="/">
          <img
            src="images/Logo.png"
            alt="Home"
          />
        </Link>
        <div className="nav-link-text">
          <Link to="/job-search">Job Search</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/interview">Interview</Link>
        </div>
        
      </nav>
    );
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