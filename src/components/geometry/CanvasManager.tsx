
import React, { useRef } from 'react';
import { useCanvasSetup } from './useCanvasSetup';
import { useAnimationSketch } from './useAnimationSketch';

interface CanvasManagerProps {
  className?: string;
  currentAnimation?: number;
  animationSpeed?: number;
  showAsciiOverlay?: boolean;
}

// This component now uses separate hooks for canvas setup and animation
const CanvasManager: React.FC<CanvasManagerProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Get the sketch function and its dependencies
  const { createSketch, dependencies } = useAnimationSketch();
  
  // Initialize and manage the p5 instance
  useCanvasSetup(containerRef, createSketch(), dependencies);

  return (
    <div ref={containerRef} className={className} />
  );
};

export default React.memo(CanvasManager);
