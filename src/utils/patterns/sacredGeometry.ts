
// Sacred Geometry pattern implementation
import { RenderOptions } from "../patternTypes";
import { drawFlowerOfLifePattern } from './sacredGeometryComponents/flowerOfLife';
import { drawGeometricPolygon } from './sacredGeometryComponents/geometricPolygon';

// Pattern 3: Sacred Geometry
export function drawSacredGeometry(
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
  
  p.rotate(time * 0.1 * parameters.rotationSpeed);
  
  const pixelSize = isPixelated ? 2 * (0.5 + parameters.lineThickness) : 1 * (0.5 + parameters.lineThickness);
  const radius = size * 0.4;
  
  // Draw flower of life pattern
  drawFlowerOfLifePattern(p, 0, 0, radius, 7, isPixelated, pixelSize, [255, 200]);
  
  // Draw hexagon
  drawGeometricPolygon(p, 0, 0, radius * 0.8, 6, isPixelated, pixelSize, 0, [255, 200]);
  
  p.pop();
}
