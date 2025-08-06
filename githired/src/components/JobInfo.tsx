import React, { useEffect, useState } from "react";
import "./JobInfo.css";

interface Job {
  id: string;
  title: string;
  company: string;
  snippet?: string;
  link: string;
  salary: string;
  location: string;
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

    // Reset interview questions state on job change
    setQuestions(null);
    setQuestionsVisible(false);
    setQuestionsError(null);

    fetchSummary();
  }, [job]);

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

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      setQuestions(data.questions);
    } catch (err) {
      console.error("Error fetching interview questions:", err);
      setQuestionsError("Failed to load interview questions.");
    } finally {
      setQuestionsLoading(false);
    }
  };

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
