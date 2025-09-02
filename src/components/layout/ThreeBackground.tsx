'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * 3D background component using Three.js
 * Creates animated particles and floating geometric shapes
 */
export const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    mountRef.current.appendChild(renderer.domElement);
    
    // Store references for cleanup
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create floating particles system
    const createParticleSystem = () => {
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCnt = 1500;
      const posArray = new Float32Array(particlesCnt * 3);
      const colorArray = new Float32Array(particlesCnt * 3);

      for (let i = 0; i < particlesCnt * 3; i += 3) {
        // Position
        posArray[i] = (Math.random() - 0.5) * 100;     // x
        posArray[i + 1] = (Math.random() - 0.5) * 100; // y
        posArray[i + 2] = (Math.random() - 0.5) * 100; // z

        // Colors - gradient from purple to blue
        const hue = 0.7 + Math.random() * 0.1; // Purple to blue range
        const saturation = 0.7 + Math.random() * 0.3;
        const lightness = 0.5 + Math.random() * 0.3;
        
        const color = new THREE.Color().setHSL(hue, saturation, lightness);
        colorArray[i] = color.r;
        colorArray[i + 1] = color.g;
        colorArray[i + 2] = color.b;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
      
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });

      return new THREE.Points(particlesGeometry, particlesMaterial);
    };

    // Create floating geometric shapes
    const createFloatingShapes = () => {
      const shapes: THREE.Mesh[] = [];
      const shapeCount = 8;

      for (let i = 0; i < shapeCount; i++) {
        let geometry: THREE.BufferGeometry;
        
        // Random geometry selection
        const shapeType = Math.floor(Math.random() * 4);
        switch (shapeType) {
          case 0:
            geometry = new THREE.BoxGeometry(2, 2, 2);
            break;
          case 1:
            geometry = new THREE.SphereGeometry(1.2, 16, 16);
            break;
          case 2:
            geometry = new THREE.ConeGeometry(1, 2, 8);
            break;
          default:
            geometry = new THREE.OctahedronGeometry(1.5);
        }
        
        const material = new THREE.MeshBasicMaterial({ 
          color: new THREE.Color().setHSL(
            0.7 + Math.random() * 0.1, // Purple-blue range
            0.8,
            0.6
          ),
          wireframe: true,
          transparent: true,
          opacity: 0.15,
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        
        // Random position
        mesh.position.set(
          (Math.random() - 0.5) * 60,
          (Math.random() - 0.5) * 60,
          (Math.random() - 0.5) * 60
        );
        
        // Random rotation
        mesh.rotation.set(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        );
        
        shapes.push(mesh);
        scene.add(mesh);
      }
      
      return shapes;
    };

    const particlesMesh = createParticleSystem();
    const shapes = createFloatingShapes();
    
    scene.add(particlesMesh);
    camera.position.z = 30;

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      // Rotate particles
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.001;
      
      // Animate floating shapes
      shapes.forEach((shape, i) => {
        const speed = 0.005 * (i + 1);
        shape.rotation.x += speed;
        shape.rotation.y += speed * 0.8;
        shape.rotation.z += speed * 0.6;
        
        // Gentle floating motion
        shape.position.y += Math.sin(Date.now() * 0.001 + i) * 0.01;
        shape.position.x += Math.cos(Date.now() * 0.001 + i) * 0.005;
      });
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js objects
      scene.clear();
      renderer.dispose();
      
      // Dispose geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry?.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material?.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
};