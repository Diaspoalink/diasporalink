import React, { createContext, useContext, useState, useEffect } from 'react';

const AnimationContext = createContext({
  prefersReducedMotion: false,
  enableAnimations: true,
  setEnableAnimations: () => {},
});

export const AnimationProvider = ({ children }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [enableAnimations, setEnableAnimations] = useState(true);

  useEffect(() => {
    // Check for user's preference about reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    setEnableAnimations(!mediaQuery.matches);

    // Add listener for changes in preference
    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
      setEnableAnimations(!e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const value = {
    prefersReducedMotion,
    enableAnimations,
    setEnableAnimations,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

export default AnimationContext;