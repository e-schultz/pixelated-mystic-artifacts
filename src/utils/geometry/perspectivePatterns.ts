
import { GeometrySettings } from './types';
import { drawPixelatedCircle, drawPixelatedLine } from './coreUtils';

// Draw a Perspective Corridor
export const drawPerspectiveCorridor = (p5: any, x: number, y: number, size: number, settings: GeometrySettings) => {
  const { rotation, pixelSize, color } = settings;
  
  p5.push();
  p5.translate(x, y);
  p5.rotate(rotation);
  
  // Outer frame
  const depth = 10; // Number of corridor segments
  const shrinkFactor = 0.85;
  
  for (let i = 0; i < depth; i++) {
    const scale = Math.pow(shrinkFactor, i);
    const rectSize = size * scale;
    
    // Draw squares getting smaller into the distance
    p5.noFill();
    p5.stroke(color);
    p5.strokeWeight(pixelSize);
    
    // Draw square as four lines
    drawPixelatedLine(p5, -rectSize/2, -rectSize/2, rectSize/2, -rectSize/2, pixelSize, color);
    drawPixelatedLine(p5, rectSize/2, -rectSize/2, rectSize/2, rectSize/2, pixelSize, color);
    drawPixelatedLine(p5, rectSize/2, rectSize/2, -rectSize/2, rectSize/2, pixelSize, color);
    drawPixelatedLine(p5, -rectSize/2, rectSize/2, -rectSize/2, -rectSize/2, pixelSize, color);
    
    // Connect corners between frames (perspective lines)
    if (i > 0) {
      const prevScale = Math.pow(shrinkFactor, i-1);
      const prevSize = size * prevScale;
      
      // Connect corners between frames
      if (i % 2 === 0) {
        drawPixelatedLine(p5, -prevSize/2, -prevSize/2, -rectSize/2, -rectSize/2, pixelSize, color);
        drawPixelatedLine(p5, prevSize/2, -prevSize/2, rectSize/2, -rectSize/2, pixelSize, color);
        drawPixelatedLine(p5, prevSize/2, prevSize/2, rectSize/2, rectSize/2, pixelSize, color);
        drawPixelatedLine(p5, -prevSize/2, prevSize/2, -rectSize/2, rectSize/2, pixelSize, color);
      }
    }
  }
  
  p5.pop();
};
