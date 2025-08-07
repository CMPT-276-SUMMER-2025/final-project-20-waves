/**
 * InterviewQuestions component fetches and displays interview questions for a given job.
 *
 * Props:
 * - job: Job object containing job details (id, title, company, snippet, link).
 * - onClose: Callback function to close the interview questions overlay.
 *
 * State:
 * - questions: Array of fetched interview questions or null if not loaded.
 * - loading: Boolean indicating if questions are currently being fetched.
 * - error: Error message string or null if no error.
 *
 * Behavior:
 * - On mount or when `job` prop changes, fetches interview questions from backend API.
 * - Displays loading state, error messages, or the list of questions.
 * - Clicking outside the questions card or on close button triggers onClose callback.
 */

import React, { useEffect, useState } from "react";

// Job type definition
interface Job {
  id: string;
  title: string;
  company: string;
  snippet?: string;
  link: string;
}

// Props: selected job and close handler
interface InterviewQuestionsProps {
  job: Job;
  onClose: () => void;
}

const InterviewQuestions: React.FC<InterviewQuestionsProps> = ({
  job,
  onClose,
}) => {
  const [questions, setQuestions] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch interview questions when component mounts or job changes
  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      setError(null);
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
      } catch (err) {
        console.error(err);
        setError("Failed to load interview questions.");
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [job]);

  return (
    <div className="interview-questions-overlay" onClick={onClose}>
      {/* Prevent closing when clicking inside the card */}
      <div
        className="interview-questions-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Interview Questions for: {job.title}</h2>

        {loading && <p>Loading questions...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {questions && (
          <ul>
            {questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InterviewQuestions;
