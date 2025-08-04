import React, { useState } from "react";
import "./CoverLetterH.css";

const CoverLetterH: React.FC = () => {
  const [coverLetter, setCoverLetter] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setFeedback("");

    try {
      const response = await fetch("/api/cover-letter-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobDescription, coverLetter }),
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback(data.feedback);
      } else {
        setFeedback("❌ Failed to get feedback. " + data.error);
      }
    } catch (error) {
      console.error(error);
      setFeedback("❌ An error occurred while contacting the server.");
    }

    setLoading(false);
  };

  return (
    <div className="cl-container">
      <h2>Cover Letter Helper</h2>

      <label>Job Description:</label>
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste the job description here"
        className="cl-textarea"
      />

      <label>Your Cover Letter:</label>
      <textarea
        value={coverLetter}
        onChange={(e) => setCoverLetter(e.target.value)}
        placeholder="Paste your cover letter here"
        className="cl-textarea"
      />

      <button onClick={handleSubmit} disabled={loading} className="cl-button">
        {loading ? "Analyzing..." : "Get Feedback"}
      </button>

      {feedback && (
        <div className="cl-feedback">
          <h3>AI Feedback:</h3>
          <pre>{feedback}</pre>
        </div>
      )}
    </div>
  );
};

export default CoverLetterH;
