
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
  
  const pixelSize = isPixelated ? 2 : 1;
  
  // Get isTerminalMode from options if available
  const isTerminalMode = options?.isTerminalMode || false;
  
  // Use color only if pixelated or terminal mode is enabled
  const useColor = isPixelated || isTerminalMode;
  
  // Draw perspective grid
  drawPerspectiveGrid(p, size, time, pixelSize, isPixelated, useColor);
  
  // Draw sacred geometry pattern
  drawSacredPattern(p, size, time, pixelSize, isPixelated, useColor);
  
  // Draw floating elements
  drawFloatingElements(p, size, time, pixelSize, isPixelated, useColor);
  
  // Draw center focal point
  drawCenterFocalPoint(p, size, time, pixelSize, isPixelated, useColor);
  
  p.pop();
}
