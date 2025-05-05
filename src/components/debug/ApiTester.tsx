import React, { useState } from 'react';
import axios from 'axios';

const ApiTester: React.FC = () => {
  const [url, setUrl] = useState('http://localhost:3001/api/auth/check');
  const [method, setMethod] = useState('GET');
  const [requestBody, setRequestBody] = useState('{}');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');
    setError('');

    try {
      let requestBodyObj = {};
      try {
        requestBodyObj = JSON.parse(requestBody);
      } catch (parseError) {
        setError('Invalid JSON in request body');
        setLoading(false);
        return;
      }

      const axiosConfig = {
        method: method.toLowerCase(),
        url,
        data: method !== 'GET' ? requestBodyObj : undefined,
        params: method === 'GET' ? requestBodyObj : undefined,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const result = await axios(axiosConfig);
      setResponse(JSON.stringify(result.data, null, 2));
    } catch (err: any) {
      console.error('API test error:', err);
      setError(
        `Error: ${err.message}\n${err.response ? `Status: ${err.response.status}\nData: ${JSON.stringify(err.response.data, null, 2)}` : ''}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">API Tester</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">URL:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block mb-1">Method:</label>
          <select
            className="w-full p-2 border rounded"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
        
        <div>
          <label className="block mb-1">Request Body (JSON):</label>
          <textarea
            className="w-full p-2 border rounded font-mono text-sm h-24"
            value={requestBody}
            onChange={(e) => setRequestBody(e.target.value)}
          />
        </div>
        
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Request'}
        </button>
      </form>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded text-red-800">
          <h3 className="font-bold">Error</h3>
          <pre className="whitespace-pre-wrap font-mono text-sm mt-2">{error}</pre>
        </div>
      )}
      
      {response && (
        <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded">
          <h3 className="font-bold">Response</h3>
          <pre className="whitespace-pre-wrap font-mono text-sm mt-2">{response}</pre>
        </div>
      )}
    </div>
  );
};

export default ApiTester;