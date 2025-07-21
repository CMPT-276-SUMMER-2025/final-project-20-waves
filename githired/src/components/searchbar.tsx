import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import './searchbar.css'

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = async (value) => {
    const response = await fetch("http://localhost:5000/api/jobs", {
      method: "POST", // <-- must be POST
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keywords: value, location: "Bern" }),
    });

    if (!response.ok) {
      console.error("Failed to fetch jobs:", response.statusText);
      setResults([]);
      return;
    }

    const data = await response.json();
    setResults(data.jobs || []);
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="search-bar">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
