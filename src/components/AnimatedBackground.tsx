import React, { useEffect, useRef, useState } from 'react';
import { useFrame, Canvas, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  opacity: number;
}

const ParticleSystem: React.FC = () => {
  const points = useRef<THREE.Points>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const { camera } = useThree();

  useEffect(() => {
    const particleCount = 1000;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 0.01,
        vy: (Math.random() - 0.5) * 0.01,
        vz: (Math.random() - 0.5) * 0.01,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    setParticles(newParticles);
  }, []);

  useFrame((state) => {
    if (points.current) {
      const positions = points.current.geometry.attributes.position.array as Float32Array;
      
      particles.forEach((particle, i) => {
        const idx = i * 3;
        
        // Update positions
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;
        
        // Bounce off boundaries
        if (Math.abs(particle.x) > 10) particle.vx *= -1;
        if (Math.abs(particle.y) > 10) particle.vy *= -1;
        if (Math.abs(particle.z) > 10) particle.vz *= -1;
        
        // Update geometry
        positions[idx] = particle.x;
        positions[idx + 1] = particle.y;
        positions[idx + 2] = particle.z;
      });
      
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const positions = new Float32Array(particles.length * 3);
  particles.forEach((particle, i) => {
    const idx = i * 3;
    positions[idx] = particle.x;
    positions[idx + 1] = particle.y;
    positions[idx + 2] = particle.z;
  });

  return (
    <Points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        size={0.05}
        color="#FE02A1"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </Points>
  );
};

const FloatingElements: React.FC = () => {
  const [elements, setElements] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const newElements = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      delay: Math.random() * 2,
    }));
    setElements(newElements);
  }, []);

  return (
    <>
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute w-2 h-2 bg-[#FE02A1] rounded-full opacity-20 animate-float"
          style={{
            left: element.x,
            top: element.y,
            animationDelay: `${element.delay}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}
    </>
  );
};

const GridPattern: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="absolute inset-0 opacity-10 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(254, 2, 161, 0.2) 1px, transparent 1px),
          linear-gradient(90deg, rgba(254, 2, 161, 0.2) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        transform: `perspective(500px) rotateX(60deg) rotateY(${mousePosition.x * 10 - 5}deg)`,
        transformOrigin: 'center center',
        transition: 'transform 0.3s ease-out',
      }}
    />
  );
};

const AnimatedBackground: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* 3D Particle System */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.1} />
          <ParticleSystem />
        </Canvas>
      </div>

      {/* Floating Elements */}
      <FloatingElements />

      {/* Interactive Grid Pattern */}
      <GridPattern />

      {/* Gradient Overlays */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,2,161,0.1)_0%,transparent_70%)] animate-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(254,2,161,0.05)_0%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(0,255,255,0.05)_0%,transparent_50%)] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,193,7,0.05)_0%,transparent_50%)] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Animated Border */}
      <div className="absolute inset-0 border border-[rgba(254,2,161,0.1)] rounded-none animate-border-glow" />

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[#FE02A1] opacity-20 animate-corner-glow" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-[#FE02A1] opacity-20 animate-corner-glow" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-[#FE02A1] opacity-20 animate-corner-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[#FE02A1] opacity-20 animate-corner-glow" style={{ animationDelay: '1.5s' }} />
    </div>
  );
};

export default AnimatedBackground;
