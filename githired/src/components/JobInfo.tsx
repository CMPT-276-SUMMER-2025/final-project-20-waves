import React from 'react';
import './JobInfo.css';

interface Job {
  id: string;
  title: string;
  company: string;
  snippet?: string;
  link: string;
}

interface JobInfoProps {
  job: Job;
  onClose: () => void;
}

const JobInfo: React.FC<JobInfoProps> = ({ job, onClose }) => {
  const stopClick = (e: React.MouseEvent) => e.stopPropagation();

  const cleanSnippet = job.snippet
  ?.replace(/<[^>]+>/g, "")        // remove HTML tags like <b>
  .replace(/&nbsp;/g, " ")         // convert &nbsp; to regular space
  .trim();

  return (
    <div className="jobinfo-overlay" onClick={onClose}>
      <div className="jobinfo-card" onClick={stopClick}>
        <button className="close-button" onClick={onClose}>×</button>
        <h1>{job.title}</h1>
        <h2>{job.company}</h2>
        <p>{cleanSnippet}</p>
        <a
          href={job.link}
          target="_blank"
          rel="noopener noreferrer"
          className="external-link-button"
        >
          View Full Job Posting
        </a>
      </div>
    </div>
  );
};

export default JobInfo;
