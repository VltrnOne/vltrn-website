import api from './api';

// Error handler wrapper
const handleApiRequest = async (requestFn) => {
  try {
    console.log('Making API request...');
    const response = await requestFn();
    console.log('API Response:', response);
    
    // Check if the response has the expected structure
    if (response.data && response.data.success === true && response.data.data) {
      return response.data.data; // Return the data property from the success response
    } else if (response.data && Array.isArray(response.data)) {
      return response.data; // Return array data directly
    } else if (response.data && response.data.data) {
      return response.data.data; // Fallback if success flag isn't present
    } else {
      return response.data; // Return raw data if no 'data' property exists
    }
  } catch (error) {
    // Enhanced error reporting
    const errorDetails = {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      method: error.config?.method,
      responseData: error.response?.data
    };
    
    console.error('API Request Error:', errorDetails);
    
    // Improve error message based on type of error
    if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
      throw new Error('Cannot connect to API server. Please ensure the server is running.');
    }
    
    throw error;
  }
};

/**
 * Users API
 */
export const getUsers = () => handleApiRequest(() => api.get('/users'));
export const getUserById = (id) => handleApiRequest(() => api.get(`/users/${id}`));
export const createUser = (data) => handleApiRequest(() => api.post('/users', data));
export const updateUser = (id, data) => handleApiRequest(() => api.put(`/users/${id}`, data));
export const deleteUser = (id) => handleApiRequest(() => api.delete(`/users/${id}`));

/**
 * Client Intakes API
 */
export const getClientIntakes = () => handleApiRequest(() => api.get('/client_intakes'));
export const getClientIntakeById = (id) => handleApiRequest(() => api.get(`/client_intakes/${id}`));
export const createClientIntake = (data) => handleApiRequest(() => api.post('/client_intakes', data));
export const updateClientIntake = (id, data) => handleApiRequest(() => api.put(`/client_intakes/${id}`, data));
export const deleteClientIntake = (id) => handleApiRequest(() => api.delete(`/client_intakes/${id}`));
export const getClientIntakesByUserId = (userId) => handleApiRequest(() => api.get(`/client_intakes?user_id=${userId}`));

/**
 * Projects API
 */
export const getProjects = () => handleApiRequest(() => api.get('/projects'));
export const getProjectById = (id) => handleApiRequest(() => api.get(`/projects/${id}`));
export const createProject = (data) => handleApiRequest(() => api.post('/projects', data));
export const updateProject = (id, data) => handleApiRequest(() => api.put(`/projects/${id}`, data));
export const deleteProject = (id) => handleApiRequest(() => api.delete(`/projects/${id}`));

/**
 * Tasks API
 */
export const getTasks = () => handleApiRequest(() => api.get('/tasks'));
export const getTaskById = (id) => handleApiRequest(() => api.get(`/tasks/${id}`));
export const createTask = (data) => handleApiRequest(() => api.post('/tasks', data));
export const updateTask = (id, data) => handleApiRequest(() => api.put(`/tasks/${id}`, data));
export const deleteTask = (id) => handleApiRequest(() => api.delete(`/tasks/${id}`));
export const getTasksByProjectId = (projectId) => handleApiRequest(() => api.get(`/tasks?project_id=${projectId}`));

/**
 * Resources API
 */
export const getResources = () => handleApiRequest(() => api.get('/resources'));
export const getResourceById = (id) => handleApiRequest(() => api.get(`/resources/${id}`));
export const createResource = (data) => handleApiRequest(() => api.post('/resources', data));
export const updateResource = (id, data) => handleApiRequest(() => api.put(`/resources/${id}`, data));
export const deleteResource = (id) => handleApiRequest(() => api.delete(`/resources/${id}`));