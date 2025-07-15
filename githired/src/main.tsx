import './index.css';
import './style.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import JobCard from './components/JobCard';

const sampleJob = {
  id: '1',
  title: 'Frontend Developer',
  company: 'Tech Corp',
};

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <div className="job-left">
      {/* Left side: JobCard */}
        <JobCard job={sampleJob} />

      {/* Right side: empty */}
    </div>
  </React.StrictMode>
);
