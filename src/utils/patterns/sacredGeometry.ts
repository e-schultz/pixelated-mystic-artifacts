
// Sacred Geometry pattern implementation
import { RenderOptions } from "../patternTypes";
import { drawFlowerOfLife, drawPolygon } from './commonGeometry';

// Pattern 3: Sacred Geometry
export function drawSacredGeometry(
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
  
  const pixelSize = isPixelated ? 2 : 1;
  const radius = size * 0.4;
  
  // Draw flower of life pattern
  drawFlowerOfLife(p, 0, 0, radius, 7, isPixelated, pixelSize, [255, 200]);
  
  // Draw hexagon
  drawPolygon(p, 0, 0, radius * 0.8, 6, isPixelated, pixelSize, 0, [255, 200]);
  
  p.pop();
}
