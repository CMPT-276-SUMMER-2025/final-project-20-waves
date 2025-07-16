import React, { useState } from 'react';
import './JobInfo.css'

interface JobInfoProps {
  onClose: () => void;
}

const JobInfo: React.FC<JobInfoProps> = ({ onClose }) => {
  return (
    <div className="jobinfo-blank" onClick={onClose}>
        <p>dasfoiuasjfiuoashfjiasuohfaisufh</p>
    </div>
  );
};

export default JobInfo;