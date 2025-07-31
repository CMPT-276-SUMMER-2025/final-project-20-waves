import React, { useState, useEffect, useRef } from 'react';
import "../css/portfolio.css";
import PageWrapper from '../PageWrapper';

type EducationEntry = {
  university: string;
  major: string;
};

type ProjectEntry = {
  projectName: string;
  role: string;
  codeLanguage: string;
};

type ExperienceEntry = {
  jobTitle: string;
  companyName: string;
  companyAddress: string;
  dateStart: string;
  dateEnd: string;
  workType: "Contract" | "Full-Time";
};

const codeLanguages = [
  "JavaScript",,
  "Python",
  "C/C++",
  "Go",
  "Ruby",
  "Other"
];

const role = [
  "Full Stack Developer",,
  "Frontend developer",
  "Backend Developer",
  "UX designer",
  "DevOps Engineer",
];

const MAX_PROJECT_BLOCKS = 4;
const MAX_EDUCATION_BLOCKS = 4;
const MAX_EXPERIENCE_BLOCKS = 3;

const EDU_STORAGE_KEY = "educationData";
const PROJECT_STORAGE_KEY = "projectsData";
const EXPERIENCE_STORAGE_KEY = "experienceData";


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


  {/* Education section */}

  //initializes the education state as an array with one object
  const [education, setEducation] = useState<EducationEntry[]>([ 
    { university: "", major: "" },
  ]);

  //allows the user to edit a specific field at a specific index.
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

  const deleteEducationBlock = (index: number) => {
    const updated = education.filter((_, i) => i !== index);
    setEducation(updated);
  };

  useEffect(() => {
    const saved = localStorage.getItem(EDU_STORAGE_KEY);
    if (saved) {
      setEducation(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(EDU_STORAGE_KEY, JSON.stringify(education));
  }, [education]);


  {/* Project section */}

  const [projects, setProjects] = useState<ProjectEntry[]>([
    { projectName: "", role: "", codeLanguage: "" }
  ]);

  const handleProjectChange = (
    index: number,
    field: keyof ProjectEntry,
    value: string
  ) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };

  const addProjectBlock = () => {
    if (projects.length < MAX_PROJECT_BLOCKS) {
      setProjects([...projects, { projectName: "", role: "", codeLanguage: "" }]);
    }
  };

  const deleteProjectBlock = (index: number) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
  };

  useEffect(() => {
    const saved = localStorage.getItem(PROJECT_STORAGE_KEY);
    if (saved) {
      setProjects(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);


  {/* Experience section */}

  const [experience, setExperience] = useState<ExperienceEntry[]>([
    {
      jobTitle: "",
      companyName: "",
      companyAddress: "",
      dateStart: "",
      dateEnd: "",
      workType: "Full-Time",
    },
  ]);
    
  const handleExperienceChange = <K extends keyof ExperienceEntry>(
    index: number,
    field: K,
    value: ExperienceEntry[K]
  ) => {
    const updated = [...experience];
    updated[index][field] = value;
    setExperience(updated);
  };


  const addExperienceBlock = () => {
    if (experience.length < MAX_EXPERIENCE_BLOCKS) {
      setExperience([
        ...experience,
        {
          jobTitle: "",
          companyName: "",
          companyAddress: "",
          dateStart: "",
          dateEnd: "",
          workType: "Full-Time",
        },
      ]);
    }
  };

  const deleteExperienceBlock = (index: number) => {
    const updated = experience.filter((_, i) => i !== index);
    setExperience(updated);
  };

  useEffect(() => {
    const saved = localStorage.getItem(EXPERIENCE_STORAGE_KEY);
    if (saved) {
      setExperience(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(EXPERIENCE_STORAGE_KEY, JSON.stringify(experience));
  }, [experience]);

  
  return (
    <PageWrapper>
    <div className="wrapper">
      <div className="profile-container">
        <div>
          <img
            className="profile-img"
            src={image || '/images/profile.png'}
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
                {education.map((edu, index) => (
                  <div key={index} className="inputBox">
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
                    />
                    <button onClick={() => deleteEducationBlock(index)} className="deleteButton">
                      Delete
                    </button>
                  </div>
                ))}

                {education.length < MAX_EDUCATION_BLOCKS && (
                  <button onClick={addEducationBlock} className="addButton">+ Add</button>
                )}
                
             </div>
          </div>}

          {activeTab === 'Projects' && 
          <div>
            <div>
              {projects.map((proj, index) => (
                <div key={index} className="inputBox">
                  <input
                    type="text"
                    placeholder="Project Name"
                    value={proj.projectName}
                    onChange={(e) => handleProjectChange(index, "projectName", e.target.value)}
                  />
                  <select
                    value={proj.codeLanguage}
                    onChange={(e) => handleProjectChange(index, "role", e.target.value)}
                  >
                    <option value="">Role</option>
                    {codeLanguages.map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                  <select
                    value={proj.codeLanguage}
                    onChange={(e) => handleProjectChange(index, "codeLanguage", e.target.value)}
                  >
                    <option value="">Languages</option>
                    {codeLanguages.map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                  <button onClick={() => deleteProjectBlock(index)} className="deleteButton">
                    Delete
                  </button>
                </div>
              ))}

              {projects.length < MAX_PROJECT_BLOCKS && (
                <button onClick={addProjectBlock} className="addButton">+ Add</button>
              )}
            </div>
          </div>}

          {activeTab === 'Work experience' && 
          <div>
             <div>
                {experience.map((exp, index) => (
                  <div key={index} className="expInputBox">
                    <div style={{ display: "flex", alignItems: "center", gap: "50px" }}>
                      <input 
                        type="text"
                        placeholder="Job title"
                        value={exp.jobTitle}
                        onChange={(e) => handleExperienceChange(index, "jobTitle", e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="company name"
                        value={exp.companyName}
                        onChange={(e) => handleExperienceChange(index, "companyName", e.target.value)}
                      />
                      <input 
                        type="text"
                        placeholder="address"
                        value={exp.companyAddress}
                        onChange={(e) => handleExperienceChange(index, "companyAddress", e.target.value)}
                      />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "50px"}}>
                      <select
                        value={exp.workType}
                        onChange={(e) =>
                          handleExperienceChange(index, "workType", e.target.value as "Full-Time" | "Contract")
                        }
                      >
                        <option value="Full-Time">Full-Time</option>
                        <option value="Contract">Contract</option>
                      </select>
                      <input 
                        type="text"
                        placeholder="Start Date MM/DD/YYYY"
                        value={exp.dateStart}
                        onChange={(e) => handleExperienceChange(index, "dateStart", e.target.value)}
                      />
                      <input 
                        type="text"
                        placeholder="End date MM/DD/YYYY"
                        value={exp.dateEnd}
                        onChange={(e) => handleExperienceChange(index, "dateEnd", e.target.value)}
                      />

                      <button onClick={() => deleteExperienceBlock(index)} className="deleteButton">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}

                {experience.length < MAX_EXPERIENCE_BLOCKS && (
                  <button onClick={addExperienceBlock} className="addButton">+ Add</button>
                )}
             </div>
          </div>}
        </div>
   
      </div>
    </div>
    </PageWrapper>
  );
};

export default Portfolio;
