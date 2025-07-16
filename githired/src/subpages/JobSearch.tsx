import React from "react";
import "/style.css";

import { useState } from "react";
import { SearchBar } from "../components/searchbar";
import { SearchResultsList } from "../components/SearchResultsList";

const JobSearch = () => {
  const [results, setResults] = useState([]);

  return (
    <div>
      <SearchBar setResults={setResults} />
      {results && results.length > 0 && <SearchResultsList results={results} />}
      {/* Other JobSearch content here */}
    </div>
  );
};

export default JobSearch;
