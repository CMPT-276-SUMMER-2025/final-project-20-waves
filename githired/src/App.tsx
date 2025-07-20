import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';

import JobSearch from './subpages/JobSearch';
import Portfolio from './subpages/Portfolio';
import Interview from './subpages/Interview';

function AppContent() {
  const location = useLocation();
  const showImage = location.pathname !== '/';

  return (
    <div className="App">
      {showImage && (
        <div>
          <Link to="/">
            <img
              src="images/Logo.png"
              alt="Go to Home"
              style={{ width: '100px', cursor: 'pointer' }}
            />
          </Link>
        </div>
      )}

      {location.pathname === '/' && (
        <nav>
          <Link to="/job-search">JobSearch</Link> |{' '}
          <Link to="/portfolio">Portfolio</Link> |{' '}
          <Link to="/interview">Interview</Link>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<h1>Welcome to the Home Page</h1>} />
        <Route path="/job-search" element={<JobSearch />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/interview" element={<Interview />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;