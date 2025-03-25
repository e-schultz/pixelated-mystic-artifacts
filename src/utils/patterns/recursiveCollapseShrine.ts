
// Recursive Collapse Shrine pattern implementation
import { RenderOptions } from "../patternTypes";
import { drawPixelatedLine, drawPixelatedCircle } from './helpers';

// Pattern: Recursive Collapse Shrine - A spiraling, layered structure with recursive elements
export function drawRecursiveCollapseShrine(
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
  
  const pixelSize = isPixelated ? 2 : 1;
  
  // Get terminal mode option
  const isTerminalMode = options?.isTerminalMode || false;
  
  // Use color only if pixelated or terminal mode is enabled
  const useColor = isPixelated || isTerminalMode;
  
  // Draw main shrine structure
  drawShrineCore(p, size, time, pixelSize, isPixelated, useColor);
  
  // Draw outer spiral elements
  drawSpiralStaircase(p, size, time, pixelSize, isPixelated, useColor);
  
  // Draw floating elements around the shrine
  drawFloatingCubes(p, size, time, pixelSize, isPixelated, useColor);
  
  // Draw vertical beams
  drawVerticalBeams(p, size, time, pixelSize, isPixelated, useColor);
  
  // Draw central glow
  drawCentralGlow(p, size, time, pixelSize, isPixelated, useColor);
  
  p.pop();
}

// Draw the core structure of the shrine
function drawShrineCore(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean, useColor: boolean) {
  const levels = 5; // Number of vertical levels
  const baseSize = size * 0.4;
  
  for (let i = 0; i < levels; i++) {
    const levelY = (i * size * 0.08) - (size * 0.2); // Stack vertically
    const levelSize = baseSize * (1 - (i * 0.15)); // Decrease size with each level
    const rotation = time * (0.2 + i * 0.1) + (i * p.PI / 6); // Different rotation for each level
    
    p.push();
    p.translate(0, levelY);
    p.rotate(rotation);
    
    // Define the level hue here so it's available throughout the scope
    const levelHue = useColor ? p.map(i, 0, levels, 320, 180) : 0;
    
    // Draw level polygon
    if (useColor) {
      // Magenta to cyan gradient based on level
      p.stroke(levelHue, 100, 70, 180);
    } else {
      p.stroke(255, 140 + i * 20);
    }
    p.strokeWeight(pixelSize);
    p.noFill();
    
    // Draw octagonal structure for each level
    const sides = 8;
    const points = [];
    
    for (let j = 0; j < sides; j++) {
      const angle = j * p.TWO_PI / sides;
      const x = p.cos(angle) * levelSize;
      const y = p.sin(angle) * levelSize;
      points.push({ x, y });
    }
    
    // Connect points
    for (let j = 0; j < points.length; j++) {
      const next = (j + 1) % points.length;
      if (isPixelated) {
        drawPixelatedLine(p, points[j].x, points[j].y, points[next].x, points[next].y, pixelSize);
      } else {
        p.line(points[j].x, points[j].y, points[next].x, points[next].y);
      }
    }
    
    // Add inner details
    const innerSize = levelSize * 0.7;
    if (useColor) {
      // Use the levelHue variable that's now properly in scope
      p.stroke(levelHue, 100, 50, 150);
    } else {
      p.stroke(255, 100);
    }
    
    if (isPixelated) {
      drawPixelatedCircle(p, 0, 0, innerSize, pixelSize);
    } else {
      p.circle(0, 0, innerSize * 2);
    }
    
    p.pop();
  }
}

// Draw spiral staircases around the core
function drawSpiralStaircase(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean, useColor: boolean) {
  const steps = 32; // Number of steps
  const baseRadius = size * 0.45;
  const spiralRadius = size * 0.15;
  
  p.noFill();
  p.strokeWeight(pixelSize);
  
  for (let spiral = 0; spiral < 3; spiral++) { // Draw 3 intertwined spirals
    const spiralOffset = spiral * (p.TWO_PI / 3) + time * 0.1;
    
    for (let i = 0; i < steps; i++) {
      const ratio = i / steps;
      const angle = ratio * p.TWO_PI * 2 + spiralOffset;
      const height = (ratio - 0.5) * size * 0.4;
      
      const radius = baseRadius - (ratio * spiralRadius);
      const x = p.cos(angle) * radius;
      const y = p.sin(angle) * radius;
      
      // Determine size of step based on position
      const stepSize = size * 0.02 * (1 - ratio * 0.5);
      
      // Draw step
      p.push();
      p.translate(x, y + height);
      p.rotate(angle + p.HALF_PI);
      
      if (useColor) {
        // Magenta to cyan colors
        if (spiral === 0) {
          p.stroke(320, 100, 70, 180); // Magenta
        } else if (spiral === 1) {
          p.stroke(180, 100, 70, 180); // Cyan
        } else {
          p.stroke(260, 100, 70, 180); // Purple
        }
      } else {
        p.stroke(255, 70 + ratio * 80);
      }
      
      if (isPixelated) {
        drawPixelatedRect(p, 0, 0, stepSize * 3, stepSize, pixelSize);
      } else {
        p.rect(-stepSize * 1.5, -stepSize/2, stepSize * 3, stepSize);
      }
      
      p.pop();
    }
  }
}

// Draw floating cubes around the shrine
function drawFloatingCubes(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean, useColor: boolean) {
  const cubeCount = 12;
  
  for (let i = 0; i < cubeCount; i++) {
    // Position cubes in a circle around the shrine
    const angle = i * p.TWO_PI / cubeCount + time * 0.1;
    const distance = size * (0.5 + 0.1 * p.sin(time + i));
    const x = p.cos(angle) * distance;
    const y = p.sin(angle) * distance;
    
    // Vertically float based on time
    const z = p.sin(time * 0.5 + i * 0.7) * size * 0.1;
    
    // Cube size
    const cubeSize = size * 0.04 * (0.8 + 0.2 * p.sin(time + i * 2));
    
    // Determine color
    if (useColor) {
      // Alternate between magenta and cyan
      if (i % 3 === 0) {
        p.stroke(320, 100, 70, 200); // Magenta
      } else if (i % 3 === 1) {
        p.stroke(180, 100, 70, 200); // Cyan
      } else {
        p.stroke(260, 100, 70, 200); // Purple
      }
    } else {
      p.stroke(255, 150);
    }
    
    p.noFill();
    p.strokeWeight(pixelSize);
    
    // Draw cube at position
    p.push();
    p.translate(x, y + z);
    p.rotateX(time * 0.2 + i);
    p.rotateY(time * 0.3 + i * 0.5);
    
    drawCube(p, cubeSize, isPixelated, pixelSize);
    
    p.pop();
  }
}

// Helper function to draw a 3D cube in 2D
function drawCube(p: any, size: number, isPixelated: boolean, pixelSize: number) {
  const s = size / 2;
  
  // Define cube vertices
  const vertices = [
    {x: -s, y: -s, z: -s},
    {x: s, y: -s, z: -s},
    {x: s, y: s, z: -s},
    {x: -s, y: s, z: -s},
    {x: -s, y: -s, z: s},
    {x: s, y: -s, z: s},
    {x: s, y: s, z: s},
    {x: -s, y: s, z: s}
  ];
  
  // Define cube edges
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0], // Bottom face
    [4, 5], [5, 6], [6, 7], [7, 4], // Top face
    [0, 4], [1, 5], [2, 6], [3, 7]  // Connecting edges
  ];
  
  // Draw each edge
  for (const [a, b] of edges) {
    if (isPixelated) {
      drawPixelatedLine(
        p, 
        vertices[a].x, vertices[a].y, 
        vertices[b].x, vertices[b].y, 
        pixelSize
      );
    } else {
      p.line(
        vertices[a].x, vertices[a].y, 
        vertices[b].x, vertices[b].y
      );
    }
  }
}

// Draw vertical beams/lines
function drawVerticalBeams(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean, useColor: boolean) {
  const beamCount = 16;
  
  p.strokeWeight(pixelSize);
  
  for (let i = 0; i < beamCount; i++) {
    const angle = i * p.TWO_PI / beamCount;
    const x = p.cos(angle) * size * 0.7;
    const y = p.sin(angle) * size * 0.7;
    
    // Beam height varies with time
    const height = size * (0.5 + 0.2 * p.sin(time * 0.3 + i * 0.4));
    
    // Beam opacity varies with time
    const opacity = 60 + 40 * p.sin(time + i);
    
    if (useColor) {
      // Color based on position
      const hue = (i * 20 + time * 10) % 360;
      p.stroke(hue, 80, 70, opacity);
    } else {
      p.stroke(255, opacity * 0.6);
    }
    
    // Draw vertical beam
    if (isPixelated) {
      drawPixelatedLine(p, x, y, x, y - height, pixelSize);
    } else {
      p.line(x, y, x, y - height);
    }
    
    // Add small details along the beam
    const detailCount = 3;
    for (let j = 0; j < detailCount; j++) {
      const detailY = y - (height * (j + 1) / (detailCount + 1));
      const detailSize = size * 0.01;
      
      if (isPixelated) {
        p.rect(x - detailSize/2, detailY - detailSize/2, pixelSize * 2, pixelSize * 2);
      } else {
        p.point(x, detailY);
      }
    }
  }
}

// Draw central glow effect
function drawCentralGlow(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean, useColor: boolean) {
  // Draw pulsing central circle
  const pulseSize = size * 0.15 * (0.8 + 0.2 * p.sin(time * 2));
  
  if (useColor) {
    // Create gradient-like effect with concentric circles
    const rings = 5;
    for (let i = rings; i > 0; i--) {
      const ringSize = pulseSize * (i / rings);
      const opacity = 150 * (1 - (i / rings));
      
      // Shift hue over time
      const glowHue = (300 + time * 20) % 360;
      p.stroke(glowHue, 100, 70, opacity);
      p.strokeWeight(pixelSize);
      p.noFill();
      
      if (isPixelated) {
        drawPixelatedCircle(p, 0, 0, ringSize, pixelSize);
      } else {
        p.circle(0, 0, ringSize * 2);
      }
    }
  } else {
    // Monochrome version
    const rings = 3;
    for (let i = rings; i > 0; i--) {
      const ringSize = pulseSize * (i / rings);
      const opacity = 100 * (1 - (i / rings));
      
      p.stroke(255, opacity);
      p.strokeWeight(pixelSize);
      p.noFill();
      
      if (isPixelated) {
        drawPixelatedCircle(p, 0, 0, ringSize, pixelSize);
      } else {
        p.circle(0, 0, ringSize * 2);
      }
    }
  }
  
  // Central point
  p.fill(255);
  p.noStroke();
  const centerSize = pixelSize * 2 * (1 + 0.3 * p.sin(time * 3));
  p.rect(-centerSize/2, -centerSize/2, centerSize, centerSize);
}

// Helper function to draw a pixelated rectangle outline
function drawPixelatedRect(p: any, x: number, y: number, width: number, height: number, pixelSize: number) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  
  // Draw individual pixels for each side of the rectangle
  // Top
  for (let px = x - halfWidth; px <= x + halfWidth; px += pixelSize) {
    p.rect(px, y - halfHeight, pixelSize, pixelSize);
  }
  
  // Bottom
  for (let px = x - halfWidth; px <= x + halfWidth; px += pixelSize) {
    p.rect(px, y + halfHeight - pixelSize, pixelSize, pixelSize);
  }
  
  // Left
  for (let py = y - halfHeight + pixelSize; py < y + halfHeight - pixelSize; py += pixelSize) {
    p.rect(x - halfWidth, py, pixelSize, pixelSize);
  }
  
  // Right
  for (let py = y - halfHeight + pixelSize; py < y + halfHeight - pixelSize; py += pixelSize) {
    p.rect(x + halfWidth - pixelSize, py, pixelSize, pixelSize);
  }
}
