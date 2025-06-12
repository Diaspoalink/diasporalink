import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/ui/Button';
import { Helmet } from 'react-helmet';
import { trackEvent, trackConversion } from '../services/AnalyticsService';

const ChecklistDownloadPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const scriptLoaded = useRef(false);
  const observerRef = useRef(null);
  
  // Handle successful form submission
  const handleFormSuccess = () => {
    setIsSuccess(true);
    // Remove form scripts and elements from DOM when successful
    const formContainer = document.querySelector('.formkit-form');
    if (formContainer) {
      formContainer.remove();
    }
    trackConversion('checklist', 'form_submission', 'checklist_download');
  };

  // Load script and initialize form
  useEffect(() => {
    // Check if success parameter is in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      handleFormSuccess();
    }
    
    // Track page view
    trackEvent('checklist', 'page_view', 'checklist_download_page');
    
    // We'll use the observerRef created outside useEffect
    
    // Initialize form if not already loaded
    if (!scriptLoaded.current && !isSuccess) {
      // First, load the ConvertKit script
      const convertScript = document.createElement('script');
      convertScript.src = 'https://f.convertkit.com/ckjs/ck.5.js';
      convertScript.async = true;
      document.head.appendChild(convertScript);
      
      // Then load the form script
      const formScript = document.createElement('script');
      formScript.src = 'https://diasporalink.kit.com/3f50ad8e68/index.js';
      formScript.async = true;
      formScript.setAttribute('data-uid', '3f50ad8e68');
      
      // Add a MutationObserver to detect form success message
      setTimeout(() => {
        observerRef.current = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            if (mutation.type === 'childList') {
              // Look for success message which appears after form submission
              const formElement = document.querySelector('.formkit-form');
              const successMessage = document.querySelector('.formkit-alert-success');
              
              // Apply custom styles to form when loaded
              if (formElement && !formElement.dataset.styled) {
                formElement.style.maxWidth = '100%';
                formElement.style.border = 'none';
                formElement.dataset.styled = 'true';
              }
              
              // Handle successful submission
              if (successMessage) {
                handleFormSuccess();
                if (observerRef.current) {
                  observerRef.current.disconnect();
                }
              }
            }
          }
        });
        
        // Start observing the document body for added nodes
        observerRef.current.observe(document.body, { childList: true, subtree: true });
      }, 1500);
      
      // Append script to body to load form
      document.body.appendChild(formScript);
      scriptLoaded.current = true;
    }
    
    // Simulate loading completion
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => {
      clearTimeout(timer);
      // Disconnect observer if it exists
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <PageLayout>
      <Helmet>
        <title>Download Your Free Study Abroad Checklist | DiasporaLink</title>
        <meta 
          name="description" 
          content="Get your comprehensive checklist for African students planning to study abroad. Navigate visa applications, university choices, and more with our step-by-step guide." 
        />
      </Helmet>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {!isSuccess ? (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Get Your Free Study Abroad Checklist
                </h1>
                <p className="text-xl text-gray-600">
                  Complete the form below to receive our comprehensive guide designed specifically for African students
                </p>
              </div>
              
              <div className="my-8 p-4 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold mb-2">Download Your Free Checklist</h2>
                  <p className="text-gray-600">Fill out this form to receive your personalized checklist</p>
                </div>
                
                {isLoading ? (
                  <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : isSuccess ? (
                  <div className="py-10 text-center">
                    <div className="mb-6 flex justify-center">
                      <div className="rounded-full bg-green-100 p-3">
                        <svg className="h-12 w-12 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Checklist Has Been Sent!</h3>
                    <p className="text-lg text-gray-600 mb-6">Thank you for signing up! Please check your email to confirm your subscription and download your checklist.</p>
                    <p className="text-sm text-gray-500">(If you don't see it, please check your spam folder or promotions tab)</p>
                  </div>
                ) : (
                  <div id="form-container" className="form-container relative">
                    {/* Kit.com form will be loaded here via script */}
                  </div>
                )}
              </div>
              
              {!isSuccess && !isLoading && (
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    If the form doesn't appear, please refresh the page or 
                    <a 
                      href="https://diasporalink.kit.com/3f50ad8e68" 
                      className="text-blue-600 underline font-medium ml-1" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      open it in a new tab
                    </a>
                  </p>
                </div>
              )}
              
              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">
                  Already have the checklist? Get personalized guidance with a consultation.
                </p>
                <Link to="/consultation">
                  <Button variant="outline">
                    Book a Consultation
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto text-center">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Thank You!
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  Your checklist is on its way to your email inbox.
                </p>
                <p className="text-gray-600 mb-8">
                  Please check your email to access your comprehensive Study Abroad Checklist. If you don't see it within a few minutes, please check your spam folder.
                </p>
                <div className="space-y-4">
                  <p className="text-lg font-semibold">Your Next Step</p>
                  <p className="text-gray-600 mb-4">
                    Book a personalized consultation to get expert guidance on your unique situation.
                  </p>
                  <Link to="/consultation">
                    <Button variant="primary" size="lg">
                      Book a Consultation
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default ChecklistDownloadPage;