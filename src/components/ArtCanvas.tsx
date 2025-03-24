
import React, { useRef, memo } from 'react';
import { useCanvasSetup } from './geometry/useCanvasSetup';
import { useArtCanvasSketch } from './useArtCanvasSketch';

const ArtCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Get the sketch function and its dependencies
  const { createSketch, dependencies } = useArtCanvasSketch();
  
  // Initialize and manage the p5 instance
  useCanvasSetup(canvasRef, createSketch(), dependencies);

  return <div ref={canvasRef} className="absolute inset-0 z-0" />;
};

// Memoize the component to prevent unnecessary re-renders
export default memo(ArtCanvas);
