import React, { useState, useEffect, useRef } from 'react';
import "../css/portfolio.css";

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
    localStorage.setItem('name', formData.name);
  }, [formData.name]);

  useEffect(() => {
    localStorage.setItem('birth', formData.birth);
  }, [formData.birth]);

  useEffect(() => {
    localStorage.setItem('email', formData.email);
  }, [formData.email]);

  useEffect(() => {
    localStorage.setItem('address', formData.address);
  }, [formData.address]);

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

  const [inputText, setInputText] = useState('');
const [filtered, setFiltered] = useState<string[]>([]);

  const [showDropdown, setShowDropdown] = useState(false);

const timeoutRef = useRef<number | null>(null);



  const fetchSuggestions = (query: string) => {
    fetch('http://localhost:5000/api/vertex-ai-autocomplete', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFiltered(data.suggestions);
        setShowDropdown(data.suggestions.length > 0);
      });

  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputText(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  const handleSelect = (val:string) => {
    setInputText(val);
    setFiltered([]);
    setShowDropdown(false);
  };

  useEffect(() => {
  return () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };
}, []);

  
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
            value={formData.name}
            onChange={e => handleChangeProfile('name', e.target.value)}
          />
          <input
            value={formData.birth}
            onChange={e => handleChangeProfile('birth', e.target.value)}
          />
        </div>
        <div className="profile-input">
          <input
            value={formData.email}
            onChange={e => handleChangeProfile('email', e.target.value)}
          />
          <input
            value={formData.name}
            onChange={e => handleChangeProfile('address', e.target.value)}
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
                <div className="autocomplete-container">
      <input
        type="text"
        value={inputText}
        onChange={handleChange}
        placeholder="Start typing university..."
      />
      {showDropdown && (
        <ul className="autocomplete-list">
          {filtered.map((opt, i) => (
            <li key={i} onClick={() => handleSelect(opt)}>
              {opt}
            </li>
          ))}
        </ul>
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
