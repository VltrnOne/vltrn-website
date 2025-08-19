import React from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  // For now, just render children - authentication logic will be added later
  return <>{children}</>;
};

export default AuthGuard;
