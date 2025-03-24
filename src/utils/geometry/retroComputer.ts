
import { GeometrySettings } from './types';
import { drawPixelatedCircle, drawPixelatedLine } from './coreUtils';

// Draw RetroComputer geometry
export const drawRetroComputer = (p5: any, x: number, y: number, size: number, settings: GeometrySettings) => {
  const { rotation, pixelSize, color } = settings;
  
  p5.push();
  p5.translate(x, y);
  p5.rotate(rotation);
  
  // Draw vector lines for an 80s computer grid
  const gridSize = size * 0.8;
  const cellCount = 8;
  const cellSize = gridSize / cellCount;
  
  p5.stroke(color);
  p5.strokeWeight(pixelSize);
  p5.noFill();
  
  // Horizontal lines
  for (let i = 0; i <= cellCount; i++) {
    const yPos = -gridSize/2 + i * cellSize;
    drawPixelatedLine(p5, -gridSize/2, yPos, gridSize/2, yPos, pixelSize, color);
  }
  
  // Vertical lines
  for (let i = 0; i <= cellCount; i++) {
    const xPos = -gridSize/2 + i * cellSize;
    drawPixelatedLine(p5, xPos, -gridSize/2, xPos, gridSize/2, pixelSize, color);
  }
  
  // Draw perspective lines from center
  const centerX = 0;
  const centerY = 0;
  
  // Corner points
  const corners = [
    {x: -gridSize/2, y: -gridSize/2}, // top-left
    {x: gridSize/2, y: -gridSize/2},  // top-right
    {x: gridSize/2, y: gridSize/2},   // bottom-right
    {x: -gridSize/2, y: gridSize/2}   // bottom-left
  ];
  
  // Connect center to corners
  for (const corner of corners) {
    drawPixelatedLine(p5, centerX, centerY, corner.x, corner.y, pixelSize, color);
  }
  
  // Draw additional points at line intersections
  const pointSize = pixelSize * 2;
  
  for (let i = 1; i < cellCount; i++) {
    for (let j = 1; j < cellCount; j++) {
      const px = -gridSize/2 + j * cellSize;
      const py = -gridSize/2 + i * cellSize;
      
      // Every other point will be highlighted
      if ((i + j) % 2 === 0) {
        drawPixelatedCircle(p5, px, py, pointSize, pixelSize, color);
      }
    }
  }
  
  p5.pop();
};
