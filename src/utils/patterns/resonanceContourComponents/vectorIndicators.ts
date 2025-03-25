
import { drawPixelatedLine } from '../helpers';

// Draw minimalist vector field indicators
export function drawVectorIndicators(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean) {
  const indicatorCount = 16;
  const fieldRadius = size * 0.6;
  
  p.stroke(255, 70);
  p.strokeWeight(pixelSize);
  
  // Draw minimal lines indicating force directions
  for (let i = 0; i < indicatorCount; i++) {
    // Distribute around the field with slight time-based rotation
    const angle = i * p.TWO_PI / indicatorCount + time * 0.05;
    const radius = fieldRadius * (0.4 + 0.6 * p.noise(i * 0.2, time * 0.2));
    
    const x = p.cos(angle) * radius;
    const y = p.sin(angle) * radius;
    
    // Calculate vector direction - perpendicular to radial with noise
    const vectorAngle = angle + p.HALF_PI + p.noise(i, time * 0.1) * p.PI * 0.25;
    const vectorLength = size * 0.04 * p.noise(i * 0.5, time * 0.2);
    
    const endX = x + p.cos(vectorAngle) * vectorLength;
    const endY = y + p.sin(vectorAngle) * vectorLength;
    
    // Draw vector indicator
    if (isPixelated) {
      drawPixelatedLine(p, x, y, endX, endY, pixelSize);
    } else {
      p.line(x, y, endX, endY);
    }
    
    // Draw small endpoint for some vectors
    if (i % 3 === 0) {
      if (isPixelated) {
        p.rect(endX - pixelSize/2, endY - pixelSize/2, pixelSize, pixelSize);
      } else {
        p.point(endX, endY);
      }
    }
  }
}
