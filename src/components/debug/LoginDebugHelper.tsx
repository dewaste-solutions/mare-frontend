import React, { useState } from 'react';
import axios from 'axios';
import { LoginCredentials } from '@/services/authAPI';

const LoginDebugHelper: React.FC = () => {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState('/api/auth/signin');

  const handleTest = async () => {
    setLoading(true);
    setResponse(null);
    setError(null);
    
    const credentials: LoginCredentials = { email, password };
    
    try {
      const result = await axios({
        method: 'POST',
        url: `http://localhost:3001${selectedEndpoint}`,
        data: credentials,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      setResponse({
        status: result.status,
        statusText: result.statusText,
        data: result.data,
        headers: result.headers,
      });
    } catch (err: any) {
      console.error('Login debug error:', err);
      setError(
        `Error: ${err.message}\n${err.response ? 
          `Status: ${err.response.status}\nData: ${JSON.stringify(err.response.data, null, 2)}` : 
          'No response data'}`
      );
    } finally {
      setLoading(false);
    }
  };

  const checkCookies = () => {
    const cookies = document.cookie;
    return cookies ? cookies : 'No cookies found';
  };

  const endpoints = [
    '/api/auth/signin',
    '/api/auth/signout',
    '/api/auth/refresh',
    '/api/auth/check',
    '/auth/signin', // Original incorrect path for comparison
  ];

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Login Debug Helper</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Endpoint:</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedEndpoint}
            onChange={(e) => setSelectedEndpoint(e.target.value)}
          >
            {endpoints.map(endpoint => (
              <option key={endpoint} value={endpoint}>
                {endpoint}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block mb-1">Password:</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleTest}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Testing...' : 'Test Login'}
          </button>
          
          <button
            onClick={() => {
              setResponse({ cookies: checkCookies() });
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Check Cookies
          </button>
        </div>
      </div>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded text-red-800">
          <h3 className="font-bold">Error</h3>
          <pre className="whitespace-pre-wrap font-mono text-sm mt-2">{error}</pre>
        </div>
      )}
      
      {response && (
        <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded">
          <h3 className="font-bold">Response</h3>
          <pre className="whitespace-pre-wrap font-mono text-sm mt-2">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
      
      <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded">
        <h3 className="font-bold">Debugging Tips</h3>
        <ul className="list-disc pl-5 mt-2">
          <li>Make sure your backend server is running on port 3001</li>
          <li>Check if your API routes are prefixed with /api</li>
          <li>Verify CORS is properly configured on the backend</li>
          <li>Ensure withCredentials is set to true for cookie auth</li>
          <li>Check browser console for any JavaScript errors</li>
        </ul>
      </div>
    </div>
  );
};

export default LoginDebugHelper;