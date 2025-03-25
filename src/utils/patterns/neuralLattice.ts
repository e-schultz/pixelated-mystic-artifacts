
// Neural Lattice pattern implementation
import { RenderOptions } from "../patternTypes";
import { generateNodes } from './neuralLatticeComponents/nodeGenerator';
import { drawWavyConnection } from './neuralLatticeComponents/waveConnections';
import { drawNodes } from './neuralLatticeComponents/nodeRenderer';

// Pattern 1: Neural Lattice
export function drawNeuralLattice(
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
  
  p.rotate(time * 0.05 * parameters.rotationSpeed);
  
  const nodeCount = 12;
  const radius = size * 0.4;
  const pixelSize = isPixelated ? 2 * (0.5 + parameters.lineThickness) : 1 * (0.5 + parameters.lineThickness);
  
  // Generate nodes
  const nodes = generateNodes(p, nodeCount, radius, time);
  
  // Draw connections between nodes with sine wave distortion
  p.stroke(255, 120);
  p.strokeWeight(pixelSize);
  
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      // Only connect some nodes for aesthetic effect
      if ((i + j) % 3 === 0 || i * j % 5 === 0) {
        // Draw sinusoidal connection between nodes
        drawWavyConnection(
          p, 
          nodes[i].x, nodes[i].y, 
          nodes[j].x, nodes[j].y, 
          time, i+j, pixelSize
        );
      }
    }
  }
  
  // Draw nodes
  drawNodes(p, nodes, isPixelated, pixelSize);
  
  p.pop();
}
