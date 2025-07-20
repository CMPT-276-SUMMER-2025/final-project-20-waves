import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="search-results-list">
      {results.map((job) => (
        <SearchResult key={job.id} result={job} />
      ))}
    </div>
  );
};
