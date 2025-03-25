
import { drawFlowerOfLife } from '../commonGeometry';

// Draw flower of life pattern
export function drawFlowerOfLifePattern(
  p: any, 
  x: number, 
  y: number, 
  radius: number, 
  segments: number, 
  isPixelated: boolean, 
  pixelSize: number, 
  color: number[]
) {
  drawFlowerOfLife(p, x, y, radius, segments, isPixelated, pixelSize, color);
}
