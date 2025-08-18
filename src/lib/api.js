import axios from 'axios';

// Create a reusable Axios instance for the API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`
  },
  // Timeout after 10 seconds to prevent hanging requests
  timeout: 10000,
  // Important for mixed content issues between HTTPS frontend and HTTP backend
  withCredentials: false
});

// Add request interceptor to include the user's authentication token if available
api.interceptors.request.use((config) => {
  // Get auth token from localStorage
  const userToken = localStorage.getItem('token');
  
  // If both API token and user token exist, prioritize the user token
  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }
  
  // Log requests in development
  console.log('Sending API request to:', config.url);
  
  return config;
}, (error) => {
  console.error('API Request Error:', error);
  return Promise.reject(error);
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    console.log('API Response status:', response.status);
    return response;
  },
  (error) => {
    // Handle authentication errors (401, 403)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Clear authentication data and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to home with login modal trigger
      window.location.href = '/';
    }
    
    // Enhanced error logging
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      console.error('API request timed out');
    } else if (!error.response) {
      console.error('Network Error: Could not connect to API server. Is the server running?');
    } else {
      console.error('API Error:', error.response?.status, error.response?.statusText, error.response?.data);
    }
    
    return Promise.reject(error);
  }
);

export default api;