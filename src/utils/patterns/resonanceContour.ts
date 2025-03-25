
// Resonance Contour Field pattern implementation
import { RenderOptions } from "../patternTypes";
import { drawPixelatedLine, drawPixelatedCircle } from './helpers';

// Pattern: Resonance Contour Field - inspired by topographic maps and waveform visualizations
export function drawResonanceContour(
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
  
  // Draw primary contour field
  drawContourLines(p, size, time, pixelSize, isPixelated);
  
  // Draw resonance points at key field intersections
  drawResonancePoints(p, size, time, pixelSize, isPixelated, useColor);
  
  // Draw minimalist vector indicators
  drawVectorIndicators(p, size, time, pixelSize, isPixelated);
  
  // Draw central resonance structure
  drawCentralResonator(p, size, time, pixelSize, isPixelated, useColor);
  
  p.pop();
}

// Draw topographical contour lines visualizing energy fields
function drawContourLines(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean) {
  const maxRadius = size * 0.8;
  const contourCount = 12;
  const contourSpacing = maxRadius / contourCount;
  
  p.noFill();
  p.strokeWeight(pixelSize);
  
  // Draw concentric contour lines with distortions
  for (let i = 1; i <= contourCount; i++) {
    const radius = i * contourSpacing;
    const opacity = 100 - i * 5; // Fade out with distance
    p.stroke(255, opacity);
    
    const distortionFreq = 3 + (i % 3); // Vary the distortion frequency
    const distortionAmp = size * 0.02 * (1 - i/contourCount); // Stronger distortion near center
    
    const resolution = isPixelated ? 20 : 40; // Points per circle
    let prevX, prevY;
    
    for (let j = 0; j <= resolution; j++) {
      const angle = j * p.TWO_PI / resolution;
      
      // Calculate distortion using sine waves and time
      const distortion = p.sin(angle * distortionFreq + time * (0.5 + i * 0.05)) * distortionAmp;
      
      // Apply more distortion based on cardinal directions
      const cardinalDistortion = p.cos(angle * 4 + time * 0.2) * distortionAmp * 0.5;
      
      const distortedRadius = radius + distortion + cardinalDistortion;
      const x = p.cos(angle) * distortedRadius;
      const y = p.sin(angle) * distortedRadius;
      
      if (j > 0) {
        if (isPixelated) {
          drawPixelatedLine(p, prevX, prevY, x, y, pixelSize);
        } else {
          p.line(prevX, prevY, x, y);
        }
      }
      
      prevX = x;
      prevY = y;
    }
    
    // Skip some contours for a more minimal look
    if (i % 3 === 0) {
      i += 1;
    }
  }
}

// Draw resonance points at key intersections of energy fields
function drawResonancePoints(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean, useColor: boolean) {
  const pointCount = 6;
  const fieldRadius = size * 0.5;
  
  // Calculate primary resonance points
  for (let i = 0; i < pointCount; i++) {
    const angle = i * p.TWO_PI / pointCount + time * 0.1;
    
    // Create two orbits
    for (let orbit = 0; orbit < 2; orbit++) {
      const radius = fieldRadius * (0.3 + orbit * 0.4);
      const x = p.cos(angle) * radius;
      const y = p.sin(angle) * radius;
      
      // Simple pulse effect
      const pulseSize = size * 0.015 * (0.8 + 0.2 * p.sin(time * 2 + i + orbit));
      
      // Set color based on mode
      if (useColor) {
        p.stroke(200 + orbit * 55, 220, 255, 120);
      } else {
        p.stroke(255, 100 + orbit * 40);
      }
      
      p.noFill();
      p.strokeWeight(pixelSize);
      
      // Draw resonance point
      if (isPixelated) {
        drawPixelatedCircle(p, x, y, pulseSize, pixelSize);
      } else {
        p.circle(x, y, pulseSize * 2);
      }
      
      // For every other point, draw a connecting line to center
      if (i % 2 === 0 && orbit === 1) {
        if (isPixelated) {
          drawPixelatedLine(p, x, y, 0, 0, pixelSize);
        } else {
          p.line(x, y, 0, 0);
        }
      }
    }
  }
}

// Draw minimalist vector field indicators
function drawVectorIndicators(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean) {
  const indicatorCount = 16;
  const fieldRadius = size * 0.6;
  
  p.stroke(255, 70);
  p.strokeWeight(pixelSize);
  
  // Draw minimal lines indicating force directions
  for (let i = 0; i < indicatorCount; i++) {
    // Distribute around the field with slight time-based rotation
    const angle = i * p.TWO_PI / indicatorCount + time * 0.05;
    const radius = fieldRadius * (0.4 + 0.6 * p.noise(i * 0.2, time * 0.2));
    
    const x = p.cos(angle) * radius;
    const y = p.sin(angle) * radius;
    
    // Calculate vector direction - perpendicular to radial with noise
    const vectorAngle = angle + p.HALF_PI + p.noise(i, time * 0.1) * p.PI * 0.25;
    const vectorLength = size * 0.04 * p.noise(i * 0.5, time * 0.2);
    
    const endX = x + p.cos(vectorAngle) * vectorLength;
    const endY = y + p.sin(vectorAngle) * vectorLength;
    
    // Draw vector indicator
    if (isPixelated) {
      drawPixelatedLine(p, x, y, endX, endY, pixelSize);
    } else {
      p.line(x, y, endX, endY);
    }
    
    // Draw small endpoint for some vectors
    if (i % 3 === 0) {
      if (isPixelated) {
        p.rect(endX - pixelSize/2, endY - pixelSize/2, pixelSize, pixelSize);
      } else {
        p.point(endX, endY);
      }
    }
  }
}

// Draw central resonance structure 
function drawCentralResonator(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean, useColor: boolean) {
  const resonatorSize = size * 0.1;
  
  p.push();
  p.rotate(time * 0.2);
  
  // Draw minimalist geometric resonator - concentric squares with rotation
  for (let i = 4; i > 0; i--) {
    const layerSize = resonatorSize * (i / 4);
    p.stroke(255, 100 + i * 30);
    p.strokeWeight(pixelSize * (i === 1 ? 1.5 : 1));
    p.noFill();
    
    // Alternate between square and diamond shapes
    p.push();
    if (i % 2 === 0) {
      p.rotate(p.PI / 4); // 45-degree rotation for diamond
    }
    
    if (isPixelated) {
      const rectSize = layerSize * p.SQRT2; // Adjust for rotation
      drawPixelatedRect(p, 0, 0, rectSize, rectSize, pixelSize);
    } else {
      p.rect(-layerSize/2, -layerSize/2, layerSize, layerSize);
    }
    p.pop();
  }
  
  // Central point
  p.fill(255);
  p.noStroke();
  if (isPixelated) {
    p.rect(-pixelSize/2, -pixelSize/2, pixelSize, pixelSize);
  } else {
    p.circle(0, 0, pixelSize * 2);
  }
  
  p.pop();
}

// Helper function to draw pixelated rectangle outlines
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
