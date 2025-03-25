
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
  
  // Apply rotation based on rotationSpeed parameter
  p.rotate(time * 0.03 * parameters.rotationSpeed);
  
  // Apply line thickness parameter
  const pixelSize = isPixelated ? 2 * (0.5 + parameters.lineThickness) : 1 * (0.5 + parameters.lineThickness);
  
  // Apply complexity to field size and particle count
  const fieldSize = size * 0.8 * (0.7 + parameters.complexity * 0.6); // Scale by complexity
  const particleCount = Math.floor(50 + parameters.complexity * 100); // 50-150 particles based on complexity
  
  // Draw particles and get their positions with adjusted color intensity
  const particles = drawQuantumParticles(p, particleCount, fieldSize, time, pixelSize, isPixelated);
  
  // Draw connections between particles
  drawParticleConnections(p, particles, pixelSize, isPixelated);
  
  p.pop();
}
