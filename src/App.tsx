import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import * as THREE from 'three';

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
        <div className="text-8xl font-bold mb-8">VLTRN</div>
        <div className="text-2xl text-gray-400 mb-12">Loading Experience</div>
        
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

// Orbital Element Component
const OrbitalElement: React.FC<{
  id: string;
  type: 'technology' | 'partner' | 'capability' | 'star';
  title: string;
  description: string;
  orbitRadius: number;
  orbitSpeed: number;
  orbitOffset: number;
  size: number;
  color: string;
  onElementClick: (element: any) => void;
  isHovered: boolean;
  onHover: (id: string, isHovered: boolean) => void;
  scrollProgress: number;
}> = ({ id, type, title, description, orbitRadius, orbitSpeed, orbitOffset, size, color, onElementClick, isHovered, onHover, scrollProgress }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentAngle, setCurrentAngle] = useState(orbitOffset);

  // Calculate orbital position based on scroll and time
  useEffect(() => {
    const angle = orbitOffset + (scrollProgress * orbitSpeed) + (Date.now() * 0.0001 * orbitSpeed);
    setCurrentAngle(angle);
  }, [scrollProgress, orbitSpeed, orbitOffset]);

  const getElementIcon = () => {
    switch (type) {
      case 'technology':
        return 'T';
      case 'partner':
        return 'P';
      case 'capability':
        return 'C';
      case 'star':
        return '★';
      default:
        return '•';
    }
  };

  const getElementSize = () => {
    return `w-${size} h-${size}`;
  };

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onElementClick({ id, type, title, description });
      setIsAnimating(false);
    }, 500);
  };

  // Calculate position on orbit
  const x = Math.cos(currentAngle) * orbitRadius;
  const y = Math.sin(currentAngle) * orbitRadius;

  return (
    <div
      className={`absolute ${getElementSize()} cursor-pointer transition-all duration-1000 ease-out ${
        isHovered ? 'scale-150 z-50' : 'scale-100'
      } ${isAnimating ? 'animate-pulse' : ''}`}
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: `translate(-50%, -50%)`,
      }}
      onMouseEnter={() => onHover(id, true)}
      onMouseLeave={() => onHover(id, false)}
      onClick={handleClick}
    >
      {/* Element Background */}
      <div 
        className={`w-full h-full rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-700 ${
          isHovered 
            ? 'bg-gradient-to-br from-pink-500 to-purple-600 shadow-2xl shadow-pink-500/50 ring-4 ring-pink-300/50' 
            : `bg-gradient-to-br ${color} shadow-lg ring-2 ring-white/20`
        }`}
      >
        {getElementIcon()}
      </div>

      {/* Orbital Trail */}
      <div 
        className="absolute inset-0 rounded-full border border-white/10 animate-ping"
        style={{ animationDuration: `${orbitSpeed * 1000}ms` }}
      />

      {/* Immersive Info Panel */}
      {isHovered && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-6 bg-black/95 backdrop-blur-xl border border-pink-500/30 rounded-2xl p-6 text-white text-center min-w-64 z-50 shadow-2xl shadow-pink-500/20">
          <h3 className="font-bold text-pink-400 mb-3 text-lg">{title}</h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">{description}</p>
          <div className="text-xs text-pink-300 font-medium">Click to explore</div>
          
          {/* Connection Line */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-6 bg-gradient-to-b from-pink-500/50 to-transparent"></div>
        </div>
      )}
    </div>
  );
};

// Floating Particles Background
const FloatingParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create sophisticated particle system
    const particles: Array<{ 
      x: number; 
      y: number; 
      size: number; 
      speed: number; 
      opacity: number;
      direction: number;
      life: number;
    }> = [];
    
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.5 + 0.1,
        direction: Math.random() * Math.PI * 2,
        life: Math.random() * 100
      });
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = '#ffffff';
        
        // Create subtle glow effect
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = particle.size * 2;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();

        // Update particle position
        particle.x += Math.cos(particle.direction) * particle.speed;
        particle.y += Math.sin(particle.direction) * particle.speed;
        particle.life += 0.1;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Subtle movement variation
        particle.direction += Math.sin(particle.life * 0.01) * 0.01;
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

// Orbital Universe Component
const OrbitalUniverse: React.FC<{ onElementClick: (element: any) => void }> = ({ onElementClick }) => {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle scroll for orbital movement
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        setScrollProgress(scrollPercent);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Universe elements with orbital parameters
  const universeElements = [
    {
      id: 'ai-platform',
      type: 'technology' as const,
      title: 'AI Integration Platform',
      description: 'Cutting-edge artificial intelligence solutions for business automation and insights',
      orbitRadius: 200,
      orbitSpeed: 0.5,
      orbitOffset: 0,
      size: 16,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'oracle-partnership',
      type: 'partner' as const,
      title: 'Oracle Partnership',
      description: 'Strategic partnership with Oracle for enterprise-grade cloud solutions',
      orbitRadius: 280,
      orbitSpeed: 0.3,
      orbitOffset: Math.PI / 3,
      size: 20,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'web-development',
      type: 'capability' as const,
      title: 'Web Development',
      description: 'Modern, responsive web applications built with cutting-edge technologies',
      orbitRadius: 350,
      orbitSpeed: 0.4,
      orbitOffset: Math.PI / 2,
      size: 14,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'docker-infrastructure',
      type: 'technology' as const,
      title: 'Docker Infrastructure',
      description: 'Containerized deployment solutions for scalable applications',
      orbitRadius: 420,
      orbitSpeed: 0.6,
      orbitOffset: Math.PI,
      size: 16,
      color: 'from-blue-600 to-indigo-600'
    },
    {
      id: 'github-collaboration',
      type: 'partner' as const,
      title: 'GitHub Collaboration',
      description: 'Open-source development and collaborative coding solutions',
      orbitRadius: 320,
      orbitSpeed: 0.35,
      orbitOffset: Math.PI * 1.5,
      size: 20,
      color: 'from-gray-600 to-gray-800'
    },
    {
      id: 'creative-consulting',
      type: 'capability' as const,
      title: 'Creative Consulting',
      description: 'Strategic creative direction and brand development services',
      orbitRadius: 380,
      orbitSpeed: 0.45,
      orbitOffset: Math.PI * 1.8,
      size: 14,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'aapanel-hosting',
      type: 'technology' as const,
      title: 'AApanel Hosting',
      description: 'Professional hosting solutions with advanced panel management',
      orbitRadius: 250,
      orbitSpeed: 0.55,
      orbitOffset: Math.PI * 2.2,
      size: 16,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'future-stars',
      type: 'star' as const,
      title: 'Future Stars',
      description: 'Emerging technologies and innovative solutions on the horizon',
      orbitRadius: 450,
      orbitSpeed: 0.25,
      orbitOffset: Math.PI * 2.8,
      size: 12,
      color: 'from-pink-400 to-purple-500'
    }
  ];

  const handleElementHover = (id: string, isHovered: boolean) => {
    setHoveredElement(isHovered ? id : null);
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      {/* Floating Particles Background */}
      <FloatingParticles />
      
      {/* VLTRN Logo in Center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <div className="text-6xl font-bold text-white mb-4 tracking-wider">VLTRN</div>
        <div className="text-xl text-pink-400 font-light">Scroll to navigate the universe</div>
      </div>

      {/* Orbital Elements */}
      {universeElements.map((element) => (
        <OrbitalElement
          key={element.id}
          {...element}
          isHovered={hoveredElement === element.id}
          onHover={handleElementHover}
          onElementClick={onElementClick}
          scrollProgress={scrollProgress}
        />
      ))}

      {/* Navigation Instructions */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-white z-10">
        <p className="text-sm mb-2">Scroll to navigate • Hover to learn • Click to explore</p>
        <div className="w-6 h-10 border border-white/30 rounded-full mx-auto">
          <div className="w-1 h-3 bg-white/50 rounded-full mx-auto mt-2 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

// Custom Cursor Component
const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const updateCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className={`fixed pointer-events-none z-[9999] transition-all duration-200 ease-out ${
        isDragging 
          ? 'w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold' 
          : 'w-5 h-5 border border-white rounded-full'
      }`}
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      {isDragging && 'DRAG'}
    </div>
  );
};

// Main App Component
function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [showLanding, setShowLanding] = useState(false);
  const [showUniverse, setShowUniverse] = useState(false);
  const [currentExperience, setCurrentExperience] = useState<string | null>(null);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setShowLanding(true);
  };

  const handleEnter = () => {
    setShowLanding(false);
    setShowUniverse(true);
  };

  const handleElementClick = (element: any) => {
    setCurrentExperience(element.id);
    console.log('Traveling to:', element.title);
  };

  const handleBackToUniverse = () => {
    setCurrentExperience(null);
  };

  // Landing Page Component
  const LandingPage: React.FC = () => (
    <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center z-50">
      <div className="text-center mb-8">
        <p className="text-lg text-gray-400 mb-4">Scroll to explore</p>
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full mx-auto relative">
          <div className="w-1 h-3 bg-gray-400 rounded-full mx-auto mt-2 animate-bounce"></div>
        </div>
      </div>

      <h1 className="text-6xl font-bold mb-4 tracking-wider">VLTRN</h1>
      <h2 className="text-2xl text-gray-400 mb-8">CREATIVE AGENCY</h2>

      <button
        onClick={handleEnter}
        className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-lg font-medium"
      >
        Enter
      </button>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="flex items-center justify-center mb-2">
          <div className="w-6 h-6 border-2 border-gray-400 rounded rotate-45 mr-2"></div>
          <span className="text-sm text-gray-400">Please rotate your device</span>
        </div>
        <p className="text-xs text-gray-500">This website has been designed for desktop</p>
      </div>
    </div>
  );

  // Experience Pages
  const ExperiencePage: React.FC<{ element: any }> = ({ element }) => (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-900 via-purple-900 to-blue-900 text-white flex items-center justify-center z-50">
      <div className="text-center max-w-4xl mx-auto px-8">
        <h1 className="text-6xl font-bold mb-8 text-pink-400">{element.title}</h1>
        <p className="text-xl mb-12 leading-relaxed">{element.description}</p>
        
        <button 
          onClick={handleBackToUniverse}
          className="px-8 py-3 border-2 border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-black transition-all duration-300 rounded-full"
        >
          Back to Universe
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Custom Cursor - Always visible */}
      <CustomCursor />
      
      {showPreloader ? (
        <Preloader onComplete={handlePreloaderComplete} />
      ) : showLanding ? (
        <LandingPage />
      ) : showUniverse ? (
        currentExperience ? (
          <ExperiencePage element={universeElements.find(e => e.id === currentExperience)} />
        ) : (
          <OrbitalUniverse onElementClick={handleElementClick} />
        )
      ) : (
        <div className="w-full h-screen bg-black flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to VLTRN</h1>
            <p className="text-xl">Click Enter to explore the universe</p>
          </div>
        </div>
      )}
    </>
  );
}

// Universe elements data (moved outside component for access)
const universeElements = [
  {
    id: 'ai-platform',
    type: 'technology' as const,
    title: 'AI Integration Platform',
    description: 'Cutting-edge artificial intelligence solutions for business automation and insights',
    orbitRadius: 200,
    orbitSpeed: 0.5,
    orbitOffset: 0,
    size: 16,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'oracle-partnership',
    type: 'partner' as const,
    title: 'Oracle Partnership',
    description: 'Strategic partnership with Oracle for enterprise-grade cloud solutions',
    orbitRadius: 280,
    orbitSpeed: 0.3,
    orbitOffset: Math.PI / 3,
    size: 20,
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'web-development',
    type: 'capability' as const,
    title: 'Web Development',
    description: 'Modern, responsive web applications built with cutting-edge technologies',
    orbitRadius: 350,
    orbitSpeed: 0.4,
    orbitOffset: Math.PI / 2,
    size: 14,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'docker-infrastructure',
    type: 'technology' as const,
    title: 'Docker Infrastructure',
    description: 'Containerized deployment solutions for scalable applications',
    orbitRadius: 420,
    orbitSpeed: 0.6,
    orbitOffset: Math.PI,
    size: 16,
    color: 'from-blue-600 to-indigo-600'
  },
  {
    id: 'github-collaboration',
    type: 'partner' as const,
    title: 'GitHub Collaboration',
    description: 'Open-source development and collaborative coding solutions',
    orbitRadius: 320,
    orbitSpeed: 0.35,
    orbitOffset: Math.PI * 1.5,
    size: 20,
    color: 'from-gray-600 to-gray-800'
  },
  {
    id: 'creative-consulting',
    type: 'capability' as const,
    title: 'Creative Consulting',
    description: 'Strategic creative direction and brand development services',
    orbitRadius: 380,
    orbitSpeed: 0.45,
    orbitOffset: Math.PI * 1.8,
    size: 14,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'aapanel-hosting',
    type: 'technology' as const,
    title: 'AApanel Hosting',
    description: 'Professional hosting solutions with advanced panel management',
    orbitRadius: 250,
    orbitSpeed: 0.55,
    orbitOffset: Math.PI * 2.2,
    size: 16,
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'future-stars',
    type: 'star' as const,
    title: 'Future Stars',
    description: 'Emerging technologies and innovative solutions on the horizon',
    orbitRadius: 450,
    orbitSpeed: 0.25,
    orbitOffset: Math.PI * 2.8,
    size: 12,
    color: 'from-pink-400 to-purple-500'
  }
];

export default App;