// PageWrapper.tsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const [fadeClass, setFadeClass] = useState('page');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setFadeClass('page'); // fade in on route change
  }, [location]);

  const handleNavigate = (to: string) => {
    setFadeClass('page fade-out');
    setTimeout(() => {
      navigate(to);
    }, 600); // match fade duration
  };

  return (
    <div className={fadeClass}>
      {children}
      {/* Example button to navigate */}
      <button onClick={() => handleNavigate('/about')}>Go to About</button>
    </div>
  );
};

export default PageWrapper;
