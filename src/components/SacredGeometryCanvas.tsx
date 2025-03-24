
import React, { memo } from 'react';
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

// Memoize with custom equality check to only re-render when necessary
export default memo(SacredGeometryCanvas, (prevProps, nextProps) => {
  return (
    prevProps.currentAnimation === nextProps.currentAnimation &&
    prevProps.animationSpeed === nextProps.animationSpeed &&
    prevProps.showAsciiOverlay === nextProps.showAsciiOverlay &&
    prevProps.className === nextProps.className
  );
});
