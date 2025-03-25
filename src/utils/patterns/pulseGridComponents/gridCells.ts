
import { drawPixelatedRect, drawPixelatedLine } from '../helpers';

// Draw grid cells with pulse effect
export function drawGridCells(
  p: any, 
  gridSize: number, 
  cellCount: number, 
  time: number, 
  pixelSize: number, 
  isPixelated: boolean
) {
  const cellSize = gridSize / cellCount;
  
  p.stroke(255, 160);
  p.strokeWeight(pixelSize);
  p.noFill();
  
  // Draw grid
  for (let x = -cellCount/2; x <= cellCount/2; x++) {
    for (let y = -cellCount/2; y <= cellCount/2; y++) {
      const posX = x * cellSize;
      const posY = y * cellSize;
      
      // Pulse effect based on distance from center
      const dist = p.sqrt(x*x + y*y);
      const pulse = p.sin(time * 2 - dist * 0.5) * 0.5 + 0.5;
      const cellPulseSize = cellSize * (0.5 + pulse * 0.5);
      
      if (isPixelated) {
        drawPixelatedRect(p, posX, posY, cellPulseSize, cellPulseSize, pixelSize);
      } else {
        p.rect(posX - cellPulseSize/2, posY - cellPulseSize/2, cellPulseSize, cellPulseSize);
      }
      
      // Draw cell connections
      if (x < cellCount/2 && y < cellCount/2) {
        if (isPixelated) {
          drawPixelatedLine(p, posX, posY, posX + cellSize, posY, pixelSize);
          drawPixelatedLine(p, posX, posY, posX, posY + cellSize, pixelSize);
        } else {
          p.line(posX, posY, posX + cellSize, posY);
          p.line(posX, posY, posX, posY + cellSize);
        }
      }
    }
  }
}
