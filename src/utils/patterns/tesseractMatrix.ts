
// Tesseract Matrix pattern implementation
import { RenderOptions } from "../patternTypes";
import { drawRotatedCube } from './tesseractComponents/rotatedCube';
import { connectTesseractVertices } from './tesseractComponents/tesseractConnections';
import { drawHypercube } from './tesseractComponents/hypercube';

// Pattern 2: Tesseract Matrix
export function drawTesseractMatrix(
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
  p.stroke(255, 180);
  p.strokeWeight(pixelSize);
  p.noFill();
  
  // Create proper 3D-to-2D projection
  const scale = size * 0.35;
  
  // Animation parameters with rotation speed parameter
  const rotationX = time * 0.2 * parameters.rotationSpeed;
  const rotationY = time * 0.15 * parameters.rotationSpeed;
  const rotationZ = time * 0.1 * parameters.rotationSpeed;
  
  // Determine the dimension of the hypercube based on complexity
  // Map complexity 0-1 to dimensions 2-10
  const dimension = Math.min(10, Math.max(2, Math.floor(2 + parameters.complexity * 8)));
  
  // Draw the hypercube with the appropriate dimension
  drawHypercube(p, dimension, scale, rotationX, rotationY, rotationZ, pixelSize, isPixelated, parameters.colorIntensity);
  
  // Add a pulsing center point
  const pulseSize = (Math.sin(rotationX * 3) + 1) * 2 + 2;
  p.fill(255, 220);
  p.noStroke();
  p.circle(0, 0, pulseSize * 2);
  
  p.pop();
}
