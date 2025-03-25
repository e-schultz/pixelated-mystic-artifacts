
// Draw receding squares for corridor depth effect
export function drawCorridorStructure(
  p: any, 
  size: number, 
  corridorDepth: number, 
  time: number, 
  pixelSize: number, 
  isPixelated: boolean
) {
  p.stroke(255, 200);
  p.strokeWeight(pixelSize);
  p.noFill();
  
  // Draw receding squares
  for (let i = 0; i < corridorDepth; i++) {
    const scale = 1 - (i / corridorDepth * 0.8);
    const squareSize = size * scale;
    
    if (isPixelated) {
      drawPixelatedRect(p, 0, 0, squareSize, squareSize, pixelSize);
    } else {
      p.rect(-squareSize/2, -squareSize/2, squareSize, squareSize);
    }
    
    // Connect corners on alternating frames for depth effect
    if (i > 0 && i % 2 === 0) {
      const prevScale = 1 - ((i-1) / corridorDepth * 0.8);
      const prevSize = size * prevScale;
      
      // Connect corners between frames
      for (let corner = 0; corner < 4; corner++) {
        const angle = corner * p.PI/2;
        const currX = p.cos(angle) * squareSize/2;
        const currY = p.sin(angle) * squareSize/2;
        const prevX = p.cos(angle) * prevSize/2;
        const prevY = p.sin(angle) * prevSize/2;
        
        if (isPixelated) {
          drawPixelatedLine(p, currX, currY, prevX, prevY, pixelSize);
        } else {
          p.line(currX, currY, prevX, prevY);
        }
      }
    }
  }
}

// Helper functions
import { 
  drawPixelatedRect, 
  drawPixelatedLine 
} from '../helpers';
