
import { useEffect, useState, useCallback } from 'react';
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

  // Update time based on animation speed
  useEffect(() => {
    const frameUpdate = () => {
      setTime(prev => prev + 0.005 * animationSpeed);
      
      // Rarely regenerate shapes
      if (Math.random() < 0.005 * animationSpeed) {
        generateSmallShapes();
      }
    };

    const intervalId = setInterval(frameUpdate, 1000 / 30); // ~30fps
    
    // Initial generation of shapes
    if (smallShapes.length === 0) {
      generateSmallShapes();
    }

    return () => clearInterval(intervalId);
  }, [animationSpeed, smallShapes.length, generateSmallShapes]);

  // Update small shapes based on animation speed
  useEffect(() => {
    setSmallShapes(prev => 
      prev.map(shape => ({
        ...shape,
        rotation: shape.rotation + shape.speed * animationSpeed
      }))
    );
  }, [time, animationSpeed]);

  return {
    time,
    smallShapes,
    generateSmallShapes
  };
}
