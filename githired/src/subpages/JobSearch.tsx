/**
 * JobSearch component provides a job search interface with:
 *  - Inputs for keywords, location, salary, and search radius
 *  - Displays default jobs on first load
 *  - Shows a grid of JobCard components for search results
 *  - Displays detailed JobInfo for a selected job
 *
 * State:
 *  - results: array of fetched jobs
 *  - selectedJob: currently selected job for detailed view
 *  - hasSearched: boolean indicating if user has performed a search
 *  - keywords, location, salary, radius: input values for job filtering
 *
 * Effects:
 *  - Loads default jobs once on mount using fetchJobs
 *
 * Handlers:
 *  - handleCardClick: sets the selected job to show details
 *  - handleSearch: fetches jobs based on input filters and updates results
 */

import React, { useEffect, useState } from "react";
import "../css/style.css";
import "../css/JobSearch.css";

import PageWrapper from "../PageWrapper";
import JobCard from "../components/JobCard";
import JobInfo from "../components/JobInfo";
import { fetchJobs } from "../fetchJobs";

const JobSearch = () => {
  const [results, setResults] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [radius, setRadius] = useState("0");

  // Load default jobs on component mount
  useEffect(() => {
    const loadDefaultJobs = async () => {
      try {
        const jobs = await fetchJobs("software", "ontario", "0", "0"); // default filters
        setResults(jobs);
      } catch (error) {
        console.error("Error fetching default jobs:", error);
        setResults([]);
      }
    };

    loadDefaultJobs();
  }, []);

  // Sets the selected job for detailed info display
  const handleCardClick = (job: any) => {
    setSelectedJob(job);
  };

  // Fetch jobs based on search inputs and update results
  const handleSearch = async () => {
    try {
      const jobs = await fetchJobs(keywords, location, salary, radius);
      setResults(jobs);
      setHasSearched(true);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setResults([]);
    }
  };

  return (
    <PageWrapper>
      <div className="wrapper1">
        <div>
          {/* Search inputs for filtering jobs */}
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
          {/* Display grid of job cards */}
          <div className="grid-container">
            {results.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onClick={() => handleCardClick(job)}
              />
            ))}
          </div>

          {/* Show detailed info or no results message */}
          <div className="jobInfo-section">
            {hasSearched && results.length === 0 && (
              <p style={{ padding: "1rem", color: "red" }}>
                No jobs found. Please try different keywords.
              </p>
            )}
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
