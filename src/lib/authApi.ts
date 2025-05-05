import axios from 'axios';

// Create a dedicated axios instance for auth
const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies handling
});

// Authentication services
export const authService = {
  login: async (email: string, password: string) => {
    try {
      // Use the correct API path that matches the backend structure
      const response = await authApi.post('/api/auth/signin', { email, password });
      
      // Store the access token in localStorage
      const accessToken = response.data.data;
      localStorage.setItem('mare_token', accessToken);
      
      // Decode the token to get user information
      const user = decodeToken(accessToken);
      localStorage.setItem('mare_user', JSON.stringify(user));
      
      return { user, token: accessToken };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  logout: async () => {
    try {
      // Call logout endpoint if available
      await authApi.post('/api/auth/signout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless of API response
      localStorage.removeItem('mare_token');
      localStorage.removeItem('mare_user');
    }
  },
  
  refreshToken: async () => {
    try {
      const response = await authApi.post('/api/auth/refresh');
      const accessToken = response.data.data;
      localStorage.setItem('mare_token', accessToken);
      return accessToken;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  },
  
  getCurrentUser: () => {
    try {
      const token = localStorage.getItem('mare_token');
      if (!token) return null;
      
      // If we have stored user data, use that
      const storedUser = localStorage.getItem('mare_user');
      if (storedUser) return JSON.parse(storedUser);
      
      // Otherwise decode from token
      return decodeToken(token);
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('mare_token');
  }
};

// Helper function to decode JWT token
function decodeToken(token: string) {
  try {
    // Basic decoding without verification
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Token decode error:', error);
    return null;
  }
}

// Add axios interceptor to handle token expiration
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't tried refreshing yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh the token
        const token = await authService.refreshToken();
        
        // Update the request with the new token
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        return authApi(originalRequest);
      } catch (refreshError) {
        // If refresh fails, logout the user
        authService.logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default authApi;