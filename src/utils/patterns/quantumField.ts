
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
  isPixelated: boolean,
  options?: RenderOptions
) {
  p.push();
  p.translate(centerX, centerY);
  
  // Apply parameters if available
  const parameters = options?.parameters || {
    complexity: 0.5,
    rotationSpeed: 1.0,
    colorIntensity: 0.7,
    lineThickness: 0.5,
    trailPersistence: 0.5
  };
  
  const pixelSize = isPixelated ? 2 * (0.5 + parameters.lineThickness) : 1 * (0.5 + parameters.lineThickness);
  const fieldSize = size * 0.8;
  const particleCount = 100;
  
  // Draw particles and get their positions
  const particles = drawQuantumParticles(p, particleCount, fieldSize, time, pixelSize, isPixelated);
  
  // Draw connections between particles
  drawParticleConnections(p, particles, pixelSize, isPixelated);
  
  p.pop();
}
