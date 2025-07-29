import React, { useEffect, useState } from "react";
import "./JobInfo.css";

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
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSummary() {
      setLoading(true);
      setAiSummary(null); // reset previous summary

      try {
        const response = await fetch("http://localhost:5000/api/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobs: [job] }),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        setAiSummary(data.summary);
      } catch (error) {
        console.error("Error fetching AI summary:", error);
        setAiSummary("Failed to load AI summary.");
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, [job]);

  const cleanSnippet = job.snippet
    ?.replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

  return (
    <div className="jobinfo-overlay" onClick={onClose}>
      <div className="jobinfo-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h1>{job.title}</h1>
        <h2>{job.company}</h2>

        {loading && <p>Loading AI summary...</p>}

        {!loading && aiSummary && (
          <p>
            <strong>AI Summary:</strong> {aiSummary}
          </p>
        )}

        {!loading && !aiSummary && <p>{cleanSnippet}</p>}

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
