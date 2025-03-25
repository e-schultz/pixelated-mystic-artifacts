
// Fractal Harmonic Shrine pattern - combines elements of RecursiveCollapseShrine with SineWaveGrid
import { RenderOptions } from "../patternTypes";
import { drawPixelatedCircle, drawPixelatedLine } from './helpers';

// Draw the harmonic wave grid that will be the foundation of our pattern
function drawHarmonicGrid(
  p: any, 
  size: number, 
  time: number, 
  pixelSize: number,
  isPixelated: boolean
) {
  const gridSize = size * 0.9;
  const gridDensity = 16;
  const gridSpacing = gridSize / gridDensity;
  const halfGridSize = gridSize / 2;
  
  // Wave parameters with time-based modulation
  const baseFrequency = 0.15;
  const frequencyModulation = 0.1 * Math.sin(time * 0.4) + 0.15;
  const baseAmplitude = gridSpacing * 0.7;
  const amplitudeModulation = 0.5 * Math.sin(time * 0.3) + 0.6;
  
  p.stroke(160, 140, 245, 180); // Purple-ish color
  p.strokeWeight(pixelSize);
  p.noFill();
  
  // Draw horizontal harmonic waves
  for (let i = -gridDensity/2; i <= gridDensity/2; i += 2) {
    const y = i * gridSpacing;
    
    // Sample points for this wave
    const points = [];
    for (let x = -halfGridSize; x <= halfGridSize; x += pixelSize * 3) {
      // Calculate fractal harmonic waves (multiple layered sine waves)
      const primaryWave = Math.sin(x * baseFrequency + time) * baseAmplitude;
      const secondaryWave = Math.sin(x * (baseFrequency * 1.5) + time * 0.7) * (baseAmplitude * 0.5 * amplitudeModulation);
      const tertiaryWave = Math.sin(x * (baseFrequency * 3) + time * 1.3) * (baseAmplitude * 0.25 * amplitudeModulation);
      
      // Combine waves with fractal self-similarity
      const finalY = y + primaryWave + secondaryWave + tertiaryWave;
      points.push({ x, y: finalY });
    }
    
    // Draw the wave
    for (let j = 0; j < points.length - 1; j++) {
      if (isPixelated) {
        drawPixelatedLine(p, points[j].x, points[j].y, points[j+1].x, points[j+1].y, pixelSize);
      } else {
        p.line(points[j].x, points[j].y, points[j+1].x, points[j+1].y);
      }
    }
  }
  
  // Draw vertical harmonic waves with different phase
  for (let i = -gridDensity/2; i <= gridDensity/2; i += 3) {
    const x = i * gridSpacing;
    
    // Only draw some vertical lines for aesthetics
    if (Math.abs(i) % 4 !== 0) continue;
    
    const points = [];
    for (let y = -halfGridSize; y <= halfGridSize; y += pixelSize * 3) {
      // Calculate fractal harmonic waves with phase shift
      const primaryWave = Math.sin(y * baseFrequency * 0.7 + time * 1.2) * baseAmplitude;
      const secondaryWave = Math.sin(y * (baseFrequency * 1.2) + time * 0.5) * (baseAmplitude * 0.6 * amplitudeModulation);
      
      // Combine waves
      const finalX = x + primaryWave + secondaryWave;
      points.push({ x: finalX, y });
    }
    
    // Draw the wave
    for (let j = 0; j < points.length - 1; j++) {
      if (isPixelated) {
        drawPixelatedLine(p, points[j].x, points[j].y, points[j+1].x, points[j+1].y, pixelSize);
      } else {
        p.line(points[j].x, points[j].y, points[j+1].x, points[j+1].y);
      }
    }
  }
}

// Draw the shrine structure at the center
function drawFractalShrine(
  p: any,
  size: number,
  time: number,
  pixelSize: number,
  isPixelated: boolean
) {
  // Core shrine parameters
  const shrineSize = size * 0.5;
  const iterations = 5; // Number of fractal iterations
  
  // Draw shrine with recursive structure
  drawRecursiveShrine(p, 0, 0, shrineSize, iterations, time, pixelSize, isPixelated);
  
  // Draw central mandala
  drawCentralMandala(p, 0, 0, shrineSize * 0.3, time, pixelSize, isPixelated);
}

// Recursive function to draw shrine elements at different scales
function drawRecursiveShrine(
  p: any,
  x: number,
  y: number,
  size: number,
  iterations: number,
  time: number,
  pixelSize: number,
  isPixelated: boolean
) {
  if (iterations <= 0) return;
  
  // Color parameters based on iteration depth
  const opacity = 100 + iterations * 25;
  p.stroke(200, 180, 255, opacity);
  p.strokeWeight(pixelSize);
  p.noFill();
  
  // Draw this level's shrine element (geometric shape)
  const sides = iterations + 3; // More sides for smaller iterations
  drawShrinePolygon(p, x, y, size, sides, time * (iterations * 0.1), pixelSize, isPixelated);
  
  // Recursively draw smaller shrines
  const newSize = size * 0.6;
  const offset = size * 0.3;
  
  // Calculate positions for recursive elements with harmonic offsets
  for (let i = 0; i < sides; i++) {
    const angle = i * p.TWO_PI / sides + time * 0.2;
    const nx = x + Math.cos(angle) * offset;
    const ny = y + Math.sin(angle) * offset;
    
    // Recursive call with smaller size and decreased iteration
    drawRecursiveShrine(p, nx, ny, newSize, iterations - 1, time, pixelSize, isPixelated);
  }
}

// Draw a single polygon of the shrine
function drawShrinePolygon(
  p: any,
  x: number,
  y: number,
  size: number,
  sides: number,
  rotation: number,
  pixelSize: number,
  isPixelated: boolean
) {
  p.push();
  p.translate(x, y);
  p.rotate(rotation);
  
  // Draw the polygon
  const points = [];
  for (let i = 0; i < sides; i++) {
    const angle = i * p.TWO_PI / sides;
    const px = Math.cos(angle) * size;
    const py = Math.sin(angle) * size;
    points.push({ x: px, y: py });
  }
  
  // Connect all points
  for (let i = 0; i < points.length; i++) {
    const next = (i + 1) % points.length;
    if (isPixelated) {
      drawPixelatedLine(p, points[i].x, points[i].y, points[next].x, points[next].y, pixelSize);
    } else {
      p.line(points[i].x, points[i].y, points[next].x, points[next].y);
    }
  }
  
  p.pop();
}

// Draw the central mandala flower pattern
function drawCentralMandala(
  p: any,
  x: number,
  y: number,
  size: number,
  time: number,
  pixelSize: number,
  isPixelated: boolean
) {
  p.push();
  p.translate(x, y);
  
  // Draw central circle
  p.stroke(235, 220, 255, 200);
  p.strokeWeight(pixelSize);
  p.noFill();
  
  if (isPixelated) {
    drawPixelatedCircle(p, 0, 0, size * 0.3, pixelSize);
  } else {
    p.circle(0, 0, size * 0.6);
  }
  
  // Draw flower petals
  const petalCount = 12;
  p.stroke(215, 180, 255, 180);
  
  for (let i = 0; i < petalCount; i++) {
    const angle = i * p.TWO_PI / petalCount + time * 0.3;
    const petalX = Math.cos(angle) * size * 0.7;
    const petalY = Math.sin(angle) * size * 0.7;
    
    // Draw petal
    p.push();
    p.translate(petalX * 0.5, petalY * 0.5);
    p.rotate(angle + p.PI/2);
    
    // Petal shape
    if (isPixelated) {
      drawPixelatedCircle(p, 0, 0, size * 0.15, pixelSize);
    } else {
      p.ellipse(0, 0, size * 0.3, size * 0.5);
    }
    
    p.pop();
  }
  
  // Draw orbiting particles
  p.stroke(255, 255, 255, 200);
  p.strokeWeight(pixelSize * 1.5);
  
  const particleCount = 8;
  for (let i = 0; i < particleCount; i++) {
    const speed = 0.5 + (i % 3) * 0.2;
    const angle = i * p.TWO_PI / particleCount + time * speed;
    const distance = size * (0.8 + Math.sin(time * 0.8 + i) * 0.1);
    
    const particleX = Math.cos(angle) * distance;
    const particleY = Math.sin(angle) * distance;
    
    p.point(particleX, particleY);
  }
  
  p.pop();
}

// Main pattern drawing function
export function drawFractalHarmonicShrine(
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
  
  // Draw the harmonic wave grid as the background/foundation
  drawHarmonicGrid(p, size, time, pixelSize, isPixelated);
  
  // Draw the fractal shrine structure on top
  drawFractalShrine(p, size, time, pixelSize, isPixelated);
  
  p.pop();
}
