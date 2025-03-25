
import { drawPixelatedLine } from '../helpers';

// Draw vector field lines guiding the diffusion
export function drawVectorField(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean, useColor: boolean) {
  const fieldRadius = size * 0.4;
  const lineCount = 12;
  
  p.stroke(255, 100);
  p.strokeWeight(pixelSize);
  
  // Draw field lines emanating from center
  for (let i = 0; i < lineCount; i++) {
    const angle = i * p.TWO_PI / lineCount + time * 0.1;
    const length = fieldRadius * (0.5 + 0.5 * p.sin(time * 0.5 + i * 0.5));
    
    const endX = p.cos(angle) * length;
    const endY = p.sin(angle) * length;
    
    if (isPixelated) {
      drawPixelatedLine(p, 0, 0, endX, endY, pixelSize);
    } else {
      p.line(0, 0, endX, endY);
    }
    
    // Add distortion points along the vector lines
    const distortPoints = 3;
    for (let j = 1; j <= distortPoints; j++) {
      const ratio = j / (distortPoints + 1);
      const x = endX * ratio;
      const y = endY * ratio;
      
      // Orthogonal distortion
      const perpAngle = angle + p.HALF_PI;
      const distortAmount = size * 0.02 * p.sin(time * 3 + i + j);
      const distortX = x + p.cos(perpAngle) * distortAmount;
      const distortY = y + p.sin(perpAngle) * distortAmount;
      
      // Draw distortion point
      if (j % 2 === 0) {
        if (isPixelated) {
          p.rect(distortX - pixelSize/2, distortY - pixelSize/2, pixelSize, pixelSize);
        } else {
          p.point(distortX, distortY);
        }
      }
    }
  }
}
