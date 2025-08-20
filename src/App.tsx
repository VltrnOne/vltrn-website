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

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setShowLanding(true);
  };

  const handleEnter = () => {
    setShowLanding(false);
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

  return (
    <>
      {showPreloader ? (
        <Preloader onComplete={handlePreloaderComplete} />
      ) : showLanding ? (
        <LandingPage />
      ) : (
        <HorizontalScrollContainer />
      )}
    </>
  );
}

export default App;