import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { isAuthenticated, getCurrentUser } from '../../lib/authService';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = isAuthenticated();
    setIsAuthorized(authStatus);
    
    // Check if user is verified
    if (authStatus) {
      const currentUser = getCurrentUser();
      setIsVerified(currentUser?.isVerified ?? false);
    }
  }, []);

  // Still checking authentication status
  if (isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <Loader className="w-12 h-12 text-[#FE02A1] animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Not authenticated, redirect to home page with login state
  if (!isAuthorized) {
    return (
      <Navigate 
        to="/" 
        state={{ showLogin: true, from: location.pathname }} 
        replace 
      />
    );
  }
  
  // Authenticated but not verified, redirect to home with a message
  if (isVerified === false) {
    return (
      <Navigate 
        to="/" 
        state={{ showLogin: true, verificationError: true, from: location.pathname }} 
        replace 
      />
    );
  }

  // Authenticated and verified, render children
  return <>{children}</>;
};

export default AuthGuard;