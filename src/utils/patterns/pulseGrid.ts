
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
  isPixelated: boolean
) {
  p.push();
  p.translate(centerX, centerY);
  p.rotate(time * 0.05);
  
  const pixelSize = isPixelated ? 2 : 1;
  const gridSize = size * 0.7;
  const cellCount = 8;
  
  // Draw the pulsing grid cells
  drawGridCells(p, gridSize, cellCount, time, pixelSize, isPixelated);
  
  p.pop();
}
