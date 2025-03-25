
// Recursive Collapse Shrine pattern implementation
import { RenderOptions } from "../patternTypes";
import { drawPixelatedCircle } from './helpers';
import { drawShrineCore } from './shrineComponents/shrineCore';
import { drawSpiralStaircase } from './shrineComponents/spiralStaircase';
import { drawFloatingCubes } from './shrineComponents/floatingCubes';
import { drawVerticalBeams } from './shrineComponents/verticalBeams';
import { drawCentralGlow } from './shrineComponents/centralGlow';

// Pattern: Recursive Collapse Shrine - A spiraling, layered structure with recursive elements
export function drawRecursiveCollapseShrine(
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
  
  // Get terminal mode option
  const isTerminalMode = options?.isTerminalMode || false;
  
  // Use color only if pixelated or terminal mode is enabled
  const useColor = isPixelated || isTerminalMode;
  
  // Draw main shrine structure
  drawShrineCore(p, size, time, pixelSize, isPixelated, useColor);
  
  // Draw outer spiral elements
  drawSpiralStaircase(p, size, time, pixelSize, isPixelated, useColor);
  
  // Draw floating elements around the shrine
  drawFloatingCubes(p, size, time, pixelSize, isPixelated, useColor);
  
  // Draw vertical beams
  drawVerticalBeams(p, size, time, pixelSize, isPixelated, useColor);
  
  // Draw central glow
  drawCentralGlow(p, size, time, pixelSize, isPixelated, useColor);
  
  p.pop();
}
