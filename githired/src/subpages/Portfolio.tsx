import React, { useState, useEffect } from 'react';
import "../css/portfolio.css";

const Portfolio: React.FC = () => {
  const [nameText, nsetText] = useState('');
  const [birthText, bsetText] = useState('');
  const [emailText, esetText] = useState('');
  const [addressText, asetText] = useState('');
  const [image, setImage] = useState<string | null>(null);

  // Load saved values when the component mounts
  useEffect(() => {
    nsetText(localStorage.getItem('name') || '');
    bsetText(localStorage.getItem('birth') || '');
    esetText(localStorage.getItem('email') || '');
    asetText(localStorage.getItem('address') || '');
    setImage(localStorage.getItem('profileImage'));
  }, []);

  // Save values to localStorage when they change
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
    <div className="profile-container">
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
    </div>
  );
};

export default Portfolio;
