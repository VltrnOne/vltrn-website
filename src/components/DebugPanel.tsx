import React, { useState, useEffect } from 'react';
import { Bug, X, RefreshCw, ChevronDown, ChevronUp, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

const DebugPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDebugInfo = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Get current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (sessionError) {
        throw new Error(`Session error: ${sessionError.message}`);
      }
      
      if (userError) {
        throw new Error(`User error: ${userError.message}`);
      }
      
      setDebugInfo({
        session: session ? {
          access_token: `${session.access_token?.substring(0, 10)}...`,
          refresh_token: session.refresh_token ? `${session.refresh_token.substring(0, 10)}...` : null,
          expires_at: session.expires_at,
        } : null,
        user: user ? {
          id: user.id,
          email: user.email,
          created_at: user.created_at,
          last_sign_in_at: user.last_sign_in_at,
          email_confirmed_at: user.email_confirmed_at,
          confirmation_sent_at: user.confirmation_sent_at,
          recovery_sent_at: user.recovery_sent_at,
          user_metadata: user.user_metadata,
        } : null,
        localStorage: {
          token: localStorage.getItem('token') ? 'Present' : 'Missing',
          user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : 'Missing'
        },
        supabaseConfig: {
          url: import.meta.env.VITE_SUPABASE_URL || 'Not set',
        }
      });
    } catch (err) {
      console.error('Debug info error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch debug information');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchDebugInfo();
    }
  }, [isOpen]);

  // Utility function to format JSON for display
  const formatJson = (obj: any) => {
    return JSON.stringify(obj, null, 2);
  };

  const requestNewVerificationEmail = async () => {
    setIsLoading(true);
    try {
      const userJson = localStorage.getItem('user');
      if (!userJson) {
        throw new Error('No user found in localStorage');
      }
      
      const user = JSON.parse(userJson);
      if (!user.email) {
        throw new Error('No email found in user data');
      }
      
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) throw error;
      
      setError(null);
      alert(`Verification email resent to ${user.email}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend verification email');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[1000]">
      {/* Toggle Button */}
      <button
        onClick={togglePanel}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FE02A1] text-white hover:scale-110 transition-transform duration-300 shadow-lg"
        title="Debug Panel"
      >
        <Bug size={20} />
      </button>
      
      {/* Debug Panel */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-96 max-w-[90vw] max-h-[80vh] overflow-auto bg-[rgba(0,0,0,0.9)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-4 shadow-xl animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Bug className="w-4 h-4 text-[#FE02A1]" />
              Authentication Debug
            </h3>
            <div className="flex gap-2">
              <button
                onClick={fetchDebugInfo}
                disabled={isLoading}
                className="text-white/60 hover:text-white transition-colors"
                title="Refresh debug info"
              >
                <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
                title="Close panel"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          
          {error && (
            <div className="mb-4 p-2 bg-red-500/20 border border-red-500/20 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}
          
          {/* Actions */}
          <div className="mb-4 p-3 bg-[rgba(254,2,161,0.1)] rounded-lg">
            <h4 className="text-sm font-semibold text-white mb-2">Actions</h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={requestNewVerificationEmail}
                disabled={isLoading}
                className="flex items-center gap-1 px-2 py-1 bg-[#FE02A1]/70 hover:bg-[#FE02A1] text-white text-xs rounded transition-colors"
              >
                <Mail size={12} />
                Resend Verification
              </button>
            </div>
          </div>

          {/* Debug Information */}
          {isLoading ? (
            <div className="flex justify-center items-center p-4">
              <RefreshCw size={24} className="text-[#FE02A1] animate-spin" />
            </div>
          ) : debugInfo ? (
            <div className="space-y-4">
              {/* User Information */}
              <DebugSection
                title="User Information"
                data={debugInfo.user || 'No user data'}
              />
              
              {/* Session Information */}
              <DebugSection
                title="Session Information"
                data={debugInfo.session || 'No active session'}
              />
              
              {/* Local Storage */}
              <DebugSection
                title="Local Storage"
                data={debugInfo.localStorage}
              />
              
              {/* Configuration */}
              <DebugSection
                title="Supabase Configuration"
                data={debugInfo.supabaseConfig}
              />
            </div>
          ) : (
            <p className="text-white/60 text-sm">No debug information available</p>
          )}
        </div>
      )}
    </div>
  );
};

interface DebugSectionProps {
  title: string;
  data: any;
}

const DebugSection: React.FC<DebugSectionProps> = ({ title, data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="bg-black/50 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 text-left text-white text-sm"
      >
        <span className="font-semibold">{title}</span>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      {isExpanded && (
        <div className="p-3 border-t border-white/10">
          <pre className="text-white/80 text-xs overflow-x-auto max-h-60 whitespace-pre-wrap">
            {typeof data === 'object' ? JSON.stringify(data, null, 2) : data}
          </pre>
        </div>
      )}
    </div>
  );
};

export default DebugPanel;