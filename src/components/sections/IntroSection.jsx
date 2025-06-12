import React from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from '../../context/AnimationContext';
import { ScrollRevealContainer, ScrollReveal } from '../animations/ScrollReveal';

const IntroSection = () => {
  const { enableAnimations, prefersReducedMotion } = useAnimation();
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <ScrollRevealContainer>
          <ScrollReveal>
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                initial={enableAnimations && !prefersReducedMotion ? { opacity: 0, y: -20 } : {}}
                animate={enableAnimations && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                Welcome to DiasporaLink
              </motion.h2>
              <motion.div 
                className="w-24 h-1 bg-blue-600 mx-auto mb-6"
                initial={enableAnimations && !prefersReducedMotion ? { width: 0 } : {}}
                animate={enableAnimations && !prefersReducedMotion ? { width: 96 } : {}} // 24rem = 96px
                transition={{ duration: 0.8, delay: 0.3 }}
              ></motion.div>
              <motion.p 
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                initial={enableAnimations && !prefersReducedMotion ? { opacity: 0 } : {}}
                animate={enableAnimations && !prefersReducedMotion ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                We bridge the gap between African students and international education opportunities
              </motion.p>
            </div>
          </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ScrollReveal delay={0.1}>
            <motion.div 
              className="bg-gray-50 p-6 rounded-lg shadow-sm"
              whileHover={enableAnimations && !prefersReducedMotion ? { y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" } : {}}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto"
                initial={enableAnimations && !prefersReducedMotion ? { scale: 0.5, opacity: 0 } : {}}
                animate={enableAnimations && !prefersReducedMotion ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </motion.div>
              <motion.h3 
                className="text-xl font-semibold text-gray-900 mb-3 text-center"
                initial={enableAnimations && !prefersReducedMotion ? { opacity: 0, y: 10 } : {}}
                animate={enableAnimations && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Expert Guidance
              </motion.h3>
              <motion.p 
                className="text-gray-600 text-center"
                initial={enableAnimations && !prefersReducedMotion ? { opacity: 0 } : {}}
                animate={enableAnimations && !prefersReducedMotion ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Get personalized advice from consultants who understand the unique challenges African students face
              </motion.p>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <motion.div 
              className="bg-gray-50 p-6 rounded-lg shadow-sm"
              whileHover={enableAnimations && !prefersReducedMotion ? { y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" } : {}}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto"
                initial={enableAnimations && !prefersReducedMotion ? { scale: 0.5, opacity: 0 } : {}}
                animate={enableAnimations && !prefersReducedMotion ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </motion.div>
              <motion.h3 
                className="text-xl font-semibold text-gray-900 mb-3 text-center"
                initial={enableAnimations && !prefersReducedMotion ? { opacity: 0, y: 10 } : {}}
                animate={enableAnimations && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Visa Success
              </motion.h3>
              <motion.p 
                className="text-gray-600 text-center"
                initial={enableAnimations && !prefersReducedMotion ? { opacity: 0 } : {}}
                animate={enableAnimations && !prefersReducedMotion ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Navigate complex visa processes with confidence using our proven strategies and support
              </motion.p>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <motion.div 
              className="bg-gray-50 p-6 rounded-lg shadow-sm"
              whileHover={enableAnimations && !prefersReducedMotion ? { y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" } : {}}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto"
                initial={enableAnimations && !prefersReducedMotion ? { scale: 0.5, opacity: 0 } : {}}
                animate={enableAnimations && !prefersReducedMotion ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </motion.div>
              <motion.h3 
                className="text-xl font-semibold text-gray-900 mb-3 text-center"
                initial={enableAnimations && !prefersReducedMotion ? { opacity: 0, y: 10 } : {}}
                animate={enableAnimations && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Global Network
              </motion.h3>
              <motion.p 
                className="text-gray-600 text-center"
                initial={enableAnimations && !prefersReducedMotion ? { opacity: 0 } : {}}
                animate={enableAnimations && !prefersReducedMotion ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Connect with our network of universities and institutions that welcome African students
              </motion.p>
            </motion.div>
          </ScrollReveal>
        </div>
        </ScrollRevealContainer>
      </div>
    </section>
  );
};

export default IntroSection;