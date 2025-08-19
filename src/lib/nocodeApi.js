import { VLTRN_CONFIG, getApiUrl, getAuthHeaders } from '../config/vltrn-infrastructure';

// Error handler wrapper for VLTRN's own API
const handleApiRequest = async (requestFn) => {
  try {
    console.log('Making API request to VLTRN backend...');
    const response = await requestFn();
    console.log('API Response:', response);
    
    // Check if the response is successful
    if (response.ok) {
      const data = await response.json();
      return data.data || data; // Return data property or raw data
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('API Request Error:', error);
    
    // Improve error message based on type of error
    if (error.message.includes('Failed to fetch') || error.message.includes('Network Error')) {
      throw new Error('Cannot connect to VLTRN API server. Please ensure the server is running.');
    }
    
    throw error;
  }
};

/**
 * Users API
 */
export const getUsers = () => handleApiRequest(() => fetch(getApiUrl('/users'), { method: 'GET', headers: getAuthHeaders() }));
export const getUserById = (id) => handleApiRequest(() => fetch(getApiUrl(`/users/${id}`), { method: 'GET', headers: getAuthHeaders() }));
export const createUser = (data) => handleApiRequest(() => fetch(getApiUrl('/users'), { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(data) }));
export const updateUser = (id, data) => handleApiRequest(() => fetch(getApiUrl(`/users/${id}`), { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify(data) }));
export const deleteUser = (id) => handleApiRequest(() => fetch(getApiUrl(`/users/${id}`), { method: 'DELETE', headers: getAuthHeaders() }));

/**
 * Client Intakes API
 */
export const getClientIntakes = () => handleApiRequest(() => fetch(getApiUrl('/client-intakes'), { method: 'GET', headers: getAuthHeaders() }));
export const getClientIntakeById = (id) => handleApiRequest(() => fetch(getApiUrl(`/client-intakes/${id}`), { method: 'GET', headers: getAuthHeaders() }));
export const createClientIntake = (data) => handleApiRequest(() => fetch(getApiUrl('/client-intakes'), { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(data) }));
export const updateClientIntake = (id, data) => handleApiRequest(() => fetch(getApiUrl(`/client-intakes/${id}`), { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify(data) }));
export const deleteClientIntake = (id) => handleApiRequest(() => fetch(getApiUrl(`/client-intakes/${id}`), { method: 'DELETE', headers: getAuthHeaders() }));
export const getClientIntakesByUserId = (userId) => handleApiRequest(() => fetch(getApiUrl(`/client-intakes?user_id=${userId}`), { method: 'GET', headers: getAuthHeaders() }));

/**
 * Projects API
 */
export const getProjects = () => handleApiRequest(() => fetch(getApiUrl('/projects'), { method: 'GET', headers: getAuthHeaders() }));
export const getProjectById = (id) => handleApiRequest(() => fetch(getApiUrl(`/projects/${id}`), { method: 'GET', headers: getAuthHeaders() }));
export const createProject = (data) => handleApiRequest(() => fetch(getApiUrl('/projects'), { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(data) }));
export const updateProject = (id, data) => handleApiRequest(() => fetch(getApiUrl(`/projects/${id}`), { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify(data) }));
export const deleteProject = (id) => handleApiRequest(() => fetch(getApiUrl(`/projects/${id}`), { method: 'DELETE', headers: getAuthHeaders() }));

/**
 * Tasks API
 */
export const getTasks = () => handleApiRequest(() => fetch(getApiUrl('/tasks'), { method: 'GET', headers: getAuthHeaders() }));
export const getTaskById = (id) => handleApiRequest(() => fetch(getApiUrl(`/tasks/${id}`), { method: 'GET', headers: getAuthHeaders() }));
export const createTask = (data) => handleApiRequest(() => fetch(getApiUrl('/tasks'), { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(data) }));
export const updateTask = (id, data) => handleApiRequest(() => fetch(getApiUrl(`/tasks/${id}`), { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify(data) }));
export const deleteTask = (id) => handleApiRequest(() => fetch(getApiUrl(`/tasks/${id}`), { method: 'DELETE', headers: getAuthHeaders() }));
export const getTasksByProjectId = (projectId) => handleApiRequest(() => fetch(getApiUrl(`/tasks?project_id=${projectId}`), { method: 'GET', headers: getAuthHeaders() }));

/**
 * Resources API
 */
export const getResources = () => handleApiRequest(() => fetch(getApiUrl('/resources'), { method: 'GET', headers: getAuthHeaders() }));
export const getResourceById = (id) => handleApiRequest(() => fetch(getApiUrl(`/resources/${id}`), { method: 'GET', headers: getAuthHeaders() }));
export const createResource = (data) => handleApiRequest(() => fetch(getApiUrl('/resources'), { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(data) }));
export const updateResource = (id, data) => handleApiRequest(() => fetch(getApiUrl(`/resources/${id}`), { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify(data) }));
export const deleteResource = (id) => handleApiRequest(() => fetch(getApiUrl(`/resources/${id}`), { method: 'DELETE', headers: getAuthHeaders() }));