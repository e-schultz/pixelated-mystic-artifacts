
import { GeometrySettings } from './types';
import { drawPixelatedCircle, drawGradientLine } from './coreUtils';

// Draw a LightPrism
export const drawLightPrism = (p5: any, x: number, y: number, size: number, settings: GeometrySettings) => {
  const { rotation, pixelSize, color } = settings;
  
  p5.push();
  p5.translate(x, y);
  p5.rotate(rotation);
  
  // Draw central light source
  drawPixelatedCircle(p5, 0, 0, size * 0.1, pixelSize, color);
  
  // Draw light rays
  const rayCount = 20;
  const rayLength = size;
  
  for (let i = 0; i < rayCount; i++) {
    const angle = i * p5.TWO_PI / rayCount;
    const endX = rayLength * p5.cos(angle);
    const endY = rayLength * p5.sin(angle);
    
    // Draw diffraction pattern (light rays with varying opacity)
    const rayOpacity = (i % 3 === 0) ? 0.9 : (i % 2 === 0) ? 0.6 : 0.3;
    const rayColor = `rgba(240, 240, 228, ${rayOpacity})`;
    
    drawGradientLine(p5, 0, 0, endX, endY, pixelSize, rayColor, 'rgba(240, 240, 228, 0)');
  }
  
  // Draw rainbow rings
  const ringCount = 4;
  for (let i = 1; i <= ringCount; i++) {
    const ringRadius = size * (0.2 + i * 0.15);
    const ringThickness = pixelSize * 2;
    
    // Draw rainbow ring
    const hueShift = (p5.frameCount * 0.5) % 360;
    
    for (let angle = 0; angle < p5.TWO_PI; angle += 0.1) {
      const hue = (angle / p5.TWO_PI * 360 + hueShift) % 360;
      const ringColor = p5.color(`hsla(${hue}, 100%, 70%, 0.3)`);
      
      const px = ringRadius * p5.cos(angle);
      const py = ringRadius * p5.sin(angle);
      
      p5.fill(ringColor);
      p5.noStroke();
      p5.rect(px, py, ringThickness, ringThickness);
    }
  }
  
  p5.pop();
};
