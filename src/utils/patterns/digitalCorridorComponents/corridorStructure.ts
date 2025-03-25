
// Draw the main corridor structure
export function drawCorridorStructure(
  p: any, 
  size: number, 
  corridorDepth: number, 
  time: number, 
  pixelSize: number, 
  isPixelated: boolean, 
  parameters: any
) {
  // Calculate grid parameters
  const gridSize = size * 0.7;
  const halfGrid = gridSize / 2;
  
  p.stroke(255, 180);
  p.strokeWeight(pixelSize);
  
  // Draw corridor layers with depth
  for (let i = 0; i < corridorDepth; i++) {
    p.push();
    
    // Scale diminishes with depth to create perspective
    const depthScaling = 1 - (i / corridorDepth) * 0.8;
    p.scale(depthScaling);
    
    // Rotation per layer
    p.rotate(time * 0.1 * (i % 2 === 0 ? 1 : -1));
    
    // Draw corridor frame
    const cornerSize = pixelSize * 3;
    
    // Calculate coordinates for the grid
    const xMin = -halfGrid;
    const xMax = halfGrid;
    const yMin = -halfGrid;
    const yMax = halfGrid;
    
    // Draw each corner with appropriate connecting lines
    // Top-left corner
    if (isPixelated) {
      // Draw pixelated corner
      for (let x = xMin; x < xMin + cornerSize; x += pixelSize) {
        for (let y = yMin; y < yMin + cornerSize; y += pixelSize) {
          p.rect(x, y, pixelSize, pixelSize);
        }
      }
    } else {
      // Draw smooth corner
      p.line(xMin, yMin, xMin + cornerSize, yMin);
      p.line(xMin, yMin, xMin, yMin + cornerSize);
    }
    
    // Top-right corner
    if (isPixelated) {
      for (let x = xMax - cornerSize; x < xMax; x += pixelSize) {
        for (let y = yMin; y < yMin + cornerSize; y += pixelSize) {
          p.rect(x, y, pixelSize, pixelSize);
        }
      }
    } else {
      p.line(xMax, yMin, xMax - cornerSize, yMin);
      p.line(xMax, yMin, xMax, yMin + cornerSize);
    }
    
    // Bottom-left corner
    if (isPixelated) {
      for (let x = xMin; x < xMin + cornerSize; x += pixelSize) {
        for (let y = yMax - cornerSize; y < yMax; y += pixelSize) {
          p.rect(x, y, pixelSize, pixelSize);
        }
      }
    } else {
      p.line(xMin, yMax, xMin + cornerSize, yMax);
      p.line(xMin, yMax, xMin, yMax - cornerSize);
    }
    
    // Bottom-right corner
    if (isPixelated) {
      for (let x = xMax - cornerSize; x < xMax; x += pixelSize) {
        for (let y = yMax - cornerSize; y < yMax; y += pixelSize) {
          p.rect(x, y, pixelSize, pixelSize);
        }
      }
    } else {
      p.line(xMax, yMax, xMax - cornerSize, yMax);
      p.line(xMax, yMax, xMax, yMax - cornerSize);
    }
    
    p.pop();
  }
}
