
// Sacred Geometry pattern implementation
import { RenderOptions } from "../patternTypes";
import { drawPixelatedCircle, drawPixelatedLine } from './helpers';

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
  
  p.stroke(255, 200);
  p.strokeWeight(pixelSize);
  p.noFill();
  
  // Draw flower of life pattern
  const circleCount = 7;
  const centralCircleRadius = radius / 3;
  
  // Draw central circle
  if (isPixelated) {
    drawPixelatedCircle(p, 0, 0, centralCircleRadius, pixelSize);
  } else {
    p.circle(0, 0, centralCircleRadius * 2);
  }
  
  // Draw surrounding circles
  for (let i = 0; i < circleCount; i++) {
    const angle = i * p.TWO_PI / circleCount;
    const x = p.cos(angle) * centralCircleRadius;
    const y = p.sin(angle) * centralCircleRadius;
    
    if (isPixelated) {
      drawPixelatedCircle(p, x, y, centralCircleRadius, pixelSize);
    } else {
      p.circle(x, y, centralCircleRadius * 2);
    }
  }
  
  // Draw outer circle
  if (isPixelated) {
    drawPixelatedCircle(p, 0, 0, radius, pixelSize);
  } else {
    p.circle(0, 0, radius * 2);
  }
  
  // Draw simple hexagon
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = i * p.TWO_PI / 6;
    const x = p.cos(angle) * radius * 0.8;
    const y = p.sin(angle) * radius * 0.8;
    points.push({ x, y });
  }
  
  for (let i = 0; i < points.length; i++) {
    const next = (i + 1) % points.length;
    if (isPixelated) {
      drawPixelatedLine(p, points[i].x, points[i].y, points[next].x, points[next].y, pixelSize);
    } else {
      p.line(points[i].x, points[i].y, points[next].x, points[next].y);
    }
  }
  
  p.pop();
}
