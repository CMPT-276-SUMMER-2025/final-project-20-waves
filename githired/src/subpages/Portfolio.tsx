import React, { useState, useEffect, useRef } from 'react';
import "../css/portfolio.css";

type EducationEntry = {
  university: string;
  major: string;
};

const MAX_EDUCATION_BLOCKS = 4;
const STORAGE_KEY = "educationData";

const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Education');
  const [formData, setFormData] = useState({
    name: '',
    birth: '',
    email: '',
    address: ''
  });

  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    setFormData({
      name: localStorage.getItem('name') || '',
      birth: localStorage.getItem('birth') || '',
      email: localStorage.getItem('email') || '',
      address: localStorage.getItem('address') || ''
    });
    setImage(localStorage.getItem('profileImage'));
  }, []);

  useEffect(() => {
    Object.entries(formData).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  }, [formData]);

  useEffect(() => {
    if (image) localStorage.setItem('profileImage', image);
  }, [image]);

  const handleChangeProfile = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

const [education, setEducation] = useState<EducationEntry[]>([
    { university: "", major: "" },
  ]);

  const handleChange = (
    index: number,
    field: keyof EducationEntry,
    value: string
  ) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
  };

  const addEducationBlock = () => {
    if (education.length < MAX_EDUCATION_BLOCKS) {
      setEducation([...education, { university: "", major: "" }]);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setEducation(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(education));
  }, [education]);

  
  return (
    <div className="wrapper">
      <div className="profile-container">
        <div>
          <img
            className="profile-img"
            src={image || '/default-profile.png'}
            alt="Profile"
            onClick={() => document.getElementById('fileInput')?.click()}
          />
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={onImageChange}
          />
        </div>

       <div className="profile-input">
  <input
    value={formData.name}
    onChange={e => handleChangeProfile('name', e.target.value)}
    placeholder="Name"
  />
  <input
    value={formData.birth}
    onChange={e => handleChangeProfile('birth', e.target.value)}
    placeholder="Birthdate"
  />
</div>
<div className="profile-input">
  <input
    value={formData.email}
    onChange={e => handleChangeProfile('email', e.target.value)}
    placeholder="Email"
  />
  <input
    value={formData.address}
    onChange={e => handleChangeProfile('address', e.target.value)}
    placeholder="Address"
  />
</div>
      </div>

      <div className="portfolio-container">
        <div className="tab-buttons">
          <button
            className={activeTab === 'Education' ? 'active' : ''}
            onClick={() => setActiveTab('Education')}
          >
            Education
          </button>
          <button
            className={activeTab === 'Projects' ? 'active' : ''}
            onClick={() => setActiveTab('Projects')}
          >
            Projects
          </button>
          <button
            className={activeTab === 'Skills summary' ? 'active' : ''}
            onClick={() => setActiveTab('Skills summary')}
          >
            Skills summary
          </button>
          <button
            className={activeTab === 'Work experience' ? 'active' : ''}
            onClick={() => setActiveTab('Work experience')}
          >
            Work experience
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'Education' &&
          <div>
             <div>
      <h2>Education</h2>
      {education.map((edu, index) => (
        <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="University Name"
            value={edu.university}
            onChange={(e) => handleChange(index, "university", e.target.value)}
          />
          <input
            type="text"
            placeholder="Major"
            value={edu.major}
            onChange={(e) => handleChange(index, "major", e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </div>
      ))}

      {education.length < MAX_EDUCATION_BLOCKS && (
        <button onClick={addEducationBlock}>+ Add Education</button>
      )}
    </div>
          </div>}

          {activeTab === 'Projects' && <div>content here</div>}
          {activeTab === 'Skills summary' && <div>content here</div>}
          {activeTab === 'Work experience' && <div>content here</div>}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
