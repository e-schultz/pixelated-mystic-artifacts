
import { drawPixelatedCircle, drawPixelatedLine } from '../helpers';

// Draw resonance points at key intersections of energy fields
export function drawResonancePoints(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean, useColor: boolean) {
  const pointCount = 6;
  const fieldRadius = size * 0.5;
  
  // Calculate primary resonance points
  for (let i = 0; i < pointCount; i++) {
    const angle = i * p.TWO_PI / pointCount + time * 0.1;
    
    // Create two orbits
    for (let orbit = 0; orbit < 2; orbit++) {
      const radius = fieldRadius * (0.3 + orbit * 0.4);
      const x = p.cos(angle) * radius;
      const y = p.sin(angle) * radius;
      
      // Simple pulse effect
      const pulseSize = size * 0.015 * (0.8 + 0.2 * p.sin(time * 2 + i + orbit));
      
      // Set color based on mode
      if (useColor) {
        p.stroke(200 + orbit * 55, 220, 255, 120);
      } else {
        p.stroke(255, 100 + orbit * 40);
      }
      
      p.noFill();
      p.strokeWeight(pixelSize);
      
      // Draw resonance point
      if (isPixelated) {
        drawPixelatedCircle(p, x, y, pulseSize, pixelSize);
      } else {
        p.circle(x, y, pulseSize * 2);
      }
      
      // For every other point, draw a connecting line to center
      if (i % 2 === 0 && orbit === 1) {
        if (isPixelated) {
          drawPixelatedLine(p, x, y, 0, 0, pixelSize);
        } else {
          p.line(x, y, 0, 0);
        }
      }
    }
  }
}
