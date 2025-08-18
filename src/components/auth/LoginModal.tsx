import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { login, requestNewVerificationCode, resetPassword } from '../../lib/authService';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
  verificationError?: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSwitchToRegister,
  verificationError = false
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  useEffect(() => {
    if (verificationError) {
      setError('Your account has not been verified. Please check your email for a verification link.');
    }
  }, [verificationError]);

  useEffect(() => {
    if (isOpen) {
      setError('');
      setSuccess('');
      setShowResetPassword(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const user = await login(email, password);
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        onClose();
        window.location.reload(); // Refresh to update auth state
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsResettingPassword(true);
    setError('');
    setSuccess('');

    try {
      await resetPassword(email);
      setSuccess('Password reset email sent! Check your inbox.');
      setTimeout(() => {
        setShowResetPassword(false);
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsResettingPassword(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      setError('Please enter your email address first');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await requestNewVerificationCode(email);
      setSuccess('Verification email sent! Check your inbox.');
    } catch (err: any) {
      setError(err.message || 'Failed to send verification email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-[rgba(0,0,0,0.95)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-2xl shadow-2xl p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-white/60">Sign in to your VLTRN account</p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center space-x-2 text-red-400">
            <AlertCircle size={16} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center space-x-2 text-green-400">
            <CheckCircle size={16} />
            <span className="text-sm">{success}</span>
          </div>
        )}

        {!showResetPassword ? (
          /* Login Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={18} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#FE02A1] focus:ring-1 focus:ring-[#FE02A1] transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={18} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#FE02A1] focus:ring-1 focus:ring-[#FE02A1] transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => setShowResetPassword(true)}
                className="text-sm text-[#FE02A1] hover:text-[#FE02A1]/80 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FE02A1] hover:bg-[#FE02A1]/80 disabled:bg-[#FE02A1]/50 text-white py-3 rounded-lg font-semibold transition-colors duration-200 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

            {/* Resend Verification (if needed) */}
            {verificationError && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={isLoading}
                  className="text-sm text-[#FE02A1] hover:text-[#FE02A1]/80 transition-colors disabled:opacity-50"
                >
                  Resend verification email
                </button>
              </div>
            )}

            {/* Switch to Register */}
            <div className="text-center pt-4 border-t border-[rgba(255,255,255,0.1)]">
              <p className="text-white/60 text-sm">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={onSwitchToRegister}
                  className="text-[#FE02A1] hover:text-[#FE02A1]/80 font-semibold transition-colors"
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        ) : (
          /* Reset Password Form */
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-white">Reset Password</h3>
              <p className="text-white/60 text-sm">Enter your email to receive a reset link</p>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="reset-email" className="block text-sm font-medium text-white/80 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={18} />
                <input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#FE02A1] focus:ring-1 focus:ring-[#FE02A1] transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Reset Button */}
            <button
              type="submit"
              disabled={isResettingPassword}
              className="w-full bg-[#FE02A1] hover:bg-[#FE02A1]/80 disabled:bg-[#FE02A1]/50 text-white py-3 rounded-lg font-semibold transition-colors duration-200 disabled:cursor-not-allowed"
            >
              {isResettingPassword ? 'Sending...' : 'Send Reset Link'}
            </button>

            {/* Back to Login */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowResetPassword(false)}
                className="text-sm text-white/60 hover:text-white/80 transition-colors"
              >
                ← Back to login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginModal;