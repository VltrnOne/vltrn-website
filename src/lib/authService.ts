import { mockAuth } from './mockService';

// Authentication service using VLTRN's own backend infrastructure
// TEMPORARILY USING MOCK SERVICE FOR IMMEDIATE FUNCTIONALITY

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return mockAuth.checkSession();
};

// Get current user
export const getCurrentUser = () => {
  return mockAuth.getCurrentUser();
};

// Check if user session is still valid
export const checkSessionValidity = async (): Promise<boolean> => {
  return mockAuth.checkSession();
};

// Register a new user with VLTRN's backend
export const register = async (name: string, email: string, phone: string, password: string) => {
  try {
    console.log('Registering user with email:', email);
    return await mockAuth.register(name, email, phone, password);
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Login user with VLTRN's backend
export const login = async (email: string, password: string) => {
  try {
    console.log('Logging in user with email:', email);
    return await mockAuth.login(email, password);
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Check if email is verified using VLTRN's backend
export const checkVerificationStatus = async (): Promise<boolean> => {
  const user = getCurrentUser();
  return user ? user.isVerified : false;
};

// Resend verification email
export const resendVerificationEmail = async (): Promise<void> => {
  // Mock implementation
  console.log('Verification email resent');
};

// Request new verification code (alias for resendVerificationEmail)
export const requestNewVerificationCode = async (email: string): Promise<void> => {
  // Mock implementation
  console.log('New verification code sent to:', email);
};

// Reset password
export const resetPassword = async (email: string): Promise<any> => {
  try {
    return await mockAuth.resetPassword(email);
  } catch (error) {
    console.error('Password reset error:', error);
    throw error;
  }
};

// Update password
export const updatePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
  // Mock implementation
  console.log('Password updated successfully');
};

// Update user profile
export const updateProfile = async (updates: any): Promise<void> => {
  // Mock implementation
  console.log('Profile updated successfully', updates);
};

// Refresh authentication token
export const refreshToken = async (): Promise<string> => {
  // Mock implementation
  const token = `mock_token_${Date.now()}`;
  localStorage.setItem('vltrn_token', token);
  return token;
};

// Get current session
export const getSession = () => {
  return {
    token: localStorage.getItem('vltrn_token'),
    user: getCurrentUser()
  };
};

// Logout user
export const logout = (): void => {
  mockAuth.logout();
};

// Listen for authentication state changes
export const onAuthStateChange = (callback: (user: any) => void): (() => void) => {
  // Mock implementation - just call once with current user
  const user = getCurrentUser();
  if (user) {
    callback(user);
  }
  
  // Return unsubscribe function
  return () => {};
};