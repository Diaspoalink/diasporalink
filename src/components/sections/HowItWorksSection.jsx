import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { motion } from 'framer-motion';
import { useAnimation } from '../../context/AnimationContext';
import { ScrollRevealContainer, ScrollReveal } from '../animations/ScrollReveal';

const HowItWorksSection = () => {
  const { enableAnimations, prefersReducedMotion } = useAnimation();
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <ScrollRevealContainer>
          <ScrollReveal>
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                How It Works
              </motion.h2>
              <motion.div 
                className="w-24 h-1 bg-blue-600 mx-auto mb-6"
                initial={{ width: 0 }}
                animate={{ width: 96 }} // 24rem = 96px
                transition={{ duration: 0.8, delay: 0.3 }}
              ></motion.div>
              <motion.p 
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Your path to studying abroad made simple in three easy steps
              </motion.p>
            </div>
          </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <ScrollReveal delay={0.1}>
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md relative z-10"
              whileHover={enableAnimations && !prefersReducedMotion ? { y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" } : {}}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-6 mx-auto"
                initial={enableAnimations && !prefersReducedMotion ? { scale: 0.5, opacity: 0 } : {}}
                animate={enableAnimations && !prefersReducedMotion ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                1
              </motion.div>
              <motion.h3 
                className="text-xl font-semibold text-gray-900 mb-3 text-center"
                initial={enableAnimations && !prefersReducedMotion ? { opacity: 0, y: 10 } : {}}
                animate={enableAnimations && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Download Our Checklist
              </motion.h3>
              <motion.p 
                className="text-gray-600 text-center mb-4"
                initial={enableAnimations && !prefersReducedMotion ? { opacity: 0 } : {}}
                animate={enableAnimations && !prefersReducedMotion ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Get our comprehensive checklist to understand the key steps and requirements for studying abroad.
              </motion.p>
              <motion.div 
                className="text-center"
                initial={enableAnimations && !prefersReducedMotion ? { opacity: 0, y: 10 } : {}}
                animate={enableAnimations && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link to="/checklist">
                  <Button variant="outline" size="sm">Get Checklist</Button>
                </Link>
              </motion.div>
            </motion.div>
          </ScrollReveal>

          {/* Step 2 */}
          <ScrollReveal delay={0.3}>
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md relative z-10 md:mt-8"
              whileHover={enableAnimations && !prefersReducedMotion ? { y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" } : {}}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-6 mx-auto"
                initial={enableAnimations && !prefersReducedMotion ? { scale: 0.5, opacity: 0 } : {}}
                animate={enableAnimations && !prefersReducedMotion ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                2
              </motion.div>
              <motion.h3 
                className="text-xl font-semibold text-gray-900 mb-3 text-center"
                initial={enableAnimations && !prefersReducedMotion ? { opacity: 0, y: 10 } : {}}
                animate={enableAnimations && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Book a Consultation
              </motion.h3>
              <motion.p 
                className="text-gray-600 text-center mb-4"
                initial={enableAnimations && !prefersReducedMotion ? { opacity: 0 } : {}}
                animate={enableAnimations && !prefersReducedMotion ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Schedule a one-on-one session with our experts to address your specific needs and challenges.
              </motion.p>
              <motion.div 
                className="text-center"
                initial={enableAnimations && !prefersReducedMotion ? { opacity: 0, y: 10 } : {}}
                animate={enableAnimations && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link to="/consultation">
                  <Button variant="outline" size="sm">Book Now</Button>
                </Link>
              </motion.div>
            </motion.div>
          </ScrollReveal>

          {/* Step 3 */}
          <ScrollReveal delay={0.5}>
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md relative z-10"
              whileHover={enableAnimations && !prefersReducedMotion ? { y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" } : {}}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-6 mx-auto"
                initial={enableAnimations && !prefersReducedMotion ? { scale: 0.5, opacity: 0 } : {}}
                animate={enableAnimations && !prefersReducedMotion ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                3
              </motion.div>
              <motion.h3 
                className="text-xl font-semibold text-gray-900 mb-3 text-center"
                initial={enableAnimations && !prefersReducedMotion ? { opacity: 0, y: 10 } : {}}
                animate={enableAnimations && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Begin Your Journey
              </motion.h3>
              <motion.p 
                className="text-gray-600 text-center mb-4"
                initial={enableAnimations && !prefersReducedMotion ? { opacity: 0 } : {}}
                animate={enableAnimations && !prefersReducedMotion ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Follow our personalized guidance and start your successful international education journey.
              </motion.p>
              <motion.div 
                className="text-center"
                initial={enableAnimations && !prefersReducedMotion ? { opacity: 0, y: 10 } : {}}
                animate={enableAnimations && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link to="/about">
                  <Button variant="outline" size="sm">Learn More</Button>
                </Link>
              </motion.div>
            </motion.div>
          </ScrollReveal>

          {/* Connecting Lines (for desktop) */}
          <motion.div 
            className="hidden md:block absolute top-1/3 left-0 right-0 h-0.5 bg-blue-200 z-0"
            initial={enableAnimations && !prefersReducedMotion ? { scaleX: 0, opacity: 0 } : {}}
            animate={enableAnimations && !prefersReducedMotion ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.8 }}
            style={{ transformOrigin: 'center' }}
          ></motion.div>
        </div>
        </ScrollRevealContainer>
      </div>
    </section>
  );
};

export default HowItWorksSection;