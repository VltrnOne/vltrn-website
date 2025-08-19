import React, { useState, useEffect } from 'react';
import { X, Lock, Mail, AlertCircle, User, Phone, CheckCircle, Shield } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { register } from '../../lib/authService';
import VerificationModal from './VerificationModal';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onRegisterSuccess?: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSwitchToLogin, onRegisterSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  // Get redirect path from location state if available
  const from = location.state?.from || '/onboarding';

  // Send verification code when modal opens
  useEffect(() => {
    if (isOpen && !verificationSent) {
      // In a real implementation, this would send a verification code to the user's phone/email
      setVerificationSent(true);
    }
  }, [isOpen, verificationSent]);

  const handleVerificationChange = (code: string) => {
    setVerificationCode(code);
    if (code && error?.toLowerCase().includes('verification')) {
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate form
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Validate verification code
    if (!verificationCode) {
      setError("Please enter the verification code sent to your phone/email");
      return;
    }
    
    setIsLoading(true);

    try {
      console.log('Registering with email:', formData.email);
      
      // Call the register function from authService
      await register(formData.name, formData.email, formData.phone, formData.password);
      
      // Success - show verification modal instead of redirecting
      setShowVerification(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Registration failed. Please try again.');
      }
      setShowVerification(false);
      
      // Reset verification code on error
      setVerificationCode('');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle verification completion
  const handleVerificationComplete = () => {
    // Close both modals
    setShowVerification(false);
    onClose();
    
    // Call success callback if provided
    if (onRegisterSuccess) {
      onRegisterSuccess();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div
          className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative w-full max-w-md bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6 animate-fade-in">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/60 hover:text-[#FE02A1] transition-colors duration-200"
          >
            <X size={20} />
          </button>

          {/* Title */}
          <h2 className="text-2xl font-['Exo_2'] font-bold text-white mb-6 [text-shadow:0_0_15px_#FE02A1]">
            Create Account
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white placeholder-white/50 focus:border-[#FE02A1] transition-colors duration-300"
                  placeholder="Enter your full name"
                  required
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              </div>
            </div>
            
            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white placeholder-white/50 focus:border-[#FE02A1] transition-colors duration-300"
                  placeholder="Enter your phone number"
                  required
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white placeholder-white/50 focus:border-[#FE02A1] transition-colors duration-300"
                  placeholder="Enter your email"
                  required
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white placeholder-white/50 focus:border-[#FE02A1] transition-colors duration-300"
                  placeholder="Create a password"
                  required
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              </div>
            </div>
            
            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white placeholder-white/50 focus:border-[#FE02A1] transition-colors duration-300"
                  placeholder="Confirm your password"
                  required
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              </div>
            </div>

            {/* Verification Code */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Verification Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => handleVerificationChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white placeholder-white/50 focus:border-[#FE02A1] transition-colors duration-300"
                  placeholder="Enter verification code"
                  required
                />
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              </div>
              <p className="text-xs text-white/60 mt-1">
                A verification code has been sent to your phone/email
              </p>
            </div>

            {/* Verification Status */}
            <div className="text-xs flex items-center">
              <div className={`w-2 h-2 rounded-full ${verificationCode ? 'bg-green-400' : 'bg-yellow-400'} mr-2`}></div>
              <span className="text-white/60">
                {verificationCode ? 'Verification code entered' : 'Verification code required'}
              </span>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 p-2 rounded-lg">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-2 bg-[#FE02A1] rounded-lg text-white hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>

            {/* Switch to Login */}
            <div className="text-center mt-4">
              <p className="text-white/60 text-sm">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-[#FE02A1] hover:underline"
                >
                  Log In
                </button>
              </p>
            </div>

            {/* Privacy Notice */}
            <div className="text-xs text-white/60 text-center">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-[#FE02A1] hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-[#FE02A1] hover:underline">
                Privacy Policy
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Verification Modal */}
      <VerificationModal 
        isOpen={showVerification} 
        onClose={() => setShowVerification(false)}
        onVerificationComplete={handleVerificationComplete}
      />
    </>
  );
};

export default RegisterModal;