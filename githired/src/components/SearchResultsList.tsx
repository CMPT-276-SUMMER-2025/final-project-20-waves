import JobCard from "./JobCard";
import "./SearchResultsList.css";

export const SearchResultsList = ({ results, onJobClick }) => {
  return (
    <div className="search-results-list grid-container">
      {results.map((job) => (
        <JobCard key={job.id} job={job} onClick={() => onJobClick(job)} />
      ))}
    </div>
  );
};
