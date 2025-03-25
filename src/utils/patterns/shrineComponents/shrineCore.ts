
import { drawPixelatedCircle } from '../helpers';

// Draw the core structure of the shrine
export function drawShrineCore(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean, useColor: boolean) {
  const levels = 5; // Number of vertical levels
  const baseSize = size * 0.4;
  
  for (let i = 0; i < levels; i++) {
    const levelY = (i * size * 0.08) - (size * 0.2); // Stack vertically
    const levelSize = baseSize * (1 - (i * 0.15)); // Decrease size with each level
    const rotation = time * (0.2 + i * 0.1) + (i * p.PI / 6); // Different rotation for each level
    
    p.push();
    p.translate(0, levelY);
    p.rotate(rotation);
    
    // Define the level hue here so it's available throughout the scope
    const levelHue = useColor ? p.map(i, 0, levels, 320, 180) : 0;
    
    // Draw level polygon
    if (useColor) {
      // Magenta to cyan gradient based on level
      p.stroke(levelHue, 100, 70, 180);
    } else {
      p.stroke(255, 140 + i * 20);
    }
    p.strokeWeight(pixelSize);
    p.noFill();
    
    // Draw octagonal structure for each level
    const sides = 8;
    const points = [];
    
    for (let j = 0; j < sides; j++) {
      const angle = j * p.TWO_PI / sides;
      const x = p.cos(angle) * levelSize;
      const y = p.sin(angle) * levelSize;
      points.push({ x, y });
    }
    
    // Connect points
    for (let j = 0; j < points.length; j++) {
      const next = (j + 1) % points.length;
      if (isPixelated) {
        drawPixelatedLine(p, points[j].x, points[j].y, points[next].x, points[next].y, pixelSize);
      } else {
        p.line(points[j].x, points[j].y, points[next].x, points[next].y);
      }
    }
    
    // Add inner details
    const innerSize = levelSize * 0.7;
    if (useColor) {
      // Use the levelHue variable that's now properly in scope
      p.stroke(levelHue, 100, 50, 150);
    } else {
      p.stroke(255, 100);
    }
    
    if (isPixelated) {
      drawPixelatedCircle(p, 0, 0, innerSize, pixelSize);
    } else {
      p.circle(0, 0, innerSize * 2);
    }
    
    p.pop();
  }
}

// Helper function to draw a pixelated line
function drawPixelatedLine(p: any, x1: number, y1: number, x2: number, y2: number, pixelSize: number) {
  const d = p.dist(x1, y1, x2, y2);
  const steps = Math.max(1, Math.floor(d / pixelSize));
  
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = p.lerp(x1, x2, t);
    const y = p.lerp(y1, y2, t);
    p.rect(x, y, pixelSize, pixelSize);
  }
}
