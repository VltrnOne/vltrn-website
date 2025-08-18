import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { isAuthenticated, getCurrentUser } from '../lib/authService';
import Sphere from './Sphere';
import ClientIntakeForm from './forms/ClientIntakeForm';

const Hero = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleGetStarted = () => {
    if (isAuthenticated()) {
      // Check if user is verified
      const currentUser = getCurrentUser();
      if (currentUser?.isVerified) {
        setIsFormOpen(true);
      } else {
        // Use state to indicate we want to show login screen with a verification error message
        window.history.pushState({ 
          showLogin: true, 
          verificationError: true,
          from: '/onboarding' 
        }, '', '');
        // Trigger a state update to cause a re-render that will show the login modal
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    } else {
      // Use state to indicate we want to show login screen with a redirect to onboarding after
      window.history.pushState({ 
        showLogin: true, 
        from: '/onboarding' 
      }, '', '');
      // Trigger a state update to cause a re-render that will show the login modal
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,2,161,0.1)_0%,transparent_70%)] animate-pulse" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(254,2,161,0.05)_0%,transparent_100%)]" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(254, 2, 161, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(254, 2, 161, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'top',
        }}
      />

      {/* Content Container */}
      <div className="relative container mx-auto px-4 pt-24 flex items-center min-h-screen">
        <div className="w-full max-w-[800px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-10 -left-10 w-20 h-20 border border-[#FE02A1] rounded-full opacity-20 animate-ping" />
              <div className="absolute -bottom-10 -right-10 w-16 h-16 border border-[#FE02A1] rounded-full opacity-20 animate-pulse" />

              <h1 className="font-['Exo_2'] text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="relative inline-block mb-2">
                  IDEATE
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FE02A1] rounded-full animate-pulse" />
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FE02A1] to-[#FF69B4] [text-shadow:0_0_30px_rgba(254,2,161,0.5)]">
                  & EXECUTE
                </span>
              </h1>

              <p className="font-['Montserrat'] text-lg text-white/80 mb-8 leading-relaxed">
                Experience the next evolution of collaboration. Build, scale, and transform your vision into reality.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleGetStarted}
                  className="group relative px-8 py-3 bg-[#FE02A1] text-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_#FE02A1]"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
                <Link
                  to="/about"
                  className="group relative px-8 py-3 bg-transparent border-2 border-[#FE02A1] text-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_#FE02A1]"
                >
                  <span className="relative z-10">Learn More</span>
                  <div className="absolute inset-0 bg-[#FE02A1] -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </Link>
              </div>
            </div>

            {/* 3D Sphere */}
            <div className="relative h-[400px] hidden md:block">
              {/* Decorative Rings */}
              <div className="absolute inset-0 border-2 border-[#FE02A1]/20 rounded-full animate-spin-slow" 
                style={{ animationDuration: '20s' }} />
              <div className="absolute inset-8 border-2 border-[#FE02A1]/15 rounded-full animate-spin-slow" 
                style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
              <div className="absolute inset-16 border-2 border-[#FE02A1]/10 rounded-full animate-spin-slow" 
                style={{ animationDuration: '10s' }} />
              
              <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Sphere />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
              </Canvas>
            </div>
          </div>
        </div>
      </div>

      <ClientIntakeForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default Hero;