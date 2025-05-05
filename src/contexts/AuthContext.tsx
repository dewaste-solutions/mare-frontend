'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/authApi';
import { useToast } from '@/hooks/use-toast';

// Define user interface based on token payload
interface User {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  permission: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { user } = await authService.login(email, password);
      setUser(user);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.firstName}!`,
      });
      
      router.push('/dashboard');
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Invalid credentials";
      
      toast({
        title: "Login failed",
        description: errorMsg,
        variant: "destructive",
      });
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      
      toast({
        title: "Logout error",
        description: "There was a problem signing you out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};