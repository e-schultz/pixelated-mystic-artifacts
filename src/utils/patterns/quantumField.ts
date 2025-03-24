
// Quantum Field pattern implementation
import { RenderOptions } from "../patternTypes";
import { drawPixelatedCircle, drawPixelatedLine } from './helpers';

// Pattern 4: Quantum Field
export function drawQuantumField(
  p: any, 
  centerX: number, 
  centerY: number, 
  size: number, 
  time: number,
  isPixelated: boolean
) {
  p.push();
  p.translate(centerX, centerY);
  
  const pixelSize = isPixelated ? 2 : 1;
  const fieldSize = size * 0.8;
  const particleCount = 100;
  
  p.noFill();
  p.stroke(255, 100);
  p.strokeWeight(pixelSize);
  
  // Draw particles
  for (let i = 0; i < particleCount; i++) {
    const angle = i * p.TWO_PI / particleCount + time;
    const radiusVariation = p.noise(i * 0.1, time * 0.2) * fieldSize * 0.4;
    const radius = fieldSize * 0.2 + radiusVariation;
    
    const x = p.cos(angle) * radius;
    const y = p.sin(angle) * radius;
    
    const particleSize = p.noise(i, time) * 6 + 2;
    
    p.fill(255, p.noise(i, time * 0.5) * 200 + 55);
    
    if (isPixelated) {
      drawPixelatedCircle(p, x, y, particleSize, pixelSize);
    } else {
      p.circle(x, y, particleSize * 2);
    }
    
    // Draw connections between some particles
    if (i % 5 === 0) {
      const j = (i + 20) % particleCount;
      const angle2 = j * p.TWO_PI / particleCount + time;
      const radius2 = fieldSize * 0.2 + p.noise(j * 0.1, time * 0.2) * fieldSize * 0.4;
      
      const x2 = p.cos(angle2) * radius2;
      const y2 = p.sin(angle2) * radius2;
      
      p.stroke(255, 50);
      
      if (isPixelated) {
        drawPixelatedLine(p, x, y, x2, y2, pixelSize);
      } else {
        p.line(x, y, x2, y2);
      }
    }
  }
  
  p.pop();
}
