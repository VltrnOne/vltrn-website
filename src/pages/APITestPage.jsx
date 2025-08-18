import React, { useState } from 'react';
import LiveAPITest from '../components/LiveAPITest';
import { Terminal, AlertTriangle, Code, ArrowDown, Server, Link2, Globe, Lock, Terminal as Terminal2 } from 'lucide-react';

const APITestPage = () => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-['Exo_2'] font-bold text-white mb-8 [text-shadow:0_0_15px_#FE02A1]">
          Admin Panel: API Access
        </h1>
        
        <div className="mb-6 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border-l-4 border-[#FE02A1] rounded-r-xl p-6">
          <h2 className="text-xl font-['Exo_2'] font-bold text-white mb-4 flex items-center gap-2">
            <Server className="w-5 h-5 text-[#FE02A1]" />
            Important: Start the API Server
          </h2>
          <p className="text-white/80 mb-4">
            To test the API functionality, you need to start the local Express server. Open a new terminal and run:
          </p>
          <div className="bg-black/40 p-3 rounded-lg mb-4 font-mono text-sm text-white/80 flex justify-between items-center">
            <code>npm run server</code>
            <button 
              onClick={() => {
                navigator.clipboard.writeText('npm run server');
              }}
              className="text-[#FE02A1] hover:text-white px-2 py-1 rounded transition-colors"
              title="Copy to clipboard"
            >
              Copy
            </button>
          </div>
          <p className="text-white/80 mb-2">
            Or you can run both the development server and API server together:
          </p>
          <div className="bg-black/40 p-3 rounded-lg mb-4 font-mono text-sm text-white/80 flex justify-between items-center">
            <code>npm run dev:all</code>
            <button 
              onClick={() => {
                navigator.clipboard.writeText('npm run dev:all');
              }}
              className="text-[#FE02A1] hover:text-white px-2 py-1 rounded transition-colors"
              title="Copy to clipboard"
            >
              Copy
            </button>
          </div>
          <div className="flex items-start gap-2 p-3 bg-green-500/10 rounded-lg border border-green-500/30">
            <Terminal2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-white/90 font-semibold">Expected Terminal Output</p>
              <p className="text-white/70 text-sm">When running correctly, you should see:</p>
              <pre className="mt-1 bg-black/30 p-2 rounded text-green-400 text-xs font-mono">
                {`Server running on port 3001
API available at http://localhost:3001`}
              </pre>
            </div>
          </div>
        </div>
        
        <LiveAPITest />
        
        <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6 mb-6">
          <h2 className="text-xl font-['Exo_2'] font-bold text-white mb-4 flex items-center gap-2">
            <Link2 className="w-5 h-5 text-[#FE02A1]" />
            API Information
          </h2>
          
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 text-[#FE02A1] mb-4 hover:text-white transition-colors"
          >
            {showDetails ? 'Hide technical details' : 'Show technical details'}
            <ArrowDown className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
          </button>
          
          {showDetails && (
            <div className="mt-4 p-4 bg-[rgba(0,0,0,0.2)] rounded-lg border border-[rgba(255,255,255,0.1)]">
              <div className="flex items-start gap-2 mb-3">
                <Terminal className="w-5 h-5 text-[#FE02A1] mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-1">API Configuration</h3>
                  <p className="text-white/70 text-sm">
                    The API is configured using environment variables in the <code className="bg-black/30 px-1 py-0.5 rounded text-xs">.env</code> file:
                  </p>
                  <pre className="mt-2 bg-black/30 p-2 rounded text-white/70 text-xs overflow-x-auto">
                    {`VITE_API_BASE_URL=http://localhost:3001
VITE_API_TOKEN=sk_live_a0c01f380137cd4c415522ec7c06537bf55dc9bc04780d9bf56e44af9e09`}
                  </pre>
                </div>
              </div>
              
              <div className="flex items-start gap-2 mb-3">
                <Code className="w-5 h-5 text-[#FE02A1] mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-1">API Implementation</h3>
                  <p className="text-white/70 text-sm mb-2">
                    The API is implemented using Axios with request and response interceptors. 
                    The base configuration is in <code className="bg-black/30 px-1 py-0.5 rounded text-xs">src/lib/api.js</code> and API functions are in <code className="bg-black/30 px-1 py-0.5 rounded text-xs">src/lib/nocodeApi.js</code>.
                  </p>
                </div>
              </div>
              
              <div id="troubleshooting" className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-1">Troubleshooting</h3>
                  <p className="text-white/70 text-sm">
                    If you encounter API connection issues, check:
                  </p>
                  <ul className="list-disc list-inside text-white/70 text-sm space-y-1 mt-1">
                    <li>Make sure the local Express server is running with <code className="bg-black/30 px-1 py-0.5 rounded text-xs">npm run server</code></li>
                    <li>Check that port 3001 is not being used by another application</li>
                    <li>Verify the API base URL is set correctly in the .env file</li>
                    <li>Check the browser console for detailed error messages</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-[rgba(255,255,255,0.1)]">
            <p className="text-white/70">
              <Lock className="w-4 h-4 inline mr-2" />
              This admin area is password protected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APITestPage;