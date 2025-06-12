// src/services/ChecklistService.js

/**
 * Service for managing checklist downloads and related functionality
 */

import { getLead, updateLead } from './LeadService';
import { sendChecklist } from './EmailService';
import { trackEvent } from './AnalyticsService';

// Simulated database for development purposes
let downloadsDb = [];
let nextId = 1;

/**
 * Send checklist email to a user
 * @param {Object} user - User data
 * @param {string} checklistPath - Path to the checklist PDF
 * @returns {Promise<boolean>} - Success status
 */
export const sendChecklistEmail = async (user, checklistPath = '/assets/documents/study-abroad-checklist.pdf') => {
  try {
    if (!user || !user.email) {
      throw new Error('Valid user with email is required');
    }

    const success = await sendChecklist({
      email: user.email,
      name: user.fullName,
      downloadLink: `${window.location.origin}${checklistPath}`
    });

    if (success) {
      console.log('Checklist email sent successfully to:', user.email);
      trackEvent('checklist', 'email_sent', user.email);
      return true;
    } else {
      throw new Error('Failed to send checklist email');
    }
  } catch (error) {
    console.error('Failed to send checklist email:', error);
    throw error;
  }
};

/**
 * Record a checklist download
 * @param {string} userId - ID of the user downloading
 * @param {Object} downloadInfo - Additional download information
 * @returns {Promise<string>} - The download ID
 */
export const recordDownload = async (userId, downloadInfo = {}) => {
  try {
    // Create download record
    const downloadId = `download_${nextId++}`;
    const download = {
      id: downloadId,
      userId,
      downloadDate: new Date().toISOString(),
      ipAddress: downloadInfo.ipAddress || '0.0.0.0',
      source: downloadInfo.source || 'unknown'
    };
    
    // Add to mock database
    downloadsDb.push(download);
    
    // Update user record if userId provided
    if (userId) {
      try {
        const lead = await getLead(userId);
        await updateLead(userId, {
          hasDownloadedChecklist: true,
          lastActivity: new Date().toISOString()
        });
      } catch (e) {
        // Handle case where lead doesn't exist but don't fail the operation
        console.warn('Could not update lead record:', e);
      }
    }
    
    // Track analytics event
    trackEvent('checklist', 'download', downloadInfo.source || 'direct');
    
    console.log('Download recorded:', download);
    return downloadId;
  } catch (error) {
    console.error('Failed to record download:', error);
    throw error;
  }
};

/**
 * Get download statistics
 * @returns {Promise<Object>} - Download statistics
 */
export const getDownloadStats = async () => {
  try {
    const totalDownloads = downloadsDb.length;
    const sourceCounts = downloadsDb.reduce((acc, download) => {
      const source = download.source;
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {});
    
    const lastWeekDownloads = downloadsDb.filter(download => {
      const downloadDate = new Date(download.downloadDate);
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return downloadDate >= oneWeekAgo;
    }).length;
    
    return {
      totalDownloads,
      sourceCounts,
      lastWeekDownloads
    };
  } catch (error) {
    console.error('Failed to get download stats:', error);
    throw error;
  }
};