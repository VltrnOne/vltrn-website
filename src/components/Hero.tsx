import React, { useState } from 'react';

const Hero = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  console.log('🚀 Hero component is rendering...');

  const handleGetStarted = () => {
    console.log('🎯 Get Started button clicked!');
    setShowRegisterModal(true);
  };

  const handleLearnMore = () => {
    console.log('📚 Learn More button clicked!');
    alert('Learn More clicked! This would scroll to the services section.');
  };

  const handleLogin = () => {
    console.log('🔐 Login button clicked!');
    setShowLoginModal(true);
  };

  const closeModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            VLTRN
          </span>
          <span className="text-white ml-4">WORLD</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
          Transform your business with cutting-edge AI solutions, 
          <br className="hidden md:block" />
          innovative technology, and expert guidance.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={handleGetStarted}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg rounded-lg hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-pink-500/25"
          >
            🚀 Get Started
          </button>
          
          <button
            onClick={handleLearnMore}
            className="px-8 py-4 border-2 border-white/30 text-white font-bold text-lg rounded-lg hover:bg-white/10 hover:border-white/50 transform hover:scale-105 transition-all duration-200"
          >
            📚 Learn More
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-200">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="text-white font-semibold mb-2">AI-Powered</h3>
            <p className="text-gray-400">Advanced artificial intelligence for your business needs</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-200">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-white font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-400">Optimized performance and rapid deployment</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-200">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="text-white font-semibold mb-2">Secure & Reliable</h3>
            <p className="text-gray-400">Enterprise-grade security and 99.9% uptime</p>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-pink-500/30 rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-white mb-4">🔐 Login</h2>
            <p className="text-gray-300 mb-6">Login functionality coming soon!</p>
            <button
              onClick={closeModals}
              className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-white mb-4">🚀 Get Started</h2>
            <p className="text-gray-300 mb-6">Registration functionality coming soon!</p>
            <button
              onClick={closeModals}
              className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;