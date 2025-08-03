import React, { useEffect, useState } from "react";

interface Job {
  id: string;
  title: string;
  company: string;
  snippet?: string;
  link: string;
}

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

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

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
