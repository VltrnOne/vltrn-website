import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, X, Lock, AlertCircle } from 'lucide-react';

const API_PASSWORD = "654321!";

const ApiAccessButton: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setPassword('');
    setError('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPassword('');
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === API_PASSWORD) {
      setIsModalOpen(false);
      navigate('/api-test');
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="p-2 text-white/50 hover:text-[#FE02A1] transition-colors duration-200"
        title="Admin Access"
      >
        <Database className="w-4 h-4" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm"
            onClick={handleCloseModal}
          />
          <div className="relative w-full max-w-md bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-xl p-6 animate-fade-in">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-white/60 hover:text-[#FE02A1] transition-colors duration-200"
            >
              <X size={20} />
            </button>

            {/* Title */}
            <h2 className="text-xl font-['Exo_2'] font-bold text-white mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#FE02A1]" />
              Admin Access
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white placeholder-white/50 focus:border-[#FE02A1] transition-colors duration-300"
                    placeholder="Enter admin password"
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 p-2 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-2 bg-[#FE02A1] rounded-lg text-white hover:scale-105 hover:shadow-[0_0_20px_#FE02A1] transition-all duration-300"
              >
                Access
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ApiAccessButton;