import React, { useState } from 'react';

interface Job{
    id: string;
    title: string;
    company: string;

}

interface JobCardProps {
    job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    const [saved, setSave] = useState(false);
    
    return (
        <div className="job-card"
        style={{ caretColor: 'transparent' }}>
            <h2>{job.title}</h2>
            <h3>{job.company}</h3>
            <button onClick={() => setSave(!saved)}>
                {saved ? 'Unsave' : 'Save'}
            </button>
        </div>
    );
};

export default JobCard;

