
import { drawPixelatedLine } from '../helpers';

// Helper function to draw a 3D cube with proper rotation and projection
export function drawRotatedCube(
  p: any, 
  x: number, 
  y: number, 
  z: number, 
  size: number, 
  rotX: number, 
  rotY: number, 
  rotZ: number, 
  pixelSize: number,
  isPixelated: boolean
) {
  // Cube vertices in 3D space (centered at origin)
  const halfSize = size / 2;
  const vertices = [
    [-halfSize, -halfSize, -halfSize], // 0: left-bottom-back
    [halfSize, -halfSize, -halfSize],  // 1: right-bottom-back
    [halfSize, halfSize, -halfSize],   // 2: right-top-back
    [-halfSize, halfSize, -halfSize],  // 3: left-top-back
    [-halfSize, -halfSize, halfSize],  // 4: left-bottom-front
    [halfSize, -halfSize, halfSize],   // 5: right-bottom-front
    [halfSize, halfSize, halfSize],    // 6: right-top-front
    [-halfSize, halfSize, halfSize]    // 7: left-top-front
  ];
  
  // Edges connecting vertices (each pair of indices forms an edge)
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0], // back face
    [4, 5], [5, 6], [6, 7], [7, 4], // front face
    [0, 4], [1, 5], [2, 6], [3, 7]  // connecting edges
  ];
  
  // Apply 3D rotations and project to 2D
  const projectedVertices = vertices.map(v => {
    let [vx, vy, vz] = v;
    
    // Apply rotations
    // Rotate around X-axis
    const y1 = vy * Math.cos(rotX) - vz * Math.sin(rotX);
    const z1 = vy * Math.sin(rotX) + vz * Math.cos(rotX);
    
    // Rotate around Y-axis
    const x2 = vx * Math.cos(rotY) + z1 * Math.sin(rotY);
    const z2 = -vx * Math.sin(rotY) + z1 * Math.cos(rotY);
    
    // Rotate around Z-axis
    const x3 = x2 * Math.cos(rotZ) - y1 * Math.sin(rotZ);
    const y3 = x2 * Math.sin(rotZ) + y1 * Math.cos(rotZ);
    
    // Simple perspective projection (just scale based on z-distance)
    const zDepth = 1200; // Controls perspective strength
    const scale = zDepth / (zDepth + z2);
    
    return [x3 * scale + x, y3 * scale + y];
  });
  
  // Draw the edges
  p.stroke(255, 180);
  p.strokeWeight(pixelSize);
  
  edges.forEach(([i, j]) => {
    const [x1, y1] = projectedVertices[i];
    const [x2, y2] = projectedVertices[j];
    
    if (isPixelated) {
      drawPixelatedLine(p, x1, y1, x2, y2, pixelSize);
    } else {
      p.line(x1, y1, x2, y2);
    }
  });
  
  // Draw subtle vertex points
  p.fill(255, 200);
  p.noStroke();
  
  projectedVertices.forEach(([x, y]) => {
    if (isPixelated) {
      p.rect(x, y, pixelSize, pixelSize);
    } else {
      p.circle(x, y, pixelSize * 1.5);
    }
  });
}
