/**
 * NavBar component renders different navigation menus based on current URL path:
 *  - On homepage ('/'): shows links with icons to Job Search, Portfolio, and Cover Letter Helper pages
 *  - On other pages: shows a home logo linking back to homepage
 * Uses `useLocation` hook from react-router-dom to get current path.
 *
 * App component wraps the app with Router and defines Routes for:
 *  - '/' → Home component
 *  - '/job-search' → JobSearch component
 *  - '/portfolio' → Portfolio component
 *  - '/cover-letter' → CoverLetterH component
 */

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import JobSearch from "./subpages/JobSearch";
import Portfolio from "./subpages/Portfolio";
import CoverLetterH from "./subpages/CoverLetterH";
import Home from "./subpages/Home";

const NavBar: React.FC = () => {
  const location = useLocation();

  // Render navigation for homepage with links and icons to other pages
  if (location.pathname === "/") {
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
  }

  // Render minimal nav with home logo linking back to homepage for other routes
  return (
    <nav className="nav-container">
      <Link to="/">
        <img src="images/LogoBlack.png" alt="Home" className="logoImg" />
      </Link>
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
        <Route path="/cover-letter" element={<CoverLetterH />} />
      </Routes>
    </Router>
  );
};

export default App;
