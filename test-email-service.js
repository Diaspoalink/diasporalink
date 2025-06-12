// This test script checks the email service functionality with various test cases
// To run this in the browser, add this script tag to your HTML:
// <script type="module">
//   import { testEmailService } from './test-email-service.js';
//   window.runEmailTest = testEmailService;
// </script>

// Dynamically import the EmailService module
async function getEmailService() {
  if (typeof window !== 'undefined') {
    // In browser, use a dynamic import
    const module = await import('./src/services/EmailService.js');
    return module.sendEmailWithKit;
  } else {
    // In Node.js (though this won't work directly due to ESM/CJS differences)
    // You would need to transpile or use .mjs extension
    const { sendEmailWithKit } = await import('./src/services/EmailService.js');
    return sendEmailWithKit;
  }
}

// Utility to format console output
const formatOutput = (title, content) => {
  console.log('\n' + '='.repeat(80));
  console.log(`    ${title}`);
  console.log('='.repeat(80));
  console.log(content);
  console.log('='.repeat(80) + '\n');
};

// Function to test email sending with different test cases
async function testEmailService() {
  formatOutput('EMAIL SERVICE TEST SCRIPT', 'Testing DiasporaLink email functionality');
  
  // Get the email service function dynamically
  const sendEmailWithKit = await getEmailService();
  
  // Configuration for testing
  const testCases = [
    {
      name: 'Standard test case',
      to: 'support@diasporalink.net',
      subject: '[TEST] Normal Email Test',
      body: `
        <h2>Test Email - Standard</h2>
        <p>This is a standard test email to verify that the email service is working correctly.</p>
        <p>Time of test: ${new Date().toLocaleString()}</p>
      `
    },
    {
      name: 'Special characters test',
      to: 'support@diasporalink.net',
      subject: '[TEST] Special Chars & Symbols: äöü ñ € £ ¥',
      body: `
        <h2>Test Email - Special Characters</h2>
        <p>Testing with special characters: äöüßñ</p>
        <p>And symbols: €£¥$@&#%*(){}[]</p>
        <p>Time of test: ${new Date().toLocaleString()}</p>
      `
    },
    {
      name: 'Long content test',
      to: 'support@diasporalink.net',
      subject: '[TEST] Long Content Email Test',
      body: `
        <h2>Test Email - Long Content</h2>
        <p>This test email contains a larger amount of content to test how the email service handles longer messages.</p>
        ${Array(10).fill().map((_, i) => `<p>This is paragraph ${i+1} with some content to add length to the email. The DiasporaLink platform connects African diaspora with opportunities back home.</p>`).join('')}
        <p>Time of test: ${new Date().toLocaleString()}</p>
      `
    }
  ];

  // Run all test cases
  for (const testCase of testCases) {
    try {
      formatOutput(`RUNNING TEST: ${testCase.name}`, 
        `To: ${testCase.to}\nSubject: ${testCase.subject}\nBody length: ${testCase.body.length} characters`);
      
      console.log('Sending email...');
      const result = await sendEmailWithKit(testCase.to, testCase.subject, testCase.body);
      
      formatOutput('TEST RESULT: SUCCESS', JSON.stringify(result, null, 2));
    } catch (error) {
      formatOutput('TEST RESULT: FAILED', 
        `Error: ${error.message}\nStack: ${error.stack}\n\nThis indicates an issue with the email service that needs to be fixed.`);
    }
  }

  // Test the contact form format specifically
  try {
    const contactFormTest = {
      name: 'Contact form simulation',
      to: 'support@diasporalink.net',
      subject: '[Website Contact] General Inquiry - Test User',
      body: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> Test User (test.user@example.com)</p>
        <p><strong>Subject:</strong> General Inquiry</p>
        <p><strong>Message:</strong></p>
        <div style="padding: 15px; background-color: #f9f9f9; border-left: 3px solid #2c3e50; margin: 10px 0;">
          This is a test message simulating what would be sent from the contact form.<br>
          It includes line breaks<br>
          And multiple paragraphs.<br><br>
          Testing the contact form email format.
        </div>
        <p><small>This message was sent from the DiasporaLink website contact form.</small></p>
      `
    };

    formatOutput(`RUNNING TEST: ${contactFormTest.name}`,
      `To: ${contactFormTest.to}\nSubject: ${contactFormTest.subject}\nBody length: ${contactFormTest.body.length} characters`);
    
    console.log('Sending email...');
    const result = await sendEmailWithKit(contactFormTest.to, contactFormTest.subject, contactFormTest.body);
    
    formatOutput('CONTACT FORM TEST: SUCCESS', JSON.stringify(result, null, 2));
  } catch (error) {
    formatOutput('CONTACT FORM TEST: FAILED',
      `Error: ${error.message}\nStack: ${error.stack}\n\nThis indicates an issue with the email service that needs to be fixed.`);
  }
}

// Create a browser-friendly test runner function
async function runInBrowser() {
  try {
    // Create a nice UI for the test results
    const testContainer = document.createElement('div');
    testContainer.style.cssText = 'max-width: 800px; margin: 20px auto; padding: 20px; border-radius: 8px; box-shadow: 0 0 20px rgba(0,0,0,0.1); font-family: system-ui, -apple-system, sans-serif;';
    
    const heading = document.createElement('h1');
    heading.textContent = 'DiasporaLink Email Service Test';
    heading.style.cssText = 'color: #2c3e50; margin-bottom: 20px;';
    
    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'test-results';
    resultsContainer.style.cssText = 'background: #f8f9fa; padding: 15px; border-radius: 6px; margin-top: 20px; white-space: pre-wrap; font-family: monospace; max-height: 400px; overflow-y: auto; border: 1px solid #e9ecef;';
    
    const runButton = document.createElement('button');
    runButton.textContent = 'Run Email Tests';
    runButton.style.cssText = 'background: #4361ee; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-size: 16px; margin-top: 10px;';
    
    const statusElement = document.createElement('div');
    statusElement.style.cssText = 'margin-top: 15px; font-weight: bold;';
    statusElement.textContent = 'Ready to test';
    
    testContainer.appendChild(heading);
    testContainer.appendChild(statusElement);
    testContainer.appendChild(runButton);
    testContainer.appendChild(resultsContainer);
    
    document.body.appendChild(testContainer);
    
    // Capture console output
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    
    function redirectConsole(originalFn, prefix, color) {
      return function() {
        originalFn.apply(console, arguments);
        const args = Array.from(arguments).map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        );
        const text = `[${prefix}] ${args.join(' ')}`;
        const line = document.createElement('div');
        line.textContent = text;
        line.style.color = color;
        line.style.marginBottom = '5px';
        resultsContainer.appendChild(line);
        resultsContainer.scrollTop = resultsContainer.scrollHeight;
      };
    }
    
    runButton.addEventListener('click', async () => {
      // Override console methods to capture output
      console.log = redirectConsole(originalConsoleLog, 'INFO', '#0a58ca');
      console.error = redirectConsole(originalConsoleError, 'ERROR', '#dc3545');
      console.warn = redirectConsole(originalConsoleWarn, 'WARN', '#fd7e14');
      
      resultsContainer.innerHTML = '';
      statusElement.textContent = 'Running tests...';
      statusElement.style.color = '#0a58ca';
      runButton.disabled = true;
      
      try {
        await testEmailService();
        statusElement.textContent = 'Tests completed!';
        statusElement.style.color = '#198754';
      } catch (error) {
        console.error('Fatal test error:', error);
        statusElement.textContent = 'Test failed with errors';
        statusElement.style.color = '#dc3545';
      } finally {
        runButton.disabled = false;
        // Restore original console methods
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
        console.warn = originalConsoleWarn;
      }
    });
  } catch (error) {
    console.error('Error setting up test UI:', error);
  }
}

// Check if we're running in a browser or Node.js environment
if (typeof window === 'undefined') {
  // Node.js environment
  console.log('Running in Node.js environment');
  testEmailService().then(() => {
    console.log('Email service testing complete');
  }).catch(error => {
    console.error('Fatal error in test script:', error);
  });
} else {
  // Browser environment
  console.log('Running in browser environment');
  window.runEmailTest = testEmailService;
  window.setupEmailTest = runInBrowser;
  console.log('Test functions available:');
  console.log('- window.runEmailTest(): Run tests programmatically');
  console.log('- window.setupEmailTest(): Create a test UI');
}

// Export the test function
export { testEmailService, runInBrowser };