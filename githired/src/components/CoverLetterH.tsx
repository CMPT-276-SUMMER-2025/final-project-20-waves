import React, { useState } from "react";
import "./CoverLetterH.css"

const CoverLetterH: React.FC = () => {
  const [jobTitle, setJobTitle] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(e.target.value);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <label htmlFor="job-title">Job Title:</label>
      <input
        type="text"
        id="job-title"
        value={jobTitle}
        onChange={handleChange}
        placeholder="Enter job title..."
        className ="cl-box"
      />
    </div>
  );
};

export default CoverLetterH;