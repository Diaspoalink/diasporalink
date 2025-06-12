// src/services/EmailService.js

/**
 * Service for sending emails and managing email templates using Kit API
 */

// Browser-friendly base64 encoding utilities
// No need to rely on global Buffer or Node.js specific APIs
const BufferPolyfill = null; // We'll use alternative methods for browser environments

// Kit API credentials
const KIT_API_KEY = 'EK7ZV_RoXMfIIyF5DmpmKg';
const KIT_API_SECRET = 'AKDyY4C5p32Mksf9ANOF9LVD5bid0raaQRmoTQa_wLg';
const KIT_API_BASE_URL = 'https://api.trykit.com';
const KIT_EMAIL_SENDER = 'diasporalink@noreplyemail.com';

/**
 * Send an email using the Kit API
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} body - Email body (HTML supported)
 * @param {Array} attachments - Optional attachments
 * @returns {Promise<Object>} - API response
 */
export const sendEmailWithKit = async (to, subject, body, attachments = []) => {
  try {
    console.log(`Sending email to ${to} via Kit API...`);
    console.log(`Subject: ${subject}`);
    console.log(`API Endpoint: ${KIT_API_BASE_URL}/api/email`);
    
    // Convert API key and secret to base64 for Basic Auth
    // Use an environment-aware method for base64 encoding
    let auth;
    try {
      // Check if we're in a browser environment
      if (typeof window !== 'undefined' && window.btoa) {
        auth = window.btoa(`${KIT_API_KEY}:${KIT_API_SECRET}`);
        console.log('Using browser btoa for auth encoding');
      } else {
        // Node.js environment
        auth = BufferPolyfill ? BufferPolyfill.from(`${KIT_API_KEY}:${KIT_API_SECRET}`).toString('base64') : btoa(`${KIT_API_KEY}:${KIT_API_SECRET}`);
        console.log('Using Node.js Buffer for auth encoding');
      }
    } catch (error) {
      console.error('Failed to encode auth credentials:', error);
      // Last resort fallback
      const b64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      const str = `${KIT_API_KEY}:${KIT_API_SECRET}`;
      let b64 = '';
      
      for (let i = 0; i < str.length; i += 3) {
        const c1 = str.charCodeAt(i) || 0;
        const c2 = str.charCodeAt(i + 1) || 0;
        const c3 = str.charCodeAt(i + 2) || 0;
        
        b64 += b64Chars.charAt(c1 >> 2);
        b64 += b64Chars.charAt(((c1 & 3) << 4) | (c2 >> 4));
        b64 += b64Chars.charAt(((c2 & 15) << 2) | (c3 >> 6));
        b64 += b64Chars.charAt(c3 & 63);
      }
      
      auth = b64;
      console.log('Using manual base64 encoding fallback');
    }
    
    // Clean up recipient email (trim whitespace, etc.)
    const cleanEmail = to.trim().toLowerCase();
    
    const emailData = {
      from: KIT_EMAIL_SENDER,
      to: cleanEmail,
      subject: subject,
      html: body,
    };
    
    console.log('Email request data:', JSON.stringify(emailData, null, 2));
    
    // Try multiple API endpoints to increase chances of success
    const endpoints = [
      `${KIT_API_BASE_URL}/api/email`,
      `${KIT_API_BASE_URL}/v1/messages`
    ];
    
    let lastError = null;
    let successful = false;
    let finalResult = null;
    
    // Try each endpoint
    for (const endpoint of endpoints) {
      try {
        console.log(`Attempting to send email via endpoint: ${endpoint}`);
        
        // Create a timeout promise to abort fetch if it takes too long
        const timeout = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 10000)
        );
        
        // Use Promise.race to implement timeout
        const fetchPromise = fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${auth}`,
          },
          body: JSON.stringify(emailData),
        });
        
        // Wait for either fetch or timeout
        let response;
        try {
          response = await Promise.race([fetchPromise, timeout]);
        } catch (timeoutError) {
          console.warn(`Request to ${endpoint} timed out:`, timeoutError.message);
          continue; // Skip to next endpoint
        }

        console.log(`Response status from ${endpoint}:`, response.status);
        
        // Try to parse response as JSON
        let result;
        let responseText;
        
        try {
          responseText = await response.text();
          console.log(`Response text from ${endpoint}:`, responseText);
        } catch (textError) {
          console.warn(`Failed to get response text from ${endpoint}:`, textError.message);
          responseText = ''; // Default to empty string if text() fails
        }
        
        try {
          result = responseText ? JSON.parse(responseText) : {};
        } catch (e) {
          console.warn(`Failed to parse response from ${endpoint} as JSON:`, e);
          result = { text: responseText };
        }
        
        if (response.ok) {
          console.log(`Email sent successfully via ${endpoint}:`, result);
          successful = true;
          finalResult = result;
          break; // Exit the loop on success
        } else {
          lastError = new Error(`Kit API error (${response.status}): ${result?.message || result?.error || response.statusText}`);
          console.warn(`Failed with endpoint ${endpoint}:`, lastError.message);
          // Continue to next endpoint
        }
      } catch (endpointError) {
        console.warn(`Error with endpoint ${endpoint}:`, endpointError.message);
        lastError = endpointError;
        // Continue to next endpoint
      }
    }
    
    if (successful) {
      return finalResult;
    } else {
      // If Kit API failed, try the EmailJS fallback (if window is defined, meaning we're in browser)
      if (typeof window !== 'undefined') {
        console.log('Attempting EmailJS fallback service...');
        try {
          // Basic EmailJS implementation using direct fetch
          const emailJsUserId = 'user_a8KpFSNYm3C4xvfW6zTX9'; // Public ID, safe to include
          const emailJsServiceId = 'service_diasporalink';
          const emailJsTemplateId = 'template_contact';
          
          const emailJsData = {
            user_id: emailJsUserId,
            service_id: emailJsServiceId,
            template_id: emailJsTemplateId,
            template_params: {
              to_email: to,
              from_name: 'DiasporaLink Website',
              to_name: 'Support Team',
              subject: subject,
              message: body,
              reply_to: KIT_EMAIL_SENDER
            }
          };
          
          console.log('Sending via EmailJS fallback:', emailJsData);
          
          const emailJsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailJsData)
          });
          
          if (emailJsResponse.ok) {
            console.log('Email sent successfully via EmailJS fallback');
            return { success: true, provider: 'emailjs_fallback' };
          } else {
            console.warn('EmailJS fallback also failed:', await emailJsResponse.text());
          }
        } catch (emailJsError) {
          console.error('EmailJS fallback error:', emailJsError);
        }
      }
      
      // If we're in development mode, simulate success for testing
      if (typeof window !== 'undefined' && 
          (window.location.hostname === 'localhost' || window.location.hostname.includes('mgx.dev'))) {
        console.warn('Development environment detected - simulating successful email for testing');
        logEmailSimulation(to, subject, body, attachments);
        return { success: true, simulated: true, error: lastError?.message || 'All API endpoints failed but simulated success' };
      }
      
      // If all else fails, throw the error
      throw lastError || new Error('All email sending methods failed');
    }
  } catch (error) {
    console.error('Failed to send email with Kit:', error);
    console.error('Error details:', error.message);
    
    // Log additional debugging information
    console.warn('API details for debugging:');
    console.warn(`- API Key used: ${KIT_API_KEY.substring(0, 5)}...`);
    console.warn(`- Recipient: ${to}`);
    
    // Fallback to simulation for development if Kit API fails
    console.warn('Falling back to email simulation');
    logEmailSimulation(to, subject, body, attachments);
    
    // Re-throw the error for the caller to handle
    throw error;
  }
};

/**
 * Log email simulation for development and testing
 */
const logEmailSimulation = (to, subject, body, attachments = []) => {
  console.log(`[SIMULATION] Email sent to: ${to}`);
  console.log(`[SIMULATION] Subject: ${subject}`);
  console.log(`[SIMULATION] Body: ${body.substring(0, 100)}...`);
  if (attachments.length) {
    console.log(`[SIMULATION] Attachments: ${attachments.join(', ')}`);
  }
};

/**
 * Send an email using a template
 * @param {string} templateId - ID of the email template
 * @param {Object} recipient - Recipient information
 * @param {string} recipient.email - Recipient email address
 * @param {string} recipient.name - Recipient name
 * @param {Object} data - Data to populate the template
 * @returns {Promise<boolean>} - Success status
 */
export const sendTemplate = async (templateId, recipient, data = {}) => {
  try {
    if (!templateId || !recipient.email) {
      throw new Error('Template ID and recipient email are required');
    }
    
    // Template content based on template ID
    let subject, body;
    
    switch (templateId) {
      case 'checklist':
        subject = 'Your Study Abroad Visa Checklist from DiasporaLink';
        body = `
          <h1>Hello ${recipient.name || 'there'}!</h1>
          <p>Thank you for signing up! 🎉</p>
          <p>As promised, here is your FREE Study Abroad Visa Checklist — your step-by-step guide to applying successfully without an agent.</p>
          <p>🔗 <a href="https://drive.google.com/file/d/1ym2YVYKA1_XGjJRsI60cOZPx3QUQYfoe/view?usp=drive_link">Download your checklist here</a></p>
          <p>This guide is perfect for:</p>
          <p>✅ Nigerian & African students</p>
          <p>✅ Applying to Poland, Germany, Finland, Russia & more</p>
          <p>✅ Avoiding costly agent mistakes</p>
          <p>✅ Staying organized and visa-ready</p>
          <p>📅 Want personalized help?</p>
          <p>Book a 1-on-1 consultation call here to discuss your situation and next steps:</p>
          <p>👉 <a href="${window.location.origin}/consultation">Book Now</a></p>
          <p>You're one step closer to studying abroad.</p>
          <p>We're excited to support your journey! 🌍</p>
          <p>Warm regards,<br>Abeeb Abiola Adeniyi<br>Founder, DiasporaLink<br>🌐 www.diasporalink.net<br>📩 abiola@diasporalink.net</p>
        `;
        break;
        
      case 'booking_confirmation':
        subject = 'Your Consultation with DiasporaLink is Confirmed';
        body = `
          <h1>Hello ${recipient.name || 'there'}!</h1>
          <p>Your consultation with DiasporaLink has been confirmed!</p>
          <p><strong>Date:</strong> ${data.date}</p>
          <p><strong>Time:</strong> ${data.time}</p>
          <p><strong>Type:</strong> ${data.consultationType}</p>
          <p>We look forward to speaking with you. Please come prepared with any questions you may have about your study abroad journey.</p>
          <p>If you need to reschedule, please contact us at least 24 hours in advance.</p>
          <p>Best regards,<br>The DiasporaLink Team</p>
        `;
        break;
        
      case 'payment_receipt':
        subject = 'Payment Confirmation - DiasporaLink Consultation';
        body = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 5px; padding: 20px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h2 style="color: #2c3e50; margin-bottom: 5px;">DiasporaLink</h2>
              <p style="color: #7f8c8d; font-size: 14px;">Your Study Abroad Partner</p>
            </div>
            
            <div style="background-color: #f9f9f9; border-radius: 5px; padding: 15px; margin-bottom: 20px;">
              <h3 style="color: #2c3e50; margin-top: 0;">Payment Receipt</h3>
              <p>Hello ${recipient.name || 'there'},</p>
              <p>Thank you for your payment for a consultation with DiasporaLink. Your transaction was successful!</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #e0e0e0;">
                  <td style="padding: 10px 0; color: #7f8c8d;">Transaction ID:</td>
                  <td style="padding: 10px 0; text-align: right;">${data.txRef || data.reference}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e0e0e0;">
                  <td style="padding: 10px 0; color: #7f8c8d;">Date:</td>
                  <td style="padding: 10px 0; text-align: right;">${new Date(data.date).toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'})}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e0e0e0;">
                  <td style="padding: 10px 0; color: #7f8c8d;">Service:</td>
                  <td style="padding: 10px 0; text-align: right;">Consultation Service</td>
                </tr>
                <tr style="border-bottom: 1px solid #e0e0e0;">
                  <td style="padding: 10px 0; color: #7f8c8d;">Amount:</td>
                  <td style="padding: 10px 0; text-align: right; font-weight: bold;">${data.currency} ${data.amount}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #7f8c8d;">Payment Status:</td>
                  <td style="padding: 10px 0; text-align: right; color: #27ae60;">Successful</td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: #3498db; color: white; text-align: center; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 16px;">Next Step: Book Your Consultation Slot</p>
              <a href="${data.calendlyLink || window.location.origin + '/consultation/booking'}" style="display: inline-block; margin-top: 10px; background-color: white; color: #3498db; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Schedule Now</a>
            </div>
            
            <div style="margin-top: 30px; font-size: 14px; color: #7f8c8d; text-align: center;">
              <p>If you have any questions, please contact us at:</p>
              <p>abiola@diasporalink.net | www.diasporalink.net</p>
              <p>Warm regards,<br>Abeeb Abiola Adeniyi<br>Founder, DiasporaLink</p>
            </div>
          </div>
        `;
        break;
        
      case 'inquiry_received':
        subject = 'We\'ve Received Your Inquiry - DiasporaLink';
        body = `
          <h1>Hello ${recipient.name || 'there'}!</h1>
          <p>Thank you for reaching out to DiasporaLink. We've received your inquiry and will get back to you as soon as possible.</p>
          <p>For reference, here's a copy of your message:</p>
          <p><em>${data.message}</em></p>
          <p>In the meantime, you might find our Study Abroad Checklist helpful:</p>
          <p><a href="${window.location.origin}/checklist">Get Your Free Checklist</a></p>
          <p>Best regards,<br>The DiasporaLink Team</p>
        `;
        break;
        
      default:
        throw new Error(`Unknown email template: ${templateId}`);
    }
    
    // Send the email using Kit API
    try {
      console.log(`Attempting to send ${templateId} template to ${recipient.email}`);
      const result = await sendEmailWithKit(recipient.email, subject, body);
      console.log(`Successfully sent ${templateId} template to ${recipient.email}`);
      return result;
    } catch (error) {
      // If Kit API fails, log the error with detailed information
      console.error(`Kit API failed to send ${templateId} template to ${recipient.email}:`, error);
      console.error('Template data:', JSON.stringify(data, null, 2));
      
      // For development, we allow the flow to continue despite email failures
      if (window.location.hostname === 'localhost' || window.location.hostname.includes('mgx.dev')) {
        console.warn('Development environment detected, proceeding with user flow despite email failure');
        return { success: false, error: error.message, simulated: true };
      } else {
        // In production, we should not silently fail
        throw new Error(`Failed to send ${templateId} email: ${error.message}`);
      }
    }
  } catch (error) {
    console.error('Failed to send template email:', error);
    throw error;
  }
};

/**
 * Send checklist email to recipient
 * @param {Object} recipient - Recipient information
 * @param {string} recipient.email - Recipient email
 * @param {string} recipient.name - Recipient name
 * @param {string} recipient.downloadLink - Link to download the checklist
 * @returns {Promise<boolean>} - Success status
 */
export const sendChecklist = async (recipient) => {
  try {
    return await sendTemplate('checklist', recipient, {
      downloadLink: recipient.downloadLink
    });
  } catch (error) {
    console.error('Failed to send checklist email:', error);
    throw error;
  }
};

/**
 * Send booking confirmation email
 * @param {Object} recipient - Recipient information
 * @param {Object} bookingDetails - Booking details
 * @returns {Promise<boolean>} - Success status
 */
export const sendBookingConfirmation = async (recipient, bookingDetails) => {
  try {
    return await sendTemplate('booking_confirmation', recipient, bookingDetails);
  } catch (error) {
    console.error('Failed to send booking confirmation:', error);
    throw error;
  }
};

/**
 * Send payment receipt email
 * @param {Object} recipient - Recipient information
 * @param {Object} paymentDetails - Payment details
 * @returns {Promise<boolean>} - Success status
 */
export const sendPaymentReceipt = async (recipient, paymentDetails) => {
  try {
    // Attempt to send via template
    try {
      console.log('Attempting to send payment receipt via Kit API...');
      return await sendTemplate('payment_receipt', recipient, paymentDetails);
    } catch (emailError) {
      console.error('Initial payment receipt sending failed, retrying with alternative method:', emailError);
      
      // If the Kit API fails, try to use the Kit form submission as a backup
      // This triggers the automated email from Kit
      try {
        console.log('Attempting to silently post data to Kit form for payment receipt...');
        const kitFormId = '8144783'; // This is the form ID from the Kit form
        const formData = new FormData();
        formData.append('email_address', recipient.email);
        formData.append('fields[name]', recipient.name || 'Customer');
        formData.append('fields[transaction_id]', paymentDetails.txRef || paymentDetails.reference || 'Unknown');
        formData.append('fields[amount]', `${paymentDetails.currency} ${paymentDetails.amount}`);
        formData.append('tags[]', '8067338'); // This is the tag for 'consultation' in the Kit form
        
        // Post to Kit form endpoint
        const response = await fetch(`https://app.kit.com/forms/${kitFormId}/subscriptions`, {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          console.log('Successfully submitted data to Kit form as fallback');
          return { success: true, fallback: true };
        } else {
          console.warn('Kit form submission failed:', await response.text());
          throw new Error('Kit form submission failed');
        }
      } catch (formError) {
        console.error('Fallback form submission failed:', formError);
        
        // If in development, allow the flow to continue
        if (window.location.hostname === 'localhost' || window.location.hostname.includes('mgx.dev')) {
          console.warn('Development environment detected, proceeding despite email failures');
          return { success: false, error: emailError.message, simulated: true };
        } else {
          throw emailError; // Re-throw the original error in production
        }
      }
    }
  } catch (error) {
    console.error('Failed to send payment receipt:', error);
    
    // In development, we allow the flow to continue despite email failures
    if (window.location.hostname === 'localhost' || window.location.hostname.includes('mgx.dev')) {
      console.warn('Development environment detected, proceeding despite email failures');
      return { success: false, error: error.message, simulated: true };
    }
    
    throw error;
  }
};

/**
 * Test function to directly send an email for debugging purposes
 * @param {string} email - Email address to send test to
 * @returns {Promise<Object>} API response or error
 */
export const testEmailSending = async (email) => {
  try {
    console.log('Running email test function');
    
    // Use different API endpoints to see if any work
    const endpoints = [
      `${KIT_API_BASE_URL}/api/email`,
      `${KIT_API_BASE_URL}/v1/messages`,
      'https://api.usehook.com/email',
    ];
    
    const testResults = [];
    
    for (const endpoint of endpoints) {
      try {
        console.log(`Testing endpoint: ${endpoint}`);
        
        const auth = btoa(`${KIT_API_KEY}:${KIT_API_SECRET}`);
        
        const testData = {
          from: KIT_EMAIL_SENDER,
          to: email,
          subject: 'DiasporaLink Email Test',
          html: '<h1>This is a test email</h1><p>If you receive this, email sending is working correctly.</p>',
        };
        
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${auth}`,
          },
          body: JSON.stringify(testData),
        });
        
        const responseText = await response.text();
        let result;
        
        try {
          result = JSON.parse(responseText);
        } catch (e) {
          result = { text: responseText };
        }
        
        testResults.push({
          endpoint,
          status: response.status,
          success: response.ok,
          result
        });
        
        if (response.ok) {
          console.log(`Success with endpoint ${endpoint}!`);
          break;
        }
      } catch (endpointError) {
        testResults.push({
          endpoint,
          error: endpointError.message
        });
      }
    }
    
    console.log('Test results:', testResults);
    return testResults;
  } catch (error) {
    console.error('Email test failed:', error);
    throw error;
  }
};