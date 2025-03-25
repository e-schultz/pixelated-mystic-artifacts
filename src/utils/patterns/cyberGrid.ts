
// CyberGrid pattern implementation
import { RenderOptions } from "../patternTypes";
import { drawBackgroundGrid } from './helpers';
import {
  drawPerspectiveGrid,
  drawSacredPattern,
  drawFloatingElements,
  drawCenterFocalPoint
} from './cyberGridComponents';

// Pattern: CyberGrid - inspired by cyberpunk aesthetics with sacred geometry elements
export function drawCyberGrid(
  p: any, 
  centerX: number, 
  centerY: number, 
  size: number, 
  time: number,
  isPixelated: boolean,
  options?: RenderOptions
) {
  p.push();
  p.translate(centerX, centerY);
  
  // Apply parameters if available
  const parameters = options?.parameters || {
    complexity: 0.5,
    rotationSpeed: 1.0,
    colorIntensity: 0.7,
    lineThickness: 0.5,
    trailPersistence: 0.5
  };
  
  // Apply line thickness parameter
  const pixelSize = isPixelated ? 2 * (0.5 + parameters.lineThickness) : 1 * (0.5 + parameters.lineThickness);
  
  // Get isTerminalMode from options if available
  const isTerminalMode = options?.isTerminalMode || false;
  
  // Apply color intensity parameter
  const useColor = isPixelated || isTerminalMode;
  const colorMultiplier = parameters.colorIntensity;
  
  // Draw perspective grid with complexity parameter
  drawPerspectiveGrid(p, size, time, pixelSize, isPixelated, useColor, colorMultiplier);
  
  // Draw sacred geometry pattern
  drawSacredPattern(p, size, time, pixelSize, isPixelated, useColor, colorMultiplier);
  
  // Draw floating elements
  drawFloatingElements(p, size, time, pixelSize, isPixelated, useColor, colorMultiplier);
  
  // Draw center focal point
  drawCenterFocalPoint(p, size, time, pixelSize, isPixelated, useColor);
  
  p.pop();
}
