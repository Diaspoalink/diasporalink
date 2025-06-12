import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useAnimation } from '../../context/AnimationContext';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const { enableAnimations, prefersReducedMotion } = useAnimation();

  // If reduced motion is preferred or animations are disabled, don't animate
  if (prefersReducedMotion || !enableAnimations) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// A more advanced page transition with different entrance and exit animations
export const AdvancedPageTransition = ({ children }) => {
  const location = useLocation();
  const { enableAnimations, prefersReducedMotion } = useAnimation();

  // If reduced motion is preferred or animations are disabled, don't animate
  if (prefersReducedMotion || !enableAnimations) {
    return <>{children}</>;
  }

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    in: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      }
    },
    out: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;