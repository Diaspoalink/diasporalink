import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/ui/Button';
import { Helmet } from 'react-helmet';
import { initializePayment, verifyTransaction, openFlutterwavePopup } from '../services/PaymentService';
import { trackEvent, trackConversion } from '../services/AnalyticsService';
import { useUser } from '../context/UserContext';

const ConsultationPage = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.fullName || '',
    email: user?.email || '',
    phone: '',
    consultationType: 'planning_preparation'
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('planning');
  
  const consultationTypes = {
    planning: {
      id: 'planning_preparation',
      title: 'Planning and Preparation',
      price: 25,
      originalPrice: 100,
      discount: '75%',
      duration: '45 minutes',
      description: 'Complete planning package including university selection and visa review to get you started on your journey.',
      benefits: [
        'Personalized study abroad roadmap',
        'University selection guidance',
        'Visa application strategy',
        'Budget planning assistance',
        'Timeline development'
      ]
    },
    document: {
      id: 'document_review',
      title: 'Document Review',
      price: 50,
      originalPrice: 333,
      discount: '85%',
      duration: '60 minutes',
      description: 'Review of all application documents including school and visa applications to ensure the best chance of success.',
      benefits: [
        'Comprehensive document assessment',
        'Application form review',
        'Personal statement feedback',
        'Supporting documents evaluation',
        'Recommendation for improvements'
      ]
    },
    full: {
      id: 'full_support',
      title: 'Full Support',
      price: 100,
      originalPrice: 667,
      discount: '85%',
      duration: '90 minutes',
      description: 'End-to-end support for your international education journey. We help you search for schools, get admissions, plus visa support.',
      benefits: [
        'School search and selection',
        'Complete application assistance',
        'Visa application support',
        'Interview preparation',
        'Admission follow-up',
        'Pre-departure guidance'
      ]
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user makes changes
    if (error) {
      setError('');
    }
  };
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormData(prev => ({
      ...prev,
      consultationType: consultationTypes[tab].id
    }));
  };
  
  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please enter your full name');
      return false;
    }
    
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    setError(''); // Clear any previous errors
    
    try {
      // Track payment initialization
      trackEvent('payment', 'initiated', formData.consultationType);
      
      // Store user information in context
      setUser({
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone
      });
      
      // Get selected service details
      const selectedService = consultationTypes[activeTab];
      
      // Initialize payment configuration with test mode flag
      const paymentResponse = await initializePayment(
        selectedService.price,
        'USD',
        formData.email,
        formData.name,
        {
          consultationType: selectedService.id,
          phone: formData.phone,
          source: 'consultation_page',
          test_mode: false, // Production mode
        },
        `DiasporaLink ${selectedService.title} Consultation`
      );
      
      if (paymentResponse.status === 'success') {
        // Log successful initialization for debugging
        console.log('Payment successfully initialized', paymentResponse.data);
        
        // Store reference for later verification
        const paymentReference = paymentResponse.data.reference;
        
        // Open Flutterwave payment popup
        openFlutterwavePopup(
          paymentResponse.data.paymentConfig,
          // On close handler
          () => {
            console.log('Payment modal closed');
            setIsProcessing(false);
          },
          // On success handler
          async (response) => {
            try {
              console.log('Payment response received:', response);
              
              if (response.status === 'successful') {
                // Verify the transaction with Flutterwave transaction ID
                const verificationResult = await verifyTransaction(paymentReference, response.transaction_id);
                console.log('Payment verification result:', verificationResult);
                
                // Track successful payment
                trackConversion('payment_complete', selectedService.price);
                
                // Redirect to payment confirmation page
                navigate('/payment-confirmation', { 
                  state: { 
                    transactionDetails: {
                      reference: paymentReference,
                      transactionId: response.transaction_id,
                      amount: selectedService.price,
                      currency: 'USD',
                      paymentStatus: 'successful',
                      testTransaction: false // Production transaction
                    },
                    consultationType: selectedService.id,
                    serviceTitle: selectedService.title
                  }
                });
              } else {
                setError(`Payment was not successful. Status: ${response.status || 'unknown'}. Please try again.`);
                setIsProcessing(false);
              }
            } catch (error) {
              console.error('Payment verification failed:', error);
              setError(`Payment verification error: ${error.message || 'Unknown error'}. Please try again.`);
              setIsProcessing(false);
            }
          }
        );
      } else {
        setError('Failed to initialize payment. Please try again later.');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Payment process failed:', error);
      setError(`Payment processing error: ${error.message || 'Please try again later.'}`);
      setIsProcessing(false);
    }
  };
  
  const selectedService = consultationTypes[activeTab];
  
  return (
    <PageLayout>
      <Helmet>
        <title>Expert Consultation Services | DiasporaLink</title>
        <meta name="description" content="Get personalized guidance for your study abroad journey. Book a consultation with our experts specializing in planning, document review, and full support services with 85% discount." />
      </Helmet>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Expert Consultation Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get personalized guidance from our experts who understand the unique challenges African students face
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              {Object.keys(consultationTypes).map(type => {
                const service = consultationTypes[type];
                return (
                  <div 
                    key={type}
                    className={`relative cursor-pointer rounded-lg transition-all ${
                      activeTab === type 
                        ? 'bg-white border-2 border-blue-600 shadow-lg transform -translate-y-1' 
                        : 'bg-white border border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleTabChange(type)}
                  >
                    <div className="p-6">
                      {activeTab === type && (
                        <div className="absolute -top-3 -right-3 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <div className="bg-red-100 text-red-600 font-bold text-sm px-2 py-0.5 rounded-md w-fit mb-2">
                        85% OFF
                      </div>
                      <div className="flex items-end gap-2 mb-2">
                        <span className="text-blue-600 text-2xl font-bold">${service.price}</span>
                        <span className="text-gray-500 text-sm line-through">${service.originalPrice}</span>
                        <span className="text-sm text-gray-500 font-normal">/ {service.duration}</span>
                      </div>
                      <div className="text-green-600 text-sm font-medium mb-2">
                        You save: ${service.originalPrice - service.price}
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                      
                      <ul className="space-y-2">
                        {service.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Book Your {selectedService.title} Consultation</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-2">
                    Phone Number (optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Include country code, e.g. +234"
                  />
                </div>
                
                <div className="mt-8">
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 rounded">
                      {error}
                    </div>
                  )}
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{selectedService.title}</p>
                        <p className="text-gray-600 text-sm">{selectedService.duration} consultation</p>
                        <div className="mt-1 text-green-600 text-sm font-medium">85% discount applied</div>
                      </div>
                      <div>
                        <div className="font-bold text-blue-600 text-right">${selectedService.price}</div>
                        <div className="text-gray-500 text-sm line-through text-right">${selectedService.originalPrice}</div>
                        <div className="text-green-600 text-sm font-medium text-right">You save: ${selectedService.originalPrice - selectedService.price}</div>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={isProcessing}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                  >
                    {isProcessing ? (
                      'Processing...'
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Pay Now ${selectedService.price} & Schedule Consultation
                      </>
                    )}
                  </Button>
                  
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-600 text-center">
                      After payment, you'll be directed to our scheduling system to choose a convenient time.
                    </p>
                    

                    
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>Secured by Flutterwave. Your payment information is encrypted.</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ConsultationPage;