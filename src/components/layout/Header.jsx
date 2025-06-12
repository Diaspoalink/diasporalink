import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/checklist', label: 'Free Checklist' },
    { path: '/consultation', label: 'Book Consultation' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header className={`fixed w-full z-30 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src="/assets/images/logo.jpeg" alt="DiasporaLink Logo" className="h-10 w-auto mr-2" />
            <div className="text-2xl font-bold text-blue-600">DiasporaLink</div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path} 
                className={({ isActive }) => 
                  isActive 
                    ? "font-semibold text-blue-600" 
                    : "text-gray-700 hover:text-blue-600 transition-colors"
                }
                end
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-white shadow-lg py-4 px-6 absolute top-full left-0 right-0">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path} 
                className={({ isActive }) => 
                  isActive 
                    ? "font-semibold text-blue-600" 
                    : "text-gray-700 hover:text-blue-600 transition-colors"
                }
                onClick={() => setIsOpen(false)}
                end
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;