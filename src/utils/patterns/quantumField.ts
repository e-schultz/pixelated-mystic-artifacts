
// Quantum Field pattern implementation
import { RenderOptions } from "../patternTypes";
import { drawQuantumParticles } from './quantumFieldComponents/particles';
import { drawParticleConnections } from './quantumFieldComponents/connections';

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
  
  // Draw particles and get their positions
  const particles = drawQuantumParticles(p, particleCount, fieldSize, time, pixelSize, isPixelated);
  
  // Draw connections between particles
  drawParticleConnections(p, particles, pixelSize, isPixelated);
  
  p.pop();
}
