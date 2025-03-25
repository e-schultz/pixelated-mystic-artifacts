
// Resonance Contour Field pattern implementation
import { RenderOptions } from "../patternTypes";
import {
  drawContourLines,
  drawResonancePoints,
  drawVectorIndicators,
  drawCentralResonator
} from './resonanceContourComponents';

// Pattern: Resonance Contour Field - inspired by topographic maps and waveform visualizations
export function drawResonanceContour(
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
  
  // Draw primary contour field
  drawContourLines(p, size, time, pixelSize, isPixelated);
  
  // Draw resonance points at key field intersections
  drawResonancePoints(p, size, time, pixelSize, isPixelated, useColor);
  
  // Draw minimalist vector indicators
  drawVectorIndicators(p, size, time, pixelSize, isPixelated);
  
  // Draw central resonance structure
  drawCentralResonator(p, size, time, pixelSize, isPixelated, useColor);
  
  p.pop();
}
