import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ChecklistDownloadPage from './pages/ChecklistDownloadPage';
import ConsultationPage from './pages/ConsultationPage';
import PaymentConfirmationPage from './pages/PaymentConfirmationPage';
import EmailDebugPage from './pages/EmailDebugPage';

// This component will be used for routes that are not yet implemented
const UnderConstructionPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="text-center">
        <div className="mb-8">
          <svg className="h-16 w-16 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Under Construction</h1>
        <p className="text-xl text-gray-600 mb-8">
          We're working on this page! It will be available soon.
        </p>
        <a 
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
        >
          Return to Homepage
        </a>
      </div>
    </div>
  );
};

// Define routes for the application
export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/checklist",
    element: <ChecklistDownloadPage />,
  },
  {
    path: "/consultation",
    element: <ConsultationPage />,
  },
  {
    path: "/consultation/booking",
    element: <UnderConstructionPage />, // Placeholder for the booking page
  },
  {
    path: "/payment-confirmation",
    element: <PaymentConfirmationPage />,
  },
  {
    path: "/blog",
    element: <UnderConstructionPage />, // Placeholder for future blog section
  },
  {
    path: "/resources",
    element: <UnderConstructionPage />, // Placeholder for resource center
  },
  {
    path: "/email-debug",
    element: <EmailDebugPage />, // Email debugging tool
  },
  {
    // Redirect 404s to the homepage
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;