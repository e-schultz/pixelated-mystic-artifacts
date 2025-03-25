
// CyberGrid pattern implementation
import { RenderOptions } from "../patternTypes";
import { drawPixelatedLine, drawPixelatedCircle, drawPixelatedRect } from './helpers';

// Pattern: CyberGrid - inspired by cyberpunk aesthetics while maintaining minimalist wireframe style
export function drawCyberGrid(
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
  
  // Draw perspective grid
  drawPerspectiveGrid(p, size, time, pixelSize);
  
  // Draw floating elements
  drawFloatingElements(p, size, time, pixelSize);
  
  // Draw center focal point
  drawCenterFocalPoint(p, size, time, pixelSize);
  
  p.pop();
}

// Draw a perspective grid with vanishing point
function drawPerspectiveGrid(p: any, size: number, time: number, pixelSize: number) {
  const gridLines = 12;
  const maxDistance = size * 0.8;
  
  p.stroke(255, 150);
  p.strokeWeight(pixelSize);
  p.noFill();
  
  // Draw grid lines radiating from center
  for (let i = 0; i < gridLines; i++) {
    const angle = i * p.TWO_PI / gridLines + (time * 0.04);
    const endX = p.cos(angle) * maxDistance;
    const endY = p.sin(angle) * maxDistance;
    
    if (isPixelated) {
      drawPixelatedLine(p, 0, 0, endX, endY, pixelSize);
    } else {
      p.line(0, 0, endX, endY);
    }
    
    // Draw connecting squares at intervals
    const intervals = 5;
    for (let j = 1; j <= intervals; j++) {
      const ratio = j / intervals;
      const x = endX * ratio;
      const y = endY * ratio;
      const connectorSize = size * 0.02 * (1 - ratio) * (p.sin(time * 2 + i) * 0.2 + 0.8);
      
      p.push();
      p.translate(x, y);
      p.rotate(time * 0.2 + i);
      if (isPixelated) {
        drawPixelatedRect(p, 0, 0, connectorSize, connectorSize, pixelSize);
      } else {
        p.rect(-connectorSize/2, -connectorSize/2, connectorSize, connectorSize);
      }
      p.pop();
    }
  }
  
  // Draw concentric squares for depth
  const layers = 4;
  for (let i = 1; i <= layers; i++) {
    const layerSize = (size * 0.8) * (i / layers);
    const rotation = time * 0.1 * (i % 2 === 0 ? 1 : -1);
    
    p.push();
    p.rotate(rotation);
    if (isPixelated) {
      drawPixelatedRect(p, 0, 0, layerSize, layerSize, pixelSize);
    } else {
      p.rect(-layerSize/2, -layerSize/2, layerSize, layerSize);
    }
    p.pop();
  }
}

// Draw floating geometric elements
function drawFloatingElements(p: any, size: number, time: number, pixelSize: number) {
  const elementCount = 15;
  
  for (let i = 0; i < elementCount; i++) {
    // Create deterministic "random" positions based on index
    const angle = i * p.TWO_PI / elementCount + (time * (0.1 + i * 0.01));
    const distance = size * 0.3 + (p.sin(time * 0.5 + i) * size * 0.1);
    const x = p.cos(angle) * distance;
    const y = p.sin(angle) * distance;
    
    // Determine element type based on index
    const elementType = i % 3;
    
    p.push();
    p.translate(x, y);
    p.rotate(time * 0.3 + i);
    
    p.stroke(255, 180);
    p.strokeWeight(pixelSize);
    
    // Different geometric shapes
    const elementSize = size * 0.05 * (p.sin(time + i) * 0.2 + 0.8);
    
    if (elementType === 0) {
      // Square
      if (isPixelated) {
        drawPixelatedRect(p, 0, 0, elementSize, elementSize, pixelSize);
      } else {
        p.rect(-elementSize/2, -elementSize/2, elementSize, elementSize);
      }
    } else if (elementType === 1) {
      // Diamond
      p.push();
      p.rotate(p.PI/4);
      if (isPixelated) {
        drawPixelatedRect(p, 0, 0, elementSize, elementSize, pixelSize);
      } else {
        p.rect(-elementSize/2, -elementSize/2, elementSize, elementSize);
      }
      p.pop();
    } else {
      // Circle
      if (isPixelated) {
        drawPixelatedCircle(p, 0, 0, elementSize/2, pixelSize);
      } else {
        p.circle(0, 0, elementSize);
      }
    }
    
    p.pop();
  }
}

// Draw center focal point
function drawCenterFocalPoint(p: any, size: number, time: number, pixelSize: number) {
  // Central pulsing elements
  const pulseSize = size * 0.08 * (p.sin(time * 2) * 0.2 + 0.8);
  
  p.push();
  p.rotate(time * 0.2);
  
  // Outer ring
  p.noFill();
  p.stroke(255, 200);
  p.strokeWeight(pixelSize);
  if (isPixelated) {
    drawPixelatedCircle(p, 0, 0, pulseSize * 1.5, pixelSize);
  } else {
    p.circle(0, 0, pulseSize * 3);
  }
  
  // Inner shape - square
  p.stroke(255, 255);
  p.rotate(-time * 0.4);
  if (isPixelated) {
    drawPixelatedRect(p, 0, 0, pulseSize, pulseSize, pixelSize);
  } else {
    p.rect(-pulseSize/2, -pulseSize/2, pulseSize, pulseSize);
  }
  
  // Center point
  p.fill(255);
  p.noStroke();
  if (isPixelated) {
    p.rect(-pixelSize/2, -pixelSize/2, pixelSize, pixelSize);
  } else {
    p.circle(0, 0, pixelSize * 2);
  }
  
  p.pop();
}
