
// Diffusion Oracle pattern implementation
import { RenderOptions } from "../patternTypes";
import { drawDiffusionField } from './oracleComponents/diffusionField';
import { drawVectorField } from './oracleComponents/vectorField';
import { drawOracleCenter } from './oracleComponents/oracleCenter';
import { drawReactionNodes } from './oracleComponents/reactionNodes';

// Pattern: Diffusion Oracle - inspired by reaction-diffusion systems and divination tools
export function drawDiffusionOracle(
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
  
  // Draw primary diffusion field
  drawDiffusionField(p, size, time, pixelSize, isPixelated);
  
  // Draw vector lines guiding the diffusion
  drawVectorField(p, size, time, pixelSize, isPixelated, useColor);
  
  // Draw the oracle/crystalline center
  drawOracleCenter(p, size, time, pixelSize, isPixelated, useColor);
  
  // Draw binary nodes representing reaction points
  drawReactionNodes(p, size, time, pixelSize, isPixelated, useColor);
  
  p.pop();
}
