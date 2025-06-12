import React from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from '../../context/AnimationContext';

const TestimonialCard = ({
  name,
  country,
  program,
  content,
  photoUrl,
  rating = 5,
  className = ''
}) => {
  const { enableAnimations, prefersReducedMotion } = useAnimation();
  
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }
  };

  return (
    <motion.div 
      className={`bg-white p-6 rounded-lg shadow-md ${className}`}
      initial={enableAnimations && !prefersReducedMotion ? "initial" : false}
      animate={enableAnimations && !prefersReducedMotion ? "animate" : false}
      whileHover={enableAnimations && !prefersReducedMotion ? "hover" : false}
      variants={cardVariants}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start">
        <motion.div 
          className="flex-shrink-0 mr-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {photoUrl ? (
            <motion.img 
              src={photoUrl} 
              alt={`${name} from ${country}`} 
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
              whileHover={{ scale: 1.1, borderColor: "#3B82F6" }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.div 
              className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center"
              whileHover={{ scale: 1.1, backgroundColor: "#BFDBFE" }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-blue-600 text-xl font-medium">
                {name.charAt(0)}
              </span>
            </motion.div>
          )}
        </motion.div>
        <div className="w-full">
          <motion.div 
            className="mb-2 text-gray-600"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <svg
              className="inline-block h-5 w-5 text-blue-600 mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.039 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
            </svg>
          </motion.div>
          <motion.p 
            className="text-gray-700 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {content}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h4 className="font-medium text-gray-900">{name}</h4>
            <p className="text-sm text-gray-600">
              {program}, {country}
            </p>
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, i) => {
                // Full star
                if (i < Math.floor(rating)) {
                  return (
                    <svg 
                      key={i}
                      className="w-4 h-4 text-yellow-500" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  );
                }
                // Half star
                else if (i === Math.floor(rating) && rating % 1 !== 0) {
                  return (
                    <div key={i} className="relative w-4 h-4">
                      {/* Gray background star */}
                      <svg 
                        className="absolute w-4 h-4 text-gray-300" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      {/* Half gold star (clipped) */}
                      <div className="absolute overflow-hidden w-2 h-4">
                        <svg 
                          className="w-4 h-4 text-yellow-500" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </div>
                    </div>
                  );
                }
                // Empty star
                else {
                  return (
                    <svg 
                      key={i}
                      className="w-4 h-4 text-gray-300" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  );
                }
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;