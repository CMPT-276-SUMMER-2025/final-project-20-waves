import { useState } from "react";
import './searchbar.css'

type SearchBarProps = {
  setResults: (results: any[]) => void;
};

export const SearchBar = ({ setResults }: SearchBarProps) => {
  const [input, setInput] = useState("");

  const fetchData = async (value: string) => {
    const response = await fetch("http://localhost:5000/api/jobs", {
      method: "POST",
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

  const handleChange = (value: string) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="search-bar">
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