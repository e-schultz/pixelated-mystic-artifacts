
import React from 'react';
import CanvasManager from './geometry/CanvasManager';

interface SacredGeometryCanvasProps {
  currentAnimation?: number;
  animationSpeed?: number;
  showAsciiOverlay?: boolean;
  className?: string;
}

// This is now a thin wrapper around the CanvasManager
// All the heavy lifting happens in the CanvasManager component
const SacredGeometryCanvas: React.FC<SacredGeometryCanvasProps> = ({ 
  className
}) => {
  return <CanvasManager className={className} />;
};

export default React.memo(SacredGeometryCanvas);
