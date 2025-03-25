
import { drawPixelatedLine } from '../helpers';

// Draw connections between quantum particles
export function drawParticleConnections(
  p: any,
  particles: Array<{x: number, y: number, i: number}>,
  pixelSize: number,
  isPixelated: boolean
) {
  p.stroke(255, 50);
  
  for (let i = 0; i < particles.length; i++) {
    // Only connect some particles for aesthetic effect
    if (i % 5 === 0) {
      const j = (i + 20) % particles.length;
      const particle1 = particles[i];
      const particle2 = particles[j];
      
      if (isPixelated) {
        drawPixelatedLine(p, particle1.x, particle1.y, particle2.x, particle2.y, pixelSize);
      } else {
        p.line(particle1.x, particle1.y, particle2.x, particle2.y);
      }
    }
  }
}
