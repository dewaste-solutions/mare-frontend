'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
}

export default function ProtectedRoute({ 
  children, 
  requiredPermissions = [] 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If authentication check is complete and user is not logged in
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    // Check permissions if specified
    if (!loading && user && requiredPermissions.length > 0) {
      const hasPermission = requiredPermissions.some(permission => 
        user.permission?.includes(permission)
      );

      if (!hasPermission) {
        router.push('/unauthorized');
      }
    }
  }, [user, loading, router, requiredPermissions]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin mx-auto"></div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  // If not loading and has a user, render children
  return user ? <>{children}</> : null;
}