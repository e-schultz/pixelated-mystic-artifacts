
import { GeometrySettings } from './types';
import { drawPixelatedCircle, drawPixelatedLine, drawPixelatedTriangle } from './coreUtils';

// Draw a sacred metatron cube
export const drawMetatronCube = (p5: any, x: number, y: number, size: number, settings: GeometrySettings) => {
  const { rotation, pixelSize, color } = settings;
  
  p5.push();
  p5.translate(x, y);
  p5.rotate(rotation);
  
  // Draw outer circle
  drawPixelatedCircle(p5, 0, 0, size, pixelSize, color);
  
  // Inner structure
  p5.noFill();
  p5.stroke(color);
  p5.strokeWeight(pixelSize);
  
  // Draw inner hexagon
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = i * p5.TWO_PI / 6;
    const px = size * 0.7 * p5.cos(angle);
    const py = size * 0.7 * p5.sin(angle);
    points.push({ x: px, y: py });
    
    // Draw circles at vertices
    drawPixelatedCircle(p5, px, py, size * 0.15, pixelSize, color);
  }
  
  // Connect points with pixelated lines
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      drawPixelatedLine(p5, points[i].x, points[i].y, points[j].x, points[j].y, pixelSize, color);
    }
  }
  
  p5.pop();
};

// Draw a flower of life pattern
export const drawFlowerOfLife = (p5: any, x: number, y: number, size: number, settings: GeometrySettings) => {
  const { segments, rotation, pixelSize, color } = settings;
  const radius = size / 4;
  
  p5.push();
  p5.translate(x, y);
  p5.rotate(rotation);
  
  // Center circle
  drawPixelatedCircle(p5, 0, 0, radius, pixelSize, color);
  
  // First ring of circles
  for (let i = 0; i < 6; i++) {
    const angle = i * p5.TWO_PI / 6;
    const px = radius * 2 * p5.cos(angle);
    const py = radius * 2 * p5.sin(angle);
    drawPixelatedCircle(p5, px, py, radius, pixelSize, color);
  }
  
  // Second ring of circles (optional for more complexity)
  if (segments > 6) {
    for (let i = 0; i < 12; i++) {
      const angle = i * p5.TWO_PI / 12 + p5.PI / 12;
      const px = radius * 4 * p5.cos(angle);
      const py = radius * 4 * p5.sin(angle);
      drawPixelatedCircle(p5, px, py, radius, pixelSize, color);
    }
  }
  
  p5.pop();
};

// Draw a Sri Yantra
export const drawSriYantra = (p5: any, x: number, y: number, size: number, settings: GeometrySettings) => {
  const { rotation, pixelSize, color } = settings;
  
  p5.push();
  p5.translate(x, y);
  p5.rotate(rotation);
  
  // Outer circle
  drawPixelatedCircle(p5, 0, 0, size, pixelSize, color);
  
  // Draw triangles
  const layers = 4;
  for (let i = 0; i < layers; i++) {
    const scale = 1 - i * 0.2;
    
    // Upward triangle
    drawPixelatedTriangle(
      p5,
      0, -size * scale * 0.8, 
      -size * scale * 0.7, size * scale * 0.4, 
      size * scale * 0.7, size * scale * 0.4,
      pixelSize, color
    );
    
    // Downward triangle (slightly smaller)
    if (i < layers - 1) {
      drawPixelatedTriangle(
        p5,
        0, size * scale * 0.7, 
        -size * scale * 0.6, -size * scale * 0.3, 
        size * scale * 0.6, -size * scale * 0.3,
        pixelSize, color
      );
    }
  }
  
  // Center dot (bindu)
  drawPixelatedCircle(p5, 0, 0, size * 0.05, pixelSize, color);
  
  p5.pop();
};
