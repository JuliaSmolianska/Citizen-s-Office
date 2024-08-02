'use client'
import { useState, useEffect } from 'react';

const useScreen = () => {
  const [screenSize, setScreenSize] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let size = '';

      if (width < 768) {
        size = 'mobile';
      } else if (width >= 768 && width < 1200) {
        size = 'tablet';
      } else {
        size = 'desktop';
      }

      setScreenSize(size);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

export default useScreen;

