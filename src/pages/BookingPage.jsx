import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PageLayout from '../components/layout/PageLayout';
import Button from '../components/ui/Button';
import { useUser } from '../context/UserContext';
import { trackEvent } from '../services/AnalyticsService';

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  
  // Get data from navigation state
  const bookingData = location.state || {};
  const { consultationType, serviceTitle, paid, transactionId } = bookingData;
  
  // State for calendar selection
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [error, setError] = useState('');
  
  // Generate available dates (next 7 days)
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1); // Start from tomorrow
    return date;
  });
  
  // Generate available time slots
  const generateTimeSlots = (date) => {
    // Mock time slots - in a real app, these would come from an API
    const baseSlots = [
      '09:00 AM', '10:00 AM', '11:00 AM',
      '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
    ];
    
    // Randomly make some slots unavailable to simulate a real calendar
    return baseSlots.filter(() => Math.random() > 0.3);
  };
  
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  
  // Effect to update time slots when date changes
  useEffect(() => {
    if (selectedDate) {
      setAvailableTimeSlots(generateTimeSlots(selectedDate));
      setSelectedTime(null); // Reset time selection
    }
  }, [selectedDate]);
  
  // Effect to check if user came here without payment
  useEffect(() => {
    if (!paid) {
      // Redirect to consultation page if they haven't paid
      navigate('/consultation', { replace: true });
    } else {
      // Track page view with transaction info
      trackEvent('page_view', 'booking', consultationType);
      trackEvent('booking', 'started', transactionId || 'unknown');
    }
  }, [paid, navigate, consultationType, transactionId]);
  
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };
  
  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime) {
      setError('Please select both date and time for your consultation');
      return;
    }
    
    setIsConfirming(true);
    setError('');
    
    try {
      // In a real app, we would call an API to save the booking
      // For now, we'll simulate a successful booking after a short delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Track successful booking
      trackEvent('booking', 'completed', consultationType);
      
      // Show success state
      setIsBooked(true);
      
    } catch (error) {
      console.error('Booking failed:', error);
      setError('Failed to book your consultation. Please try again or contact support.');
    } finally {
      setIsConfirming(false);
    }
  };
  
  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric'
    });
  };
  
  return (
    <PageLayout>
      <Helmet>
        <title>Schedule Your Consultation | DiasporaLink</title>
        <meta name="description" content="Choose a convenient time for your DiasporaLink consultation session." />
      </Helmet>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {isBooked ? (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-500 text-white rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Booking Confirmed!
                </h1>
                
                <p className="text-xl text-gray-600 mb-6">
                  Your {serviceTitle} consultation has been scheduled for:
                </p>
                
                <div className="bg-blue-50 p-4 rounded-lg mb-6 inline-block">
                  <p className="font-bold text-lg">
                    {formatDate(selectedDate)} at {selectedTime}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <p>
                    We've sent a confirmation email to <span className="font-semibold">{user?.email}</span> with details and instructions.
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">What to expect next:</h3>
                    <ul className="text-left list-disc pl-5 space-y-1">
                      <li>You'll receive a calendar invite with a Zoom link</li>
                      <li>Our consultant will contact you 24 hours before to confirm</li>
                      <li>Be ready 5 minutes before your scheduled time</li>
                      <li>Have any relevant documents accessible during the call</li>
                    </ul>
                  </div>
                  
                  <Button 
                    variant="primary" 
                    onClick={() => navigate('/')}
                    className="mt-6"
                  >
                    Return to Homepage
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Schedule Your {serviceTitle} Consultation
                  </h1>
                  <p className="text-gray-600">
                    Choose a date and time that works for you
                  </p>
                  
                  <div className="mt-4 py-2 px-3 bg-blue-50 rounded-md inline-flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-blue-700">Payment successful - Transaction #{transactionId}</span>
                  </div>
                </div>
                
                <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-4">1. Select a Date</h2>
                    <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
                      {availableDates.map((date, index) => (
                        <button
                          key={index}
                          className={`p-2 rounded-md border transition-colors ${
                            selectedDate && date.toDateString() === selectedDate.toDateString()
                              ? 'bg-blue-500 text-white border-blue-500'
                              : 'border-gray-300 hover:border-blue-400'
                          }`}
                          onClick={() => handleDateSelect(date)}
                        >
                          <div className="text-xs mb-1">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                          <div className="font-medium">{date.getDate()}</div>
                          <div className="text-xs">{date.toLocaleDateString('en-US', { month: 'short' })}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {selectedDate && (
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-4">2. Select a Time</h2>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {availableTimeSlots.map((time, index) => (
                          <button
                            key={index}
                            className={`p-3 rounded-md border transition-colors ${
                              selectedTime === time
                                ? 'bg-blue-500 text-white border-blue-500'
                                : 'border-gray-300 hover:border-blue-400'
                            }`}
                            onClick={() => handleTimeSelect(time)}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                      
                      {availableTimeSlots.length === 0 && (
                        <p className="text-gray-500 italic">No available times on this date. Please select another date.</p>
                      )}
                    </div>
                  )}
                  
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 rounded">
                      {error}
                    </div>
                  )}
                  
                  <div className="mt-8">
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      disabled={isConfirming || !selectedDate || !selectedTime}
                      onClick={handleConfirmBooking}
                    >
                      {isConfirming ? 'Confirming...' : 'Confirm Booking'}
                    </Button>
                    
                    <p className="mt-4 text-sm text-gray-500 text-center">
                      Our consultations are conducted via Zoom. You'll receive a link after booking.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default BookingPage;