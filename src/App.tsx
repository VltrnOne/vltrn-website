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

// Generative Particle Field with Depth and Parallax
const GenerativeParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create sophisticated particle system with depth layers
    const particles: Array<{ 
      x: number; 
      y: number; 
      size: number; 
      speed: number; 
      opacity: number;
      direction: number;
      life: number;
      depth: number; // 0 = far, 1 = near
      parallax: number;
    }> = [];
    
    for (let i = 0; i < 300; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 0.2 + 0.05,
        opacity: Math.random() * 0.3 + 0.1,
        direction: Math.random() * Math.PI * 2,
        life: Math.random() * 100,
        depth: Math.random(),
        parallax: Math.random() * 0.5 + 0.5
      });
    }

    // Mouse movement handler for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        ctx.save();
        
        // Apply parallax effect based on mouse position
        const parallaxX = (mouseRef.current.x - canvas.width / 2) * particle.parallax * 0.01;
        const parallaxY = (mouseRef.current.y - canvas.height / 2) * particle.parallax * 0.01;
        
        ctx.globalAlpha = particle.opacity * (0.5 + particle.depth * 0.5);
        ctx.fillStyle = `hsl(${200 + particle.depth * 60}, 70%, ${70 + particle.depth * 30}%)`;
        
        // Create subtle glow effect
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = particle.size * (1 + particle.depth);
        
        ctx.beginPath();
        ctx.arc(
          particle.x + parallaxX, 
          particle.y + parallaxY, 
          particle.size * (0.5 + particle.depth * 0.5), 
          0, 
          Math.PI * 2
        );
        ctx.fill();
        
        ctx.restore();

        // Update particle position with depth-based movement
        particle.x += Math.cos(particle.direction) * particle.speed * (1 + particle.depth);
        particle.y += Math.sin(particle.direction) * particle.speed * (1 + particle.depth);
        particle.life += 0.1;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Subtle movement variation based on depth
        particle.direction += Math.sin(particle.life * 0.01) * 0.01 * (1 + particle.depth);
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
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: -1 }}
    />
  );
};

// Unique 3D Object Generator
const generateUnique3DObject = (type: string, scene: THREE.Scene, position: THREE.Vector3) => {
  let geometry: THREE.BufferGeometry;
  let material: THREE.Material;

  switch (type) {
    case 'ai-platform':
      // Neural network lattice structure
      geometry = new THREE.IcosahedronGeometry(1, 2);
      material = new THREE.MeshStandardMaterial({
        color: 0x4f46e5,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x1e1b4b,
        emissiveIntensity: 0.1
      });
      break;
      
    case 'oracle-partnership':
      // Enterprise cloud structure
      geometry = new THREE.OctahedronGeometry(1.2, 1);
      material = new THREE.MeshStandardMaterial({
        color: 0xea580c,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0x451a03,
        emissiveIntensity: 0.15
      });
      break;
      
    case 'web-development':
      // Code structure
      geometry = new THREE.BoxGeometry(1.5, 1, 1.5);
      material = new THREE.MeshStandardMaterial({
        color: 0x16a34a,
        metalness: 0.7,
        roughness: 0.3,
        emissive: 0x052e16,
        emissiveIntensity: 0.1
      });
      break;
      
    case 'docker-infrastructure':
      // Container structure
      geometry = new THREE.CylinderGeometry(0.8, 0.8, 1.5, 8);
      material = new THREE.MeshStandardMaterial({
        color: 0x2563eb,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x1e3a8a,
        emissiveIntensity: 0.1
      });
      break;
      
    case 'github-collaboration':
      // Collaborative network
      geometry = new THREE.TorusGeometry(1, 0.3, 8, 16);
      material = new THREE.MeshStandardMaterial({
        color: 0x6b7280,
        metalness: 0.6,
        roughness: 0.4,
        emissive: 0x374151,
        emissiveIntensity: 0.05
      });
      break;
      
    case 'creative-consulting':
      // Creative flow structure
      geometry = new THREE.DodecahedronGeometry(1.1, 0);
      material = new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        metalness: 0.7,
        roughness: 0.3,
        emissive: 0x581c87,
        emissiveIntensity: 0.12
      });
      break;
      
    case 'aapanel-hosting':
      // Server structure
      geometry = new THREE.BoxGeometry(1.2, 1.8, 1.2);
      material = new THREE.MeshStandardMaterial({
        color: 0xeab308,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x713f12,
        emissiveIntensity: 0.1
      });
      break;
      
    case 'future-stars':
      // Future technology
      geometry = new THREE.SphereGeometry(1, 12, 8);
      material = new THREE.MeshStandardMaterial({
        color: 0xec4899,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0x831843,
        emissiveIntensity: 0.2
      });
      break;
      
    default:
      geometry = new THREE.SphereGeometry(1, 8, 6);
      material = new THREE.MeshStandardMaterial({
        color: 0x6b7280,
        metalness: 0.5,
        roughness: 0.5
      });
  }

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(position);
  
  // Add subtle animation
  mesh.userData = { 
    rotationSpeed: Math.random() * 0.02 + 0.01,
    floatSpeed: Math.random() * 0.01 + 0.005,
    floatOffset: Math.random() * Math.PI * 2
  };
  
  scene.add(mesh);
  return mesh;
};

// 3D Orbital Element Component
const Orbital3DElement: React.FC<{
  id: string;
  type: string;
  title: string;
  description: string;
  orbitRadius: number;
  orbitSpeed: number;
  orbitOffset: number;
  onElementClick: (element: any) => void;
  isHovered: boolean;
  onHover: (id: string, isHovered: boolean) => void;
  scrollProgress: number;
}> = ({ id, type, title, description, orbitRadius, orbitSpeed, orbitOffset, onElementClick, isHovered, onHover, scrollProgress }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const meshRef = useRef<THREE.Mesh>();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 200 / 200, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(200, 200);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Dynamic lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5, 100);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    // Add subtle rim lighting
    const rimLight = new THREE.DirectionalLight(0x4f46e5, 0.3);
    rimLight.position.set(-5, -5, -5);
    scene.add(rimLight);

    camera.position.z = 5;

    // Generate unique 3D object
    const mesh = generateUnique3DObject(type, scene, new THREE.Vector3(0, 0, 0));
    meshRef.current = mesh;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (meshRef.current) {
        // Rotate the object
        meshRef.current.rotation.x += meshRef.current.userData.rotationSpeed;
        meshRef.current.rotation.y += meshRef.current.userData.rotationSpeed * 0.7;

        // Subtle floating animation
        meshRef.current.position.y = Math.sin(Date.now() * meshRef.current.userData.floatSpeed + meshRef.current.userData.floatOffset) * 0.2;

        // Hover effects
        if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
          if (isHovered) {
            meshRef.current.scale.setScalar(1.2);
            meshRef.current.material.emissiveIntensity = 0.3;
          } else {
            meshRef.current.scale.setScalar(1.0);
            meshRef.current.material.emissiveIntensity = 0.1;
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;

    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [type, isHovered]);

  // Calculate orbital position
  const angle = orbitOffset + (scrollProgress * orbitSpeed) + (Date.now() * 0.0001 * orbitSpeed);
  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onElementClick({ id, type, title, description });
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div
      className={`absolute cursor-pointer transition-all duration-1000 ease-out ${
        isHovered ? 'scale-110 z-50' : 'scale-100'
      } ${isAnimating ? 'animate-pulse' : ''}`}
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)',
        width: '200px',
        height: '200px'
      }}
      onMouseEnter={() => onHover(id, true)}
      onMouseLeave={() => onHover(id, false)}
      onClick={handleClick}
    >
      {/* 3D Object Container */}
      <div ref={mountRef} className="w-full h-full" />
      
      {/* Elegant Info Display (No Hard Edges) */}
      {isHovered && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-8 text-center z-50">
          <h3 className="text-white font-light text-lg mb-2 tracking-wide">{title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed max-w-48 opacity-0 animate-in fade-in duration-300">
            {description}
          </p>
        </div>
      )}
    </div>
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
      type: 'ai-platform',
      title: 'AI Integration Platform',
      description: 'Cutting-edge artificial intelligence solutions for business automation and insights',
      orbitRadius: 200,
      orbitSpeed: 0.5,
      orbitOffset: 0
    },
    {
      id: 'oracle-partnership',
      type: 'oracle-partnership',
      title: 'Oracle Partnership',
      description: 'Strategic partnership with Oracle for enterprise-grade cloud solutions',
      orbitRadius: 280,
      orbitSpeed: 0.3,
      orbitOffset: Math.PI / 3
    },
    {
      id: 'web-development',
      type: 'web-development',
      title: 'Web Development',
      description: 'Modern, responsive web applications built with cutting-edge technologies',
      orbitRadius: 350,
      orbitSpeed: 0.4,
      orbitOffset: Math.PI / 2
    },
    {
      id: 'docker-infrastructure',
      type: 'docker-infrastructure',
      title: 'Docker Infrastructure',
      description: 'Containerized deployment solutions for scalable applications',
      orbitRadius: 420,
      orbitSpeed: 0.6,
      orbitOffset: Math.PI
    },
    {
      id: 'github-collaboration',
      type: 'github-collaboration',
      title: 'GitHub Collaboration',
      description: 'Open-source development and collaborative coding solutions',
      orbitRadius: 320,
      orbitSpeed: 0.35,
      orbitOffset: Math.PI * 1.5
    },
    {
      id: 'creative-consulting',
      type: 'creative-consulting',
      title: 'Creative Consulting',
      description: 'Strategic creative direction and brand development services',
      orbitRadius: 380,
      orbitSpeed: 0.45,
      orbitOffset: Math.PI * 1.8
    },
    {
      id: 'aapanel-hosting',
      type: 'aapanel-hosting',
      title: 'AApanel Hosting',
      description: 'Professional hosting solutions with advanced panel management',
      orbitRadius: 250,
      orbitSpeed: 0.55,
      orbitOffset: Math.PI * 2.2
    },
    {
      id: 'future-stars',
      type: 'future-stars',
      title: 'Future Stars',
      description: 'Emerging technologies and innovative solutions on the horizon',
      orbitRadius: 450,
      orbitSpeed: 0.25,
      orbitOffset: Math.PI * 2.8
    }
  ];

  const handleElementHover = (id: string, isHovered: boolean) => {
    setHoveredElement(isHovered ? id : null);
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      {/* Generative Particle Field Background */}
      <GenerativeParticleField />
      
      {/* VLTRN Logo in Center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <div className="text-6xl font-bold text-white mb-4 tracking-wider">VLTRN</div>
        <div className="text-xl text-gray-400 font-light">Explore the universe</div>
      </div>

      {/* 3D Orbital Elements */}
      {universeElements.map((element) => (
        <Orbital3DElement
          key={element.id}
          {...element}
          isHovered={hoveredElement === element.id}
          onHover={handleElementHover}
          onElementClick={onElementClick}
          scrollProgress={scrollProgress}
        />
      ))}
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
    type: 'ai-platform',
    title: 'AI Integration Platform',
    description: 'Cutting-edge artificial intelligence solutions for business automation and insights',
    orbitRadius: 200,
    orbitSpeed: 0.5,
    orbitOffset: 0
  },
  {
    id: 'oracle-partnership',
    type: 'oracle-partnership',
    title: 'Oracle Partnership',
    description: 'Strategic partnership with Oracle for enterprise-grade cloud solutions',
    orbitRadius: 280,
    orbitSpeed: 0.3,
    orbitOffset: Math.PI / 3
  },
  {
    id: 'web-development',
    type: 'web-development',
    title: 'Web Development',
    description: 'Modern, responsive web applications built with cutting-edge technologies',
    orbitRadius: 350,
    orbitSpeed: 0.4,
    orbitOffset: Math.PI / 2
  },
  {
    id: 'docker-infrastructure',
    type: 'docker-infrastructure',
    title: 'Docker Infrastructure',
    description: 'Containerized deployment solutions for scalable applications',
    orbitRadius: 420,
    orbitSpeed: 0.6,
    orbitOffset: Math.PI
  },
  {
    id: 'github-collaboration',
    type: 'github-collaboration',
    title: 'GitHub Collaboration',
    description: 'Open-source development and collaborative coding solutions',
    orbitRadius: 320,
    orbitSpeed: 0.35,
    orbitOffset: Math.PI * 1.5
  },
  {
    id: 'creative-consulting',
    type: 'creative-consulting',
    title: 'Creative Consulting',
    description: 'Strategic creative direction and brand development services',
    orbitRadius: 380,
    orbitSpeed: 0.45,
    orbitOffset: Math.PI * 1.8
  },
  {
    id: 'aapanel-hosting',
    type: 'aapanel-hosting',
    title: 'AApanel Hosting',
    description: 'Professional hosting solutions with advanced panel management',
    orbitRadius: 250,
    orbitSpeed: 0.55,
    orbitOffset: Math.PI * 2.2
  },
  {
    id: 'future-stars',
    type: 'future-stars',
    title: 'Future Stars',
    description: 'Emerging technologies and innovative solutions on the horizon',
    orbitRadius: 450,
    orbitSpeed: 0.25,
    orbitOffset: Math.PI * 2.8
  }
];

export default App;