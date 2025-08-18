import React, { useState } from 'react';
import { X, Mail, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { getCurrentUser, requestNewVerificationCode } from '../../lib/authService';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerificationComplete: () => void;
}

const VerificationModal: React.FC<VerificationModalProps> = ({ 
  isOpen, 
  onClose,
  onVerificationComplete
}) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  
  const currentUser = getCurrentUser();

  // Handle closing the modal with verification message
  const handleVerificationComplete = () => {
    setSuccess("We've sent a verification email to your address. Please check your email and click the verification link.");
    
    // After a brief delay, call the completion handler
    setTimeout(() => {
      onVerificationComplete();
    }, 5000);
  };

  const handleResendCode = async () => {
    if (!currentUser || !currentUser.email) {
      setError("User information not found.");
      return;
    }
    
    setIsResending(true);
    setError(null);
    
    try {
      await requestNewVerificationCode(currentUser.email);
      setSuccess(`A new verification email has been sent to ${currentUser.email}. Please check your inbox and spam folder.`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to resend verification email. Please try again.');
      }
    } finally {
      setIsResending(false);
    }
  };

  if (!isOpen) return null;

  return (
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
          Verify Your Email
        </h2>

        <div className="mb-6 text-white/80">
          <p>A verification email has been sent to your address. Please check your inbox and click the verification link to complete your registration.</p>
          {currentUser?.email && (
            <div className="mt-4 p-3 bg-[rgba(254,2,161,0.1)] rounded-lg flex items-center">
              <Mail className="w-5 h-5 text-[#FE02A1] mr-3" />
              <div>
                <p className="font-semibold">{currentUser?.email}</p>
                <p className="text-xs mt-1 text-white/60">If you don't see the email, check your spam/junk folder</p>
              </div>
            </div>
          )}
        </div>

        {/* Success Message */}
        {success && (
          <div className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 p-3 rounded-lg mb-4">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 p-2 rounded-lg mb-4">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Verification Instructions */}
        <div className="text-white/80 mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
          <h3 className="font-semibold mb-2">Next steps:</h3>
          <ol className="list-decimal pl-5 space-y-2 text-sm">
            <li>Check your email inbox for a verification message</li>
            <li>Click the verification link in the email</li>
            <li>You'll be redirected back to VLTRN to complete your login</li>
            <li>If you don't receive an email within a few minutes, check your spam folder or request a new verification email</li>
          </ol>
        </div>

        <div className="space-y-4">
          {/* Complete Button */}
          <button
            type="button"
            onClick={handleVerificationComplete}
            className="w-full px-6 py-2 bg-[#FE02A1] rounded-lg text-white hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
          >
            I've Verified My Email
          </button>

          {/* Resend Code */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isResending}
              className="text-[#FE02A1] hover:underline flex items-center gap-2 mx-auto"
            >
              {isResending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Resending verification email...
                </>
              ) : (
                <>
                  Didn't receive an email? Resend
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;