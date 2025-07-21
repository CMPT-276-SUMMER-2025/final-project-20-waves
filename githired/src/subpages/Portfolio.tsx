import React, { useState } from 'react';
import "/style.css";

const Portfolio: React.FC = () => {
  const [nameText, nsetText] = useState('');
  const [birthText, bsetText] = useState('');
  const [emailText, esetText] = useState('');
  const [addressText, asetText] = useState('');

  const [image, setImage] = useState<string | null>(null);

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
        placeholder="address"
      />


      <div>
        <img
          src={image || '/default-profile.png'}
          alt="Profile"
          onClick={() => document.getElementById('fileInput')?.click()}
          style={{ width: 150, height: 150, borderRadius: '50%', cursor: 'pointer' }}
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
