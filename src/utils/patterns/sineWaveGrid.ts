
// Sine Wave Grid with Frequency Modulation pattern implementation
import { RenderOptions } from "../patternTypes";
import { drawPixelatedLine } from './commonGeometry';

// Pattern 6: Sine Wave Grid with Frequency Modulation
export function drawSineWaveGrid(
  p: any, 
  centerX: number, 
  centerY: number, 
  size: number, 
  time: number,
  isPixelated: boolean
) {
  p.push();
  p.translate(centerX, centerY);
  
  const pixelSize = isPixelated ? 2 : 1;
  const gridSize = size * 0.8;
  const halfGridSize = gridSize / 2;
  
  // Grid parameters
  const gridDensity = 20; // Number of grid lines in each direction
  const gridSpacing = gridSize / gridDensity;
  
  // Modulation parameters
  const baseFrequency = 0.2;
  const frequencyModulation = 0.15 * Math.sin(time * 0.3) + 0.2; // Time-based FM
  const baseAmplitude = gridSpacing * 0.8;
  const amplitudeModulation = 0.5 * Math.sin(time * 0.2) + 0.8; // Time-based AM
  
  // Set style
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
  
  // Draw a subtle pulsating circle to represent the frequency modulation
  const pulseSize = (Math.sin(time * 0.5) * 0.2 + 0.8) * gridSize * 0.4;
  p.stroke(255, 40);
  p.strokeWeight(pixelSize);
  p.ellipse(0, 0, pulseSize, pulseSize);
  
  p.pop();
}
