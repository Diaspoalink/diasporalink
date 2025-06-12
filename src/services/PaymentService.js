// src/services/PaymentService.js

/**
 * Service for handling payments via Flutterwave integration
 * Using Flutterwave JavaScript SDK for direct integration
 */

import { trackEvent } from './AnalyticsService';
import { sendPaymentReceipt } from './EmailService';
import { 
  FLUTTERWAVE_PUBLIC_KEY, 
  FLUTTERWAVE_CONFIG, 
  createPaymentConfig
} from '../config/flutterwave';

// Simulated transactions database
let transactionsDb = [];
let nextTransactionId = 1;

/**
 * Load Flutterwave JavaScript SDK
 * This function ensures the Flutterwave SDK is loaded only once
 * @returns {Promise<void>}
 */
const loadFlutterwaveSDK = () => {
  return new Promise((resolve, reject) => {
    // If already loaded, resolve immediately
    if (window.FlutterwaveCheckout) {
      return resolve();
    }
    
    // Create script element
    const script = document.createElement('script');
    script.src = 'https://checkout.flutterwave.com/v3.js';
    script.async = true;
    
    // Set up event handlers
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Flutterwave SDK'));
    
    // Append script to document
    document.body.appendChild(script);
  });
};

/**
 * Initialize a payment through Flutterwave
 * @param {number} amount - Payment amount
 * @param {string} currency - Currency code (e.g., USD, NGN)
 * @param {string} email - Customer email
 * @param {string} name - Customer name
 * @param {Object} metadata - Additional payment metadata
 * @param {string} description - Payment description
 * @returns {Promise<Object>} - Payment initialization data
 */
export const initializePayment = async (amount, currency, email, name, metadata = {}, description = 'DiasporaLink Consultation') => {
  try {
    if (!amount || !currency || !email || !name) {
      throw new Error('Amount, currency, email, and name are required');
    }
    
    // Generate unique transaction reference
    const reference = `DIASPORA-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const transactionId = `${nextTransactionId++}`;
    
    // Get payment configuration from helper
    const paymentConfig = createPaymentConfig(amount, currency, { email, name }, metadata, description);
    
    // Store transaction in our mock database
    const transaction = {
      id: transactionId,
      reference: paymentConfig.tx_ref,
      amount,
      currency,
      customer: { email, name },
      metadata: {
        ...metadata
      },
      description,
      status: 'initialized',
      created_at: new Date().toISOString()
    };
    
    transactionsDb.push(transaction);
    
    // Track analytics event
    trackEvent('payment', 'initialized', `${currency} ${amount}`);
    
    console.log('Payment initialized:', transaction);
    
    return {
      status: 'success',
      message: 'Payment initialized',
      data: {
        paymentConfig,
        reference: paymentConfig.tx_ref,
        transactionId,
        recommendedTestCard: null
      }
    };
  } catch (error) {
    console.error('Failed to initialize payment:', error);
    throw error;
  }
};

/**
 * Open Flutterwave payment popup with provided configuration
 * @param {Object} paymentConfig - Flutterwave payment configuration
 * @param {Function} onClose - Callback for when payment modal is closed
 * @param {Function} onSuccess - Callback for successful payment
 * @returns {Promise<void>}
 */
export const openFlutterwavePopup = async (paymentConfig, onClose, onSuccess) => {
  try {
    // Load Flutterwave SDK if not already loaded
    await loadFlutterwaveSDK();
    
    // Configure payment
    const config = {
      ...paymentConfig,
      payment_options: 'card',
      staging: false,
      payment_plan: null,
      redirect_url: null,
      customer: {
        ...paymentConfig.customer,
        phone_number: paymentConfig.customer.phone_number || '08000000000'
      },
      customizations: {
        ...paymentConfig.customizations,
        title: 'DiasporaLink',
        description: paymentConfig.customizations.description
      },
      meta: {
        ...paymentConfig.meta
      },
      callback_url: window.location.origin + '/payment-confirmation',
      env: FLUTTERWAVE_CONFIG.environment,
      subaccounts: null,
      hosted_payment: false,
      callback: (response) => {
        // Handle successful payment
        console.log('Payment successful:', response);
        if (typeof onSuccess === 'function') {
          onSuccess(response);
        }
      },
      onclose: () => {
        // Handle payment modal closure
        console.log('Payment modal closed');
        if (typeof onClose === 'function') {
          onClose();
        }
      }
    };
    
    // Open Flutterwave checkout
    window.FlutterwaveCheckout(config);
    
  } catch (error) {
    console.error('Failed to open payment popup:', error);
    throw error;
  }
};

/**
 * Verify a transaction by reference
 * @param {string} reference - Transaction reference
 * @param {string} [transaction_id] - Flutterwave transaction ID (for real verification)
 * @returns {Promise<Object>} - Verified transaction data
 */
export const verifyTransaction = async (reference, transaction_id = null) => {
  try {
    if (!reference) {
      throw new Error('Transaction reference is required');
    }
    
    // Find transaction in our mock database
    const transaction = transactionsDb.find(t => t.reference === reference);
    
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    
    // In production, we would verify with Flutterwave API
    // For test environment, we're simulating the verification
    
    // For now, simulate successful verification
    transaction.status = 'successful';
    transaction.verified_at = new Date().toISOString();
    if (transaction_id) {
      transaction.flw_transaction_id = transaction_id;
    }
    
    // Track analytics event
    trackEvent('payment', 'verified', transaction.reference);
    
    console.log('Payment verified:', transaction);
    
    // Send payment receipt
    try {
      await sendPaymentReceipt(
        {
          email: transaction.customer.email,
          name: transaction.customer.name
        },
        {
          amount: transaction.amount,
          currency: transaction.currency,
          reference: transaction.reference,
          date: new Date().toISOString(),
          description: transaction.description || 'DiasporaLink Consultation',
          test_transaction: false // Production mode
        }
      );
    } catch (e) {
      console.error('Failed to send payment receipt:', e);
      // Don't fail verification if email fails
    }
    
    return {
      status: 'success',
      message: 'Payment verified',
      data: {
        amount: transaction.amount,
        currency: transaction.currency,
        paymentStatus: transaction.status,
        paymentMethod: transaction_id ? 'flutterwave' : 'card',
        transactionId: transaction.id,
        reference: transaction.reference,
        metadata: transaction.metadata,
        is_test: false // Production mode
      }
    };
  } catch (error) {
    console.error('Failed to verify transaction:', error);
    throw error;
  }
};

/**
 * Handle Flutterwave webhook notifications
 * @param {Object} payload - Webhook payload from Flutterwave
 * @returns {Promise<boolean>} - Success status
 */
export const handleWebhook = async (payload) => {
  try {
    if (!payload || !payload.event || !payload.data) {
      throw new Error('Invalid webhook payload');
    }
    
    const { event, data } = payload;
    
    // Process based on event type
    if (event === 'charge.completed') {
      // Find transaction in our mock database
      const transactionIndex = transactionsDb.findIndex(t => t.reference === data.tx_ref);
      
      if (transactionIndex !== -1) {
        // Update transaction with webhook data
        transactionsDb[transactionIndex] = {
          ...transactionsDb[transactionIndex],
          status: data.status,
          payment_type: data.payment_type,
          charged_amount: data.charged_amount,
          processor_response: data.processor_response,
          updated_at: new Date().toISOString()
        };
        
        // If payment was successful, send receipt
        if (data.status === 'successful') {
          await sendPaymentReceipt({
            email: data.customer.email,
            name: data.customer.name
          }, {
            amount: data.amount,
            currency: data.currency,
            reference: data.tx_ref,
            date: new Date().toISOString(),
            test_transaction: false
          });
          
          // Track analytics conversion
          trackEvent('payment', 'completed', `${data.currency} ${data.amount}`, data.amount);
        }
        
        console.log('Webhook processed:', event, data.status);
        return true;
      } else {
        console.warn('Transaction not found for webhook:', data.tx_ref);
        return false;
      }
    }
    
    // Ignore other event types
    console.log('Ignored webhook event:', event);
    return true;
  } catch (error) {
    console.error('Failed to process webhook:', error);
    throw error;
  }
};

/**
 * Get transaction details
 * @param {string} id - Transaction ID
 * @returns {Promise<Object>} - Transaction details
 */
export const getTransactionDetails = async (id) => {
  try {
    if (!id) {
      throw new Error('Transaction ID is required');
    }
    
    // Find transaction in our mock database
    const transaction = transactionsDb.find(t => t.id === id);
    
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    
    return transaction;
  } catch (error) {
    console.error('Failed to get transaction details:', error);
    throw error;
  }
};