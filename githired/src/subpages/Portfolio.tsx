import React, { useState, useEffect } from 'react';
import "../css/portfolio.css";

const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState('education');

  const [nameText, nsetText] = useState('');
  const [birthText, bsetText] = useState('');
  const [emailText, esetText] = useState('');
  const [addressText, asetText] = useState('');
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    nsetText(localStorage.getItem('name') || '');
    bsetText(localStorage.getItem('birth') || '');
    esetText(localStorage.getItem('email') || '');
    asetText(localStorage.getItem('address') || '');
    setImage(localStorage.getItem('profileImage'));
  }, []);

  useEffect(() => {
    localStorage.setItem('name', nameText);
  }, [nameText]);

  useEffect(() => {
    localStorage.setItem('birth', birthText);
  }, [birthText]);

  useEffect(() => {
    localStorage.setItem('email', emailText);
  }, [emailText]);

  useEffect(() => {
    localStorage.setItem('address', addressText);
  }, [addressText]);

  useEffect(() => {
    if (image) localStorage.setItem('profileImage', image);
  }, [image]);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
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
            value={nameText}
            onChange={(e) => nsetText(e.target.value)}
            placeholder="Your name"
          />
          <input
            value={birthText}
            onChange={(e) => bsetText(e.target.value)}
            placeholder="MM/DD/YYYY"
          />
        </div>
        <div className="profile-input">
          <input
            value={emailText}
            onChange={(e) => esetText(e.target.value)}
            placeholder="Your email"
          />
          <input
            value={addressText}
            onChange={(e) => asetText(e.target.value)}
            placeholder="Address"
          />
        </div>
      </div>

      <div className="tab-box">
        <div className="tab-buttons">
          <button
            className={activeTab === 'Education' ? 'active' : ''}
            onClick={() => setActiveTab('Education')}
          >
            Education
          </button>
          <button
            className={activeTab === '' ? 'Projects' : ''}
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
          {activeTab === 'Education' && <div>content here</div>}
          {activeTab === 'Projects' && <div>content here</div>}
          {activeTab === 'Skills summary' && <div>content here</div>}
          {activeTab === 'Work experience' && <div>content here</div>}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
