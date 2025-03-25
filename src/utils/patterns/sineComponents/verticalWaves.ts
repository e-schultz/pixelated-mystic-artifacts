
import { drawPixelatedLine } from '../helpers';

// Draw vertical sine wave grid lines
export function drawVerticalWaves(
  p: any, 
  gridSize: number, 
  gridDensity: number, 
  gridSpacing: number, 
  time: number, 
  baseFrequency: number, 
  frequencyModulation: number, 
  baseAmplitude: number, 
  amplitudeModulation: number,
  pixelSize: number,
  isPixelated: boolean
) {
  const halfGridSize = gridSize / 2;
  
  p.stroke(255, 180);
  p.strokeWeight(pixelSize);
  p.noFill();
  
  // Draw vertical sine wave grid lines
  for (let i = -gridDensity/2; i <= gridDensity/2; i++) {
    const x = i * gridSpacing;
    
    // Skip some lines for performance and aesthetic
    if (i % 3 !== 0) continue;
    
    // Sample points for this grid line
    const points = [];
    for (let y = -halfGridSize; y <= halfGridSize; y += pixelSize * 3) {
      // Calculate primary sine wave with different phase
      const sineValue = Math.sin(y * (baseFrequency * 0.8) + time * 1.1) * baseAmplitude;
      
      // Apply frequency modulation with different modulation pattern
      const modulatedSine = Math.sin(y * (baseFrequency + frequencyModulation * 0.7) + time * 0.5) * (baseAmplitude * amplitudeModulation * 0.8);
      
      // Combine waves
      const finalX = x + sineValue + modulatedSine;
      points.push({ x: finalX, y });
    }
    
    // Draw the line segments
    for (let j = 0; j < points.length - 1; j++) {
      if (isPixelated) {
        drawPixelatedLine(p, points[j].x, points[j].y, points[j+1].x, points[j+1].y, pixelSize);
      } else {
        p.line(points[j].x, points[j].y, points[j+1].x, points[j+1].y);
      }
    }
  }
}
