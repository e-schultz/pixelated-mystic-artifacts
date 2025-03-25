
import { drawCustomCircle } from '../commonGeometry';

// Draw neural network nodes
export function drawNodes(
  p: any, 
  nodes: Array<{x: number, y: number, pulseSize: number}>,
  isPixelated: boolean,
  pixelSize: number
) {
  p.fill(255);
  p.noStroke();
  
  nodes.forEach(node => {
    drawCustomCircle(
      p, 
      node.x, 
      node.y, 
      node.pulseSize / 2, 
      isPixelated, 
      pixelSize, 
      [255, 255], 
      [255, 255]
    );
  });
}
