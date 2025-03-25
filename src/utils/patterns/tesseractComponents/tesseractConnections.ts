
import { drawPixelatedLine, drawPixelatedCircle } from '../helpers';

// Helper to connect tesseract vertices between inner and outer cubes
export function connectTesseractVertices(
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
