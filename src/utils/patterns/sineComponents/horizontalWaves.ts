
import { drawPixelatedLine } from '../helpers';

// Draw horizontal sine wave grid lines
export function drawHorizontalWaves(
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
  
  // Draw horizontal sine wave grid lines
  for (let i = -gridDensity/2; i <= gridDensity/2; i++) {
    const y = i * gridSpacing;
    
    // Skip some lines for performance and aesthetic
    if (i % 2 !== 0) continue;
    
    // Sample points for this grid line
    const points = [];
    for (let x = -halfGridSize; x <= halfGridSize; x += pixelSize * 3) {
      // Calculate primary sine wave
      const sineValue = Math.sin(x * baseFrequency + time) * baseAmplitude;
      
      // Apply frequency modulation (varies the wavelength)
      const modulatedSine = Math.sin(x * (baseFrequency + frequencyModulation) + time * 0.7) * (baseAmplitude * amplitudeModulation);
      
      // Combine waves
      const finalY = y + sineValue + modulatedSine;
      points.push({ x, y: finalY });
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
