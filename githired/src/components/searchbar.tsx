import { useState } from "react";
import './searchbar.css'

type SearchBarProps = {
  setResults: (results: any[]) => void;
};

export const SearchBar = ({ setResults }: SearchBarProps) => {
  const [input, setInput] = useState("");
    const [location, setLocation] = useState(""); 

  const fetchData = async (value, locationValue) => {
    const response = await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keywords: value, location: locationValue }),
    });

    if (!response.ok) {
      console.error("Failed to fetch jobs:", response.statusText);
      setResults([]);
      return;
    }

    const data = await response.json();
    setResults(data.jobs || []);
  };

  const handleSearch = () => {
    fetchData(input, location);
  };

  return (
    <div className="search-bar">
      <input
        placeholder="Keyword (e.g., frontend developer)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <input
        placeholder="Location (e.g., Vancouver)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;