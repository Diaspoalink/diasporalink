import React from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from '../../context/AnimationContext';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  fullWidth = false,
  type = 'button',
  onClick,
  disabled = false
}) => {
  const { enableAnimations, prefersReducedMotion } = useAnimation();
  const baseStyles = "rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-blue-500",
    outline: "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    success: "bg-green-500 hover:bg-green-600 text-white focus:ring-green-400",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-400",
  };
  
  const sizeStyles = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  };
  
  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  const widthStyle = fullWidth ? "w-full" : "";
  
  // If reduced motion is preferred or animations are disabled, use a regular button
  if (prefersReducedMotion || !enableAnimations) {
    return (
      <button
        type={type}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${disabledStyle} ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
  
  return (
    <motion.button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${disabledStyle} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;