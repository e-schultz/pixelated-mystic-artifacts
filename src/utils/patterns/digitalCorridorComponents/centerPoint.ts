
import { drawPixelatedCircle } from '../helpers';

// Draw the central focal point of the corridor
export function drawCenterPoint(
  p: any, 
  size: number, 
  pixelSize: number, 
  isPixelated: boolean
) {
  p.fill(255);
  p.noStroke();
  if (isPixelated) {
    drawPixelatedCircle(p, 0, 0, size * 0.02, pixelSize);
  } else {
    p.circle(0, 0, size * 0.04);
  }
}
