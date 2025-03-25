
// CyberGrid pattern implementation
import { RenderOptions } from "../patternTypes";
import { drawPixelatedLine, drawPixelatedCircle, drawPixelatedRect } from './helpers';

// Pattern: CyberGrid - inspired by cyberpunk aesthetics with sacred geometry elements
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
  drawPerspectiveGrid(p, size, time, pixelSize, isPixelated);
  
  // Draw sacred geometry pattern
  drawSacredPattern(p, size, time, pixelSize, isPixelated);
  
  // Draw floating elements
  drawFloatingElements(p, size, time, pixelSize, isPixelated);
  
  // Draw center focal point
  drawCenterFocalPoint(p, size, time, pixelSize, isPixelated);
  
  p.pop();
}

// Draw a perspective grid with vanishing point
function drawPerspectiveGrid(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean) {
  const gridLines = 16;
  const maxDistance = size * 0.8;
  
  // Color palette inspired by the neon images
  const colors = [
    [0, 255, 255, 150],   // Cyan
    [255, 0, 255, 150],   // Magenta
    [255, 255, 0, 150],   // Yellow
  ];
  
  p.noFill();
  
  // Draw grid lines radiating from center
  for (let i = 0; i < gridLines; i++) {
    const angle = i * p.TWO_PI / gridLines + (time * 0.04);
    const endX = p.cos(angle) * maxDistance;
    const endY = p.sin(angle) * maxDistance;
    
    // Cycle through colors
    const colorIndex = i % colors.length;
    p.stroke(colors[colorIndex][0], colors[colorIndex][1], colors[colorIndex][2], colors[colorIndex][3]);
    p.strokeWeight(pixelSize);
    
    if (isPixelated) {
      drawPixelatedLine(p, 0, 0, endX, endY, pixelSize);
    } else {
      p.line(0, 0, endX, endY);
    }
    
    // Draw connecting points at intervals
    const intervals = 5;
    for (let j = 1; j <= intervals; j++) {
      const ratio = j / intervals;
      const x = endX * ratio;
      const y = endY * ratio;
      const pointSize = size * 0.01 * (1 - ratio) * (p.sin(time * 2 + i) * 0.2 + 0.8);
      
      if (j % 2 === 0) {
        p.push();
        p.translate(x, y);
        p.rotate(time * 0.2 + i);
        
        if (isPixelated) {
          drawPixelatedRect(p, 0, 0, pointSize * 2, pointSize * 2, pixelSize);
        } else {
          p.rect(-pointSize, -pointSize, pointSize * 2, pointSize * 2);
        }
        p.pop();
      }
    }
  }
  
  // Draw concentric hexagons for depth - like in the sacred geometry images
  const layers = 3;
  for (let i = 1; i <= layers; i++) {
    const layerSize = (size * 0.7) * (i / layers);
    const rotation = time * 0.1 * (i % 2 === 0 ? 1 : -1);
    
    p.push();
    p.rotate(rotation);
    
    // Draw hexagon
    const points = 6;
    const colorIndex = i % colors.length;
    p.stroke(colors[colorIndex][0], colors[colorIndex][1], colors[colorIndex][2], colors[colorIndex][3] + 50);
    p.strokeWeight(pixelSize);
    
    if (isPixelated) {
      drawPolygon(p, 0, 0, layerSize, points, pixelSize);
    } else {
      p.beginShape();
      for (let j = 0; j < points; j++) {
        const angle = j * p.TWO_PI / points;
        const px = p.cos(angle) * layerSize;
        const py = p.sin(angle) * layerSize;
        p.vertex(px, py);
      }
      p.endShape(p.CLOSE);
    }
    
    p.pop();
  }
}

// Draw a sacred geometry inspired pattern (flower of life or metatron's cube style)
function drawSacredPattern(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean) {
  const patternSize = size * 0.4;
  const elements = 8;
  
  // Create the primary sacred geometry pattern
  p.push();
  p.rotate(time * 0.1);
  
  // Draw interconnected sacred geometry elements
  for (let i = 0; i < elements; i++) {
    const angle = i * p.TWO_PI / elements;
    const dist = patternSize * 0.5;
    const x = p.cos(angle) * dist;
    const y = p.sin(angle) * dist;
    
    // Cycle through color pattern
    let hue = (i * 30 + time * 20) % 360;
    // Convert HSB to RGB for our vibrant colors
    p.colorMode(p.HSB, 360, 100, 100, 100);
    const color = p.color(hue, 80, 100, 70);
    p.colorMode(p.RGB, 255, 255, 255, 255);
    
    p.stroke(color);
    p.strokeWeight(pixelSize);
    p.noFill();
    
    // Draw different sized circles at each node
    if (isPixelated) {
      drawPixelatedCircle(p, x, y, patternSize * 0.15, pixelSize);
    } else {
      p.circle(x, y, patternSize * 0.3);
    }
    
    // Connect to center
    if (isPixelated) {
      drawPixelatedLine(p, 0, 0, x, y, pixelSize);
    } else {
      p.line(0, 0, x, y);
    }
    
    // Connect to adjacent nodes
    const nextI = (i + 1) % elements;
    const nextAngle = nextI * p.TWO_PI / elements;
    const nextX = p.cos(nextAngle) * dist;
    const nextY = p.sin(nextAngle) * dist;
    
    if (isPixelated) {
      drawPixelatedLine(p, x, y, nextX, nextY, pixelSize);
    } else {
      p.line(x, y, nextX, nextY);
    }
    
    // Create inner connections for more complex pattern
    if (i % 2 === 0) {
      const innerX = p.cos(angle) * dist * 0.5;
      const innerY = p.sin(angle) * dist * 0.5;
      
      if (isPixelated) {
        drawPixelatedCircle(p, innerX, innerY, patternSize * 0.08, pixelSize);
        drawPixelatedLine(p, x, y, innerX, innerY, pixelSize);
      } else {
        p.circle(innerX, innerY, patternSize * 0.16);
        p.line(x, y, innerX, innerY);
      }
    }
  }
  
  p.pop();
}

// Draw floating geometric elements
function drawFloatingElements(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean) {
  const elementCount = 12;
  
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
    
    // Use vibrant cyberpunk colors
    let hue = (i * 60 + time * 10) % 360;
    p.colorMode(p.HSB, 360, 100, 100, 100);
    const color = p.color(hue, 80, 100, 70);
    p.colorMode(p.RGB, 255, 255, 255, 255);
    
    p.stroke(color);
    p.strokeWeight(pixelSize);
    
    // Different geometric shapes
    const elementSize = size * 0.05 * (p.sin(time + i) * 0.2 + 0.8);
    
    if (elementType === 0) {
      // Square - like circuit nodes
      if (isPixelated) {
        drawPixelatedRect(p, 0, 0, elementSize, elementSize, pixelSize);
      } else {
        p.rect(-elementSize/2, -elementSize/2, elementSize, elementSize);
      }
    } else if (elementType === 1) {
      // Hexagon - like in the Metatron's Cube image
      if (isPixelated) {
        drawPolygon(p, 0, 0, elementSize/2, 6, pixelSize);
      } else {
        p.beginShape();
        for (let j = 0; j < 6; j++) {
          const hexAngle = j * p.TWO_PI / 6;
          const px = p.cos(hexAngle) * (elementSize/2);
          const py = p.sin(hexAngle) * (elementSize/2);
          p.vertex(px, py);
        }
        p.endShape(p.CLOSE);
      }
    } else {
      // Circle - like in the sacred geometry images
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
function drawCenterFocalPoint(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean) {
  // Central pulsing elements
  const pulseSize = size * 0.08 * (p.sin(time * 2) * 0.2 + 0.8);
  
  p.push();
  p.rotate(time * 0.2);
  
  // Alternate between magenta and cyan for the Star of David effect from the 3rd image
  p.colorMode(p.HSB, 360, 100, 100, 100);
  const color1 = p.color(180, 100, 100, 80); // Cyan
  const color2 = p.color(300, 100, 100, 80); // Magenta
  p.colorMode(p.RGB, 255, 255, 255, 255);
  
  // Outer hexagon - like in the sacred geometry images
  p.noFill();
  p.stroke(color1);
  p.strokeWeight(pixelSize * 1.5);
  
  if (isPixelated) {
    drawPolygon(p, 0, 0, pulseSize * 2, 6, pixelSize);
  } else {
    p.beginShape();
    for (let i = 0; i < 6; i++) {
      const angle = i * p.TWO_PI / 6;
      const px = p.cos(angle) * pulseSize * 2;
      const py = p.sin(angle) * pulseSize * 2;
      p.vertex(px, py);
    }
    p.endShape(p.CLOSE);
  }
  
  // Inner triangle pointing up - from Star of David
  p.stroke(color2);
  if (isPixelated) {
    drawPolygon(p, 0, 0, pulseSize, 3, pixelSize);
  } else {
    p.beginShape();
    for (let i = 0; i < 3; i++) {
      const angle = i * p.TWO_PI / 3 + p.PI / 6;
      const px = p.cos(angle) * pulseSize;
      const py = p.sin(angle) * pulseSize;
      p.vertex(px, py);
    }
    p.endShape(p.CLOSE);
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

// Helper function to draw polygons with pixelation
function drawPolygon(p: any, x: number, y: number, radius: number, sides: number, pixelSize: number) {
  const points = [];
  
  // Calculate all the vertex points
  for (let i = 0; i < sides; i++) {
    const angle = i * p.TWO_PI / sides;
    const px = x + p.cos(angle) * radius;
    const py = y + p.sin(angle) * radius;
    points.push({x: px, y: py});
  }
  
  // Draw the lines connecting the points
  for (let i = 0; i < points.length; i++) {
    const currentPoint = points[i];
    const nextPoint = points[(i + 1) % points.length];
    
    drawPixelatedLine(
      p, 
      currentPoint.x, currentPoint.y, 
      nextPoint.x, nextPoint.y,
      pixelSize
    );
  }
}
