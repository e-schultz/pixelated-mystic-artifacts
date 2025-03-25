
// Draw floating cubes around the shrine
export function drawFloatingCubes(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean, useColor: boolean) {
  const cubeCount = 12;
  
  for (let i = 0; i < cubeCount; i++) {
    // Position cubes in a circle around the shrine
    const angle = i * p.TWO_PI / cubeCount + time * 0.1;
    const distance = size * (0.5 + 0.1 * p.sin(time + i));
    const x = p.cos(angle) * distance;
    const y = p.sin(angle) * distance;
    
    // Vertically float based on time
    const z = p.sin(time * 0.5 + i * 0.7) * size * 0.1;
    
    // Cube size
    const cubeSize = size * 0.04 * (0.8 + 0.2 * p.sin(time + i * 2));
    
    // Determine color
    if (useColor) {
      // Alternate between magenta and cyan
      if (i % 3 === 0) {
        p.stroke(320, 100, 70, 200); // Magenta
      } else if (i % 3 === 1) {
        p.stroke(180, 100, 70, 200); // Cyan
      } else {
        p.stroke(260, 100, 70, 200); // Purple
      }
    } else {
      p.stroke(255, 150);
    }
    
    p.noFill();
    p.strokeWeight(pixelSize);
    
    // Draw cube at position
    p.push();
    p.translate(x, y + z);
    p.rotateX(time * 0.2 + i);
    p.rotateY(time * 0.3 + i * 0.5);
    
    drawCube(p, cubeSize, isPixelated, pixelSize);
    
    p.pop();
  }
}

// Helper function to draw a 3D cube in 2D
function drawCube(p: any, size: number, isPixelated: boolean, pixelSize: number) {
  const s = size / 2;
  
  // Define cube vertices
  const vertices = [
    {x: -s, y: -s, z: -s},
    {x: s, y: -s, z: -s},
    {x: s, y: s, z: -s},
    {x: -s, y: s, z: -s},
    {x: -s, y: -s, z: s},
    {x: s, y: -s, z: s},
    {x: s, y: s, z: s},
    {x: -s, y: s, z: s}
  ];
  
  // Define cube edges
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0], // Bottom face
    [4, 5], [5, 6], [6, 7], [7, 4], // Top face
    [0, 4], [1, 5], [2, 6], [3, 7]  // Connecting edges
  ];
  
  // Draw each edge
  for (const [a, b] of edges) {
    if (isPixelated) {
      drawPixelatedLine(
        p, 
        vertices[a].x, vertices[a].y, 
        vertices[b].x, vertices[b].y, 
        pixelSize
      );
    } else {
      p.line(
        vertices[a].x, vertices[a].y, 
        vertices[b].x, vertices[b].y
      );
    }
  }
}

// Helper function to draw a pixelated line
function drawPixelatedLine(p: any, x1: number, y1: number, x2: number, y2: number, pixelSize: number) {
  const d = p.dist(x1, y1, x2, y2);
  const steps = Math.max(1, Math.floor(d / pixelSize));
  
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = p.lerp(x1, x2, t);
    const y = p.lerp(y1, y2, t);
    p.rect(x, y, pixelSize, pixelSize);
  }
}
