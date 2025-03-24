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
  const lastRegenerateTimeRef = useRef<number>(0);
  
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
      
      // Position shapes with more spacing and avoid screen edges
      const padding = 50;
      const x = padding + Math.random() * (window.innerWidth - padding * 2);
      const y = padding + Math.random() * (window.innerHeight - padding * 2);
      
      // Keep sizes more consistent to avoid visual clutter
      const baseSize = isMobile ? 20 : 35;
      const variance = isMobile ? 10 : 15;
      const size = baseSize + Math.random() * variance;
      
      newShapes.push({
        x,
        y,
        size,
        rotation: Math.random() * Math.PI * 2,
        speed: (Math.random() * 0.0005 + 0.0003) * (isMobile ? 0.7 : 1), // Even slower on mobile
        drawFunction,
        settings: {
          scale: 0.8,
          rotation: 0,
          opacity: Math.random() * 0.2 + 0.08, // Lower opacity to reduce flicker
          segments: isMobile ? 4 : 6, // Simplify geometry on mobile
          variance: 0.2,
          pixelSize: isMobile ? 1 : 2,
          color: `rgba(240, 240, 228, ${Math.random() * 0.15 + 0.05})`,
          speed: 0.005
        }
      });
    }
    
    // We use a functional update to ensure we're not creating a state update loop
    setSmallShapes(newShapes);
    lastRegenerateTimeRef.current = Date.now();
  }, [isMobile]);

  // Animation frame loop using requestAnimationFrame with smoother timing
  const animate = useCallback((time: number) => {
    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time;
    }
    
    const deltaTime = time - (previousTimeRef.current || 0);
    previousTimeRef.current = time;
    
    // Cap deltaTime to prevent large jumps after tab switching or sleep
    const cappedDeltaTime = Math.min(deltaTime, 100);
    
    // Use delta time for smoother animation with a dampening factor
    const timeIncrement = (cappedDeltaTime / 1000) * 0.1 * speedFactorRef.current;
    setTime(prevTime => prevTime + timeIncrement);
    
    // Regenerate shapes very infrequently to avoid flickering
    // Only regenerate after a minimum time has passed (15 seconds)
    const timeSinceLastRegenerate = Date.now() - lastRegenerateTimeRef.current;
    if (timeSinceLastRegenerate > 15000 && Math.random() < 0.01) {
      generateSmallShapes();
    }
    
    // Update shape rotations with smoother interpolation
    setSmallShapes(prev => 
      prev.map(shape => ({
        ...shape,
        rotation: shape.rotation + (shape.speed * cappedDeltaTime * 0.01 * (isMobile ? 0.7 : 1))
      }))
    );
    
    requestRef.current = requestAnimationFrame(animate);
  }, [generateSmallShapes, isMobile]);

  // Set up and clean up animation frame
  useEffect(() => {
    // Generate shapes once at start
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
