import { useState } from "react";

import { SearchBar } from "./components/searchbar";
import { SearchResultsList } from "./components/SearchResultsList";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import JobSearch from "./subpages/JobSearch";
import Portfolio from "./subpages/Portfolio";
import Interview from "./subpages/Interview";

function App() {
  const [results, setResults] = useState([]);

  return (
    <Router>
      <div className="App">
        <div className="search-bar-container">
          <SearchBar setResults={setResults} />
          {results && results.length > 0 && (
            <SearchResultsList results={results} />
          )}
        </div>

        <nav>
          <Link to="/job-search">JobSearch</Link> | 
          <Link to="/portfolio">Portfolio</Link> | 
          <Link to="/interview">Interview</Link>
        </nav>

        <Routes>
          <Route path="/" element={<h1>Welcome to the Home Page</h1>} />
          <Route path="/job-search" element={<JobSearch />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/interview" element={<Interview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
