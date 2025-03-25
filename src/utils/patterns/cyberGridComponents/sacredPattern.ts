
import { drawPixelatedCircle, drawPixelatedLine } from '../helpers';

// Draw a sacred geometry inspired pattern
export function drawSacredPattern(
  p: any, 
  size: number, 
  time: number, 
  pixelSize: number, 
  isPixelated: boolean, 
  useColor: boolean
) {
  const patternSize = size * 0.4;
  const elements = 8;
  
  // Create the primary sacred geometry pattern
  p.push();
  p.rotate(time * 0.1);
  
  // Draw interconnected sacred geometry elements
  for (let i = 0; i < elements; i++) {
    const angle = i * p.TWO_PI / elements;
    const dist = patternSize * 0.5;
    const x = p.cos(angle) * dist;
    const y = p.sin(angle) * dist;
    
    let color;
    if (useColor) {
      // Vibrant colors for pixelated or terminal mode
      p.colorMode(p.HSB, 360, 100, 100, 100);
      let hue = (i * 30 + time * 20) % 360;
      color = p.color(hue, 80, 100, 70);
      p.colorMode(p.RGB, 255, 255, 255, 255);
    } else {
      // Black and white for standard mode
      const brightness = 180 + Math.sin(time + i) * 75;
      color = p.color(brightness, brightness, brightness, 70);
    }
    
    p.stroke(color);
    p.strokeWeight(pixelSize);
    p.noFill();
    
    // Draw different sized circles at each node
    if (isPixelated) {
      drawPixelatedCircle(p, x, y, patternSize * 0.15, pixelSize);
    } else {
      p.circle(x, y, patternSize * 0.3);
    }
    
    // Connect to center
    if (isPixelated) {
      drawPixelatedLine(p, 0, 0, x, y, pixelSize);
    } else {
      p.line(0, 0, x, y);
    }
    
    // Connect to adjacent nodes
    const nextI = (i + 1) % elements;
    const nextAngle = nextI * p.TWO_PI / elements;
    const nextX = p.cos(nextAngle) * dist;
    const nextY = p.sin(nextAngle) * dist;
    
    if (isPixelated) {
      drawPixelatedLine(p, x, y, nextX, nextY, pixelSize);
    } else {
      p.line(x, y, nextX, nextY);
    }
    
    // Create inner connections for more complex pattern
    if (i % 2 === 0) {
      const innerX = p.cos(angle) * dist * 0.5;
      const innerY = p.sin(angle) * dist * 0.5;
      
      if (isPixelated) {
        drawPixelatedCircle(p, innerX, innerY, patternSize * 0.08, pixelSize);
        drawPixelatedLine(p, x, y, innerX, innerY, pixelSize);
      } else {
        p.circle(innerX, innerY, patternSize * 0.16);
        p.line(x, y, innerX, innerY);
      }
    }
  }
  
  p.pop();
}
