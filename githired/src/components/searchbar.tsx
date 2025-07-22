import React, { useState } from "react";
import { fetchJobs } from "../fetchJobs";

interface SearchBarProps {
  setResults: (jobs: any[]) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ setResults }) => {
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [radius, setRadius] = useState("0");

  const handleSearch = async () => {
    try {
      const jobs = await fetchJobs(
        keywords,
        location,
        salary,
        radius
      );
      setResults(jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setResults([]);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Keywords"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="number"
        placeholder="Minimum Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />
      <select value={radius} onChange={(e) => setRadius(e.target.value)}>
        <option value="0">Any distance</option>
        <option value="4">4 km</option>
        <option value="8">8 km</option>
        <option value="16">16 km</option>
        <option value="26">26 km</option>
        <option value="40">40 km</option>
        <option value="80">80 km</option>
      </select>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};
