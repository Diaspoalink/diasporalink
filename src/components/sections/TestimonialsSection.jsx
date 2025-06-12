import React, { useState, useEffect, useCallback, useRef } from 'react';
import TestimonialCard from '../ui/TestimonialCard';
import { motion } from 'framer-motion';
import { useAnimation } from '../../context/AnimationContext';
import { ScrollRevealContainer, ScrollReveal } from '../animations/ScrollReveal';

const TestimonialsSection = () => {
  const { enableAnimations, prefersReducedMotion } = useAnimation();
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayRef = useRef(null);
  const intervalRef = useRef(null);
  
  // Enhanced testimonials with diverse African student photos
  const testimonials = [
    {
      id: 1,
      name: "Adebayo Johnson",
      country: "Nigeria",
      program: "MSc Computer Science, Warsaw University",
      content: "DiasporaLink made my application process so much easier. Their checklist saved me from making costly mistakes, and the consultation helped me prepare for my visa interview perfectly!",
      photoUrl: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=100&auto=format&fit=crop",
      rating: 5
    },
    {
      id: 2,
      name: "Fatima Mensah",
      country: "Ghana",
      program: "Bachelor of Business, University of Berlin",
      content: "I was struggling with my visa application until I found DiasporaLink. Their detailed guidance and personal support made all the difference. Now I'm successfully studying in Germany!",
      photoUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=100&auto=format&fit=crop",
      rating: 4.5
    },
    {
      id: 3,
      name: "Chioma Okafor",
      country: "Nigeria",
      program: "Master of Engineering, Technical University of Munich",
      content: "The consultation session was incredibly valuable. My advisor understood the specific challenges African students face and provided actionable solutions. I'm so grateful for their help.",
      photoUrl: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=100&auto=format&fit=crop",
      rating: 5
    },
    {
      id: 4,
      name: "Samuel Wanjiru",
      country: "Kenya",
      program: "PhD Biotechnology, McGill University",
      content: "DiasporaLink's checklist and advice helped me secure a scholarship that covered 75% of my tuition. Their expertise in navigating financial options for African students is outstanding.",
      photoUrl: "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?q=80&w=100&auto=format&fit=crop",
      rating: 4
    },
    {
      id: 5,
      name: "Grace Mugabe",
      country: "Zimbabwe",
      program: "MA International Relations, University of Warsaw",
      content: "From application strategy to visa interview preparation, DiasporaLink was with me every step of the way. They truly understand the unique needs of African students.",
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
      rating: 4.5
    },
    {
      id: 6,
      name: "Victor Okonkwo",
      country: "Nigeria",
      program: "MSc Data Science, University of Amsterdam",
      content: "The detailed scholarship application tips in the DiasporaLink consultation were invaluable. I'm now studying with a full scholarship that I never thought was possible.",
      photoUrl: "https://images.unsplash.com/photo-1539701938214-0d9736e1c16b?q=80&w=100&auto=format&fit=crop",
      rating: 5
    },
    {
      id: 7,
      name: "Amina Diallo",
      country: "Senegal",
      program: "Bachelor of Medicine, University of Lyon",
      content: "As a medical student, my application had specific requirements. DiasporaLink provided tailored guidance that made my transition to study in France smooth and stress-free.",
      photoUrl: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=100&auto=format&fit=crop",
      rating: 4
    },
    {
      id: 8,
      name: "Kwame Adu",
      country: "Ghana",
      program: "MBA, Copenhagen Business School",
      content: "The visa preparation materials saved me countless hours of research. My visa was approved on the first try thanks to DiasporaLink's expert guidance!",
      photoUrl: "https://images.unsplash.com/photo-1506634572416-48cdfe530110?q=80&w=100&auto=format&fit=crop",
      rating: 5
    }
  ];

  // Auto-slide functionality
  const nextTestimonial = useCallback(() => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  }, [testimonials.length]);
  
  const goToTestimonial = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  // Auto-slide setup
  useEffect(() => {
    autoPlayRef.current = nextTestimonial;
  }, [nextTestimonial]);

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };

    // Start auto-sliding and reset the interval on each slide change
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(play, 5000); // Change slide every 5 seconds

    // Clean up interval
    return () => clearInterval(intervalRef.current);
  }, [activeIndex]);

  // Pause auto-sliding when user interacts with controls
  const pauseAutoPlay = () => {
    clearInterval(intervalRef.current);
  };

  // Resume auto-sliding after user interaction
  const resumeAutoPlay = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => autoPlayRef.current(), 5000);
  };

  return (
    <ScrollRevealContainer>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Success Stories
              </motion.h2>
              <motion.div 
                className="w-24 h-1 bg-blue-600 mx-auto mb-6"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              ></motion.div>
              <motion.p 
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                See how we've helped African students achieve their international education goals
              </motion.p>
            </div>
          </ScrollReveal>

          {/* Desktop Testimonials Carousel */}
          <ScrollReveal>
            <div className="hidden lg:block relative px-8 mb-12">
              <div className="overflow-hidden">
                <motion.div 
                  className="flex transition-transform duration-500 ease-in-out" 
                  animate={{ x: `-${activeIndex * 33.333}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="w-1/3 flex-shrink-0 px-4">
                      <TestimonialCard
                        name={testimonial.name}
                        country={testimonial.country}
                        program={testimonial.program}
                        content={testimonial.content}
                        photoUrl={testimonial.photoUrl}
                        rating={testimonial.rating}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
              
              {/* Desktop Navigation Arrows */}
              <motion.button 
                onClick={() => {
                  pauseAutoPlay();
                  prevTestimonial();
                  resumeAutoPlay();
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-3 focus:outline-none"
                whileHover={{ scale: 1.1, backgroundColor: "#EFF6FF" }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous testimonial"
              >
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <motion.button 
                onClick={() => {
                  pauseAutoPlay();
                  nextTestimonial();
                  resumeAutoPlay();
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-3 focus:outline-none"
                whileHover={{ scale: 1.1, backgroundColor: "#EFF6FF" }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next testimonial"
              >
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </ScrollReveal>

          {/* Mobile Testimonial Carousel */}
          <ScrollReveal>
            <div className="lg:hidden relative px-4">
              <div className="overflow-hidden">
                <motion.div 
                  className="flex w-full" 
                  animate={{ x: `-${activeIndex * 100}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                      <TestimonialCard
                        name={testimonial.name}
                        country={testimonial.country}
                        program={testimonial.program}
                        content={testimonial.content}
                        photoUrl={testimonial.photoUrl}
                        rating={testimonial.rating}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            
              {/* Mobile Navigation Arrows */}
              <motion.button 
                onClick={() => {
                  pauseAutoPlay();
                  prevTestimonial();
                  resumeAutoPlay();
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2 focus:outline-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous testimonial"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <motion.button 
                onClick={() => {
                  pauseAutoPlay();
                  nextTestimonial();
                  resumeAutoPlay();
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2 focus:outline-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next testimonial"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
            
            {/* Dots Indicator */}
            <motion.div 
              className="flex justify-center space-x-3 mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    pauseAutoPlay();
                    goToTestimonial(index);
                    resumeAutoPlay();
                  }}
                  className={`w-3 h-3 rounded-full ${
                    activeIndex === index ? 'bg-blue-600' : 'bg-gray-300'
                  } transition-all duration-300 ease-in-out`}
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    scale: activeIndex === index ? 1.2 : 1,
                    backgroundColor: activeIndex === index ? '#2563EB' : '#D1D5DB'
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </ScrollRevealContainer>
  );
};

export default TestimonialsSection;