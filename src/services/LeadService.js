// src/services/LeadService.js

/**
 * Service for managing leads in the DiasporaLink website
 */

// Simulated database for development purposes
let leadsDb = [];
let nextId = 1;

/**
 * Create a new lead in the system
 * @param {Object} leadData - The lead's information
 * @param {string} leadData.fullName - Full name of the lead
 * @param {string} leadData.email - Email address of the lead
 * @param {string} leadData.country - Country of origin
 * @param {string} leadData.educationLevel - Current education level
 * @param {string} leadData.source - Source of the lead (e.g., homepage, facebook)
 * @returns {Promise<string>} - The ID of the created lead
 */
export const createLead = async (leadData) => {
  try {
    // Validate required fields
    if (!leadData.fullName || !leadData.email) {
      throw new Error('Name and email are required fields');
    }
    
    // Create lead object with timestamp
    const leadId = `lead_${nextId++}`;
    const newLead = {
      id: leadId,
      fullName: leadData.fullName,
      email: leadData.email,
      country: leadData.country || '',
      educationLevel: leadData.educationLevel || '',
      source: leadData.source || 'website',
      createdAt: new Date().toISOString(),
      isConverted: false
    };
    
    // Save to our mock database
    leadsDb.push(newLead);
    
    // In a real implementation, this would be an API call
    console.log('Lead created:', newLead);
    
    return leadId;
  } catch (error) {
    console.error('Failed to create lead:', error);
    throw error;
  }
};

/**
 * Update an existing lead
 * @param {string} leadId - ID of the lead to update
 * @param {Object} data - Updated lead data
 * @returns {Promise<boolean>} - Success status
 */
export const updateLead = async (leadId, data) => {
  try {
    const leadIndex = leadsDb.findIndex(lead => lead.id === leadId);
    
    if (leadIndex === -1) {
      throw new Error('Lead not found');
    }
    
    // Update lead with new data
    leadsDb[leadIndex] = {
      ...leadsDb[leadIndex],
      ...data
    };
    
    console.log('Lead updated:', leadsDb[leadIndex]);
    return true;
  } catch (error) {
    console.error('Failed to update lead:', error);
    throw error;
  }
};

/**
 * Get a lead by ID
 * @param {string} leadId - ID of the lead to retrieve
 * @returns {Promise<Object>} - The lead data
 */
export const getLead = async (leadId) => {
  try {
    const lead = leadsDb.find(lead => lead.id === leadId);
    
    if (!lead) {
      throw new Error('Lead not found');
    }
    
    return lead;
  } catch (error) {
    console.error('Failed to get lead:', error);
    throw error;
  }
};

/**
 * Convert a lead to a client
 * @param {string} leadId - ID of the lead to convert
 * @param {Object} userData - Additional user data for conversion
 * @returns {Promise<string>} - The new user ID
 */
export const convertLeadToClient = async (leadId, userData) => {
  try {
    const leadIndex = leadsDb.findIndex(lead => lead.id === leadId);
    
    if (leadIndex === -1) {
      throw new Error('Lead not found');
    }
    
    // Mark lead as converted
    leadsDb[leadIndex].isConverted = true;
    
    // In a real implementation, this would create a user record in the users collection
    const userId = `user_${new Date().getTime()}`;
    
    console.log('Lead converted to client:', leadId, 'New user ID:', userId);
    return userId;
  } catch (error) {
    console.error('Failed to convert lead:', error);
    throw error;
  }
};

/**
 * Get leads by source
 * @param {string} source - Source to filter by
 * @returns {Promise<Array>} - Array of leads from the specified source
 */
export const getLeadsBySource = async (source) => {
  try {
    return leadsDb.filter(lead => lead.source === source);
  } catch (error) {
    console.error('Failed to get leads by source:', error);
    throw error;
  }
};