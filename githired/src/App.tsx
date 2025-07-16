import React from 'react';
import { useState } from "react";

import { SearchBar } from "./components/searchbar";
import { SearchResultsList } from "./components/SearchResultsList";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import JobSearch from "./subpages/JobSearch";
import Portfolio from "./subpages/Portfolio";
import Interview from "./subpages/Interview";
import ReactDOM from 'react-dom/client';
import JobCard from './components/JobCard';
import JobInfo from './components/JobInfo';

const sampleJob = {
  id: '1',
  title: 'Frontend Developer',
  company: 'Tech Corp',
};

function AppContent() {
  const [results, setResults] = useState([]);
  const [selectedJob, setSelectedJob] = useState<typeof sampleJob | null>(null);

  const handleCardClick = () => {
    setSelectedJob(selectedJob ? null : sampleJob);
  };
  return (
    <Router>
      <div className="App">
        <div className="search-bar-container">
          <SearchBar setResults={setResults} />
          {results && results.length > 0 && (
            <SearchResultsList results={results} />
          )}
        </div>
      )}

      {location.pathname === "/" && (
        <nav>
          <Link to="/job-search">JobSearch</Link> |{" "}
          <Link to="/portfolio">Portfolio</Link> |{" "}
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
      <div className="job-left">
      <JobCard job={sampleJob} onClick={handleCardClick } />
      {selectedJob && <JobInfo onClose={() => setSelectedJob(null)} />}
    </div>
    </Router>
  );
}
