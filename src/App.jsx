import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { AnimationProvider } from './context/AnimationContext';
import { Helmet } from 'react-helmet';
import { router } from './router';
import { initializeAnalytics } from './services/AnalyticsService';

function App() {
  // Initialize analytics service
  React.useEffect(() => {
    initializeAnalytics();
  }, []);

  return (
    <AnimationProvider>
      <UserProvider>
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="theme-color" content="#1E40AF" />
          <meta name="description" content="DiasporaLink provides expert guidance for African students pursuing international education opportunities with tailored support for visa applications and university selection." />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        </Helmet>
        <RouterProvider router={router} />
      </UserProvider>
    </AnimationProvider>
  );
}

export default App;