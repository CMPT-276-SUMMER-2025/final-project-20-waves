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
  const [results, setResults] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<typeof sampleJob | null>(null);

  const handleCardClick = () => {
    setSelectedJob(selectedJob ? null : sampleJob);
  };

return (
  <>
    <div>
      <SearchBar setResults={setResults} />

    </div>

  <div className="job-left">
    {results.map((job) => (
      <JobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />
    ))}
    {selectedJob && <JobInfo job={selectedJob} onClose={() => setSelectedJob(null)} />}
  </div>

  </>
);

};

export default JobSearch;
