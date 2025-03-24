
// Tesseract Matrix pattern implementation
import { RenderOptions } from "../patternTypes";
import { drawPixelatedLine, drawPixelatedCircle } from './helpers';

// Pattern 2: Tesseract Matrix
export function drawTesseractMatrix(
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
  p.stroke(255, 180);
  p.strokeWeight(pixelSize);
  p.noFill();
  
  // Create proper 3D-to-2D projection
  const scale = size * 0.35;
  const innerScale = scale * 0.6;
  
  // Animation parameters
  const rotationX = time * 0.2;
  const rotationY = time * 0.15;
  const rotationZ = time * 0.1;
  
  // Draw the outer cube first
  drawRotatedCube(p, 0, 0, 0, scale, rotationX, rotationY, rotationZ, pixelSize, isPixelated);
  
  // Draw the inner cube with different rotation
  drawRotatedCube(p, 0, 0, 0, innerScale, rotationX * 1.5, rotationY * 1.2, rotationZ * 0.8, pixelSize, isPixelated);
  
  // Connect vertices between inner and outer cubes to create the tesseract effect
  connectTesseractVertices(p, scale, innerScale, rotationX, rotationY, rotationZ, pixelSize, isPixelated);
  
  p.pop();
}

// Helper function to draw a 3D cube with proper rotation and projection
function drawRotatedCube(
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

// Helper to connect tesseract vertices between inner and outer cubes
function connectTesseractVertices(
  p: any, 
  outerSize: number, 
  innerSize: number, 
  rotX: number, 
  rotY: number, 
  rotZ: number, 
  pixelSize: number,
  isPixelated: boolean
) {
  const outerHalf = outerSize / 2;
  const innerHalf = innerSize / 2;
  
  // Create 4D-like connections by connecting specific vertices
  // between the inner and outer cubes
  const outerVertices = [
    [-outerHalf, -outerHalf, -outerHalf], // 0
    [outerHalf, -outerHalf, -outerHalf],  // 1 
    [outerHalf, outerHalf, -outerHalf],   // 2
    [-outerHalf, outerHalf, -outerHalf],  // 3
  ];
  
  const innerVertices = [
    [-innerHalf, -innerHalf, innerHalf],  // 4
    [innerHalf, -innerHalf, innerHalf],   // 5
    [innerHalf, innerHalf, innerHalf],    // 6
    [-innerHalf, innerHalf, innerHalf]    // 7
  ];
  
  // Apply same rotations and projection to both sets of vertices
  const projectVertex = (v: number[]) => {
    let [vx, vy, vz] = v;
    
    // Apply rotations (same as in drawRotatedCube)
    const y1 = vy * Math.cos(rotX) - vz * Math.sin(rotX);
    const z1 = vy * Math.sin(rotX) + vz * Math.cos(rotX);
    
    const x2 = vx * Math.cos(rotY) + z1 * Math.sin(rotY);
    const z2 = -vx * Math.sin(rotY) + z1 * Math.cos(rotY);
    
    const x3 = x2 * Math.cos(rotZ) - y1 * Math.sin(rotZ);
    const y3 = x2 * Math.sin(rotZ) + y1 * Math.cos(rotZ);
    
    // Perspective projection
    const zDepth = 1200;
    const scale = zDepth / (zDepth + z2);
    
    return [x3 * scale, y3 * scale];
  };
  
  const projectedOuter = outerVertices.map(projectVertex);
  const projectedInner = innerVertices.map(projectVertex);
  
  // Draw connections with varying opacity based on rotation
  p.stroke(255, 70 + Math.sin(rotX * 2) * 30);
  p.strokeWeight(pixelSize);
  
  // Connect corresponding vertices
  for (let i = 0; i < 4; i++) {
    const [x1, y1] = projectedOuter[i];
    const [x2, y2] = projectedInner[i];
    
    if (isPixelated) {
      drawPixelatedLine(p, x1, y1, x2, y2, pixelSize);
    } else {
      p.line(x1, y1, x2, y2);
    }
    
    // Add some diagonal connections for more complex visual
    if (i % 2 === 0) {
      const nextI = (i + 1) % 4;
      const [x3, y3] = projectedInner[nextI];
      
      if (isPixelated) {
        drawPixelatedLine(p, x1, y1, x3, y3, pixelSize);
      } else {
        p.line(x1, y1, x3, y3);
      }
    }
  }
  
  // Draw a pulsing center point for added effect
  const pulseSize = (Math.sin(rotX * 3) + 1) * 2 + 2;
  p.fill(255, 220);
  p.noStroke();
  
  if (isPixelated) {
    drawPixelatedCircle(p, 0, 0, pulseSize, pixelSize);
  } else {
    p.circle(0, 0, pulseSize * 2);
  }
}
