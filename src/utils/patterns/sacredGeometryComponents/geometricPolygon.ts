
import { drawPolygon } from '../commonGeometry';

// Draw geometric polygon
export function drawGeometricPolygon(
  p: any, 
  x: number, 
  y: number, 
  radius: number, 
  sides: number, 
  isPixelated: boolean, 
  pixelSize: number, 
  rotation: number, 
  color: number[]
) {
  drawPolygon(p, x, y, radius, sides, isPixelated, pixelSize, rotation, color);
}
