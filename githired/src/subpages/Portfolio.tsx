import React, { useState } from 'react';

import "/style.css";

const Portfolio: React.FC = () => {
    const [text, setText] = useState('');

  return (
    <input
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Type here"
    />
  );
};

export default Portfolio;