
// Sine Wave Grid with Frequency Modulation pattern implementation
import { RenderOptions } from "../patternTypes";
import { drawHorizontalWaves } from './sineComponents/horizontalWaves';
import { drawVerticalWaves } from './sineComponents/verticalWaves';
import { drawCenterVisualization } from './sineWaveGridComponents/centerVisualization';

// Pattern 6: Sine Wave Grid with Frequency Modulation
export function drawSineWaveGrid(
  p: any, 
  centerX: number, 
  centerY: number, 
  size: number, 
  time: number,
  isPixelated: boolean,
  options?: RenderOptions
) {
  p.push();
  p.translate(centerX, centerY);
  
  // Apply parameters if available
  const parameters = options?.parameters || {
    complexity: 0.5,
    rotationSpeed: 1.0,
    colorIntensity: 0.7,
    lineThickness: 0.5,
    trailPersistence: 0.5
  };
  
  const pixelSize = isPixelated ? 2 * (0.5 + parameters.lineThickness) : 1 * (0.5 + parameters.lineThickness);
  const gridSize = size * 0.8;
  
  // Grid parameters
  const gridDensity = 20; // Number of grid lines in each direction
  const gridSpacing = gridSize / gridDensity;
  
  // Modulation parameters
  const baseFrequency = 0.2;
  const frequencyModulation = 0.15 * Math.sin(time * 0.3 * parameters.rotationSpeed) + 0.2; // Time-based FM
  const baseAmplitude = gridSpacing * 0.8;
  const amplitudeModulation = 0.5 * Math.sin(time * 0.2 * parameters.rotationSpeed) + 0.8; // Time-based AM
  
  // Draw horizontal sine waves
  drawHorizontalWaves(
    p,
    gridSize,
    gridDensity,
    gridSpacing,
    time,
    baseFrequency,
    frequencyModulation,
    baseAmplitude,
    amplitudeModulation,
    pixelSize,
    isPixelated
  );
  
  // Draw vertical sine waves
  drawVerticalWaves(
    p,
    gridSize,
    gridDensity,
    gridSpacing,
    time,
    baseFrequency,
    frequencyModulation,
    baseAmplitude,
    amplitudeModulation,
    pixelSize,
    isPixelated
  );
  
  // Draw center visualization
  drawCenterVisualization(p, time, gridSize, pixelSize);
  
  p.pop();
}
