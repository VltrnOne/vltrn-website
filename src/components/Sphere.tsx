import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere as DreiSphere } from '@react-three/drei';
import type { Mesh } from 'three';

const Sphere = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <DreiSphere ref={meshRef} args={[1, 32, 32]}>
      <meshStandardMaterial
        color="#FE02A1"
        metalness={0.7}
        roughness={0.2}
        emissive="#FE02A1"
        emissiveIntensity={0.2}
      />
    </DreiSphere>
  );
};

export default Sphere;