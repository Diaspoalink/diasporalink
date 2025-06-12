import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/ui/Button';
import { useUser } from '../context/UserContext';
import { trackEvent, trackConversion } from '../services/AnalyticsService';

const PaymentConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const [countdown, setCountdown] = useState(5);
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  // Get transaction data from navigation state
  const { 
    transactionDetails = {}, 
    consultationType = '',
    serviceTitle = 'Consultation'
  } = location.state || {};
  
  const {
    reference,
    transactionId,
    amount,
    currency = 'USD',
    paymentStatus = 'successful',
    testTransaction = true // Default to true for safety
  } = transactionDetails;
  
  // Define different booking links based on consultation type
  const getBookingLink = () => {
    // Default booking link
    let bookingLink = 'https://calendly.com/diasporalink/30min';
    
    // Check consultation type and assign appropriate booking link
    if (consultationType === 'full_support') {
      bookingLink = 'https://calendly.com/diasporalink/study-abroad-full-support';
    } else if (consultationType === 'document_review') {
      bookingLink = 'https://calendly.com/diasporalink/document-review-consultation';
    }
    
    return bookingLink;
  };
  
  const calendlyURL = getBookingLink();
  
  useEffect(() => {
    if (!reference) {
      // If there's no transaction reference, redirect to consultation page
      navigate('/consultation', { replace: true });
      return;
    }
    
    // Track successful payment confirmation
    trackEvent('payment', 'confirmed', `${consultationType}`);
    trackConversion('payment_confirmation', amount || 0);
    
    // Set up automatic redirect
    let timer;
    if (!isRedirecting) {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsRedirecting(true);
            // Redirect to Calendly after countdown
            window.location.href = calendlyURL;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      clearInterval(timer);
    };
  }, [reference, navigate, consultationType, amount, isRedirecting]);
  
  const handleManualRedirect = () => {
    setIsRedirecting(true);
    window.location.href = calendlyURL;
  };
  
  return (
    <PageLayout>
      <Helmet>
        <title>Payment Confirmed | DiasporaLink</title>
        <meta name="description" content="Your payment has been confirmed. Schedule your consultation now." />
      </Helmet>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-green-500 text-white rounded-full flex items-center justify-center">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Payment Successful!
              </h1>
              
              <div className="bg-gray-50 p-5 rounded-lg mb-6">
                {testTransaction && (
                  <div className="bg-blue-50 text-blue-800 p-3 rounded-md mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">This is a test transaction. No actual payment has been processed.</span>
                  </div>
                )}
                
                <p className="font-medium text-lg mb-4">Transaction Details</p>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{serviceTitle}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">{currency} {amount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status:</span>
                    <span className="text-green-600 font-medium">{paymentStatus}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Reference:</span>
                    <span className="font-medium text-sm">{reference || 'N/A'}</span>
                  </div>
                  {transactionId && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Transaction ID:</span>
                      <span className="font-medium text-sm">{transactionId}</span>
                    </div>
                  )}
                  {testTransaction && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Mode:</span>
                      <span className="bg-blue-100 text-blue-800 text-xs py-1 px-2 rounded">TEST MODE</span>
                    </div>
                  )}
                </div>
              </div>
              
              <p className="text-lg mb-2">
                Next Step: Schedule Your Appointment
              </p>
              <p className="text-gray-600 mb-6">
                You'll be redirected to our booking system in {countdown} seconds.
              </p>
              
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
                <Button 
                  variant="primary"
                  size="lg"
                  onClick={handleManualRedirect}
                  disabled={isRedirecting}
                  className="animate-pulse"
                >
                  {isRedirecting ? 'Redirecting...' : 'Schedule Now'}
                </Button>
                
                <Button 
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate('/')}
                >
                  Return to Homepage
                </Button>
              </div>
              
              <div className="mt-8 text-sm text-gray-500">
                <p>A payment receipt has been sent to your email: <span className="font-medium">{user?.email}</span></p>
                <p className="mt-1">If you need assistance, contact us at <a href="mailto:support@diasporalink.com" className="text-blue-600 hover:underline">support@diasporalink.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PaymentConfirmationPage;