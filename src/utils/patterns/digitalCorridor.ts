
// Digital Corridor pattern implementation
import { RenderOptions } from "../patternTypes";
import { drawCorridorStructure } from './digitalCorridorComponents/corridorStructure';
import { drawCenterPoint } from './digitalCorridorComponents/centerPoint';

// Pattern 0: Digital Corridor
export function drawDigitalCorridor(
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
  
  // Apply rotation based on rotationSpeed parameter
  p.rotate(time * 0.1 * parameters.rotationSpeed);
  
  // Apply complexity parameter to corridor depth
  const corridorDepth = Math.floor(8 + (parameters.complexity * 8)); // 8-16 based on complexity
  
  // Apply line thickness parameter
  const pixelSize = isPixelated ? 2 * (0.5 + parameters.lineThickness) : 1 * (0.5 + parameters.lineThickness);
  
  // Log parameters for debugging
  if (p.frameCount % 60 === 0) {
    console.log("Digital Corridor parameters:", parameters);
  }
  
  // Draw the main corridor structure with parameters
  drawCorridorStructure(p, size, corridorDepth, time, pixelSize, isPixelated, parameters);
  
  // Draw central point
  drawCenterPoint(p, size, pixelSize, isPixelated, parameters);
  
  p.pop();
}
