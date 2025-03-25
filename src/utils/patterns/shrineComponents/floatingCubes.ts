
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
    
    // Draw cube at position - using 2D rotation instead of 3D
    p.push();
    p.translate(x, y + z);
    
    // Use 2D rotation instead of 3D rotation to avoid WebGL requirement
    const rotation = time * 0.2 + i;
    
    // Draw a 2D representation of a cube that simulates rotation
    draw2DCube(p, cubeSize, rotation, isPixelated, pixelSize);
    
    p.pop();
  }
}

// Helper function to draw a 2D cube representation that simulates rotation
function draw2DCube(p: any, size: number, rotation: number, isPixelated: boolean, pixelSize: number) {
  const s = size / 2;
  
  // Create a 2D representation of a cube
  // Use sin/cos for rotation simulation
  const rotX = Math.cos(rotation);
  const rotY = Math.sin(rotation);
  
  // Define cube points in 2D
  const points = [
    {x: -s, y: -s}, // top-left front
    {x: s, y: -s},  // top-right front
    {x: s, y: s},   // bottom-right front
    {x: -s, y: s},  // bottom-left front
  ];
  
  // Add "depth" effect with offset points (simulating a cube back face)
  const depthOffset = s * 0.6 * rotY;
  const backPoints = points.map(pt => ({
    x: pt.x + depthOffset * rotX,
    y: pt.y + depthOffset * rotY
  }));
  
  // Draw front face
  for (let i = 0; i < 4; i++) {
    const next = (i + 1) % 4;
    if (isPixelated) {
      drawPixelatedLine(p, points[i].x, points[i].y, points[next].x, points[next].y, pixelSize);
    } else {
      p.line(points[i].x, points[i].y, points[next].x, points[next].y);
    }
  }
  
  // Draw back face
  for (let i = 0; i < 4; i++) {
    const next = (i + 1) % 4;
    if (isPixelated) {
      drawPixelatedLine(p, backPoints[i].x, backPoints[i].y, backPoints[next].x, backPoints[next].y, pixelSize);
    } else {
      p.line(backPoints[i].x, backPoints[i].y, backPoints[next].x, backPoints[next].y);
    }
  }
  
  // Draw connecting lines between front and back
  for (let i = 0; i < 4; i++) {
    if (isPixelated) {
      drawPixelatedLine(p, points[i].x, points[i].y, backPoints[i].x, backPoints[i].y, pixelSize);
    } else {
      p.line(points[i].x, points[i].y, backPoints[i].x, backPoints[i].y);
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
