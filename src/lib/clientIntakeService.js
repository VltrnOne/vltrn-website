import api from './api';

/**
 * Fetches all client intakes
 * @returns {Promise<Array>} Array of client intakes
 */
export async function getClientIntakes() {
  try {
    console.log('ClientIntakeService: Fetching all client intakes');
    const res = await api.get('/client_intakes');
    console.log('ClientIntakeService: Response received', res);
    
    // Check for different response formats
    if (res.data && res.data.success === true && res.data.data) {
      return res.data.data; // Access the data property from the success response
    } else if (res.data && res.data.data) {
      return res.data.data; // Direct data access if not using success flag
    } else {
      return res.data; // Return raw data if no data property exists
    }
  } catch (error) {
    console.error('Error fetching client intakes:', error);
    throw error;
  }
}

/**
 * Fetch a single client intake by ID
 * @param {string} id - The client intake ID
 * @returns {Promise<Object>} The client intake object
 */
export async function getClientIntakeById(id) {
  try {
    const res = await api.get(`/client_intakes/${id}`);
    
    if (res.data && res.data.success === true && res.data.data) {
      return res.data.data;
    } else if (res.data && res.data.data) {
      return res.data.data;
    } else {
      return res.data;
    }
  } catch (error) {
    console.error(`Error fetching client intake with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Create a new client intake
 * @param {Object} data - The client intake data
 * @returns {Promise<Object>} The created client intake
 */
export async function createClientIntake(data) {
  try {
    const res = await api.post('/client_intakes', data);
    
    if (res.data && res.data.success === true && res.data.data) {
      return res.data.data;
    } else if (res.data && res.data.data) {
      return res.data.data;
    } else {
      return res.data;
    }
  } catch (error) {
    console.error('Error creating client intake:', error);
    throw error;
  }
}

/**
 * Update an existing client intake
 * @param {string} id - The client intake ID
 * @param {Object} data - The updated client intake data
 * @returns {Promise<Object>} The updated client intake
 */
export async function updateClientIntake(id, data) {
  try {
    const res = await api.put(`/client_intakes/${id}`, data);
    
    if (res.data && res.data.success === true && res.data.data) {
      return res.data.data;
    } else if (res.data && res.data.data) {
      return res.data.data;
    } else {
      return res.data;
    }
  } catch (error) {
    console.error(`Error updating client intake with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Delete a client intake
 * @param {string} id - The client intake ID
 * @returns {Promise<Object>} The response data
 */
export async function deleteClientIntake(id) {
  try {
    const res = await api.delete(`/client_intakes/${id}`);
    
    if (res.data && res.data.success === true && res.data.data) {
      return res.data.data;
    } else if (res.data && res.data.data) {
      return res.data.data;
    } else {
      return res.data;
    }
  } catch (error) {
    console.error(`Error deleting client intake with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Get client intakes for a specific user
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} Array of client intakes for the user
 */
export async function getClientIntakesByUserId(userId) {
  try {
    const res = await api.get(`/client_intakes?user_id=${userId}`);
    
    if (res.data && res.data.success === true && res.data.data) {
      return res.data.data;
    } else if (res.data && res.data.data) {
      return res.data.data;
    } else {
      return res.data;
    }
  } catch (error) {
    console.error(`Error fetching client intakes for user ID ${userId}:`, error);
    throw error;
  }
}