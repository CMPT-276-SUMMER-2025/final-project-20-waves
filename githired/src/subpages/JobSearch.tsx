import React from "react";
import "/style.css";

import { useState } from "react";
import { SearchBar } from "../components/searchbar";
import { SearchResultsList } from "../components/SearchResultsList";

import JobCard from '../components/JobCard';
import JobInfo from '../components/JobInfo';

const sampleJob = {
  id: '1',
  title: 'Frontend Developer',
  company: 'Tech Corp',
  snippet: 'Build and maintain web apps using React.',
};

const JobSearch = () => {
  const [results, setResults] = useState([]);
  const [selectedJob, setSelectedJob] = useState<typeof sampleJob | null>(null);

  const handleCardClick = () => {
    setSelectedJob(selectedJob ? null : sampleJob);
  };

return (
  <>
    <div>
      <SearchBar setResults={setResults} />
      {results && results.length > 0 && <SearchResultsList results={results} />}
      {/* Other JobSearch content here */}
    </div>

    <div className="job-left">
      <JobCard job={sampleJob} onClick={handleCardClick} />
      {selectedJob && <JobInfo onClose={() => setSelectedJob(null)} />}
    </div>
  </>
);

};

export default JobSearch;
