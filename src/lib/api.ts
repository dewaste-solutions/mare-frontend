import axios from 'axios';

// Configure base API for non-auth requests
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authentication interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('mare_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If unauthorized and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Import dynamically to avoid circular dependency
        const { authService } = await import('./authApi');
        
        // Try to refresh the token
        const token = await authService.refreshToken();
        
        // Update the request and retry
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        localStorage.removeItem('mare_token');
        localStorage.removeItem('mare_user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Export service modules using the authenticated api instance
export const wasteCollectionPointsService = {
  getAll: async (params?: any) => {
    const response = await api.get('/waste-collection-points', { params });
    return response.data;
  },
  // Other methods...
};

// Other service modules...

export default api;