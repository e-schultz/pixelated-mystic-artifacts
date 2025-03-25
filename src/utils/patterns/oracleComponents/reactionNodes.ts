
import { drawPixelatedRect, drawPixelatedCircle } from '../helpers';

// Draw binary nodes representing reaction points
export function drawReactionNodes(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean, useColor: boolean) {
  const nodeCount = 9;
  const orbitRadius = size * 0.3;
  
  for (let i = 0; i < nodeCount; i++) {
    // Determine node position with oscillating orbits
    const angle = i * p.TWO_PI / nodeCount + time * (0.1 + i * 0.01);
    const radius = orbitRadius * (0.8 + 0.2 * p.sin(time * 0.5 + i));
    const x = p.cos(angle) * radius;
    const y = p.sin(angle) * radius;
    
    // Binary state - either active or inactive based on a pattern
    const isActive = p.sin(time * 0.7 + i * p.TWO_PI / nodeCount) > 0;
    
    p.push();
    p.translate(x, y);
    p.rotate(time * 0.2 + i);
    
    if (isActive) {
      // Active node - square
      p.noFill();
      p.stroke(255, 180);
      p.strokeWeight(pixelSize);
      
      const nodeSize = size * 0.03;
      if (isPixelated) {
        drawPixelatedRect(p, 0, 0, nodeSize, nodeSize, pixelSize);
      } else {
        p.rect(-nodeSize/2, -nodeSize/2, nodeSize, nodeSize);
      }
    } else {
      // Inactive node - circle
      p.noFill();
      p.stroke(255, 100);
      p.strokeWeight(pixelSize);
      
      const nodeSize = size * 0.02;
      if (isPixelated) {
        drawPixelatedCircle(p, 0, 0, nodeSize/2, pixelSize);
      } else {
        p.circle(0, 0, nodeSize);
      }
    }
    
    p.pop();
  }
}
