
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
  
  // Draw connections between nodes with sine wave distortion
  p.stroke(255, 120);
  p.strokeWeight(pixelSize);
  
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      // Only connect some nodes for aesthetic effect
      if ((i + j) % 3 === 0 || i * j % 5 === 0) {
        // Draw sinusoidal connection between nodes
        if (isPixelated) {
          drawWavyConnection(p, nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y, time, i+j, pixelSize);
        } else {
          drawWavyConnection(p, nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y, time, i+j, pixelSize);
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

// Helper function to draw wavy connections between nodes
function drawWavyConnection(p, x1, y1, x2, y2, time, seed, pixelSize) {
  // Calculate angle and distance between points
  const angle = p.atan2(y2 - y1, x2 - x1);
  const dist = p.dist(x1, y1, x2, y2);
  
  // Determine number of segments based on distance
  const segments = Math.max(5, Math.min(20, Math.floor(dist / 15)));
  
  // Wave parameters
  const waveFrequency = 0.2 + (seed % 5) * 0.05;
  const waveAmplitude = 5 + (seed % 3) * 2;
  const wavePhase = time * 0.5 + seed * 0.2;
  
  // Generate points along wavy path
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    
    // Linear interpolation for base position
    const x = p.lerp(x1, x2, t);
    const y = p.lerp(y1, y2, t);
    
    // Calculate perpendicular direction for wave offset
    const perpX = -Math.sin(angle);
    const perpY = Math.cos(angle);
    
    // Apply sine wave offset perpendicular to line
    const wave = Math.sin(t * Math.PI * waveFrequency * segments + wavePhase) * waveAmplitude;
    const offsetX = perpX * wave;
    const offsetY = perpY * wave;
    
    points.push({
      x: x + offsetX,
      y: y + offsetY
    });
  }
  
  // Draw the wavy line
  for (let i = 0; i < points.length - 1; i++) {
    if (pixelSize > 1) {
      drawPixelatedLine(p, points[i].x, points[i].y, points[i+1].x, points[i+1].y, pixelSize);
    } else {
      p.line(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
    }
  }
}
