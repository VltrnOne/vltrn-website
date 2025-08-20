import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Community from './pages/Community';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Resources from './pages/Resources';
import ClientIntakePage from './pages/ClientIntakePage';
import APITestPage from './pages/APITestPage';
import VerificationCallback from './pages/VerificationCallback';
import AuthGuard from './components/AuthGuard';

// Landing Page Component (Robin Payot Style)
const LandingPage: React.FC = () => {
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  const handleEnter = () => {
    setShowContent(true);
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center z-50">
      {/* Scroll to explore text */}
      <div className="text-center mb-8">
        <p className="text-lg text-gray-400 mb-4">Scroll to explore</p>
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full mx-auto relative">
          <div className="w-1 h-3 bg-gray-400 rounded-full mx-auto mt-2 animate-bounce"></div>
        </div>
      </div>

      {/* Main title */}
      <h1 className="text-6xl font-bold mb-4">VLTRN</h1>
      <h2 className="text-2xl text-gray-400 mb-8">CREATIVE AGENCY</h2>

      {/* Enter button */}
      <button
        onClick={handleEnter}
        className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-lg font-medium"
      >
        Enter
      </button>

      {/* Device rotation notice */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="flex items-center justify-center mb-2">
          <div className="w-6 h-6 border-2 border-gray-400 rounded rotate-45 mr-2"></div>
          <span className="text-sm text-gray-400">Please rotate your device</span>
        </div>
        <p className="text-xs text-gray-500">This website has been designed for desktop</p>
      </div>
    </div>
  );
};

// Enhanced Floating Element Component
const FloatingElement: React.FC<{ 
  index: number; 
  section: number; 
  type: 'particle' | 'geometric' | 'organic';
  color: string;
}> = ({ index, section, type, color }) => {
  const [isExploding, setIsExploding] = useState(false);
  const [position, setPosition] = useState({
    x: Math.random() * 100,
    y: Math.random() * 100,
    rotation: Math.random() * 360,
    scale: 0.5 + Math.random() * 1.5
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance to explode
        setIsExploding(true);
        setTimeout(() => setIsExploding(false), 2000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getElementShape = () => {
    switch (type) {
      case 'particle':
        return 'w-2 h-2 rounded-full';
      case 'geometric':
        return 'w-3 h-3 transform rotate-45';
      case 'organic':
        return 'w-4 h-2 rounded-full';
      default:
        return 'w-2 h-2 rounded-full';
    }
  };

  const getAnimationClass = () => {
    const animations = [
      'animate-float-slow',
      'animate-float-medium', 
      'animate-float-fast',
      'animate-rotate-slow',
      'animate-rotate-medium'
    ];
    return animations[index % animations.length];
  };

  if (isExploding) {
    return (
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={`explosion-${i}`}
            className={`absolute ${getElementShape()} ${color} animate-explode`}
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: `rotate(${i * 45}deg) translateX(${20 + Math.random() * 30}px)`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`absolute ${getElementShape()} ${color} ${getAnimationClass()} transition-all duration-1000`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `rotate(${position.rotation}deg) scale(${position.scale})`,
        animationDelay: `${index * 0.2}s`,
        animationDuration: `${3 + Math.random() * 4}s`
      }}
    />
  );
};

// Moving Background Component
const MovingBackground: React.FC<{ color: string }> = ({ color }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prev => (prev + 1) % 100);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated grid pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 98%, ${color} 100%),
            linear-gradient(0deg, transparent 98%, ${color} 100%)
          `,
          backgroundSize: '50px 50px',
          transform: `translate(${offset}px, ${offset * 0.5}px)`
        }}
      />
      
      {/* Moving waves */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at ${offset}% 50%, ${color} 0%, transparent 70%)`
        }}
      />
    </div>
  );
};

// Immersive Scrolling Experience Component
const ImmersiveExperience: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Enhanced planet-like sections data
  const sections = [
    {
      id: 'hero',
      title: 'VLTRN',
      subtitle: 'CREATIVE AGENCY',
      description: 'We craft digital experiences that inspire, engage, and transform.',
      color: 'from-purple-900 via-pink-900 to-red-900',
      accentColor: 'bg-pink-500',
      action: 'Start Journey',
      elements: 25,
      elementTypes: ['particle', 'geometric', 'organic']
    },
    {
      id: 'services',
      title: 'SERVICES',
      subtitle: 'DIGITAL EXCELLENCE',
      description: 'Web Development, AI Integration, Creative Consulting, Brand Strategy',
      color: 'from-blue-900 via-cyan-900 to-teal-900',
      accentColor: 'bg-cyan-500',
      action: 'Explore Services',
      elements: 30,
      elementTypes: ['particle', 'geometric']
    },
    {
      id: 'ai',
      title: 'AI INTEGRATION',
      subtitle: 'FUTURE-FORWARD',
      description: 'Cutting-edge artificial intelligence solutions for your business',
      color: 'from-green-900 via-emerald-900 to-teal-900',
      accentColor: 'bg-emerald-500',
      action: 'Discover AI',
      elements: 35,
      elementTypes: ['particle', 'organic', 'geometric']
    },
    {
      id: 'projects',
      title: 'PROJECTS',
      subtitle: 'CREATIVE PORTFOLIO',
      description: 'Showcasing our most innovative and impactful work',
      color: 'from-orange-900 via-red-900 to-pink-900',
      accentColor: 'bg-orange-500',
      action: 'View Projects',
      elements: 28,
      elementTypes: ['geometric', 'particle']
    },
    {
      id: 'contact',
      title: 'LET\'S TALK',
      subtitle: 'START YOUR PROJECT',
      description: 'Ready to bring your vision to life? Let\'s create something amazing together.',
      color: 'from-indigo-900 via-purple-900 to-pink-900',
      accentColor: 'bg-purple-500',
      action: 'Get Started',
      elements: 22,
      elementTypes: ['particle', 'organic']
    }
  ];

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const sectionHeight = containerRef.current.clientHeight;
      const newSection = Math.floor(scrollTop / sectionHeight);
      setCurrentSection(newSection);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  const scrollToSection = (index: number) => {
    if (containerRef.current) {
      const sectionHeight = containerRef.current.clientHeight;
      containerRef.current.scrollTo({
        top: index * sectionHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="relative" onMouseMove={handleMouseMove}>
      {/* Interactive Cursor Trail */}
      <div className="fixed pointer-events-none z-50">
        <div 
          className="w-4 h-4 bg-white/30 rounded-full transition-all duration-100 ease-out"
          style={{
            left: mousePosition.x + '%',
            top: mousePosition.y + '%',
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 space-y-4">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 nav-dot ${
              currentSection === index 
                ? 'bg-white scale-125 shadow-lg shadow-white/50' 
                : 'bg-gray-500 hover:bg-gray-300'
            }`}
            title={section.title}
          />
        ))}
      </div>

      {/* Main Scrolling Container */}
      <div 
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
      >
        {sections.map((section, index) => (
          <section
            key={section.id}
            className={`h-screen flex flex-col items-center justify-center text-center px-4 snap-start relative overflow-hidden section-transition`}
          >
            {/* Enhanced Animated Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-90`}>
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Moving Background Elements */}
            <MovingBackground color={section.accentColor.replace('bg-', '').split('-')[0]} />

            {/* Enhanced Floating Elements */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(section.elements)].map((_, i) => (
                <FloatingElement
                  key={`${section.id}-${i}`}
                  index={i}
                  section={index}
                  type={section.elementTypes[i % section.elementTypes.length]}
                  color={section.accentColor}
                />
              ))}
            </div>

            {/* Interactive Content */}
            <div className="relative z-10 max-w-4xl mx-auto">
              <h1 className="text-8xl font-bold mb-6 tracking-tight text-white hover:scale-105 transition-transform duration-500 cursor-pointer">
                {section.title}
              </h1>
              <h2 className="text-3xl text-gray-200 mb-8 font-light tracking-wide">
                {section.subtitle}
              </h2>
              <p className="text-xl text-gray-300 mb-16 leading-relaxed max-w-3xl mx-auto">
                {section.description}
              </p>

              {/* Enhanced Action Button */}
              <button className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-500 text-lg font-medium group relative overflow-hidden">
                <span className="relative z-10">{section.action}</span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </button>
            </div>

            {/* Enhanced Scroll Indicator */}
            {index < sections.length - 1 && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-sm text-gray-300 mb-2">Scroll to continue</p>
                <div className="w-6 h-10 border-2 border-gray-300 rounded-full mx-auto">
                  <div className="w-1 h-3 bg-gray-300 rounded-full mx-auto mt-2 animate-bounce"></div>
                </div>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

// Main App Component
const MainApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <ImmersiveExperience />
    </div>
  );
};

function App() {
  const [showLanding, setShowLanding] = useState(true);

  // Hide landing page after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLanding(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {showLanding ? (
        <LandingPage />
      ) : (
        <MainApp />
      )}
    </Router>
  );
}

export default App;