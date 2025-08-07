/**
 * JobCard component displays a brief overview of a job posting.
 *
 * Props:
 * - job: Job object containing id, title, company, optional snippet, and link.
 * - onClick: Optional callback triggered when the card is clicked.
 *
 * State:
 * - saved: Boolean flag indicating if the job is saved (currently unused).
 *
 * Behavior:
 * - Cleans job snippet by stripping HTML tags and replacing HTML entities before display.
 * - Displays job title, company name, and cleaned snippet or fallback text.
 * - Calls onClick handler when the card is clicked.
 */

import React, { useState } from "react";
import "./JobCard.css";

// Job data structure
interface Job {
  id: string;
  title: string;
  company: string;
  snippet?: string;
  link: string;
  location?: string;
  salary?: string;
}

interface JobCardProps {
  job: Job;
  onClick?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const [saved, setSave] = useState(false);

  // Clean snippet text by removing HTML tags and replacing non-breaking spaces
  const cleanSnippet = job.snippet
    ?.replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

  return (
    <div className="single-card" onClick={onClick}>
      <h2>{job.title}</h2>
      <h3>{job.company}</h3>
      <h4>{job.location || "Location not specified"}</h4>
      <h4>{job.salary ? `$${job.salary}` : "Salary not specified"}</h4>
      <p>{cleanSnippet || "No description available."}</p>
    </div>
  );
};

export default JobCard;
