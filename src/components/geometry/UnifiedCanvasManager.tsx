
import React, { useRef } from 'react';
import { useCanvasSetup } from './useCanvasSetup';
import { useUnifiedAnimationSketch } from './useUnifiedAnimationSketch';

interface UnifiedCanvasManagerProps {
  className?: string;
}

// This component uses the unified hooks for canvas setup and animation
const UnifiedCanvasManager: React.FC<UnifiedCanvasManagerProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Get the sketch function and its dependencies from unified hook
  const { createSketch, dependencies } = useUnifiedAnimationSketch();
  
  // Initialize and manage the p5 instance
  useCanvasSetup(containerRef, createSketch(), dependencies);

  return (
    <div ref={containerRef} className={className} />
  );
};

export default React.memo(UnifiedCanvasManager);
