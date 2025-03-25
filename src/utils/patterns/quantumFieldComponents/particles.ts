
import { drawPixelatedCircle } from '../helpers';

// Draw quantum particles
export function drawQuantumParticles(
  p: any, 
  particleCount: number, 
  fieldSize: number, 
  time: number, 
  pixelSize: number, 
  isPixelated: boolean
) {
  p.noFill();
  p.stroke(255, 100);
  p.strokeWeight(pixelSize);
  
  const particles = [];
  
  // Generate and draw particles
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
    
    particles.push({ x, y, i });
  }
  
  return particles;
}
