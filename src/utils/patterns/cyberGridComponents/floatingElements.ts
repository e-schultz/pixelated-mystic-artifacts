
import { drawPixelatedCircle, drawPixelatedRect } from '../helpers';

// Draw floating geometric elements for the cyber grid
export function drawFloatingElements(
  p: any, 
  size: number, 
  time: number, 
  pixelSize: number, 
  isPixelated: boolean, 
  useColor: boolean
) {
  const elementCount = 12;
  
  for (let i = 0; i < elementCount; i++) {
    // Create deterministic "random" positions based on index
    const angle = i * p.TWO_PI / elementCount + (time * (0.1 + i * 0.01));
    const distance = size * 0.3 + (p.sin(time * 0.5 + i) * size * 0.1);
    const x = p.cos(angle) * distance;
    const y = p.sin(angle) * distance;
    
    // Determine element type based on index
    const elementType = i % 3;
    
    p.push();
    p.translate(x, y);
    p.rotate(time * 0.3 + i);
    
    let color;
    if (useColor) {
      // Vibrant cyberpunk colors
      p.colorMode(p.HSB, 360, 100, 100, 100);
      let hue = (i * 60 + time * 10) % 360;
      color = p.color(hue, 80, 100, 70);
      p.colorMode(p.RGB, 255, 255, 255, 255);
    } else {
      // Black and white for standard mode
      const brightness = 200 + Math.sin(time * 0.5 + i * 0.2) * 55;
      color = p.color(brightness, brightness, brightness, 70);
    }
    
    p.stroke(color);
    p.strokeWeight(pixelSize);
    
    // Different geometric shapes
    const elementSize = size * 0.05 * (p.sin(time + i) * 0.2 + 0.8);
    
    if (elementType === 0) {
      // Square - like circuit nodes
      if (isPixelated) {
        drawPixelatedRect(p, 0, 0, elementSize, elementSize, pixelSize);
      } else {
        p.rect(-elementSize/2, -elementSize/2, elementSize, elementSize);
      }
    } else if (elementType === 1) {
      // Hexagon - like in the Metatron's Cube image
      if (isPixelated) {
        drawPolygon(p, 0, 0, elementSize/2, 6, pixelSize);
      } else {
        p.beginShape();
        for (let j = 0; j < 6; j++) {
          const hexAngle = j * p.TWO_PI / 6;
          const px = p.cos(hexAngle) * (elementSize/2);
          const py = p.sin(hexAngle) * (elementSize/2);
          p.vertex(px, py);
        }
        p.endShape(p.CLOSE);
      }
    } else {
      // Circle - like in the sacred geometry images
      if (isPixelated) {
        drawPixelatedCircle(p, 0, 0, elementSize/2, pixelSize);
      } else {
        p.circle(0, 0, elementSize);
      }
    }
    
    p.pop();
  }
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
