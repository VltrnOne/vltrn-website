import { supabase } from './supabase';

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return !!token && !!user;
};

// Get current user
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Check if user session is still valid
export const checkSessionValidity = async (): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      // Clear invalid session
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error checking session validity:', error);
    return false;
  }
};

// Register a new user with Supabase
export const register = async (name: string, email: string, phone: string, password: string) => {
  try {
    console.log('Registering user with email:', email);
    
    // Use Supabase signUp with email confirmation
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          phone
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) {
      console.error('Registration error:', error.message);
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error('User creation failed');
    }
    
    // Log important info for debugging
    console.log('User created:', {
      id: data.user.id,
      email: data.user.email,
      confirmation_sent_at: data.user.confirmation_sent_at,
      created_at: data.user.created_at,
      email_confirmed_at: data.user.email_confirmed_at
    });
    
    // Store user in localStorage temporarily (they'll need to verify and re-login)
    const userData = {
      id: data.user.id,
      name,
      email,
      phone,
      isVerified: false
    };

    localStorage.setItem('token', data.session?.access_token || '');
    localStorage.setItem('user', JSON.stringify(userData));

    console.log('Verification email sent to:', email);
    
    return userData;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Check if email is verified by directly querying Supabase session
export const checkVerificationStatus = async (): Promise<boolean> => {
  try {
    // Get the current user session from Supabase
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      console.log('No active session found when checking verification');
      return false;
    }
    
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log('No user found when checking verification');
      return false;
    }
    
    // Log the user's verification status for debugging
    console.log('User verification status:', {
      email: user.email,
      confirmation_sent_at: user.confirmation_sent_at,
      email_confirmed_at: user.email_confirmed_at
    });
    
    // If email_confirmed_at exists, the email is verified
    return !!user?.email_confirmed_at;
  } catch (error) {
    console.error('Error checking verification status:', error);
    return false;
  }
};

// Update the user's verification status in local storage
export const updateVerificationStatus = async () => {
  try {
    const isVerified = await checkVerificationStatus();
    
    if (isVerified) {
      const user = getCurrentUser();
      if (user) {
        user.isVerified = true;
        localStorage.setItem('user', JSON.stringify(user));
        console.log('User verification status updated to verified in local storage');
      }
    }
    
    return isVerified;
  } catch (error) {
    console.error('Error updating verification status:', error);
    return false;
  }
};

// Login user with Supabase
export const login = async (email: string, password: string) => {
  try {
    console.log('Attempting login for:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Login error:', error.message);
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error('Login failed');
    }

    // Check if email is verified
    // Supabase sets email_confirmed_at when verification is complete
    if (!data.user.email_confirmed_at) {
      console.warn('Login attempted for unverified account:', email);
      throw new Error('Your account has not been verified. Please check your email for a verification link or request a new one.');
    }
    
    console.log('Login successful:', {
      id: data.user.id,
      email: data.user.email,
      email_confirmed_at: data.user.email_confirmed_at
    });
    
    // Create user data object from Supabase response
    const userData = {
      id: data.user.id,
      name: data.user.user_metadata?.name || email.split('@')[0],
      email: data.user.email,
      phone: data.user.user_metadata?.phone || '',
      isVerified: !!data.user.email_confirmed_at
    };
    
    localStorage.setItem('token', data.session?.access_token || '');
    localStorage.setItem('user', JSON.stringify(userData));
    
    return userData;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Request a new verification email
export const requestNewVerificationCode = async (email: string) => {
  try {
    console.log('Requesting new verification email for:', email);
    
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) {
      console.error('Error sending verification email:', error);
      throw new Error(error.message);
    }
    
    console.log('New verification email sent successfully to:', email);

    return true;
  } catch (error) {
    console.error('Error requesting verification code:', error);
    throw error;
  }
};

// Reset password
export const resetPassword = async (email: string) => {
  try {
    console.log('Requesting password reset for:', email);
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    });

    if (error) {
      console.error('Error sending password reset email:', error);
      throw new Error(error.message);
    }
    
    console.log('Password reset email sent successfully to:', email);
    return true;
  } catch (error) {
    console.error('Error requesting password reset:', error);
    throw error;
  }
};

// Update password
export const updatePassword = async (newPassword: string) => {
  try {
    console.log('Updating password');
    
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      console.error('Error updating password:', error);
      throw new Error(error.message);
    }
    
    console.log('Password updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};

// Update user profile
export const updateProfile = async (updates: { name?: string; phone?: string }) => {
  try {
    console.log('Updating user profile:', updates);
    
    const { error } = await supabase.auth.updateUser({
      data: updates
    });

    if (error) {
      console.error('Error updating profile:', error);
      throw new Error(error.message);
    }
    
    // Update local storage
    const user = getCurrentUser();
    if (user) {
      const updatedUser = { ...user, ...updates };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    
    console.log('Profile updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Logout user with Supabase
export const logout = async (): Promise<void> => {
  try {
    console.log('Logging out user');
    await supabase.auth.signOut();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('Logout successful');
  } catch (error) {
    console.error('Logout error:', error);
    // Still remove local storage items even if Supabase logout fails
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Refresh token
export const refreshToken = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase.auth.refreshSession();
    
    if (error) {
      console.error('Error refreshing token:', error);
      return false;
    }
    
    if (data.session) {
      localStorage.setItem('token', data.session.access_token);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return false;
  }
};

// Get user session
export const getSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error getting session:', error);
      return null;
    }
    
    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
};

// Listen to auth state changes
export const onAuthStateChange = (callback: (event: string, session: any) => void) => {
  return supabase.auth.onAuthStateChange(callback);
};