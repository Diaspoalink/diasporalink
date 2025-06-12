import React, { useRef, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAnimation } from '../../context/AnimationContext';
import { fadeIn } from '../../utils/animations';

// ScrollReveal component with configurable animation
export const ScrollReveal = ({ 
  children, 
  variant = 'fadeUp', 
  delay = 0, 
  duration = 0.5, 
  className = '',
  threshold = 0.1,
  once = true,
  ...props 
}) => {
  const { enableAnimations, prefersReducedMotion } = useAnimation();
  const controls = useAnimationControls();
  const [ref, inView] = useInView({ 
    threshold, 
    triggerOnce: once 
  });

  useEffect(() => {
    if (inView && enableAnimations && !prefersReducedMotion) {
      controls.start('visible');
    }
  }, [inView, controls, enableAnimations, prefersReducedMotion]);

  // Get animation variants based on the specified variant type
  const getVariants = () => {
    switch (variant) {
      case 'fadeUp':
        return {
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration, delay } }
        };
      case 'fadeDown':
        return {
          hidden: { opacity: 0, y: -40 },
          visible: { opacity: 1, y: 0, transition: { duration, delay } }
        };
      case 'fadeLeft':
        return {
          hidden: { opacity: 0, x: -40 },
          visible: { opacity: 1, x: 0, transition: { duration, delay } }
        };
      case 'fadeRight':
        return {
          hidden: { opacity: 0, x: 40 },
          visible: { opacity: 1, x: 0, transition: { duration, delay } }
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1, transition: { duration, delay } }
        };
      case 'fadeIn':
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration, delay } }
        };
    }
  };

  // If reduced motion is preferred or animations are disabled, don't animate
  if (prefersReducedMotion || !enableAnimations) {
    return <div ref={ref} className={className} {...props}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getVariants()}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// ScrollRevealContainer for groups of elements with staggered animations
export const ScrollRevealContainer = ({ 
  children, 
  staggerChildren = 0.15, 
  delayChildren = 0, 
  className = '', 
  ...props 
}) => {
  const { enableAnimations, prefersReducedMotion } = useAnimation();
  const ref = useRef(null);
  const { ref: inViewRef, inView: isInView } = useInView({ once: true, threshold: 0.1 });
  
  // Use callback ref to combine our refs
  useEffect(() => {
    if (ref.current && inViewRef) {
      inViewRef(ref.current);
    }
  }, [inViewRef]);
  const controls = useAnimationControls();

  useEffect(() => {
    if (isInView && enableAnimations && !prefersReducedMotion) {
      controls.start('visible');
    }
  }, [isInView, controls, enableAnimations, prefersReducedMotion]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren
      }
    }
  };

  // If reduced motion is preferred or animations are disabled, don't animate
  if (prefersReducedMotion || !enableAnimations) {
    return <div className={className} {...props}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;