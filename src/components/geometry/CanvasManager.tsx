
import React, { useRef } from 'react';
import { useCanvasSetup } from './useCanvasSetup';
import { useAnimationSketch } from './useAnimationSketch';
import { useAnimation } from '@/contexts/AnimationContext';

interface CanvasManagerProps {
  className?: string;
  // These props are for direct prop usage if needed
  // They'll override the context values when provided
  currentAnimation?: number;
  animationSpeed?: number;
  showAsciiOverlay?: boolean;
  performanceMode?: boolean;
}

// This component now uses the animation context directly or props when provided
const CanvasManager: React.FC<CanvasManagerProps> = ({ 
  className,
  currentAnimation: currentAnimationProp,
  animationSpeed: animationSpeedProp,
  showAsciiOverlay: showAsciiOverlayProp,
  performanceMode: performanceModeProp
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Get animation settings from context
  const animationContext = useAnimation();
  
  // Use prop values if provided, otherwise fall back to context values
  const currentAnimation = currentAnimationProp !== undefined ? currentAnimationProp : animationContext.currentAnimation;
  const animationSpeed = animationSpeedProp !== undefined ? animationSpeedProp : animationContext.animationSpeed;
  const showAsciiOverlay = showAsciiOverlayProp !== undefined ? showAsciiOverlayProp : animationContext.showAsciiOverlay;
  const performanceMode = performanceModeProp !== undefined ? performanceModeProp : animationContext.performanceMode;
  const randomOffset = animationContext.randomOffset;
  
  // Get the sketch function and its dependencies
  const { createSketch, dependencies } = useAnimationSketch();
  
  // Initialize and manage the p5 instance
  useCanvasSetup(containerRef, createSketch(), dependencies);

  return (
    <div ref={containerRef} className={className} />
  );
};

export default React.memo(CanvasManager);
