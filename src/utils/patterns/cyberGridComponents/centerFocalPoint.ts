
import { drawPixelatedCircle } from '../helpers';

// Draw center focal point for the cyber grid
export function drawCenterFocalPoint(
  p: any, 
  size: number, 
  time: number, 
  pixelSize: number, 
  isPixelated: boolean, 
  useColor: boolean
) {
  // Central pulsing elements
  const pulseSize = size * 0.08 * (p.sin(time * 2) * 0.2 + 0.8);
  
  p.push();
  p.rotate(time * 0.2);
  
  let color1, color2;
  
  if (useColor) {
    // Alternate between magenta and cyan for the Star of David effect
    p.colorMode(p.HSB, 360, 100, 100, 100);
    color1 = p.color(180, 100, 100, 80); // Cyan
    color2 = p.color(300, 100, 100, 80); // Magenta
    p.colorMode(p.RGB, 255, 255, 255, 255);
  } else {
    // Black and white version
    color1 = p.color(255, 255, 255, 80); // White
    color2 = p.color(180, 180, 180, 80); // Gray
  }
  
  // Outer hexagon - like in the sacred geometry images
  p.noFill();
  p.stroke(color1);
  p.strokeWeight(pixelSize * 1.5);
  
  if (isPixelated) {
    drawPolygon(p, 0, 0, pulseSize * 2, 6, pixelSize);
  } else {
    p.beginShape();
    for (let i = 0; i < 6; i++) {
      const angle = i * p.TWO_PI / 6;
      const px = p.cos(angle) * pulseSize * 2;
      const py = p.sin(angle) * pulseSize * 2;
      p.vertex(px, py);
    }
    p.endShape(p.CLOSE);
  }
  
  // Inner triangle pointing up - from Star of David
  p.stroke(color2);
  if (isPixelated) {
    drawPolygon(p, 0, 0, pulseSize, 3, pixelSize);
  } else {
    p.beginShape();
    for (let i = 0; i < 3; i++) {
      const angle = i * p.TWO_PI / 3 + p.PI / 6;
      const px = p.cos(angle) * pulseSize;
      const py = p.sin(angle) * pulseSize;
      p.vertex(px, py);
    }
    p.endShape(p.CLOSE);
  }
  
  // Center point
  p.fill(255);
  p.noStroke();
  if (isPixelated) {
    p.rect(-pixelSize/2, -pixelSize/2, pixelSize, pixelSize);
  } else {
    p.circle(0, 0, pixelSize * 2);
  }
  
  p.pop();
}

// Helper function to draw polygons with pixelation
function drawPolygon(p: any, x: number, y: number, radius: number, sides: number, pixelSize: number) {
  const points = [];
  
  // Calculate all the vertex points
  for (let i = 0; i < sides; i++) {
    const angle = i * p.TWO_PI / sides;
    const px = x + p.cos(angle) * radius;
    const py = y + p.sin(angle) * radius;
    points.push({x: px, y: py});
  }
  
  // Draw the lines connecting the points
  for (let i = 0; i < points.length; i++) {
    const currentPoint = points[i];
    const nextPoint = points[(i + 1) % points.length];
    
    // Draw pixelated line
    for (let t = 0; t <= 1; t += 1 / Math.max(1, Math.floor(p.dist(currentPoint.x, currentPoint.y, nextPoint.x, nextPoint.y) / pixelSize))) {
      const px = p.lerp(currentPoint.x, nextPoint.x, t);
      const py = p.lerp(currentPoint.y, nextPoint.y, t);
      p.rect(px, py, pixelSize, pixelSize);
    }
  }
}
