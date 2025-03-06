// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth';

// export const loginUser = async (username, password) => {
//   try {
//     const response = await axios.post(`${API_URL}/login`, { 
//       username, 
//       password 
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : new Error('Login failed');
//   }
// };

export const loginUser = async (username, password) => {
  try {
    // Hardcoded credentials check
    if (username === 'trial' && password === 'assignment123') {
      // Generate a mock token
      const token = btoa(`${username}:${password}`);
      return { 
        token, 
        username 
      };
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    throw error;
  }
};

export const logoutUser = () => {
  // Optional: Add any logout-related API calls or cleanup
  return true;
};

// Generic API service with interceptors
export const apiService = axios.create({
  baseURL: 'http://localhost:8000/api'
});

// Add request interceptor to include token
apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);