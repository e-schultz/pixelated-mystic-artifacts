
import React, { useRef } from 'react';
import { useCanvasSetup } from './useCanvasSetup';
import { useAnimationSketch } from './useAnimationSketch';
import { useAnimation } from '@/contexts/AnimationContext';

interface CanvasManagerProps {
  className?: string;
}

// This component now uses the animation context directly
const CanvasManager: React.FC<CanvasManagerProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Get animation settings from context
  const { currentAnimation, animationSpeed, showAsciiOverlay, performanceMode } = useAnimation();
  
  // Get the sketch function and its dependencies
  const { createSketch, dependencies } = useAnimationSketch();
  
  // Initialize and manage the p5 instance
  useCanvasSetup(containerRef, createSketch(), dependencies);

  return (
    <div ref={containerRef} className={className} />
  );
};

export default React.memo(CanvasManager);
