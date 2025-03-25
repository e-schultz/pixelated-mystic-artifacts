
import React, { memo } from 'react';
import CanvasManager from './geometry/CanvasManager';

interface SacredGeometryCanvasProps {
  currentAnimation?: number;
  animationSpeed?: number;
  showAsciiOverlay?: boolean;
  performanceMode?: boolean;
  className?: string;
}

// This component properly passes all props to the CanvasManager
const SacredGeometryCanvas: React.FC<SacredGeometryCanvasProps> = ({ 
  currentAnimation,
  animationSpeed,
  showAsciiOverlay,
  performanceMode,
  className
}) => {
  return (
    <CanvasManager 
      currentAnimation={currentAnimation}
      animationSpeed={animationSpeed}
      showAsciiOverlay={showAsciiOverlay}
      performanceMode={performanceMode}
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
    prevProps.performanceMode === nextProps.performanceMode &&
    prevProps.className === nextProps.className
  );
});
