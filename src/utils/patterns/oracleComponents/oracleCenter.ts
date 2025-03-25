
import { drawPixelatedLine, drawPixelatedCircle } from '../helpers';

// Draw the oracle crystalline center
export function drawOracleCenter(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean, useColor: boolean) {
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
