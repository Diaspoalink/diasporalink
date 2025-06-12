import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../../services/AnalyticsService';
import { AdvancedPageTransition } from '../animations/PageTransition';

const PageLayout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when location changes
    trackPageView(location.pathname);
    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <AdvancedPageTransition>
          {children}
        </AdvancedPageTransition>
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;