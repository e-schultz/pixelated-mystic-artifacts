
import { useEffect, useState, useCallback, useRef } from 'react';
import { GeometrySettings, getRandomGeometryFunction } from '@/utils/geometryUtils';

export function useGeometry(animationSpeed: number) {
  const [time, setTime] = useState(0);
  const [smallShapes, setSmallShapes] = useState<Array<{
    x: number;
    y: number;
    size: number;
    rotation: number;
    speed: number;
    drawFunction: Function;
    settings: GeometrySettings;
  }>>([]);
  
  // Use refs for animation to prevent unnecessary re-renders
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const speedFactorRef = useRef(animationSpeed);
  
  // Update speed factor when animationSpeed changes
  useEffect(() => {
    speedFactorRef.current = animationSpeed;
  }, [animationSpeed]);

  // Generate random small background shapes
  const generateSmallShapes = useCallback(() => {
    const numShapes = Math.floor(Math.random() * 10) + 5; // 5-15 shapes
    const newShapes = [];
    
    for (let i = 0; i < numShapes; i++) {
      const drawFunction = getRandomGeometryFunction();
      newShapes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 50 + 20, // 20-70 size
        rotation: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.002 + 0.001, // 0.001-0.003 speed
        drawFunction,
        settings: {
          scale: 0.8,
          rotation: 0,
          opacity: Math.random() * 0.5 + 0.3, // 0.3-0.8 opacity
          segments: 8,
          variance: 0.2,
          pixelSize: Math.floor(Math.random() * 2) + 1, // 1-2 pixel size
          color: `rgba(240, 240, 228, ${Math.random() * 0.5 + 0.3})`,
          speed: 0.005
        }
      });
    }
    
    setSmallShapes(newShapes);
  }, []);

  // Animation frame loop using requestAnimationFrame
  const animate = useCallback((time: number) => {
    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time;
    }
    
    const deltaTime = time - (previousTimeRef.current || 0);
    previousTimeRef.current = time;
    
    // Smoother time increment based on delta time and current speed
    const timeIncrement = (deltaTime / 1000) * 0.15 * speedFactorRef.current;
    
    setTime(prevTime => prevTime + timeIncrement);
    
    // Less frequent shape regeneration to reduce flickering
    if (Math.random() < 0.001 * speedFactorRef.current) {
      generateSmallShapes();
    }
    
    // Update shape rotations with smoother increments
    setSmallShapes(prev => 
      prev.map(shape => ({
        ...shape,
        rotation: shape.rotation + (shape.speed * deltaTime * 0.01 * speedFactorRef.current)
      }))
    );
    
    requestRef.current = requestAnimationFrame(animate);
  }, [generateSmallShapes]);

  // Set up and clean up animation frame
  useEffect(() => {
    // Initial generation of shapes if none exist
    if (smallShapes.length === 0) {
      generateSmallShapes();
    }
    
    // Start the animation loop
    requestRef.current = requestAnimationFrame(animate);
    
    // Clean up animation frame on unmount
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate, generateSmallShapes, smallShapes.length]);

  return {
    time,
    smallShapes,
    generateSmallShapes
  };
}
