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

  const [questions, setQuestions] = useState<string[] | null>(null);
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [questionsError, setQuestionsError] = useState<string | null>(null);

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

    async function fetchInterviewQuestions(){
      setQuestionsLoading(true);
      setQuestionsError(null);
      setQuestions(null);
    
      try {
        const res = await fetch("http://localhost:5000/api/interview-questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ job }),

        });

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
      
    }


    fetchSummary();
    fetchInterviewQuestions();

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

        {/* Interview Questions Section */}
        <div style={{ marginTop: "1em" }}>
          <h3>Interview Questions</h3>

          {questionsLoading && <p>Loading interview questions...</p>}

          {questionsError && (
            <p style={{ color: "red" }}>{questionsError}</p>
          )}

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
