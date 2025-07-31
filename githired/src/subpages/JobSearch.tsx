import React from "react";
import "../css/style.css";

import { useState } from "react";
import { SearchBar } from "../components/searchbar";
import { SearchResultsList } from "../components/SearchResultsList";
import PageWrapper from '../PageWrapper';

import JobCard from "../components/JobCard";
import JobInfo from "../components/JobInfo";

const sampleJob = {
  id: "1",
  title: "Frontend Developer",
  company: "Tech Corp",
  snippet: "Build and maintain web apps using React.",
};

const JobSearch = () => {
  const [results, setResults] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState(null);

  // This function receives the clicked job and sets it as selected
  const handleCardClick = (job: any) => {
    setSelectedJob(job);
  };

  return (
    <PageWrapper>
    <div>
      <SearchBar setResults={setResults} />

      {results.length > 0 && (
        <SearchResultsList results={results} onJobClick={handleCardClick} />
      )}

      {selectedJob && (
        <JobInfo job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
    </PageWrapper>
  );
};

export default JobSearch;
