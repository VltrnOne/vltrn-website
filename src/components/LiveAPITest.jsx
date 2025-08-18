import React, { useState, useEffect } from 'react';
import { getClientIntakes } from '../lib/nocodeApi';
import { AlertCircle, Loader, CheckCircle, RefreshCw, Server, PlayCircle } from 'lucide-react';

const LiveAPITest = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [serverRunning, setServerRunning] = useState(false);
  const [testApiUrl, setTestApiUrl] = useState('');
  const [startingServer, setStartingServer] = useState(false);

  // Function to check if server is running without making full data request
  const checkServerStatus = async () => {
    try {
      console.log('Checking server status at:', import.meta.env.VITE_API_BASE_URL);
      const response = await fetch(import.meta.env.VITE_API_BASE_URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        // Short timeout to quickly determine if server is running
        signal: AbortSignal.timeout(3000)
      });
      
      const isRunning = response.ok;
      console.log('Server status check result:', isRunning ? 'Running' : 'Not running');
      setServerRunning(isRunning);
      return isRunning;
    } catch (error) {
      console.error("Server status check failed:", error.message);
      setServerRunning(false);
      return false;
    }
  };

  const startServer = () => {
    setStartingServer(true);
    // This is a frontend component, so we can't actually start the server from here.
    // Instead, we'll show a message instructing the user to start the server manually.
    setTimeout(() => {
      setStartingServer(false);
      checkServerStatus(); // Check again after the supposed "start" attempt
    }, 2000);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // First check if server is running
      const isServerRunning = await checkServerStatus();
      if (!isServerRunning) {
        setError('API server is not running. Please start the server with "npm run server"');
        setData([]);
        setCount(0);
        setLoading(false);
        return;
      }
      
      console.log('Attempting to fetch client intakes...');
      const result = await getClientIntakes();
      
      // Log the result to console for debugging
      console.log('Client Intakes Data:', result);
      
      // If we got here, the server is running
      setServerRunning(true);
      
      // Set the data and count
      setData(Array.isArray(result) ? result : []);
      setCount(Array.isArray(result) ? result.length : 0);
    } catch (err) {
      console.error('Error fetching client intakes:', err);
      setError(`Failed to fetch client intakes data: ${err.message}`);
      setData([]);
      setCount(0);
      
      // Check if we can determine if the server is running
      if (err.message && (err.message.includes('Network Error') || err.message.includes('connect'))) {
        setServerRunning(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Set the API URL for display purposes
    setTestApiUrl(import.meta.env.VITE_API_BASE_URL);
    
    // Attempt to check server status and fetch data
    checkServerStatus().then(isRunning => {
      if (isRunning) {
        fetchData();
      } else {
        setLoading(false);
      }
    });
  }, []);

  return (
    <div className="p-6 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-['Exo_2'] font-bold text-white flex items-center gap-2">
          Live API Test
          {serverRunning && <CheckCircle className="w-4 h-4 text-green-400" />}
          {!serverRunning && !loading && <AlertCircle className="w-4 h-4 text-red-400" />}
        </h2>
        <div className="flex gap-2">
          {!serverRunning && (
            <button 
              onClick={startServer}
              disabled={startingServer}
              className="flex items-center gap-2 px-3 py-1 bg-[#FE02A1] rounded-lg text-white hover:bg-[#ff3db3] transition-colors duration-300"
            >
              <PlayCircle className={`w-4 h-4 ${startingServer ? 'animate-pulse' : ''}`} />
              {startingServer ? 'Starting...' : 'Start Server'}
            </button>
          )}
          <button 
            onClick={fetchData}
            disabled={loading || !serverRunning}
            className="flex items-center gap-2 px-3 py-1 bg-[rgba(255,255,255,0.1)] rounded-lg text-white hover:bg-[rgba(255,255,255,0.2)] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>
      
      {/* Server Status */}
      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-4 ${
        serverRunning ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
      }`}>
        <Server className="w-4 h-4" />
        <span>
          {serverRunning 
            ? 'API Server is running' 
            : 'API Server not detected - please run "npm run server" in a separate terminal'}
        </span>
      </div>
      
      {/* API URL Info */}
      <div className="px-3 py-2 bg-[rgba(255,255,255,0.05)] rounded-lg mb-4 text-sm text-white/70">
        <p>Connecting to API: <code className="bg-black/30 px-1 py-0.5 rounded text-xs">{testApiUrl}</code></p>
      </div>
      
      {loading ? (
        <div className="flex items-center gap-2 text-white">
          <Loader className="w-5 h-5 text-[#FE02A1] animate-spin" />
          <span>Loading client intakes...</span>
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 text-red-400">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      ) : (
        <div className="space-y-2">
          {serverRunning ? (
            <>
              <p className="text-white">
                Successfully fetched <span className="font-bold text-[#FE02A1]">{count}</span> client intake(s)
              </p>
              <p className="text-white/60 text-sm">Check the console for the complete data.</p>
              
              {/* Data Preview */}
              {count > 0 && (
                <div className="mt-4">
                  <div className="text-white/70 text-sm mb-2">Data Preview:</div>
                  <pre className="bg-[rgba(0,0,0,0.2)] p-3 rounded-lg text-white/80 text-xs max-h-48 overflow-y-auto">
                    {JSON.stringify(data.slice(0, 2), null, 2)}
                    {data.length > 2 && '...'}
                  </pre>
                </div>
              )}
            </>
          ) : null}
        </div>
      )}
      
      {/* Troubleshooting */}
      {!serverRunning && !loading && (
        <div className="mt-4 p-4 bg-[rgba(255,255,255,0.05)] rounded-lg border border-[rgba(255,255,255,0.1)]">
          <h3 className="font-semibold text-white mb-2">API Server Not Running</h3>
          <div className="bg-black/40 p-3 rounded-lg mb-3">
            <p className="text-white/90 font-mono text-sm">To start the server, open a new terminal window and run:</p>
            <div className="mt-2 bg-black/60 p-2 rounded border border-[rgba(255,255,255,0.1)] font-mono text-sm text-[#FE02A1]">
              npm run server
            </div>
          </div>
          <p className="text-white/70 text-sm mb-2">
            Alternatively, you can run both the development server and API server together:
          </p>
          <div className="mb-3 bg-black/60 p-2 rounded border border-[rgba(255,255,255,0.1)] font-mono text-sm text-[#FE02A1]">
            npm run dev:all
          </div>
          <p className="text-white/70 text-sm">
            Once the server is running, click the Refresh button above to test the connection.
          </p>
          <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.1)]">
            <h4 className="text-white font-semibold text-sm mb-1">Troubleshooting:</h4>
            <ul className="list-disc list-inside text-white/70 text-xs space-y-1">
              <li>Make sure port 3001 is not being used by another application</li>
              <li>Check that the server.js file exists and is correctly configured</li>
              <li>Verify that Express and CORS are installed (they should be in package.json)</li>
              <li>Check your terminal for any error messages when starting the server</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveAPITest;