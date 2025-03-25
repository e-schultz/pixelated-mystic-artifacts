
// Hybrid Constellation pattern - combining components from different patterns
import { RenderOptions } from "../patternTypes";
import { drawOracleCenter } from './oracleComponents/oracleCenter';
import { drawVectorField } from './oracleComponents/vectorField';
import { drawFloatingCubes } from './shrineComponents/floatingCubes';
import { drawCentralGlow } from './shrineComponents/centralGlow';

// Pattern: Hybrid Constellation - A combination of Oracle and Shrine components
export function drawHybridConstellation(
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
  
  // Draw vector field from Oracle pattern
  drawVectorField(p, size, time, pixelSize, isPixelated, useColor);
  
  // Draw floating cubes from Shrine pattern
  drawFloatingCubes(p, size * 0.8, time, pixelSize, isPixelated, useColor);
  
  // Draw oracle center as the focal point
  drawOracleCenter(p, size, time * 0.8, pixelSize, isPixelated, useColor);
  
  // Draw central glow from Shrine pattern
  drawCentralGlow(p, size, time, pixelSize, isPixelated, useColor);
  
  p.pop();
}
