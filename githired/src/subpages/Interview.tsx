import React, { useState } from "react";
import "../css/style.css";
import CoverLetterH from '../components/CoverLetterH';
import PageWrapper from '../PageWrapper';

interface Job {
  id: string;
  title: string;
  company: string;
  snippet?: string;
  link: string;
}

const Interview: React.FC = () => {
  // example job, not currently used
  const exampleJob: Job = {
    id: "123",
    title: "Frontend Developer",
    company: "Tech Corp",
    snippet: "Develop user-facing features using React and TypeScript.",
    link: "https://example.com/job/123",
  };

  return (
    <PageWrapper>
      <div>
        <h1>Interview Questions Feature</h1>
        <CoverLetterH />
      </div>
    </PageWrapper>
  );
};

export default Interview;
