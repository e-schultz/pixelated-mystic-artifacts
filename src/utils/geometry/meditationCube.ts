
import { GeometrySettings } from './types';
import { drawPixelatedCircle, drawPixelatedLine } from './coreUtils';

// Draw a Metatron's Cube 
export const drawMeditationCube = (p5: any, x: number, y: number, size: number, settings: GeometrySettings) => {
  const { rotation, pixelSize, color } = settings;
  
  p5.push();
  p5.translate(x, y);
  p5.rotate(rotation);
  
  // Center point
  drawPixelatedCircle(p5, 0, 0, size * 0.05, pixelSize, color);
  
  // Outer circle
  drawPixelatedCircle(p5, 0, 0, size, pixelSize, color);
  
  // Star pattern
  const points = [];
  const numPoints = 12;
  
  for (let i = 0; i < numPoints; i++) {
    const angle = i * p5.TWO_PI / numPoints;
    const innerRadius = (i % 2 === 0) ? size * 0.4 : size * 0.8;
    
    const px = innerRadius * p5.cos(angle);
    const py = innerRadius * p5.sin(angle);
    
    points.push({ x: px, y: py });
    
    // Draw small circles at points
    if (i % 3 === 0) {
      drawPixelatedCircle(p5, px, py, size * 0.1, pixelSize, color);
    }
  }
  
  // Connect all points
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      if ((i + j) % 3 === 0 || (i * j) % 4 === 0) {
        drawPixelatedLine(
          p5, 
          points[i].x, points[i].y, 
          points[j].x, points[j].y, 
          pixelSize, color
        );
      }
    }
  }
  
  p5.pop();
};
