import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <img 
          src="/images/banner_alternative_3_resized.jpg" 
          alt="African students studying abroad" 
          className="hero-image"
        />
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Connecting African Students Worldwide</h1>
            <p>Your guide to education and opportunities abroad</p>
            <a href="#services" className="btn btn-primary">Explore Services</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
