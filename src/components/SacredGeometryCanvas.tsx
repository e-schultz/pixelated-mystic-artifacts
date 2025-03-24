
import React from 'react';
import CanvasManager from './geometry/CanvasManager';

interface SacredGeometryCanvasProps {
  currentAnimation?: number;
  animationSpeed?: number;
  showAsciiOverlay?: boolean;
  className?: string;
}

// This component now properly passes all props to the CanvasManager
const SacredGeometryCanvas: React.FC<SacredGeometryCanvasProps> = ({ 
  currentAnimation,
  animationSpeed,
  showAsciiOverlay,
  className
}) => {
  return (
    <CanvasManager 
      currentAnimation={currentAnimation}
      animationSpeed={animationSpeed}
      showAsciiOverlay={showAsciiOverlay}
      className={className} 
    />
  );
};

export default React.memo(SacredGeometryCanvas);
