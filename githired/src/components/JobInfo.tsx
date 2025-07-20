import React from 'react';
import './JobInfo.css';

interface Job {
  id: string | number;
  title: string;
  company: string;
  snippet?: string;
  // Add other fields from your API here, e.g. description, location, etc.
  description?: string;
  location?: string;
}

interface JobInfoProps {
  job: Job;
  onClose: () => void;
}

const JobInfo: React.FC<JobInfoProps> = ({ job, onClose }) => {
  // Stop click inside details from closing
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="jobinfo-overlay" onClick={onClose}>
      <div className="jobinfo-content" onClick={handleContentClick}>
        <button className="close-btn" onClick={onClose}>Close ×</button>
        <h2>{job.title}</h2>
        <h3>{job.company}</h3>
        <p><strong>Location:</strong> {job.location || 'N/A'}</p>
        <p>{job.description || job.snippet || 'No description available.'}</p>
      </div>
    </div>
  );
};

export default JobInfo;
