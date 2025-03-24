
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

export function useGeometry(animationSpeed: number, performanceMode: boolean = false) {
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
  const performanceModeRef = useRef(performanceMode);
  
  // Update refs when props change
  useEffect(() => {
    speedFactorRef.current = animationSpeed;
  }, [animationSpeed]);
  
  useEffect(() => {
    performanceModeRef.current = performanceMode;
  }, [performanceMode]);

  // Generate random small background shapes - fewer and simpler on mobile
  const generateSmallShapes = useCallback(() => {
    // Drastically reduce shapes for performance mode/mobile
    const numShapes = performanceModeRef.current || isMobile ? 2 : 8;
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
      
      // Smaller size for performance mode/mobile
      const baseSize = performanceModeRef.current || isMobile ? 15 : 35;
      const variance = performanceModeRef.current || isMobile ? 5 : 15;
      const size = baseSize + Math.random() * variance;
      
      // Reduced animation speed in performance mode
      const speedMultiplier = performanceModeRef.current || isMobile ? 0.4 : 1;
      
      newShapes.push({
        x,
        y,
        size,
        rotation: Math.random() * Math.PI * 2,
        speed: (Math.random() * 0.0005 + 0.0003) * speedMultiplier,
        drawFunction,
        settings: {
          scale: 0.8,
          rotation: 0,
          opacity: performanceModeRef.current || isMobile ? 0.05 : 0.1,
          segments: performanceModeRef.current || isMobile ? 3 : 6,
          variance: 0.2,
          pixelSize: performanceModeRef.current || isMobile ? 1 : 2,
          color: `rgba(240, 240, 228, ${Math.random() * 0.1 + 0.05})`,
          speed: 0.005 * speedMultiplier
        }
      });
    }
    
    setSmallShapes(newShapes);
    lastRegenerateTimeRef.current = Date.now();
  }, [isMobile]);

  // Animation frame loop using requestAnimationFrame with throttling for mobile
  const animate = useCallback((time: number) => {
    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time;
    }
    
    const deltaTime = time - (previousTimeRef.current || 0);
    previousTimeRef.current = time;
    
    // Cap deltaTime to prevent large jumps
    const cappedDeltaTime = Math.min(deltaTime, 100);
    
    // Throttling for mobile/performance mode - only update every other frame
    const shouldUpdate = !performanceModeRef.current || Math.floor(time / 100) % 2 === 0;
    
    if (shouldUpdate) {
      // Use delta time for smoother animation with a dampening factor
      // Reduced time increment for performance mode
      const timeIncrement = (cappedDeltaTime / 1000) * 0.1 * speedFactorRef.current * 
                          (performanceModeRef.current || isMobile ? 0.6 : 1);
      setTime(prevTime => prevTime + timeIncrement);
      
      // Regenerate shapes very infrequently to avoid flickering
      // Only regenerate after a minimum time has passed (30 seconds in performance mode)
      const timeSinceLastRegenerate = Date.now() - lastRegenerateTimeRef.current;
      const minRegenerateTime = performanceModeRef.current || isMobile ? 30000 : 15000;
      if (timeSinceLastRegenerate > minRegenerateTime && Math.random() < 0.01) {
        generateSmallShapes();
      }
      
      // Update shape rotations with smoother interpolation
      // Only when needed, less frequently in performance mode
      setSmallShapes(prev => 
        prev.map(shape => ({
          ...shape,
          rotation: shape.rotation + (shape.speed * cappedDeltaTime * 0.01 * 
                                    (performanceModeRef.current || isMobile ? 0.5 : 1))
        }))
      );
    }
    
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
