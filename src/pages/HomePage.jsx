import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import IntroSection from '../components/sections/IntroSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import ChecklistBenefitsSection from '../components/sections/ChecklistBenefitsSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CtaSection from '../components/sections/CtaSection';
import PageLayout from '../components/layout/PageLayout';

/**
 * HomePage component representing the landing page of the DiasporaLink website
 * Contains various sections highlighting the services and benefits
 */
const HomePage = () => {
  return (
    <PageLayout>
      <HeroSection />
      <IntroSection />
      <HowItWorksSection />
      <ChecklistBenefitsSection />
      <TestimonialsSection />
      <CtaSection />
    </PageLayout>
  );
};

export default HomePage;
