
import { useEffect, useState, useCallback, useRef } from 'react';
import { 
  GeometrySettings, 
  getDefaultSettings, 
  drawMetatronCube, 
  drawFlowerOfLife, 
  drawSriYantra, 
  drawGeometricGrid 
} from '@/utils/geometryUtils';
import { useIsMobile } from '@/hooks/use-mobile';

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
  
  const isMobile = useIsMobile();
  
  // Use refs for animation to prevent unnecessary re-renders
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const speedFactorRef = useRef(animationSpeed);
  
  // Update speed factor when animationSpeed changes
  useEffect(() => {
    speedFactorRef.current = animationSpeed;
  }, [animationSpeed]);

  // Generate random small background shapes - fewer on mobile
  const generateSmallShapes = useCallback(() => {
    // Fewer shapes on mobile for better performance
    const numShapes = isMobile ? 3 : 8;
    const newShapes = [];
    
    const drawFunctions = [
      drawMetatronCube,
      drawFlowerOfLife,
      drawSriYantra,
      drawGeometricGrid
    ];
    
    for (let i = 0; i < numShapes; i++) {
      const drawFunction = drawFunctions[Math.floor(Math.random() * drawFunctions.length)];
      newShapes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * (isMobile ? 30 : 50) + (isMobile ? 10 : 20),
        rotation: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.001 + 0.0005, // Slower on mobile
        drawFunction,
        settings: {
          scale: 0.8,
          rotation: 0,
          opacity: Math.random() * 0.3 + 0.1, // Lower opacity on mobile
          segments: isMobile ? 4 : 8,
          variance: 0.2,
          pixelSize: isMobile ? 1 : 2,
          color: `rgba(240, 240, 228, ${Math.random() * 0.3 + 0.1})`,
          speed: 0.005
        }
      });
    }
    
    setSmallShapes(newShapes);
  }, [isMobile]);

  // Animation frame loop using requestAnimationFrame
  const animate = useCallback((time: number) => {
    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time;
    }
    
    const deltaTime = time - (previousTimeRef.current || 0);
    previousTimeRef.current = time;
    
    // Use delta time for smoother animation
    const timeIncrement = (deltaTime / 1000) * 0.1 * speedFactorRef.current;
    setTime(prevTime => prevTime + timeIncrement);
    
    // Less frequent shape regeneration
    if (Math.random() < 0.0005) {
      generateSmallShapes();
    }
    
    // Update shape rotations
    setSmallShapes(prev => 
      prev.map(shape => ({
        ...shape,
        rotation: shape.rotation + (shape.speed * deltaTime * 0.01)
      }))
    );
    
    requestRef.current = requestAnimationFrame(animate);
  }, [generateSmallShapes]);

  // Set up and clean up animation frame
  useEffect(() => {
    generateSmallShapes();
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate, generateSmallShapes]);

  return {
    time,
    smallShapes
  };
}
