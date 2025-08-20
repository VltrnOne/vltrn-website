import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <span className="text-2xl font-bold text-white">VLTRN</span>
              <span className="absolute -top-1 -right-8 text-xs font-light text-blue-400 transform rotate-12">
                AGENCY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium"
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium"
            >
              Services
            </Link>
            <Link 
              to="/projects" 
              className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium"
            >
              Projects
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              to="/client-intakes"
              className="px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium"
            >
              Start Project
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:text-gray-300 transition-colors duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
            <div className="px-4 py-6 space-y-4">
              <Link 
                to="/" 
                className="block text-gray-300 hover:text-white transition-colors duration-300 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/services" 
                className="block text-gray-300 hover:text-white transition-colors duration-300 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/projects" 
                className="block text-gray-300 hover:text-white transition-colors duration-300 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link 
                to="/contact" 
                className="block text-gray-300 hover:text-white transition-colors duration-300 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4">
                <Link
                  to="/client-intakes"
                  className="block w-full px-6 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-base font-medium text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Start Project
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;