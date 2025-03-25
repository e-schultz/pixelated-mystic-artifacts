
// Digital Corridor pattern implementation
import { RenderOptions } from "../patternTypes";
import { drawCorridorStructure } from './digitalCorridorComponents/corridorStructure';
import { drawCenterPoint } from './digitalCorridorComponents/centerPoint';

// Pattern 0: Digital Corridor
export function drawDigitalCorridor(
  p: any, 
  centerX: number, 
  centerY: number, 
  size: number, 
  time: number,
  isPixelated: boolean
) {
  p.push();
  p.translate(centerX, centerY);
  p.rotate(time * 0.1);
  
  const corridorDepth = 12;
  const pixelSize = isPixelated ? 2 : 1;
  
  // Draw the main corridor structure
  drawCorridorStructure(p, size, corridorDepth, time, pixelSize, isPixelated);
  
  // Draw central point
  drawCenterPoint(p, size, pixelSize, isPixelated);
  
  p.pop();
}
