// src/config/flutterwave.js

/**
 * Flutterwave configuration file
 * Contains API keys for production environment
 */

// Flutterwave production public key
export const FLUTTERWAVE_PUBLIC_KEY = 'FLWPUBK-d8e089151490a98be1a5d6e3eb2a773a-X';

// Production mode configuration
export const FLUTTERWAVE_CONFIG = {
  is_test_mode: false,
  environment: 'production',
  version: 'v3',
  api_base_url: 'https://api.flutterwave.com/v3',
};

// Note: Test card information removed for production

// Test card functionality removed for production

/**
 * Creates a Flutterwave payment configuration object
 * @param {number} amount - Amount to charge
 * @param {string} currency - Currency code (e.g., USD, NGN)
 * @param {Object} customer - Customer information {email, name, phone}
 * @param {Object} [metadata={}] - Additional payment metadata
 * @param {string} [description='DiasporaLink Consultation'] - Payment description
 * @returns {Object} - Flutterwave payment configuration object
 */
export const createPaymentConfig = (
  amount,
  currency,
  customer,
  metadata = {},
  description = 'DiasporaLink Consultation'
) => {
  // Generate unique transaction reference
  const tx_ref = `DIASPORA-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  
  // Create base configuration
  return {
    public_key: FLUTTERWAVE_PUBLIC_KEY,
    tx_ref,
    amount,
    currency,
    payment_options: 'card',
    customer: {
      email: customer.email,
      name: customer.name,
      phone_number: customer.phone || '08000000000'
    },
    customizations: {
      title: 'DiasporaLink',
      description,
      logo: window.location.origin + '/images/logo.png'
    },
    meta: {
      ...metadata
    }
  };
};

/**
 * Validates Flutterwave payment credentials
 * @param {Object} credentials - Payment credentials to validate
 * @returns {Object} - Validation result {valid: boolean, errors: string[]}
 */
export const validatePaymentCredentials = (credentials) => {
  const errors = [];
  
  // Required fields
  const requiredFields = ['card_number', 'cvv', 'expiry_month', 'expiry_year'];
  requiredFields.forEach(field => {
    if (!credentials[field]) {
      errors.push(`${field.replace('_', ' ')} is required`);
    }
  });
  
  // Card number validation
  if (credentials.card_number) {
    const cardNumber = credentials.card_number.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cardNumber)) {
      errors.push('Card number must be 16 digits');
    }
    
    // Test card validation removed for production
  }
  
  // CVV validation
  if (credentials.cvv && !/^\d{3,4}$/.test(credentials.cvv)) {
    errors.push('CVV must be 3 or 4 digits');
  }
  
  // Expiry validation
  if (credentials.expiry_month && credentials.expiry_year) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    const expiryYear = parseInt(credentials.expiry_year, 10);
    const expiryMonth = parseInt(credentials.expiry_month, 10);
    
    if (expiryYear < currentYear || 
        (expiryYear === currentYear && expiryMonth < currentMonth)) {
      errors.push('Card has expired');
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};