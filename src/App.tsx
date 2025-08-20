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

// Floating Universe Element Component
const FloatingElement: React.FC<{
  id: string;
  type: 'technology' | 'partner' | 'capability' | 'star';
  title: string;
  description: string;
  position: { x: number; y: number; z: number };
  color: string;
  onElementClick: (element: any) => void;
  isHovered: boolean;
  onHover: (id: string, isHovered: boolean) => void;
}> = ({ id, type, title, description, position, color, onElementClick, isHovered, onHover }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const getElementIcon = () => {
    switch (type) {
      case 'technology':
        return '⚡';
      case 'partner':
        return '🤝';
      case 'capability':
        return '🚀';
      case 'star':
        return '⭐';
      default:
        return '✨';
    }
  };

  const getElementSize = () => {
    switch (type) {
      case 'technology':
        return 'w-16 h-16';
      case 'partner':
        return 'w-20 h-20';
      case 'capability':
        return 'w-14 h-14';
      case 'star':
        return 'w-12 h-12';
      default:
        return 'w-16 h-16';
    }
  };

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onElementClick({ id, type, title, description });
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div
      className={`absolute ${getElementSize()} cursor-pointer transition-all duration-700 ease-out ${
        isHovered ? 'scale-125 z-50' : 'scale-100'
      } ${isAnimating ? 'animate-pulse' : ''}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) rotate(${position.z}deg)`,
      }}
      onMouseEnter={() => onHover(id, true)}
      onMouseLeave={() => onHover(id, false)}
      onClick={handleClick}
    >
      {/* Element Background */}
      <div 
        className={`w-full h-full rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-500 ${
          isHovered 
            ? 'bg-gradient-to-br from-pink-500 to-purple-600 shadow-2xl shadow-pink-500/50' 
            : `bg-gradient-to-br from-${color} to-${color} shadow-lg`
        }`}
      >
        {getElementIcon()}
      </div>

      {/* Info Tag */}
      {isHovered && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-black/90 backdrop-blur-md border border-pink-500/50 rounded-lg p-4 text-white text-center min-w-48 z-50">
          <h3 className="font-bold text-pink-400 mb-2">{title}</h3>
          <p className="text-sm text-gray-300">{description}</p>
          <div className="mt-2 text-xs text-pink-300">Click to explore</div>
        </div>
      )}

      {/* Connection Lines */}
      {isHovered && (
        <div className="absolute inset-0 rounded-full border-2 border-pink-500/50 animate-ping"></div>
      )}
    </div>
  );
};

// Floating Universe Background
const UniverseBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create starfield
    const stars: Array<{ x: number; y: number; size: number; speed: number }> = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5
      });
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ffffff';
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Move stars
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
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

// Floating Universe Component
const FloatingUniverse: React.FC<{ onElementClick: (element: any) => void }> = ({ onElementClick }) => {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  // Universe elements data
  const universeElements = [
    {
      id: 'ai-platform',
      type: 'technology' as const,
      title: 'AI Integration Platform',
      description: 'Cutting-edge artificial intelligence solutions for business automation and insights',
      position: { x: 20, y: 30, z: 45 },
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'oracle-partnership',
      type: 'partner' as const,
      title: 'Oracle Partnership',
      description: 'Strategic partnership with Oracle for enterprise-grade cloud solutions',
      position: { x: 80, y: 25, z: -30 },
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'web-development',
      type: 'capability' as const,
      title: 'Web Development',
      description: 'Modern, responsive web applications built with cutting-edge technologies',
      position: { x: 35, y: 70, z: 15 },
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'docker-infrastructure',
      type: 'technology' as const,
      title: 'Docker Infrastructure',
      description: 'Containerized deployment solutions for scalable applications',
      position: { x: 70, y: 60, z: 60 },
      color: 'from-blue-600 to-indigo-600'
    },
    {
      id: 'github-collaboration',
      type: 'partner' as const,
      title: 'GitHub Collaboration',
      description: 'Open-source development and collaborative coding solutions',
      position: { x: 15, y: 80, z: -45 },
      color: 'from-gray-600 to-gray-800'
    },
    {
      id: 'creative-consulting',
      type: 'capability' as const,
      title: 'Creative Consulting',
      description: 'Strategic creative direction and brand development services',
      position: { x: 85, y: 75, z: 20 },
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'aapanel-hosting',
      type: 'technology' as const,
      title: 'AApanel Hosting',
      description: 'Professional hosting solutions with advanced panel management',
      position: { x: 50, y: 20, z: 0 },
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'future-stars',
      type: 'star' as const,
      title: 'Future Stars',
      description: 'Emerging technologies and innovative solutions on the horizon',
      position: { x: 90, y: 40, z: 90 },
      color: 'from-pink-400 to-purple-500'
    }
  ];

  const handleElementHover = (id: string, isHovered: boolean) => {
    setHoveredElement(isHovered ? id : null);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Universe Background */}
      <UniverseBackground />
      
      {/* VLTRN Logo in Center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <div className="text-6xl font-bold text-white mb-4">VLTRN</div>
        <div className="text-xl text-pink-400 font-light">Scroll to explore the universe</div>
      </div>

      {/* Floating Elements */}
      {universeElements.map((element) => (
        <FloatingElement
          key={element.id}
          {...element}
          isHovered={hoveredElement === element.id}
          onHover={handleElementHover}
          onElementClick={onElementClick}
        />
      ))}

      {/* Navigation Instructions */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-white z-10">
        <p className="text-sm mb-2">Hover over elements to learn more</p>
        <p className="text-xs text-gray-400">Click to travel to experiences</p>
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

// 3D Hero Object Component
const Hero3DObject: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const meshRef = useRef<THREE.Mesh>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Create metallic fluid-like object
    const geometry = new THREE.IcosahedronGeometry(2, 2);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: false
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // Lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 8;

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (meshRef.current) {
        // Rotate the object
        meshRef.current.rotation.x += 0.005;
        meshRef.current.rotation.y += 0.005;

        // React to mouse movement
        meshRef.current.rotation.x += mouse.y * 0.01;
        meshRef.current.rotation.y += mouse.x * 0.01;

        // Subtle floating animation
        meshRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.5;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
};

// Hero Section Component
const HeroSection: React.FC = () => {
  return (
    <section className="section hero w-screen h-screen flex items-center justify-center relative overflow-hidden">
      {/* 3D Background Object */}
      <Hero3DObject />
      
      {/* Interactive Text */}
      <h1 className="interactive-text text-8xl font-bold text-white text-center z-10 relative">
        VLTRN
      </h1>
      
      {/* Scroll Instruction */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-white z-10">
        <p className="text-sm mb-2">SCROLL</p>
        <div className="w-6 h-10 border-2 border-white rounded-full mx-auto">
          <div className="w-1 h-3 bg-white rounded-full mx-auto mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

// Project Section Component
const ProjectSection: React.FC<{ 
  title: string; 
  role: string; 
  year: string; 
  backgroundImage?: string;
  videoUrl?: string;
}> = ({ title, role, year, backgroundImage, videoUrl }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="section project w-screen h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {videoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' }}
          />
        )}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white">
        <h2 className={`text-6xl font-bold mb-4 transition-all duration-500 ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}>
          {title}
        </h2>
        <p className="text-xl mb-8 opacity-80">{role}, {year}</p>
        
        <a 
          href="#"
          className="view-link inline-block px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 rounded-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          View Live
        </a>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection: React.FC = () => {
  return (
    <section className="section about w-screen h-screen flex items-center justify-center relative">
      <div className="text-center text-white max-w-4xl mx-auto px-8">
        <h2 className="text-6xl font-bold mb-8">About VLTRN</h2>
        <p className="text-xl leading-relaxed opacity-90">
          We are a creative agency specializing in cutting-edge digital experiences, 
          innovative technology solutions, and transformative brand strategies. 
          Our team combines technical expertise with creative vision to deliver 
          projects that inspire, engage, and transform.
        </p>
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection: React.FC = () => {
  return (
    <section className="section contact w-screen h-screen flex items-center justify-center relative">
      <div className="text-center text-white">
        <h2 className="text-6xl font-bold mb-8">Get In Touch</h2>
        <div className="space-y-6">
          <a 
            href="mailto:hello@vltrn.agency"
            className="block text-xl hover:text-gray-300 transition-colors duration-300"
          >
            hello@vltrn.agency
          </a>
          <a 
            href="#"
            className="block text-xl hover:text-gray-300 transition-colors duration-300"
          >
            LinkedIn
          </a>
          <a 
            href="#"
            className="block text-xl hover:text-gray-300 transition-colors duration-300"
          >
            Twitter
          </a>
          <a 
            href="#"
            className="block text-xl hover:text-gray-300 transition-colors duration-300"
          >
            GitHub
          </a>
        </div>
        <div className="mt-16 text-sm opacity-60">
          © 2024 VLTRN. All rights reserved.
        </div>
      </div>
    </section>
  );
};

// Main Horizontal Scrolling Container
const HorizontalScrollContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const sections = [
    { id: 'hero', component: <HeroSection /> },
    { id: 'project1', component: <ProjectSection title="AI Integration Platform" role="Lead Developer" year="2024" /> },
    { id: 'project2', component: <ProjectSection title="Creative Web Experience" role="Creative Technologist" year="2023" /> },
    { id: 'about', component: <AboutSection /> },
    { id: 'contact', component: <ContactSection /> }
  ];

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (isScrolling) return;

    setIsScrolling(true);
    const direction = e.deltaY > 0 ? 1 : -1;
    const newSection = Math.max(0, Math.min(sections.length - 1, currentSection + direction));
    
    setCurrentSection(newSection);
    scrollToSection(newSection);

    setTimeout(() => setIsScrolling(false), 1000);
  };

  const scrollToSection = (sectionIndex: number) => {
    if (containerRef.current) {
      const sectionWidth = window.innerWidth;
      const targetX = -sectionIndex * sectionWidth;
      
      containerRef.current.style.transform = `translateX(${targetX}px)`;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [currentSection, isScrolling]);

  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 space-y-4">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => {
              setCurrentSection(index);
              scrollToSection(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index 
                ? 'bg-white scale-125' 
                : 'bg-gray-500 hover:bg-gray-300'
            }`}
            title={section.id}
          />
        ))}
      </div>

      {/* Horizontal Scrolling Container */}
      <div 
        ref={containerRef}
        className="flex h-full transition-transform duration-1000 ease-out"
        style={{ width: `${sections.length * 100}vw` }}
      >
        {sections.map((section, index) => (
          <div key={section.id} className="w-screen h-screen flex-shrink-0">
            {section.component}
          </div>
        ))}
      </div>
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
    // Here you can implement the travel animation and experience
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

      <h1 className="text-6xl font-bold mb-4">VLTRN</h1>
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
      {showPreloader ? (
        <Preloader onComplete={handlePreloaderComplete} />
      ) : showLanding ? (
        <LandingPage />
      ) : showUniverse ? (
        currentExperience ? (
          <ExperiencePage element={universeElements.find(e => e.id === currentExperience)} />
        ) : (
          <FloatingUniverse onElementClick={handleElementClick} />
        )
      ) : (
        <HorizontalScrollContainer />
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
    position: { x: 20, y: 30, z: 45 },
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'oracle-partnership',
    type: 'partner' as const,
    title: 'Oracle Partnership',
    description: 'Strategic partnership with Oracle for enterprise-grade cloud solutions',
    position: { x: 80, y: 25, z: -30 },
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'web-development',
    type: 'capability' as const,
    title: 'Web Development',
    description: 'Modern, responsive web applications built with cutting-edge technologies',
    position: { x: 35, y: 70, z: 15 },
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'docker-infrastructure',
    type: 'technology' as const,
    title: 'Docker Infrastructure',
    description: 'Containerized deployment solutions for scalable applications',
    position: { x: 70, y: 60, z: 60 },
    color: 'from-blue-600 to-indigo-600'
  },
  {
    id: 'github-collaboration',
    type: 'partner' as const,
    title: 'GitHub Collaboration',
    description: 'Open-source development and collaborative coding solutions',
    position: { x: 15, y: 80, z: -45 },
    color: 'from-gray-600 to-gray-800'
  },
  {
    id: 'creative-consulting',
    type: 'capability' as const,
    title: 'Creative Consulting',
    description: 'Strategic creative direction and brand development services',
    position: { x: 85, y: 75, z: 20 },
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'aapanel-hosting',
    type: 'technology' as const,
    title: 'AApanel Hosting',
    description: 'Professional hosting solutions with advanced panel management',
    position: { x: 50, y: 20, z: 0 },
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'future-stars',
    type: 'star' as const,
    title: 'Future Stars',
    description: 'Emerging technologies and innovative solutions on the horizon',
    position: { x: 90, y: 40, z: 90 },
    color: 'from-pink-400 to-purple-500'
  }
];

export default App;