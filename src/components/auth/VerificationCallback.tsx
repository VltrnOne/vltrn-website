import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Loader, CheckCircle, XCircle } from 'lucide-react';

const VerificationCallback = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email...');
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyEmail() {
      try {
        console.log('VerificationCallback component mounted');
        console.log('URL hash:', window.location.hash);
        
        // Parse the URL for Supabase auth parameters
        const params = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        const type = params.get('type');
        
        // Log parsed parameters (without revealing full tokens)
        setDebugInfo(`Type: ${type}, Access Token: ${accessToken?.substring(0, 5)}..., Refresh Token: ${refreshToken?.substring(0, 5)}...`);
        console.log('Auth params:', {
          type,
          hasAccessToken: !!accessToken,
          hasRefreshToken: !!refreshToken
        });

        // Check if this is actually a verification callback
        if (!accessToken || !refreshToken || type !== 'signup') {
          console.error('Invalid verification link parameters');
          setStatus('error');
          setMessage('Invalid verification link. Please try again or contact support.');
          return;
        }

        // Set the session in Supabase
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (sessionError) {
          console.error('Error setting session:', sessionError);
          setStatus('error');
          setMessage('Failed to verify email. Please try again.');
          return;
        }

        // Get the current user to check if verification succeeded
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error('Error getting user:', userError);
          setStatus('error');
          setMessage('Could not retrieve user information. Please try again.');
          return;
        }

        console.log('User verification status:', {
          hasUser: !!user,
          email: user?.email,
          emailConfirmedAt: user?.email_confirmed_at
        });

        if (!user || !user.email_confirmed_at) {
          console.error('Email not confirmed in user data');
          setStatus('error');
          setMessage('Email verification failed. Please try again.');
          return;
        }

        // Email is verified
        setStatus('success');
        setMessage('Email verified successfully! You can now log in.');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/', { state: { showLogin: true } });
        }, 3000);

      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage('An error occurred during verification. Please try again.');
      }
    }

    verifyEmail();
  }, [navigate]);

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-8 text-center">
        {status === 'loading' && (
          <>
            <Loader className="w-16 h-16 text-[#FE02A1] animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-['Exo_2'] font-bold text-white mb-2">
              Verifying Your Email
            </h2>
            <p className="text-white/80">
              Please wait while we complete the verification process...
            </p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-['Exo_2'] font-bold text-white mb-2">
              Email Verified
            </h2>
            <p className="text-white/80 mb-4">
              Your email has been successfully verified. You will be redirected to login.
            </p>
            <button
              onClick={() => navigate('/', { state: { showLogin: true } })}
              className="px-6 py-2 bg-[#FE02A1] rounded-lg text-white hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
            >
              Go to Login
            </button>
          </>
        )}
        
        {status === 'error' && (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-['Exo_2'] font-bold text-white mb-2">
              Verification Failed
            </h2>
            <p className="text-white/80 mb-4">
              {message}
            </p>
            
            {/* Debug information for troubleshooting */}
            {debugInfo && (
              <div className="mb-4 p-3 bg-black/30 rounded text-xs text-white/60 text-left">
                <p className="font-bold mb-1">Debug Information:</p>
                <p>{debugInfo}</p>
              </div>
            )}
            
            <button
              onClick={() => navigate('/', { state: { showLogin: true } })}
              className="px-6 py-2 bg-[#FE02A1] rounded-lg text-white hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300 mb-2"
            >
              Return to Login
            </button>
            <button
              onClick={() => navigate('/')}
              className="block mx-auto text-white/60 text-sm hover:text-white"
            >
              or go to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerificationCallback;