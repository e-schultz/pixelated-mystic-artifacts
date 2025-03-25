
// Tesseract Matrix pattern implementation
import { RenderOptions } from "../patternTypes";
import { drawRotatedCube } from './tesseractComponents/rotatedCube';
import { connectTesseractVertices } from './tesseractComponents/tesseractConnections';

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
  const innerScale = scale * 0.6;
  
  // Animation parameters with rotation speed parameter
  const rotationX = time * 0.2 * parameters.rotationSpeed;
  const rotationY = time * 0.15 * parameters.rotationSpeed;
  const rotationZ = time * 0.1 * parameters.rotationSpeed;
  
  // Draw the outer cube first
  drawRotatedCube(p, 0, 0, 0, scale, rotationX, rotationY, rotationZ, pixelSize, isPixelated);
  
  // Draw the inner cube with different rotation
  drawRotatedCube(p, 0, 0, 0, innerScale, rotationX * 1.5, rotationY * 1.2, rotationZ * 0.8, pixelSize, isPixelated);
  
  // Connect vertices between inner and outer cubes to create the tesseract effect
  connectTesseractVertices(p, scale, innerScale, rotationX, rotationY, rotationZ, pixelSize, isPixelated);
  
  p.pop();
}
