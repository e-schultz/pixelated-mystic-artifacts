
// Neural Lattice pattern implementation
import { RenderOptions } from "../patternTypes";
import { drawPixelatedLine, drawCustomCircle } from './commonGeometry';

// Pattern 1: Neural Lattice
export function drawNeuralLattice(
  p: any, 
  centerX: number, 
  centerY: number, 
  size: number, 
  time: number,
  isPixelated: boolean
) {
  p.push();
  p.translate(centerX, centerY);
  p.rotate(time * 0.05);
  
  const nodeCount = 12;
  const radius = size * 0.4;
  const pixelSize = isPixelated ? 2 : 1;
  
  // Generate nodes
  const nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    const angle = i * p.TWO_PI / nodeCount;
    const x = p.cos(angle) * radius;
    const y = p.sin(angle) * radius;
    const pulseSize = (p.sin(time * 2 + i * 0.5) + 1) * 0.5 * 8 + 4;
    
    nodes.push({ x, y, pulseSize });
  }
  
  // Draw connections between nodes
  p.stroke(255, 120);
  p.strokeWeight(pixelSize);
  
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      // Only connect some nodes for aesthetic effect
      if ((i + j) % 3 === 0 || i * j % 5 === 0) {
        if (isPixelated) {
          drawPixelatedLine(p, nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y, pixelSize);
        } else {
          p.line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
        }
      }
    }
  }
  
  // Draw nodes
  p.fill(255);
  p.noStroke();
  
  nodes.forEach(node => {
    drawCustomCircle(
      p, 
      node.x, 
      node.y, 
      node.pulseSize / 2, 
      isPixelated, 
      pixelSize, 
      [255, 255], 
      [255, 255]
    );
  });
  
  p.pop();
}
