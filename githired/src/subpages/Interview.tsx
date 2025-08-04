import React, { useState } from "react";
import "../css/style.css";
import InterviewQuestions from "../components/InterviewQuestions";
import PageWrapper from '../PageWrapper';
import CoverLetterH from '../components/CoverLetterH'

interface Job {
  id: string;
  title: string;
  company: string;
  snippet?: string;
  link: string;
}

const Interview: React.FC = () => {
  // For demo, hardcode or fetch a job object here.
  // Later, you can make this dynamic or accept props/route params.
  const exampleJob: Job = {
    id: "123",
    title: "Frontend Developer",
    company: "Tech Corp",
    snippet: "Develop user-facing features using React and TypeScript.",
    link: "https://example.com/job/123",
  };

  const [showQuestions, setShowQuestions] = useState(false);

  const openInterviewQuestions = () => {
    setShowQuestions(true);
  };

  const closeInterviewQuestions = () => {
    setShowQuestions(false);
  };

  return (
    <PageWrapper>
    <div>
      <h1>Interview Questions Feature</h1>
        const CoverLetterH();
    </div>
    </PageWrapper>
  );
};

export default Interview;
