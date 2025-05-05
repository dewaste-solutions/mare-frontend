'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useState } from 'react';

// Interfaces for component props
interface DashboardLayoutProps {
  children: ReactNode;
  role?: string;
}

export function DashboardLayout({ children, role = 'user' }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Define navigation based on role
  const navigation = role === 'admin' 
    ? [
      { name: 'Dashboard', href: '/admin/dashboard' },
      { name: 'Users', href: '/admin/users' },
      { name: 'Collection Points', href: '/admin/collection-points' },
      { name: 'Waste Types', href: '/admin/waste-types' },
      { name: 'Settings', href: '/admin/settings' },
    ]
    : [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'My Collections', href: '/dashboard/collections' },
      { name: 'Collection Points', href: '/dashboard/collection-points' },
      { name: 'Waste Types', href: '/dashboard/waste-types' },
    ];

  return (
    <ProtectedRoute requiredPermissions={role === 'admin' ? ['ADMIN'] : []}>
      <div className="min-h-screen bg-gray-100">
        {/* Desktop sidebar */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-1 min-h-0 bg-slate-800">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-slate-900">
              <span className="text-xl font-bold text-white">MARE</span>
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-white hover:bg-slate-700"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center justify-between p-4 border-t border-slate-700">
              <div className="text-sm text-white">
                {user?.firstName} {user?.lastName}
                {role === 'admin' && <span className="ml-2 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-sm">Admin</span>}
              </div>
              <Button variant="ghost" onClick={logout} size="sm" className="text-white">
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <div className="flex items-center justify-between bg-slate-800 p-4">
            <span className="text-xl font-bold text-white">MARE</span>
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              Menu
            </Button>
          </div>
          {isMobileMenuOpen && (
            <div className="bg-slate-800 p-4">
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium rounded-md text-white hover:bg-slate-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-white">
                    {user?.firstName} {user?.lastName}
                    {role === 'admin' && <span className="ml-2 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-sm">Admin</span>}
                  </div>
                  <Button variant="ghost" onClick={logout} size="sm" className="text-white">
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="md:pl-64">
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}