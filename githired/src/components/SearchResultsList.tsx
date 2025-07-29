import JobCard from "./JobCard";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="search-results-list">
      {results.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};
