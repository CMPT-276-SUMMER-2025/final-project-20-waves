import React, { useState } from "react";
import "../css/style.css";
import "../css/JobSearch.css";

import PageWrapper from '../PageWrapper';
import JobCard from "../components/JobCard";
import JobInfo from "../components/JobInfo";
import { fetchJobs } from "../fetchJobs";

interface SearchBarProps {
  setResults: (jobs: any[]) => void;
}

const JobSearch = () => {
  const [results, setResults] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [hasSearched, setHasSearched] = useState(false); // New state

  const handleCardClick = (job: any) => {
    setSelectedJob(job);
  };

  const handleResultsUpdate = (jobs: any[]) => {
    console.log("Jobs received:", jobs);
    if (jobs.length === 0) {
      console.log("The jobs array is EMPTY!");
    } else {
      console.log(`The jobs array has ${jobs.length} items.`);
    }
    setResults(jobs);
    setHasSearched(true);
  };

  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [radius, setRadius] = useState("0");

  const handleSearch = async () => {
    try {
      const jobs = await fetchJobs(
        keywords,
        location,
        salary,
        radius
      );
      setResults(jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setResults([]);
    }
  };


  return (
    <PageWrapper>
      <div className="wrapper1">
        <div>
          {/* Search bar component - updates job results on search */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <input
              type="number"
              placeholder="Minimum Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
            <select value={radius} onChange={(e) => setRadius(e.target.value)}>
              <option value="0">Any distance</option>
              <option value="4">4 km</option>
              <option value="8">8 km</option>
              <option value="16">16 km</option>
              <option value="26">26 km</option>
              <option value="40">40 km</option>
              <option value="80">80 km</option>
            </select>
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
        <div className="jobsearch-container">

          {/* Grid container showing all job cards */}
          <div className="grid-container">
            {results.map((job) => (
              <JobCard key={job.id} job={job} onClick={() => handleCardClick(job)} />
            ))}
          </div>
          <div className="jobInfo-section">
            {/* Show message if user has searched but no jobs were found */}
            {hasSearched && results.length === 0 && (
              <p style={{ padding: "1rem", color: "red" }}>No jobs found. Please try different keywords.</p>
            )}

            {/* Show detailed job info when a job is selected */}
            {selectedJob && (
              <JobInfo job={selectedJob} onClose={() => setSelectedJob(null)} />
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default JobSearch;

