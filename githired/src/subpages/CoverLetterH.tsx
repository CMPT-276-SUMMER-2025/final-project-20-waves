/**
 * CoverLetterH component allows users to input a job description and cover letter,
 * then sends them to the backend for AI-generated feedback.
 *
 * State:
 *  - jobDescription: string input for the job description
 *  - coverLetter: string input for the user's cover letter
 *  - feedback: string containing AI feedback or error messages
 *  - loading: boolean indicating whether feedback request is in progress
 *
 * handleSubmit:
 *  - Validates inputs are not empty
 *  - Sends POST request with jobDescription and coverLetter as JSON
 *  - Updates feedback state with response or error messages
 *  - Manages loading state during async operation
 */
import React, { useState } from "react";
import "../css/CoverLetterH.css";
import PageWrapper from "../PageWrapper";

const CoverLetterH: React.FC = () => {
  const [coverLetter, setCoverLetter] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Validate required inputs
    if (!jobDescription || !coverLetter) {
      setFeedback(
        "❌ Please provide both a job description and a cover letter."
      );
      return;
    }

    setLoading(true);
    setFeedback("");

    try {
      // Send jobDescription and coverLetter to API for feedback
      const response = await fetch("/api/cover-letter-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription, coverLetter }),
      });

      const data = await response.json();

      // Update feedback with AI response or error message
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
    <PageWrapper>
      <div>
        <div className="cl-wrapper">
          <div className="input-container">
            <h1>Job Description</h1>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here"
              className="cl-textarea"
            />

            <h1 style={{ marginTop: "70px" }}>Cover Letter</h1>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Paste your cover letter here"
              className="cl-textarea"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="cl-button"
            >
              {loading ? "Analyzing..." : "Get Feedback"}
            </button>
          </div>

          <div className="feedback-container">
            {feedback ? (
              <div className="cl-feedback">
                <h3>AI Feedback:</h3>
                <pre>{feedback}</pre>
              </div>
            ) : (
              <div>
                <img
                  className="chatbot-img"
                  src={"/images/chatbot.png"}
                  alt="chatbot-img"
                  style={{ height: "500px", width: "500px", opacity: "0.15" }}
                />
                <p>
                  Please submit your cover letter and job description to receive
                  feedback.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default CoverLetterH;
