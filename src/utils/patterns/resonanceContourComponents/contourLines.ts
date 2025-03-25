
import { drawPixelatedLine } from '../helpers';

// Draw topographical contour lines visualizing energy fields
export function drawContourLines(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean) {
  const maxRadius = size * 0.8;
  const contourCount = 12;
  const contourSpacing = maxRadius / contourCount;
  
  p.noFill();
  p.strokeWeight(pixelSize);
  
  // Draw concentric contour lines with distortions
  for (let i = 1; i <= contourCount; i++) {
    const radius = i * contourSpacing;
    const opacity = 100 - i * 5; // Fade out with distance
    p.stroke(255, opacity);
    
    const distortionFreq = 3 + (i % 3); // Vary the distortion frequency
    const distortionAmp = size * 0.02 * (1 - i/contourCount); // Stronger distortion near center
    
    const resolution = isPixelated ? 20 : 40; // Points per circle
    let prevX, prevY;
    
    for (let j = 0; j <= resolution; j++) {
      const angle = j * p.TWO_PI / resolution;
      
      // Calculate distortion using sine waves and time
      const distortion = p.sin(angle * distortionFreq + time * (0.5 + i * 0.05)) * distortionAmp;
      
      // Apply more distortion based on cardinal directions
      const cardinalDistortion = p.cos(angle * 4 + time * 0.2) * distortionAmp * 0.5;
      
      const distortedRadius = radius + distortion + cardinalDistortion;
      const x = p.cos(angle) * distortedRadius;
      const y = p.sin(angle) * distortedRadius;
      
      if (j > 0) {
        if (isPixelated) {
          drawPixelatedLine(p, prevX, prevY, x, y, pixelSize);
        } else {
          p.line(prevX, prevY, x, y);
        }
      }
      
      prevX = x;
      prevY = y;
    }
    
    // Skip some contours for a more minimal look
    if (i % 3 === 0) {
      i += 1;
    }
  }
}
