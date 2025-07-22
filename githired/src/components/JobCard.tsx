import React, { useState } from 'react';
import './JobCard.css';

interface Job {
  id: string;
  title: string;
  company: string;
  snippet?: string;
  link: string;
}

interface JobCardProps {
  job: Job;
  onClick?: () => void;
}



const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const [saved, setSave] = useState(false);

  const cleanSnippet = job.snippet
  ?.replace(/<[^>]+>/g, "")        // remove HTML tags like <b>
  .replace(/&nbsp;/g, " ")         // convert &nbsp; to regular space
  .trim();

  return (
    <div className="job-card" style={{ caretColor: 'transparent' }}>
      <div className="single-card" onClick={onClick}>
        <h2>{job.title}</h2>
        <h3>{job.company}</h3>
        <p>{cleanSnippet || "No description available."}</p>

      </div>
    </div>
  );
};

export default JobCard;
