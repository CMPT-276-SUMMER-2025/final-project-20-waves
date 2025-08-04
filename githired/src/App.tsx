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
      <nav className="nav-container">
        <div className="nav-elements">
          <img src="/images/search.png" alt="Logo" className="nav-img" />
          <Link to="/job-search">JobSearch</Link>
        </div>
        <div className="nav-elements">
          <img src="/images/folder.png" alt="Logo" className="nav-img" />
          <Link to="/portfolio">Portfolio</Link>
        </div>
        <div className="nav-elements">
          <img src="/images/interview.png" alt="Logo" className="nav-img" /> 
          <Link to="/cover-letter">Cover Letter Helper</Link>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="nav-container">
        <Link to="/">
          <img
            src="images/LogoBlack.png"
            alt="Home"
            className="logoImg"
          />
        </Link>
      </nav>
    );
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

};

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job-search" element={<JobSearch />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/cover-letter" element={<Interview />} />
      </Routes>
    </Router>
  );
};

export default App;