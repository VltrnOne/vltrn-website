import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Landing Page Component (EXACT Robin Payot Style)
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

// World Component - Each world in the universe
const World: React.FC<{ 
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  accentColor: string;
  onEnter: () => void;
  isActive: boolean;
}> = ({ id, title, subtitle, description, color, accentColor, onEnter, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative w-screen h-screen flex-shrink-0 flex items-center justify-center transition-all duration-1000 ${
        isActive ? 'scale-100' : 'scale-95'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} transition-all duration-1000`}>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 ${accentColor} rounded-full animate-float transition-all duration-1000 ${
              isHovered ? 'opacity-80 scale-150' : 'opacity-40 scale-100'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-8">
        <h1 className={`text-8xl font-bold mb-6 tracking-tight text-white transition-all duration-1000 ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}>
          {title}
        </h1>
        <h2 className="text-3xl text-gray-200 mb-8 font-light tracking-wide">
          {subtitle}
        </h2>
        <p className="text-xl text-gray-300 mb-16 leading-relaxed">
          {description}
        </p>

        {/* Enter World Button */}
        <button
          onClick={onEnter}
          className={`px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-500 text-lg font-medium group relative overflow-hidden ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        >
          <span className="relative z-10">Enter World</span>
          <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </button>
      </div>

      {/* World Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm text-gray-300 mb-2">Click to enter</p>
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full mx-auto">
          <div className="w-1 h-3 bg-gray-300 rounded-full mx-auto mt-2 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

// Universe Experience Component (Horizontal Scrolling Worlds)
const UniverseExperience: React.FC = () => {
  const [currentWorld, setCurrentWorld] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // World data
  const worlds = [
    {
      id: 'hero',
      title: 'VLTRN',
      subtitle: 'CREATIVE AGENCY',
      description: 'We craft digital experiences that inspire, engage, and transform.',
      color: 'from-purple-900 via-pink-900 to-red-900',
      accentColor: 'bg-pink-500',
      route: '/hero'
    },
    {
      id: 'services',
      title: 'SERVICES',
      subtitle: 'DIGITAL EXCELLENCE',
      description: 'Web Development, AI Integration, Creative Consulting, Brand Strategy',
      color: 'from-blue-900 via-cyan-900 to-teal-900',
      accentColor: 'bg-cyan-500',
      route: '/services'
    },
    {
      id: 'ai',
      title: 'AI INTEGRATION',
      subtitle: 'FUTURE-FORWARD',
      description: 'Cutting-edge artificial intelligence solutions for your business',
      color: 'from-green-900 via-emerald-900 to-teal-900',
      accentColor: 'bg-emerald-500',
      route: '/ai'
    },
    {
      id: 'projects',
      title: 'PROJECTS',
      subtitle: 'CREATIVE PORTFOLIO',
      description: 'Showcasing our most innovative and impactful work',
      color: 'from-orange-900 via-red-900 to-pink-900',
      accentColor: 'bg-orange-500',
      route: '/projects'
    },
    {
      id: 'contact',
      title: 'LET\'S TALK',
      subtitle: 'START YOUR PROJECT',
      description: 'Ready to bring your vision to life? Let\'s create something amazing together.',
      color: 'from-indigo-900 via-purple-900 to-pink-900',
      accentColor: 'bg-purple-500',
      route: '/contact'
    }
  ];

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 1 : -1;
    const newWorld = Math.max(0, Math.min(worlds.length - 1, currentWorld + delta));
    setCurrentWorld(newWorld);
    scrollToWorld(newWorld);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = dragStart - e.clientX;
    if (Math.abs(delta) > 100) {
      const direction = delta > 0 ? 1 : -1;
      const newWorld = Math.max(0, Math.min(worlds.length - 1, currentWorld + direction));
      setCurrentWorld(newWorld);
      scrollToWorld(newWorld);
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const scrollToWorld = (worldIndex: number) => {
    if (containerRef.current) {
      const worldWidth = containerRef.current.clientWidth;
      containerRef.current.scrollTo({
        left: worldIndex * worldWidth,
        behavior: 'smooth'
      });
    }
  };

  const enterWorld = (world: typeof worlds[0]) => {
    navigate(world.route);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [currentWorld]);

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-black"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Custom Cursor */}
      <div className="fixed pointer-events-none z-50">
        <div className="w-4 h-4 bg-white/30 rounded-full transition-all duration-100 ease-out"></div>
      </div>

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 space-y-4">
        {worlds.map((world, index) => (
          <button
            key={world.id}
            onClick={() => {
              setCurrentWorld(index);
              scrollToWorld(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 nav-dot ${
              currentWorld === index 
                ? 'bg-white scale-125 shadow-lg shadow-white/50' 
                : 'bg-gray-500 hover:bg-gray-300'
            }`}
            title={world.title}
          />
        ))}
      </div>

      {/* Scroll Instruction */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-center z-40">
        <p className="text-sm text-gray-300 mb-2">Scroll or drag to explore worlds</p>
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full mx-auto">
          <div className="w-1 h-3 bg-gray-300 rounded-full mx-auto mt-2 animate-bounce"></div>
        </div>
      </div>

      {/* Horizontal Scrolling Container */}
      <div 
        ref={containerRef}
        className="flex h-full transition-transform duration-1000 ease-out"
        style={{ transform: `translateX(-${currentWorld * 100}%)` }}
      >
        {worlds.map((world, index) => (
          <World
            key={world.id}
            {...world}
            isActive={currentWorld === index}
            onEnter={() => enterWorld(world)}
          />
        ))}
      </div>
    </div>
  );
};

// Individual World Pages
const HeroPage: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 text-white flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-8xl font-bold mb-6">VLTRN</h1>
      <h2 className="text-3xl mb-8">CREATIVE AGENCY</h2>
      <p className="text-xl mb-12 max-w-2xl mx-auto">
        We craft digital experiences that inspire, engage, and transform.
      </p>
      <button 
        onClick={() => window.history.back()}
        className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300"
      >
        Back to Universe
      </button>
    </div>
  </div>
);

const ServicesPage: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900 text-white flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-8xl font-bold mb-6">SERVICES</h1>
      <h2 className="text-3xl mb-8">DIGITAL EXCELLENCE</h2>
      <p className="text-xl mb-12 max-w-2xl mx-auto">
        Web Development, AI Integration, Creative Consulting, Brand Strategy
      </p>
      <button 
        onClick={() => window.history.back()}
        className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300"
      >
        Back to Universe
      </button>
    </div>
  </div>
);

const AIPage: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 text-white flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-8xl font-bold mb-6">AI INTEGRATION</h1>
      <h2 className="text-3xl mb-8">FUTURE-FORWARD</h2>
      <p className="text-xl mb-12 max-w-2xl mx-auto">
        Cutting-edge artificial intelligence solutions for your business
      </p>
      <button 
        onClick={() => window.history.back()}
        className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300"
      >
        Back to Universe
      </button>
    </div>
  </div>
);

const ProjectsPage: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 text-white flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-8xl font-bold mb-6">PROJECTS</h1>
      <h2 className="text-3xl mb-8">CREATIVE PORTFOLIO</h2>
      <p className="text-xl mb-12 max-w-2xl mx-auto">
        Showcasing our most innovative and impactful work
      </p>
      <button 
        onClick={() => window.history.back()}
        className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300"
      >
        Back to Universe
      </button>
    </div>
  </div>
);

const ContactPage: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-8xl font-bold mb-6">LET'S TALK</h1>
      <h2 className="text-3xl mb-8">START YOUR PROJECT</h2>
      <p className="text-xl mb-12 max-w-2xl mx-auto">
        Ready to bring your vision to life? Let's create something amazing together.
      </p>
      <button 
        onClick={() => window.history.back()}
        className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300"
      >
        Back to Universe
      </button>
    </div>
  </div>
);

// Main App Component
const MainApp: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UniverseExperience />} />
        <Route path="/hero" element={<HeroPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/ai" element={<AIPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
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
    <>
      {showLanding ? (
        <LandingPage />
      ) : (
        <MainApp />
      )}
    </>
  );
}

export default App;