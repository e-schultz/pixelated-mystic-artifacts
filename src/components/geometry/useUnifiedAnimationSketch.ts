
import { useVisualization } from '@/contexts/VisualizationContext';
import { useCallback, useMemo } from 'react';
import { createAnimationSketch } from './animation/sketchFactory';

// This hook creates the sketch function used by p5
export function useUnifiedAnimationSketch() {
  const { 
    currentPattern, 
    animationSpeed, 
    showAsciiOverlay, 
    isLowPerformanceMode 
  } = useVisualization();

  // Create the sketch function with optimizations
  const createSketch = useCallback(() => {
    return createAnimationSketch(
      currentPattern,
      animationSpeed,
      showAsciiOverlay,
      isLowPerformanceMode
    );
  }, [currentPattern, animationSpeed, showAsciiOverlay, isLowPerformanceMode]);

  // Memoize the sketch creation for better performance
  const sketch = useMemo(() => createSketch(), [createSketch]);

  return {
    createSketch: () => sketch,
    dependencies: [currentPattern, animationSpeed, showAsciiOverlay, isLowPerformanceMode]
  };
}
