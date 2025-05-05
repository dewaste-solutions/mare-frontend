'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-4 text-lg">
          You don't have permission to access this page.
        </p>
        <div className="mt-8">
          <Link href="/dashboard">
            <Button>Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}