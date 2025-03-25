
// Diffusion Oracle pattern implementation
import { RenderOptions } from "../patternTypes";
import { drawPixelatedLine, drawPixelatedCircle, drawPixelatedRect } from './helpers';

// Pattern: Diffusion Oracle - inspired by reaction-diffusion systems and divination tools
export function drawDiffusionOracle(
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
  
  // Get options
  const options = arguments[5] as RenderOptions;
  const isTerminalMode = options?.isTerminalMode || false;
  
  // Use color only if pixelated or terminal mode is enabled
  const useColor = isPixelated || isTerminalMode;
  
  // Draw primary diffusion field
  drawDiffusionField(p, size, time, pixelSize, isPixelated);
  
  // Draw vector lines guiding the diffusion
  drawVectorField(p, size, time, pixelSize, isPixelated, useColor);
  
  // Draw the oracle/crystalline center
  drawOracleCenter(p, size, time, pixelSize, isPixelated, useColor);
  
  // Draw binary nodes representing reaction points
  drawReactionNodes(p, size, time, pixelSize, isPixelated, useColor);
  
  p.pop();
}

// Draw a diffusion field based on reaction-diffusion principles
function drawDiffusionField(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean) {
  const fieldSize = size * 0.8;
  const density = isPixelated ? 15 : 25; // Number of cells
  const cellSize = fieldSize / density;
  
  p.noFill();
  p.stroke(255, 40);
  p.strokeWeight(pixelSize);
  
  // Use a simple cellular automata-like pattern
  for (let i = -density/2; i < density/2; i++) {
    for (let j = -density/2; j < density/2; j++) {
      const x = i * cellSize;
      const y = j * cellSize;
      
      // Distance from center
      const distFromCenter = p.dist(0, 0, x, y);
      
      // Only draw some cells based on a mathematical pattern
      const noiseVal = p.noise(
        i * 0.1 + time * 0.05, 
        j * 0.1 + time * 0.03
      );
      
      const angleOffset = Math.atan2(y, x) + time * 0.2;
      const sineInfluence = p.sin(angleOffset + distFromCenter * 0.01) * 0.3 + 0.7;
      
      if (noiseVal * sineInfluence > 0.5 && distFromCenter < fieldSize * 0.5) {
        // Different cell representations for different regions
        if (distFromCenter < fieldSize * 0.2) {
          // Inner region: more ordered
          if ((i + j) % 2 === 0) {
            p.rect(x - cellSize/2, y - cellSize/2, cellSize * 0.8, cellSize * 0.8);
          }
        } else {
          // Middle region: mix of order and chaos
          if (noiseVal > 0.65) {
            p.circle(x, y, cellSize * 0.4);
          } else if (noiseVal < 0.4) {
            p.line(
              x - cellSize * 0.4, 
              y - cellSize * 0.4, 
              x + cellSize * 0.4, 
              y + cellSize * 0.4
            );
          }
        }
      }
    }
  }
}

// Draw vector field lines guiding the diffusion
function drawVectorField(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean, useColor: boolean) {
  const fieldRadius = size * 0.4;
  const lineCount = 12;
  
  p.stroke(255, 100);
  p.strokeWeight(pixelSize);
  
  // Draw field lines emanating from center
  for (let i = 0; i < lineCount; i++) {
    const angle = i * p.TWO_PI / lineCount + time * 0.1;
    const length = fieldRadius * (0.5 + 0.5 * p.sin(time * 0.5 + i * 0.5));
    
    const endX = p.cos(angle) * length;
    const endY = p.sin(angle) * length;
    
    if (isPixelated) {
      drawPixelatedLine(p, 0, 0, endX, endY, pixelSize);
    } else {
      p.line(0, 0, endX, endY);
    }
    
    // Add distortion points along the vector lines
    const distortPoints = 3;
    for (let j = 1; j <= distortPoints; j++) {
      const ratio = j / (distortPoints + 1);
      const x = endX * ratio;
      const y = endY * ratio;
      
      // Orthogonal distortion
      const perpAngle = angle + p.HALF_PI;
      const distortAmount = size * 0.02 * p.sin(time * 3 + i + j);
      const distortX = x + p.cos(perpAngle) * distortAmount;
      const distortY = y + p.sin(perpAngle) * distortAmount;
      
      // Draw distortion point
      if (j % 2 === 0) {
        if (isPixelated) {
          p.rect(distortX - pixelSize/2, distortY - pixelSize/2, pixelSize, pixelSize);
        } else {
          p.point(distortX, distortY);
        }
      }
    }
  }
}

// Draw the oracle crystalline center
function drawOracleCenter(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean, useColor: boolean) {
  const crystalSize = size * 0.15;
  
  // Set colors based on mode
  let primaryColor, secondaryColor;
  if (useColor) {
    primaryColor = p.color(220, 255, 220, 200);
    secondaryColor = p.color(180, 220, 255, 150);
  } else {
    primaryColor = p.color(255, 200);
    secondaryColor = p.color(180, 150);
  }
  
  p.push();
  p.rotate(time * 0.2);
  
  // Draw crystalline structure - hexagonal base
  p.noFill();
  p.stroke(primaryColor);
  p.strokeWeight(pixelSize * 1.5);
  
  const hexPoints = 6;
  if (isPixelated) {
    // Draw pixelated hexagon
    let prevX, prevY;
    for (let i = 0; i <= hexPoints; i++) {
      const angle = i * p.TWO_PI / hexPoints;
      const x = p.cos(angle) * crystalSize;
      const y = p.sin(angle) * crystalSize;
      
      if (i > 0) {
        drawPixelatedLine(p, prevX, prevY, x, y, pixelSize);
      }
      
      prevX = x;
      prevY = y;
    }
  } else {
    p.beginShape();
    for (let i = 0; i < hexPoints; i++) {
      const angle = i * p.TWO_PI / hexPoints;
      const x = p.cos(angle) * crystalSize;
      const y = p.sin(angle) * crystalSize;
      p.vertex(x, y);
    }
    p.endShape(p.CLOSE);
  }
  
  // Inner triangle structure - "seeing eye"
  p.stroke(secondaryColor);
  p.strokeWeight(pixelSize);
  
  const triPoints = 3;
  const innerSize = crystalSize * 0.5;
  
  if (isPixelated) {
    // Draw pixelated triangle
    let prevX, prevY;
    for (let i = 0; i <= triPoints; i++) {
      const angle = i * p.TWO_PI / triPoints + p.HALF_PI;
      const x = p.cos(angle) * innerSize;
      const y = p.sin(angle) * innerSize;
      
      if (i > 0) {
        drawPixelatedLine(p, prevX, prevY, x, y, pixelSize);
      }
      
      prevX = x;
      prevY = y;
    }
  } else {
    p.beginShape();
    for (let i = 0; i < triPoints; i++) {
      const angle = i * p.TWO_PI / triPoints + p.HALF_PI;
      const x = p.cos(angle) * innerSize;
      const y = p.sin(angle) * innerSize;
      p.vertex(x, y);
    }
    p.endShape(p.CLOSE);
  }
  
  // Center point - the "eye" of the oracle
  p.fill(255);
  p.noStroke();
  if (isPixelated) {
    p.rect(-pixelSize, -pixelSize, pixelSize * 2, pixelSize * 2);
  } else {
    p.circle(0, 0, pixelSize * 3);
  }
  
  p.pop();
}

// Draw binary nodes representing reaction points
function drawReactionNodes(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean, useColor: boolean) {
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
