// src/services/dataService.js
import { apiService } from './authService';

export const fetchDashboardData = async () => {
  try {
    const response = await apiService.get('/data');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

export const initializeDashboardData = async () => {
  try {
    const response = await apiService.post('/initialize');
    return response.data;
  } catch (error) {
    console.error('Error initializing dashboard data:', error);
    throw error;
  }
};