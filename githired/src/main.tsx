import './index.css';
import './style.css';

import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import JobCard from './components/JobCard';
import JobInfo from './components/JobInfo';

const sampleJob = {
  id: '1',
  title: 'Frontend Developer',
  company: 'Tech Corp',
};

function MainApp() {
  const [selectedJob, setSelectedJob] = useState<typeof sampleJob | null>(null);

  const handleCardClick = () => {
    setSelectedJob(selectedJob ? null : sampleJob);
  };
  return (
    <div className="job-left">
      <JobCard job={sampleJob} onClick={handleCardClick } />
      {selectedJob && <JobInfo onClose={() => setSelectedJob(null)} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);
