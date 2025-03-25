
// Pulse Grid pattern implementation
import { RenderOptions } from "../patternTypes";
import { drawGridCells } from './pulseGridComponents/gridCells';

// Pattern 5: Pulse Grid
export function drawPulseGrid(
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
  p.rotate(time * 0.05);
  
  // Apply parameters if available
  const parameters = options?.parameters || {
    complexity: 0.5,
    rotationSpeed: 1.0,
    colorIntensity: 0.7,
    lineThickness: 0.5,
    trailPersistence: 0.5
  };
  
  const pixelSize = isPixelated ? 2 * (0.5 + parameters.lineThickness) : 1 * (0.5 + parameters.lineThickness);
  const gridSize = size * 0.7;
  const cellCount = 8;
  
  // Draw the pulsing grid cells
  drawGridCells(p, gridSize, cellCount, time, pixelSize, isPixelated);
  
  p.pop();
}
