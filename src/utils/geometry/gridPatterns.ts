
import { GeometrySettings } from './types';
import { drawPixelatedLine } from './coreUtils';

// Drawing a geometric grid
export const drawGeometricGrid = (p5: any, x: number, y: number, size: number, settings: GeometrySettings) => {
  const { rotation, pixelSize, color, segments } = settings;
  
  p5.push();
  p5.translate(x, y);
  p5.rotate(rotation);
  
  const gridSize = Math.floor(size / (pixelSize * 3));
  const spacing = size / gridSize;
  
  // Draw grid lines
  p5.noFill();
  p5.stroke(color);
  p5.strokeWeight(pixelSize);
  
  // Vertical and horizontal lines
  for (let i = -gridSize/2; i <= gridSize/2; i++) {
    const linePos = i * spacing;
    
    // Horizontal line with pixel effect
    if (i % 3 === 0) {
      drawPixelatedLine(p5, -size/2, linePos, size/2, linePos, pixelSize, color);
    }
    
    // Vertical line with pixel effect
    if (i % 4 === 0) {
      drawPixelatedLine(p5, linePos, -size/2, linePos, size/2, pixelSize, color);
    }
  }
  
  // Draw diagonal lines
  if (segments > 4) {
    for (let i = -gridSize/2; i <= gridSize/2; i += 2) {
      const linePos = i * spacing;
      drawPixelatedLine(p5, -size/2, linePos, linePos, size/2, pixelSize, color);
      drawPixelatedLine(p5, linePos, -size/2, size/2, linePos, pixelSize, color);
    }
  }
  
  p5.pop();
};
