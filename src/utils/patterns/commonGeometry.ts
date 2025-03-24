
// Common geometry functions used across multiple patterns

// Draw a circle with optional parameters
export function drawCustomCircle(
  p: any,
  x: number,
  y: number,
  radius: number,
  isPixelated: boolean,
  pixelSize = 2,
  strokeColor = [255, 200],
  fillColor = null
) {
  p.push();
  
  if (fillColor) {
    p.fill(fillColor[0], fillColor[1], fillColor.length > 2 ? fillColor[2] : 255);
  } else {
    p.noFill();
  }
  
  p.stroke(strokeColor[0], strokeColor[1], strokeColor.length > 2 ? strokeColor[2] : 255);
  p.strokeWeight(pixelSize);
  
  if (isPixelated) {
    drawPixelatedCircle(p, x, y, radius, pixelSize);
  } else {
    p.circle(x, y, radius * 2);
  }
  
  p.pop();
}

// Draw a polygon with optional parameters
export function drawPolygon(
  p: any,
  x: number,
  y: number,
  radius: number,
  sides: number,
  isPixelated: boolean,
  pixelSize = 2,
  rotation = 0,
  strokeColor = [255, 200]
) {
  p.push();
  p.translate(x, y);
  p.rotate(rotation);
  
  p.stroke(strokeColor[0], strokeColor[1], strokeColor.length > 2 ? strokeColor[2] : 255);
  p.strokeWeight(pixelSize);
  p.noFill();
  
  const points = [];
  for (let i = 0; i < sides; i++) {
    const angle = i * p.TWO_PI / sides;
    const px = p.cos(angle) * radius;
    const py = p.sin(angle) * radius;
    points.push({ x: px, y: py });
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

// Re-export the helper functions so they can be imported from a single file
import { drawPixelatedCircle, drawPixelatedLine, drawPixelatedRect } from './helpers';

export { drawPixelatedCircle, drawPixelatedLine, drawPixelatedRect };

// Create a flower of life pattern
export function drawFlowerOfLife(
  p: any,
  x: number,
  y: number,
  radius: number,
  circleCount: number,
  isPixelated: boolean,
  pixelSize = 2,
  strokeColor = [255, 200]
) {
  p.push();
  p.translate(x, y);
  
  p.stroke(strokeColor[0], strokeColor[1], strokeColor.length > 2 ? strokeColor[2] : 255);
  p.strokeWeight(pixelSize);
  p.noFill();
  
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
  
  p.pop();
}
