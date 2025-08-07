/**
 * JobInfo component displays detailed information about a job,
 * including an AI-generated summary and interview questions.
 *
 * Props:
 * - job: Job object containing job details
 * - onClose: Function to close the component (not used here)
 *
 * State:
 * - aiSummary: Stores AI-generated job summary
 * - loading: Tracks loading state for summary fetch
 * - questions: Stores fetched interview questions
 * - questionsLoading: Loading state for questions fetch
 * - questionsError: Error message for questions fetch failure
 * - questionsVisible: Controls interview questions visibility
 *
 * Effects & Methods:
 * - useEffect triggers AI summary fetch on job change, resets questions state
 * - fetchInterviewQuestions fetches interview questions from backend API
 * - cleanSnippet removes HTML tags/entities from job snippet for safe display
 */

import React, { useEffect, useState } from "react";
import "./JobInfo.css";

interface Job {
  id: string;
  title: string;
  company: string;
  snippet?: string;
  link: string;
  salary?: string;
  location?: string;
}

interface JobInfoProps {
  job: Job;
  onClose: () => void;
}

const JobInfo: React.FC<JobInfoProps> = ({ job }) => {
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<string[] | null>(null);
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [questionsError, setQuestionsError] = useState<string | null>(null);
  const [questionsVisible, setQuestionsVisible] = useState(false);

  // Fetch AI-generated summary on job change and reset interview questions state
  useEffect(() => {
    async function fetchSummary() {
      setLoading(true);
      setAiSummary(null);

      try {
        const response = await fetch(
          "https://githired-ntxa.onrender.com/api/summarize",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ jobs: [job] }),
          }
        );
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        setAiSummary(data.summary);
      } catch {
        setAiSummary("Failed to load AI summary.");
      } finally {
        setLoading(false);
      }
    }

    setQuestions(null);
    setQuestionsVisible(false);
    setQuestionsError(null);

    fetchSummary();
  }, [job]);

  // Fetch interview questions from backend API
  const fetchInterviewQuestions = async () => {
    setQuestionsLoading(true);
    setQuestionsError(null);
    setQuestions(null);

    try {
      const res = await fetch(
        "https://githired-ntxa.onrender.com/api/interview-questions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ job }),
        }
      );
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      setQuestions(data.questions);
    } catch {
      setQuestionsError("Failed to load interview questions.");
    } finally {
      setQuestionsLoading(false);
    }
  };

  // Sanitize job snippet by removing HTML tags and entities
  const cleanSnippet = job.snippet
    ?.replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

  return (
    <div className="jobInfoWrapper">
      <div className="jobinfo-card">
        <h1>{job.title}</h1>
        <h2>{job.company}</h2>
        {job.location && (
          <p>
            <strong>Location:</strong> {job.location}
          </p>
        )}
        {job.salary && (
          <p>
            <strong>Salary:</strong> {job.salary}
          </p>
        )}
        {job.link && (
          <p>
            <strong>Job Link: </strong>
            <a href={job.link} target="_blank" rel="noopener noreferrer">
              View Job Posting
            </a>
          </p>
        )}

        {loading && <p>Loading AI summary...</p>}
        {!loading && aiSummary && (
          <p>
            <strong>AI Summary:</strong> {aiSummary}
          </p>
        )}
        {!loading && !aiSummary && <p>{cleanSnippet}</p>}
      </div>

      <div className="jobinfo-card">
        {!questionsVisible && (
          <button
            onClick={() => {
              setQuestionsVisible(true);
              fetchInterviewQuestions();
            }}
          >
            Generate Interview Questions
          </button>
        )}

        {questionsVisible && (
          <div style={{ marginTop: "1em" }}>
            <h3>Interview Questions</h3>
            {questionsLoading && <p>Loading interview questions...</p>}
            {questionsError && <p style={{ color: "red" }}>{questionsError}</p>}
            {questions && questions.length > 0 ? (
              <ul>
                {questions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            ) : (
              !questionsLoading && <p>No interview questions available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobInfo;
