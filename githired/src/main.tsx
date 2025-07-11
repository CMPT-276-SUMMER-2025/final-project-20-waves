import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import './index.css';
import JobCard from './components/JobCard';

const sampleJob = {
  id: '1',
  title: 'Frontend Developer',
  company: 'Tech Corp',
};

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <JobCard job={sampleJob} />
  </React.StrictMode>
);
