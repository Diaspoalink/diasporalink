// Simple test script for email functionality

// Simulate browser environment for testing
global.window = { location: { hostname: 'mgx.dev', origin: 'https://diasporalink-p7cpmd-o0kgzd-a81ac1.mgx.dev' } };
global.btoa = (str) => Buffer.from(str).toString('base64');
global.console = console;

// Import node-fetch
import fetch from 'node-fetch';
import { execSync } from 'child_process';

// Manually export the sendEmailWithKit function
const KIT_API_KEY = 'EK7ZV_RoXMfIIyF5DmpmKg';
const KIT_API_SECRET = 'AKDyY4C5p32Mksf9ANOF9LVD5bid0raaQRmoTQa_wLg';
const KIT_API_BASE_URL = 'https://api.trykit.com';
const KIT_EMAIL_SENDER = 'diasporalink@noreplyemail.com';

// Implement a simple version of the sendEmailWithKit function
async function sendEmailWithKit(to, subject, body) {
  try {
    console.log(`Sending test email to ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body preview: ${body.substring(0, 100)}...`);
    
    // Convert API key and secret to base64 for Basic Auth
    const auth = btoa(`${KIT_API_KEY}:${KIT_API_SECRET}`);
    
    const emailData = {
      from: KIT_EMAIL_SENDER,
      to: to.trim().toLowerCase(),
      subject: subject,
      html: body,
    };
    
    console.log('Email request data:', JSON.stringify(emailData, null, 2));
    
    // Try API endpoints
    const endpoints = [
      `${KIT_API_BASE_URL}/api/email`,
      `${KIT_API_BASE_URL}/v1/messages`
    ];
    
    for (const endpoint of endpoints) {
      try {
        console.log(`Attempting to send email via endpoint: ${endpoint}`);
        
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${auth}`,
          },
          body: JSON.stringify(emailData),
        });

        console.log(`Response status from ${endpoint}:`, response.status);
        
        const responseText = await response.text();
        console.log(`Response text from ${endpoint}:`, responseText);
        
        let result;
        try {
          result = JSON.parse(responseText);
        } catch (e) {
          console.warn(`Failed to parse response as JSON:`, e);
          result = { text: responseText };
        }
        
        if (response.ok) {
          console.log(`Email sent successfully via ${endpoint}:`, result);
          return result;
        } else {
          console.warn(`Failed with endpoint ${endpoint}:`, result);
        }
      } catch (endpointError) {
        console.warn(`Error with endpoint ${endpoint}:`, endpointError);
      }
    }
    
    // If we reach here, all endpoints failed
    console.error('All API endpoints failed');
    logEmailSimulation(to, subject, body);
    return { success: false, error: 'All API endpoints failed', simulated: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    logEmailSimulation(to, subject, body);
    return { success: false, error: error.message, simulated: true };
  }
}

// Log email simulation
function logEmailSimulation(to, subject, body) {
  console.log(`[SIMULATION] Email sent to: ${to}`);
  console.log(`[SIMULATION] Subject: ${subject}`);
  console.log(`[SIMULATION] Body: ${body.substring(0, 100)}...`);
}

// Test the email sending function
async function runTest() {
  try {
    console.log('Starting email functionality test...');
    
    // Prepare test data mimicking a contact form submission
    const testData = {
      name: 'Test User',
      email: 'testuser@example.com',
      subject: 'general_inquiry',
      message: 'This is a test message to verify the contact form functionality.'
    };
    
    // Get the subject label (simulating what the contact form would do)
    const subjectOptions = [
      { value: 'general_inquiry', label: 'General Inquiry' },
      { value: 'visa_support', label: 'Visa Support Question' },
      { value: 'university_application', label: 'University Application' },
      { value: 'consultation_info', label: 'Consultation Information' },
      { value: 'partnership', label: 'Partnership Opportunity' },
      { value: 'other', label: 'Other' }
    ];
    
    const subjectLabel = subjectOptions.find(option => option.value === testData.subject)?.label || testData.subject;
    
    // Prepare email body (similar to what ContactPage.jsx would do)
    const emailBody = `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${testData.name} (${testData.email})</p>
      <p><strong>Subject:</strong> ${subjectLabel}</p>
      <p><strong>Message:</strong></p>
      <div style="padding: 15px; background-color: #f9f9f9; border-left: 3px solid #2c3e50; margin: 10px 0;">
        ${testData.message.replace(/\n/g, '<br>')}
      </div>
      <p><small>This message was sent from the DiasporaLink website contact form.</small></p>
    `;
    
    // Send email to support address (mimicking the contact form submission)
    const result = await sendEmailWithKit(
      'support@diasporalink.net',
      `[Website Contact] ${subjectLabel} - ${testData.name}`,
      emailBody
    );
    
    console.log('Test completed. Result:', result);
    return result;
  } catch (error) {
    console.error('Test failed:', error);
    return { success: false, error: error.message };
  }
}

// Run the test
try {
  console.log('Installing node-fetch if needed...');
  execSync('npm install node-fetch@2.6.7');
  console.log('Running test...');
  runTest();
} catch (e) {
  console.error('Error during setup or test:', e);
}
