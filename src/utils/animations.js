import { useEffect } from 'react';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Fade in animation variants
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

// Fade up animation variants
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

// Fade down animation variants
export const fadeDown = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0 }
};

// Fade left animation variants
export const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 }
};

// Fade right animation variants
export const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 }
};

// Scale animation variants
export const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

// Stagger animation for containers
export const staggerContainer = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: delay
    }
  }
});

// Button hover animations
export const buttonHover = {
  scale: 1.03,
  transition: { duration: 0.2 }
};

// Card hover animations
export const cardHover = {
  y: -8,
  boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.15)",
  transition: { duration: 0.3 }
};

// Custom hook for scroll-triggered animations
export const useScrollAnimation = (threshold = 0.1) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ 
    threshold, 
    triggerOnce: true 
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return { ref, controls, inView };
};

// Animation presets for common components
export const animationPresets = {
  section: {
    initial: "hidden",
    variants: fadeUp,
    transition: { duration: 0.6 }
  },
  card: {
    initial: "hidden",
    variants: scaleUp,
    transition: { duration: 0.5 },
    whileHover: cardHover
  },
  button: {
    whileHover: buttonHover,
    whileTap: { scale: 0.98 }
  },
  listItem: (index) => ({
    initial: "hidden",
    variants: fadeRight,
    transition: { duration: 0.5, delay: index * 0.1 }
  })
};