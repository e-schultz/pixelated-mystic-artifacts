
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
  
  // Apply parameters if available
  const parameters = options?.parameters || {
    complexity: 0.5,
    rotationSpeed: 1.0,
    colorIntensity: 0.7,
    lineThickness: 0.5,
    trailPersistence: 0.5
  };
  
  // Apply rotation based on rotationSpeed parameter
  p.rotate(time * 0.05 * parameters.rotationSpeed);
  
  // Apply line thickness parameter
  const pixelSize = isPixelated ? 2 * (0.5 + parameters.lineThickness) : 1 * (0.5 + parameters.lineThickness);
  
  // Apply complexity to grid
  const gridSize = size * 0.7 * (0.8 + parameters.complexity * 0.4); // Scale by complexity
  const cellCount = Math.max(6, Math.floor(6 + parameters.complexity * 6)); // 6-12 cells based on complexity
  
  // Draw the pulsing grid cells
  drawGridCells(p, gridSize, cellCount, time, pixelSize, isPixelated);
  
  p.pop();
}
