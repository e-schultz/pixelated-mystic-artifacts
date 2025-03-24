
// Digital Corridor pattern implementation
import { RenderOptions } from "../patternTypes";

// Pattern 0: Digital Corridor
export function drawDigitalCorridor(
  p: any, 
  centerX: number, 
  centerY: number, 
  size: number, 
  time: number,
  isPixelated: boolean
) {
  p.push();
  p.translate(centerX, centerY);
  p.rotate(time * 0.1);
  
  const corridorDepth = 12;
  const pixelSize = isPixelated ? 2 : 1;
  
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
  
  // Draw central point
  p.fill(255);
  p.noStroke();
  if (isPixelated) {
    drawPixelatedCircle(p, 0, 0, size * 0.02, pixelSize);
  } else {
    p.circle(0, 0, size * 0.04);
  }
  
  p.pop();
}

// Helper functions
import { 
  drawPixelatedRect, 
  drawPixelatedLine, 
  drawPixelatedCircle 
} from './helpers';
