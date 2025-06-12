import React, { useState, useRef } from 'react';
import { testEmailSending } from '../services/EmailService';
import { sendChecklist, sendPaymentReceipt } from '../services/EmailService';

/**
 * A debug page for testing email functionality
 * This page is only meant for development and testing purposes
 */
const EmailDebugPage = () => {
  const [email, setEmail] = useState('');
  const [testResults, setTestResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedTest, setSelectedTest] = useState('direct');
  const logsRef = useRef(null);

  // Track console logs for debugging
  const [logs, setLogs] = useState([]);

  // Override console methods to capture logs
  React.useEffect(() => {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    const captureLog = (type, args) => {
      const timestamp = new Date().toISOString();
      const message = Array.from(args).map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      
      setLogs(prevLogs => [...prevLogs, { type, timestamp, message }]);
    };

    console.log = (...args) => {
      captureLog('log', args);
      originalLog.apply(console, args);
    };

    console.error = (...args) => {
      captureLog('error', args);
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      captureLog('warn', args);
      originalWarn.apply(console, args);
    };

    return () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  // Scroll to bottom of logs when they update
  React.useEffect(() => {
    if (logsRef.current) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight;
    }
  }, [logs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    setTestResults(null);
    
    try {
      let result;
      
      switch (selectedTest) {
        case 'direct':
          result = await testEmailSending(email);
          break;
        case 'checklist':
          result = await sendChecklist({ 
            email, 
            name: 'Test User',
            downloadLink: 'https://drive.google.com/file/d/1ym2YVYKA1_XGjJRsI60cOZPx3QUQYfoe/view?usp=drive_link'
          });
          break;
        case 'payment':
          result = await sendPaymentReceipt(
            { email, name: 'Test User' },
            {
              txRef: 'TEST-1234567890',
              reference: 'TEST-REF-1234',
              date: new Date().toISOString(),
              amount: '5000',
              currency: 'NGN',
              calendlyLink: 'https://calendly.com/diasporalink'
            }
          );
          break;
        default:
          throw new Error('Unknown test type');
      }
      
      setTestResults(result);
      setSuccess('Email test completed! Check console for details.');
    } catch (err) {
      setError(err.message || 'An unknown error occurred');
      console.error('Email test error:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Email Debug Page</h1>
      <p className="mb-6 text-gray-700 bg-yellow-100 p-4 rounded-lg border border-yellow-300">
        This page is for development and testing purposes only.
        Use it to troubleshoot email sending functionality.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Test Form Panel */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Test Email Sending</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Test Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter email address"
                required
              />
            </div>

            <div>
              <label htmlFor="testType" className="block text-sm font-medium text-gray-700 mb-1">
                Test Type
              </label>
              <select
                id="testType"
                value={selectedTest}
                onChange={(e) => setSelectedTest(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="direct">Direct API Test</option>
                <option value="checklist">Send Checklist Email</option>
                <option value="payment">Send Payment Receipt</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-white font-medium 
                ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {loading ? 'Testing...' : 'Run Email Test'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              <strong>Error:</strong> {error}
            </div>
          )}

          {success && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
              {success}
            </div>
          )}

          {testResults && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Test Results</h3>
              <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto text-sm">
                {JSON.stringify(testResults, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Console Logs Panel */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Console Logs</h2>
            <button
              onClick={clearLogs}
              className="text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
            >
              Clear Logs
            </button>
          </div>
          
          <div 
            ref={logsRef}
            className="bg-gray-900 text-gray-100 p-4 rounded-md h-96 overflow-y-auto font-mono text-sm"
          >
            {logs.length === 0 ? (
              <p className="text-gray-500">No logs yet. Run a test to see logs.</p>
            ) : (
              logs.map((log, index) => (
                <div 
                  key={index} 
                  className={`mb-2 ${
                    log.type === 'error' ? 'text-red-400' : 
                    log.type === 'warn' ? 'text-yellow-400' : 'text-green-400'
                  }`}
                >
                  <span className="text-gray-500 text-xs">[{log.timestamp}]</span>{' '}
                  <span className="whitespace-pre-wrap">{log.message}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Troubleshooting Tips</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Check if the API key and secret are correct</li>
          <li>Verify that the API endpoint URL is correct</li>
          <li>Make sure the email format is valid</li>
          <li>Check network requests in browser developer tools</li>
          <li>Try different email providers (Gmail, Outlook, etc.)</li>
        </ul>
      </div>
    </div>
  );
};

export default EmailDebugPage;