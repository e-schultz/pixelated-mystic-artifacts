// Recursive Collapse Shrine pattern implementation
import { RenderOptions } from "../patternTypes";
import { drawPixelatedLine, drawPixelatedCircle } from './coreUtils';

export const drawRecursiveCollapseShrine = (p: any, options: RenderOptions) => {
  const { width, height, time, color, density } = options;
  const centerX = width / 2;
  const centerY = height / 2;
  
  // Draw the main shrine structure
  drawShrineCore(p, centerX, centerY, Math.min(width, height) * 0.4, time, color, 5);
  
  // Draw floating elements around the shrine
  drawFloatingCubes(p, centerX, centerY, width, height, time, color);
  
  // Draw the grid floor
  drawGridFloor(p, width, height, time, color);
};

// Draw the central shrine structure with recursive collapsing elements
const drawShrineCore = (p: any, x: number, y: number, size: number, time: number, baseColor: string, levels: number) => {
  // Base case for recursion
  if (levels <= 0 || size < 5) return;
  
  // Determine if we're using color or monochrome
  const useColor = baseColor !== 'monochrome';
  
  // Calculate rotation based on time and level
  const rotation = time * (0.2 - levels * 0.03) + levels * Math.PI / 4;
  
  // Determine the hue for this level
  const levelHue = useColor 
    ? (p.frameCount * 0.5 + levels * 30) % 360 
    : 0;
  
  // Size reduction for next level
  const nextSize = size * 0.75;
  
  p.push();
  p.translate(x, y);
  p.rotate(rotation);
  
  // Draw the outer octagon
  p.noFill();
  if (useColor) {
    p.stroke(levelHue, 100, 100, 200);
    p.strokeWeight(2);
  } else {
    p.stroke(200, 200);
    p.strokeWeight(1.5);
  }
  
  // Draw an octagon
  const sides = 8;
  p.beginShape();
  for (let i = 0; i < sides; i++) {
    const angle = i * p.TWO_PI / sides;
    const px = size * p.cos(angle);
    const py = size * p.sin(angle);
    p.vertex(px, py);
  }
  p.endShape(p.CLOSE);
  
  // Draw connecting lines to create a complex structure
  if (useColor) {
    p.stroke(levelHue, 100, 70, 150);
    p.strokeWeight(1);
  } else {
    p.stroke(170, 150);
    p.strokeWeight(0.5);
  }
  
  // Draw internal connections
  for (let i = 0; i < sides; i += 2) {
    const angle1 = i * p.TWO_PI / sides;
    const px1 = size * 0.9 * p.cos(angle1);
    const py1 = size * 0.9 * p.sin(angle1);
    
    for (let j = i + 1; j < sides; j += 2) {
      const angle2 = j * p.TWO_PI / sides;
      const px2 = size * 0.9 * p.cos(angle2);
      const py2 = size * 0.9 * p.sin(angle2);
      
      p.line(px1, py1, px2, py2);
    }
  }
  
  // Add inner details
  const innerSize = size * 0.7;
  if (useColor) {
    // Use the same levelHue variable that's in scope
    p.stroke(levelHue, 100, 50, 150);
  } else {
    p.stroke(255, 100);
  }
  
  // Glowing center
  const glowHue = (levelHue + 180) % 360; // Complementary color
  if (useColor) {
    p.fill(glowHue, 100, 80, 50);
  } else {
    p.fill(255, 40);
  }
  
  // Draw a central circle
  p.ellipse(0, 0, innerSize, innerSize);
  
  // Add some pixelated details
  if (size > 20) {
    drawPixelatedDetails(p, 0, 0, innerSize, time, levelHue, useColor);
  }
  
  // Recursive call for inner structures
  drawShrineCore(p, 0, 0, nextSize, time, baseColor, levels - 1);
  
  p.pop();
};

// Draw pixelated details for the shrine
const drawPixelatedDetails = (p: any, x: number, y: number, size: number, time: number, hue: number, useColor: boolean) => {
  const pixelSize = 2;
  
  // Draw some pixelated circles
  for (let i = 0; i < 3; i++) {
    const angle = time * 0.5 + i * p.TWO_PI / 3;
    const distance = size * 0.4;
    const px = x + p.cos(angle) * distance;
    const py = y + p.sin(angle) * distance;
    
    if (useColor) {
      const detailHue = (hue + i * 30) % 360;
      drawPixelatedCircle(p, px, py, size * 0.15, pixelSize, p.color(detailHue, 100, 80, 200));
    } else {
      drawPixelatedCircle(p, px, py, size * 0.15, pixelSize, p.color(255, 150));
    }
  }
  
  // Connect the circles with pixelated lines
  if (useColor) {
    p.stroke(hue, 80, 60, 150);
  } else {
    p.stroke(200, 100);
  }
  
  p.strokeWeight(pixelSize);
  p.noFill();
  p.beginShape();
  for (let i = 0; i < 3; i++) {
    const angle = time * 0.5 + i * p.TWO_PI / 3;
    const distance = size * 0.4;
    const px = x + p.cos(angle) * distance;
    const py = y + p.sin(angle) * distance;
    p.vertex(px, py);
  }
  p.endShape(p.CLOSE);
};

// Draw floating cubes around the shrine
const drawFloatingCubes = (p: any, centerX: number, centerY: number, width: number, height: number, time: number, baseColor: string) => {
  // Determine if we're using color or monochrome
  const useColor = baseColor !== 'monochrome';
  
  const numCubes = 12;
  
  for (let i = 0; i < numCubes; i++) {
    const angle = i * p.TWO_PI / numCubes + time * 0.2;
    const distance = Math.min(width, height) * 0.3 + Math.sin(time + i) * 20;
    const x = centerX + p.cos(angle) * distance;
    const y = centerY + p.sin(angle) * distance;
    
    // Vertical oscillation
    const z = p.sin(time * 0.5 + i * 0.5) * 20;
    
    // Size pulsation
    const size = 10 + p.sin(time + i * 0.7) * 5;
    
    p.push();
    p.translate(x, y);
    p.rotateX(time * 0.2 + i);
    p.rotateY(time * 0.3 + i);
    
    if (useColor) {
      const cubeHue = (time * 20 + i * 30) % 360;
      p.stroke(cubeHue, 100, 70);
      p.fill(cubeHue, 100, 50, 150);
    } else {
      p.stroke(200);
      p.fill(50, 150);
    }
    
    // Draw a simple cube
    p.box(size);
    
    p.pop();
  }
};

// Draw a grid floor
const drawGridFloor = (p: any, width: number, height: number, time: number, baseColor: string) => {
  // Determine if we're using color or monochrome
  const useColor = baseColor !== 'monochrome';
  
  const gridSize = 20;
  const gridExtent = Math.max(width, height) * 0.7;
  
  p.push();
  p.translate(width / 2, height / 2);
  
  // Rotate the grid for a perspective effect
  p.rotateX(p.PI / 3);
  p.rotateZ(time * 0.05);
  
  p.stroke(useColor ? p.color(180, 100, 50, 150) : p.color(150, 100));
  p.strokeWeight(1);
  p.noFill();
  
  // Draw grid lines
  for (let x = -gridExtent; x <= gridExtent; x += gridSize) {
    p.line(x, -gridExtent, x, gridExtent);
  }
  
  for (let y = -gridExtent; y <= gridExtent; y += gridSize) {
    p.line(-gridExtent, y, gridExtent, y);
  }
  
  p.pop();
};
