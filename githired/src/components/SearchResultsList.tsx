import JobCard from "./JobCard";

export const SearchResultsList = ({ results, onJobClick }) => {
  return (
    <div className="search-results-list">
      {results.map((job) => (
        <JobCard key={job.id} job={job} onClick={() => onJobClick(job)} />
      ))}
    </div>
  );
};
