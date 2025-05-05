import axios from 'axios';

// Create an axios instance with default config
const authApi = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true, // Important for cookies/auth
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interface for login credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Interface for login response
export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

// Authentication service with API methods
export const authService = {
  // Sign in method - UPDATED with correct path
  async signIn(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await authApi.post('/api/auth/signin', credentials);
      console.log('Sign-in response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Sign-in error:', error);
      throw error;
    }
  },

  // Sign out method - UPDATED with correct path
  async signOut(): Promise<void> {
    try {
      await authApi.post('/api/auth/signout');
      console.log('Signed out successfully');
    } catch (error) {
      console.error('Sign-out error:', error);
      throw error;
    }
  },

  // Refresh token method - UPDATED with correct path
  async refreshToken(): Promise<{ accessToken: string }> {
    try {
      const response = await authApi.post('/api/auth/refresh');
      console.log('Token refresh response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  },

  // Check authentication status
  async checkAuth(): Promise<boolean> {
    try {
      const response = await authApi.get('/api/auth/check');
      return !!response.data.authenticated;
    } catch (error) {
      console.error('Auth check error:', error);
      return false;
    }
  }
};

export default authService;