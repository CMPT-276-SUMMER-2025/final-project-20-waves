import React, { useState } from 'react';
import './JobCard.css';

interface Job{
    id: string;
    title: string;
    company: string;
    snippet: string;
}

interface JobCardProps {
    job: Job;
    onClick?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
    const [saved, setSave] = useState(false);
    
    return (
        <div className="job-card" style={{ caretColor: 'transparent' }}>
            <div className="single-card" onClick={onClick}>
                <h2>{job.title}</h2>
                <h3>{job.company}</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing 
                    elit. Quisque faucibus ex sapien vitae pellentesque 
                    sem placerat. In id cursus mi pretium tellus duis 
                    convallis. Tempus leo eu aenean sed diam urna tempor. 
                    Pulvinar vivamus fringilla lacus nec metus bibendum egestas. 
                    Iaculis massa nisl malesuada.</p>
                <button onClick={e => { e.stopPropagation(); setSave(!saved) }}>
                    {saved ? 'Unsave' : 'Save'}
                </button>
            </div>
            <div className="single-card" onClick={onClick}>
                <h2>{job.title}</h2>
                <h3>{job.company}</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing 
                    elit. Quisque faucibus ex sapien vitae pellentesque 
                    sem placerat. In id cursus mi pretium tellus duis 
                    convallis. Tempus leo eu aenean sed diam urna tempor. 
                    Pulvinar vivamus fringilla lacus nec metus bibendum egestas. 
                    Iaculis massa nisl malesuada.</p>
                <button onClick={e => { e.stopPropagation(); setSave(!saved) }}>
                    {saved ? 'Unsave' : 'Save'}
                </button>
            </div>
        </div>
        
        
    );
};

export default JobCard;

