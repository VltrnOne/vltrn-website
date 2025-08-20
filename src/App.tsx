import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Preloader Component
const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center z-50">
      <div className="text-center">
        <div className="text-8xl font-bold mb-8 tracking-wider">VLTRN</div>
        <div className="text-2xl text-gray-400 mb-12">Loading Global Solution Engine</div>
        
        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-800 rounded-full mb-4">
          <div 
            className="h-full bg-white rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Percentage */}
        <div className="text-4xl font-bold">{Math.round(progress)}%</div>
      </div>
    </div>
  );
};

// Subtle Particle Background
const SubtleParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create minimal, elegant particles
    const particles: Array<{ 
      x: number; 
      y: number; 
      size: number; 
      opacity: number;
      speed: number;
    }> = [];
    
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 0.2 + 0.1
      });
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = '#ffffff';
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();

        // Subtle movement
        particle.y += particle.speed;
        if (particle.y > canvas.height) {
          particle.y = 0;
          particle.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: -1 }}
    />
  );
};

// Main Landing Page
const LandingPage: React.FC<{ onEnter: () => void }> = ({ onEnter }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center z-50">
      {/* Subtle Background */}
      <SubtleParticleBackground />
      
      {/* Main Content */}
      <div className={`text-center transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Scroll Instruction */}
        <div className="mb-8 md:mb-16">
          <p className="text-base md:text-lg text-gray-400 mb-4">Scroll to explore</p>
          <div className="w-6 h-10 border border-gray-400 rounded-full mx-auto">
            <div className="w-1 h-3 bg-gray-400 rounded-full mx-auto mt-2 animate-bounce"></div>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-wider">VLTRN</h1>
        <h2 className="text-xl md:text-3xl text-gray-300 mb-8 md:mb-12 font-light tracking-wide">THE GLOBAL SOLUTION ENGINE</h2>

        {/* Enter Button */}
        <button
          onClick={onEnter}
          className="px-8 md:px-12 py-3 md:py-4 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-500 text-lg md:text-xl font-medium tracking-wide"
        >
          Enter
        </button>
      </div>

      {/* Device Notice */}
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

// Main Experience - Clean, Elegant Sections
const MainExperience: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const sections = [
    {
      id: 'intelligence',
      title: 'Intelligence Integration',
      subtitle: 'Networked Brain',
      description: 'Combining artificial intelligence, geopolitical foresight, and macroeconomic analysis to anticipate risks, identify opportunities, and guide long-term strategies.',
      stats: '1,600+ Organizations Connected'
    },
    {
      id: 'capital',
      title: 'Capital Structuring',
      subtitle: 'Advanced Trust Frameworks',
      description: 'Private instruments and asset-backed systems that enable secure, compliant, and asymmetric capital deployment across jurisdictions.',
      stats: 'Multi-Jurisdictional Deployment'
    },
    {
      id: 'governance',
      title: 'Resilient Governance',
      subtitle: 'Multi-Layered Trust',
      description: 'Entity webs designed for perpetual stewardship, intergenerational wealth protection, and regulatory alignment without dependence on fragile systems.',
      stats: 'Perpetual Stewardship'
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure for Growth',
      subtitle: 'Direct Industry Support',
      description: 'Solutions spanning technology, education, health, energy, agriculture, and cultural development – designed to scale sustainably.',
      stats: 'Cross-Industry Solutions'
    },
    {
      id: 'crisis-proof',
      title: 'Crisis-Proof Design',
      subtitle: 'Global Shock Preparation',
      description: 'War-gaming, insurance structures, and redundancy systems that protect stakeholders from inflationary cycles, currency shifts, and political instability.',
      stats: 'Redundancy Systems'
    },
    {
      id: 'unified',
      title: 'Unified Platform',
      subtitle: 'Synchronized Ecosystem',
      description: 'Transforming fragmented efforts into collective momentum, creating global leverage far beyond what any single entity could achieve.',
      stats: 'Collective Momentum'
    }
  ];

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? 1 : -1;
      const newSection = Math.max(0, Math.min(sections.length - 1, currentSection + direction));
      setCurrentSection(newSection);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentSection, sections.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Subtle Background */}
      <SubtleParticleBackground />
      
      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 space-y-4">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => setCurrentSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index 
                ? 'bg-white scale-125' 
                : 'bg-gray-500 hover:bg-gray-300'
            }`}
            title={section.title}
          />
        ))}
      </div>

      {/* Sections */}
      <div 
        ref={containerRef}
        className="flex h-full transition-transform duration-1000 ease-out"
        style={{ transform: `translateX(-${currentSection * 100}%)` }}
      >
        {sections.map((section, index) => (
          <div key={section.id} className="w-screen h-screen flex-shrink-0 flex items-center justify-center">
            <div className="text-center max-w-4xl mx-auto px-8">
              <div className="mb-8">
                <h2 className="text-6xl font-bold text-white mb-4 tracking-wide">{section.title}</h2>
                <h3 className="text-2xl text-gray-400 font-light mb-6 tracking-wide">{section.subtitle}</h3>
              </div>
              
              <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto">
                {section.description}
              </p>
              
              <div className="text-sm text-gray-500 font-mono tracking-wider">
                {section.stats}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Custom Cursor Component
const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const updateCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999] w-5 h-5 border border-white rounded-full transition-all duration-200 ease-out"
      style={{ transform: 'translate(-50%, -50%)' }}
    />
  );
};

// Main App Component
function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [showLanding, setShowLanding] = useState(false);
  const [showMain, setShowMain] = useState(false);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setShowLanding(true);
  };

  const handleEnter = () => {
    setShowLanding(false);
    setShowMain(true);
  };

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />
      
      {showPreloader ? (
        <Preloader onComplete={handlePreloaderComplete} />
      ) : showLanding ? (
        <LandingPage onEnter={handleEnter} />
      ) : showMain ? (
        <MainExperience />
      ) : (
        <div className="w-full h-screen bg-black flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to VLTRN</h1>
            <p className="text-xl">Click Enter to explore the global solution engine</p>
          </div>
        </div>
      )}
    </>
  );
}

export default App;