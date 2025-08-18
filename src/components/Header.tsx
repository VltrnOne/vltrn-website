import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut, Database, User, Settings, BarChart3, Users, Briefcase, FileText, Calendar } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import ClientIntakeForm from './forms/ClientIntakeForm';
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';
import { isAuthenticated, logout, getCurrentUser } from '../lib/authService';
import ApiAccessButton from './ApiAccessButton';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [verificationError, setVerificationError] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check authentication status when component mounts and location changes
  useEffect(() => {
    setUserLoggedIn(isAuthenticated());
    
    // Check if we should show login modal from location state
    if (location.state?.showLogin) {
      setIsLoginOpen(true);
      if (location.state.verificationError) {
        setVerificationError(true);
      } else {
        setVerificationError(false);
      }
      // Clear the state to prevent modal showing on page refresh
      window.history.replaceState({}, document.title);
    } else if (location.state?.showRegister) {
      setIsRegisterOpen(true);
      // Clear the state to prevent modal showing on page refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const navItems = [
    { name: 'Community', path: '/community', icon: Users },
    { name: 'Partners', path: '/partners', icon: Briefcase },
    { name: 'About', path: '/about', icon: User },
  ];

  const managementItems = [
    { name: 'Client Intakes', path: '/client-intakes', icon: FileText },
    { name: 'Projects', path: '/projects', icon: Briefcase },
    { name: 'Tasks', path: '/tasks', icon: Calendar },
    { name: 'Resources', path: '/resources', icon: Database },
    { name: 'Analytics', path: '/performance-analytics', icon: BarChart3 },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setUserLoggedIn(false);
    setIsMenuOpen(false);
    // Redirect to home page after logout
    navigate('/');
  };
  
  const handleStartNowClick = () => {
    const currentUser = getCurrentUser();
    
    if (!userLoggedIn) {
      setIsLoginOpen(true);
    } else if (currentUser && !currentUser.isVerified) {
      // User is logged in but not verified
      setVerificationError(true);
      setIsLoginOpen(true);
    } else {
      setIsFormOpen(true);
    }
  };
  
  const switchToRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };
  
  const switchToLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed w-full z-[1000] px-4 py-2">
        <div className="max-w-7xl mx-auto">
          <nav className="relative flex items-center justify-between h-16 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-lg shadow-[0_0_20px_rgba(254,2,161,0.2)]">
            {/* Logo */}
            <div className="px-4">
              <Link to="/" className="text-[#FE02A1] font-['Exo_2'] text-2xl font-bold hover:text-[#FE02A1]/80 transition-colors">
                VLTRN
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-end flex-1">
              {/* Main Navigation */}
              <div className="flex items-center space-x-8 mr-8">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={clsx(
                        "flex items-center space-x-2 text-white/80 hover:text-[#FE02A1] transition-colors duration-200",
                        isActive(item.path) && "text-[#FE02A1]"
                      )}
                    >
                      <Icon size={16} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Management Navigation (only show when logged in) */}
              {userLoggedIn && (
                <div className="flex items-center space-x-6 mr-8">
                  {managementItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={clsx(
                          "flex items-center space-x-2 text-white/80 hover:text-[#FE02A1] transition-colors duration-200",
                          isActive(item.path) && "text-[#FE02A1]"
                        )}
                      >
                        <Icon size={16} />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* User Actions */}
              <div className="flex items-center space-x-4">
                {userLoggedIn ? (
                  <>
                    <button
                      onClick={() => setIsFormOpen(true)}
                      className="bg-[#FE02A1] hover:bg-[#FE02A1]/80 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
                    >
                      Start New Project
                    </button>
                    <div className="relative group">
                      <button className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200">
                        <User size={20} />
                        <span>{getCurrentUser()?.name || 'User'}</span>
                      </button>
                      {/* Dropdown Menu */}
                      <div className="absolute right-0 mt-2 w-48 bg-[rgba(0,0,0,0.9)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <div className="py-2">
                          <Link
                            to="/dashboard"
                            className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-[#FE02A1] hover:bg-[rgba(254,2,161,0.1)] transition-colors duration-200"
                          >
                            <BarChart3 size={16} />
                            <span>Dashboard</span>
                          </Link>
                          <Link
                            to="/onboarding"
                            className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-[#FE02A1] hover:bg-[rgba(254,2,161,0.1)] transition-colors duration-200"
                          >
                            <Settings size={16} />
                            <span>Settings</span>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 w-full px-4 py-2 text-white/80 hover:text-red-400 hover:bg-[rgba(239,68,68,0.1)] transition-colors duration-200"
                          >
                            <LogOut size={16} />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsLoginOpen(true)}
                      className="text-white/80 hover:text-[#FE02A1] transition-colors duration-200"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => setIsRegisterOpen(true)}
                      className="bg-[#FE02A1] hover:bg-[#FE02A1]/80 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
                    >
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white/80 hover:text-[#FE02A1] transition-colors duration-200"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-[rgba(0,0,0,0.95)] backdrop-blur-[10px] border border-[rgba(254,2,161,0.3)] rounded-lg shadow-lg">
              <div className="py-4">
                {/* Main Navigation */}
                <div className="px-4 py-2">
                  <h3 className="text-[#FE02A1] font-semibold mb-3">Navigation</h3>
                  <div className="space-y-2">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={closeMobileMenu}
                          className={clsx(
                            "flex items-center space-x-3 px-3 py-2 text-white/80 hover:text-[#FE02A1] hover:bg-[rgba(254,2,161,0.1)] rounded-lg transition-colors duration-200",
                            isActive(item.path) && "text-[#FE02A1] bg-[rgba(254,2,161,0.1)]"
                          )}
                        >
                          <Icon size={18} />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Management Navigation (only show when logged in) */}
                {userLoggedIn && (
                  <div className="px-4 py-2 border-t border-[rgba(254,2,161,0.2)]">
                    <h3 className="text-[#FE02A1] font-semibold mb-3">Management</h3>
                    <div className="space-y-2">
                      {managementItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={closeMobileMenu}
                            className={clsx(
                              "flex items-center space-x-3 px-3 py-2 text-white/80 hover:text-[#FE02A1] hover:bg-[rgba(254,2,161,0.1)] rounded-lg transition-colors duration-200",
                              isActive(item.path) && "text-[#FE02A1] bg-[rgba(254,2,161,0.1)]"
                            )}
                          >
                            <Icon size={18} />
                            <span>{item.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* User Actions */}
                <div className="px-4 py-2 border-t border-[rgba(254,2,161,0.2)]">
                  {userLoggedIn ? (
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setIsFormOpen(true);
                          closeMobileMenu();
                        }}
                        className="w-full bg-[#FE02A1] hover:bg-[#FE02A1]/80 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                      >
                        Start New Project
                      </button>
                      <div className="text-center text-white/60 text-sm">
                        Welcome, {getCurrentUser()?.name || 'User'}!
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-white/80 hover:text-red-400 hover:bg-[rgba(239,68,68,0.1)] rounded-lg transition-colors duration-200"
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setIsLoginOpen(true);
                          closeMobileMenu();
                        }}
                        className="w-full text-white/80 hover:text-[#FE02A1] transition-colors duration-200"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          setIsRegisterOpen(true);
                          closeMobileMenu();
                        }}
                        className="w-full bg-[#FE02A1] hover:bg-[#FE02A1]/80 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                      >
                        Get Started
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Modals */}
      {isFormOpen && (
        <ClientIntakeForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {isLoginOpen && (
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onSwitchToRegister={switchToRegister}
          verificationError={verificationError}
        />
      )}

      {isRegisterOpen && (
        <RegisterModal
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          onSwitchToLogin={switchToLogin}
        />
      )}
    </>
  );
};

export default Header;