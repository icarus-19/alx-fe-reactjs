import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // Free testing API
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token to requests
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request for debugging
    console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`, config.data);
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - handle global response logic
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error);
    
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - clear storage and redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Forbidden: You do not have permission to access this resource');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error: Please try again later');
          break;
        default:
          console.error(`HTTP Error: ${status}`, data);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network error: Please check your internet connection');
    } else {
      // Something else happened
      console.error('Unexpected error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Export the configured axios instance
export default api;