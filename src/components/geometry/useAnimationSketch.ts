
import { useAnimation } from '@/contexts/AnimationContext';
import { useCallback, useMemo } from 'react';
import { createAnimationSketch } from './animation/sketchFactory';

// This hook creates the sketch function used by p5
export function useAnimationSketch() {
  const { 
    currentAnimation, 
    animationSpeed, 
    showAsciiOverlay, 
    performanceMode 
  } = useAnimation();

  // Create the sketch function with optimizations
  const createSketch = useCallback(() => {
    return createAnimationSketch(
      currentAnimation,
      animationSpeed,
      showAsciiOverlay,
      performanceMode
    );
  }, [currentAnimation, animationSpeed, showAsciiOverlay, performanceMode]);

  // Memoize the sketch creation for better performance
  const sketch = useMemo(() => createSketch(), [createSketch]);

  return {
    createSketch: () => sketch,
    dependencies: [currentAnimation, animationSpeed, showAsciiOverlay, performanceMode]
  };
}
