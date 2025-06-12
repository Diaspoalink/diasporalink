import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { motion } from 'framer-motion';
import { useAnimation } from '../../context/AnimationContext';
import { fadeUp, fadeIn } from '../../utils/animations';

/**
 * Hero section component that appears at the top of the homepage
 * Featuring a full-width banner image with overlaid text and a call-to-action button
 */
const HeroSection = () => {
  const { enableAnimations, prefersReducedMotion } = useAnimation();
  
  return (
    <section className="relative w-full bg-blue-900 overflow-hidden">
      {/* Banner image with overlay */}
      <div className="relative w-full">
        <motion.img 
          src="/images/hero_banner.jpg" 
          alt="African students studying abroad" 
          className="w-full h-[600px] object-cover opacity-75"
          initial={{ scale: 1.05, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 0.75 }}
          transition={{ duration: 1.5 }}
        />
        <div className="absolute inset-0 bg-blue-900/50 flex items-center justify-center">
          <div className="text-center px-4 md:px-8 max-w-4xl">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Connecting African Students Worldwide
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-white mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Your guide to education and opportunities abroad
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <Link to="/consultation">
                <Button variant="primary" size="lg">
                  Get Consultation
                </Button>
              </Link>
              <Link to="/checklist">
                <Button variant="secondary" size="lg">
                  Download Checklist
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
