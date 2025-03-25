
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
  
  // Create pulsing grid with time-based color shifts
  const pulseIntensity = Math.sin(time * 0.3) * 0.5 + 0.5;
  const baseHue = (time * 5) % 360;
  
  // Wave parameters with time-based modulation
  const baseFrequency = 0.15;
  const frequencyModulation = 0.1 * Math.sin(time * 0.4) + 0.15;
  const baseAmplitude = gridSpacing * 0.7;
  const amplitudeModulation = 0.5 * Math.sin(time * 0.3) + 0.6;
  
  // Base color for the harmonic grid
  const baseColor = p.color(baseHue, 70, 90, 160 + pulseIntensity * 30);
  const accentColor = p.color((baseHue + 180) % 360, 80, 90, 180);
  
  p.strokeWeight(pixelSize);
  p.noFill();
  
  // Draw horizontal harmonic waves with color variation
  for (let i = -gridDensity/2; i <= gridDensity/2; i += 1) {
    const y = i * gridSpacing;
    
    // Skip some lines for aesthetic
    if (i % 2 !== 0) continue;
    
    // Color variation based on position and time
    const hueOffset = (i * 5 + time * 10) % 30;
    p.stroke(p.lerpColor(baseColor, accentColor, Math.abs(i) / (gridDensity/2) * pulseIntensity));
    
    // Sample points for this wave
    const points = [];
    for (let x = -halfGridSize; x <= halfGridSize; x += pixelSize * 2) {
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
  
  // Draw vertical harmonic waves with different phase and color
  for (let i = -gridDensity/2; i <= gridDensity/2; i += 1) {
    const x = i * gridSpacing;
    
    // Only draw some vertical lines for aesthetics
    if (i % 3 !== 0) continue;
    
    // Use complementary color for vertical lines
    p.stroke(p.lerpColor(accentColor, baseColor, Math.abs(i) / (gridDensity/2) * (1-pulseIntensity)));
    
    const points = [];
    for (let y = -halfGridSize; y <= halfGridSize; y += pixelSize * 2) {
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
  
  // Draw circular wave ripples
  const rippleCount = 3;
  for (let r = 0; r < rippleCount; r++) {
    const rippleTime = (time * (0.2 + r * 0.1)) % 1;
    const rippleRadius = halfGridSize * rippleTime;
    const rippleAlpha = 255 * (1 - rippleTime);
    
    p.stroke(p.color((baseHue + 140) % 360, 90, 95, rippleAlpha));
    p.strokeWeight(pixelSize * 0.8);
    
    if (isPixelated) {
      drawPixelatedCircle(p, 0, 0, rippleRadius * 2, pixelSize);
    } else {
      p.circle(0, 0, rippleRadius * 2);
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
  
  // Base hue that shifts over time
  const baseHue = (time * 5) % 360;
  const pulseIntensity = Math.sin(time * 0.3) * 0.5 + 0.5;
  
  // Draw shrine with recursive structure
  drawRecursiveShrine(p, 0, 0, shrineSize, iterations, time, pixelSize, isPixelated, baseHue, pulseIntensity);
  
  // Draw central mandala
  drawCentralMandala(p, 0, 0, shrineSize * 0.3, time, pixelSize, isPixelated, baseHue);
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
  isPixelated: boolean,
  baseHue: number,
  pulseIntensity: number
) {
  if (iterations <= 0) return;
  
  // Color parameters based on iteration depth
  const opacity = 80 + iterations * 30;
  const hue = (baseHue + iterations * 30) % 360;
  p.stroke(hue, 70 + iterations * 5, 90, opacity);
  p.strokeWeight(pixelSize * (iterations > 3 ? 1.5 : 1));
  p.noFill();
  
  // Draw this level's shrine element (geometric shape)
  const sides = iterations + 3; // More sides for smaller iterations
  drawShrinePolygon(p, x, y, size, sides, time * (iterations * 0.1), pixelSize, isPixelated);
  
  // Recursively draw smaller shrines
  const newSize = size * 0.6;
  const offset = size * 0.3;
  
  // Calculate positions for recursive elements with harmonic offsets
  for (let i = 0; i < sides; i++) {
    // Skip some iterations for better performance and aesthetics
    if (iterations < 3 && i % 2 !== 0) continue;
    
    const angle = i * p.TWO_PI / sides + time * 0.2;
    // Add harmonic movement to the recursive elements
    const harmonic = Math.sin(time * 2 + i) * 0.1 * pulseIntensity * size;
    const nx = x + Math.cos(angle) * (offset + harmonic);
    const ny = y + Math.sin(angle) * (offset + harmonic);
    
    // Recursive call with smaller size and decreased iteration
    drawRecursiveShrine(p, nx, ny, newSize, iterations - 1, time, pixelSize, isPixelated, baseHue, pulseIntensity);
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
  
  // Add inner structure for more detail
  if (sides > 4) {
    p.push();
    p.rotate(-rotation * 0.5);
    
    // Inner polygon
    const innerSize = size * 0.6;
    const innerPoints = [];
    for (let i = 0; i < sides; i++) {
      const angle = i * p.TWO_PI / sides + p.PI / sides;
      const px = Math.cos(angle) * innerSize;
      const py = Math.sin(angle) * innerSize;
      innerPoints.push({ x: px, y: py });
    }
    
    // Connect alternating points to create star pattern
    for (let i = 0; i < sides; i++) {
      const next = (i + Math.floor(sides / 2)) % sides;
      if (isPixelated) {
        drawPixelatedLine(p, innerPoints[i].x, innerPoints[i].y, innerPoints[next].x, innerPoints[next].y, pixelSize);
      } else {
        p.line(innerPoints[i].x, innerPoints[i].y, innerPoints[next].x, innerPoints[next].y);
      }
    }
    
    p.pop();
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
  isPixelated: boolean,
  baseHue: number
) {
  p.push();
  p.translate(x, y);
  
  // Pulsating effect
  const pulseFactor = Math.sin(time * 0.8) * 0.15 + 1;
  const glowIntensity = Math.sin(time * 0.5) * 0.4 + 0.6;
  
  // Draw central circle with glow effect
  if (!isPixelated) {
    // Glow effect (only for non-pixelated mode)
    for (let i = 5; i > 0; i--) {
      const glowSize = size * 0.6 * pulseFactor * (1 + i * 0.15);
      p.stroke(baseHue, 80, 90, 10 * i * glowIntensity);
      p.strokeWeight(pixelSize * 3);
      p.circle(0, 0, glowSize);
    }
  }
  
  // Draw main central circle
  p.stroke(baseHue, 80, 95, 200);
  p.strokeWeight(pixelSize * 1.5);
  p.fill(baseHue, 70, 90, 50);
  
  if (isPixelated) {
    drawPixelatedCircle(p, 0, 0, size * 0.6 * pulseFactor, pixelSize);
  } else {
    p.circle(0, 0, size * 0.6 * pulseFactor);
  }
  
  // Draw flower petals with enhanced aesthetics
  const petalCount = 12;
  const innerPetalCount = 6;
  
  // Outer petals
  p.noFill();
  p.stroke(baseHue, 70, 95, 180);
  p.strokeWeight(pixelSize);
  
  for (let i = 0; i < petalCount; i++) {
    const angle = i * p.TWO_PI / petalCount + time * 0.3;
    const petalSize = size * (0.7 + Math.sin(time * 0.7 + i) * 0.1);
    const petalX = Math.cos(angle) * petalSize * 0.7;
    const petalY = Math.sin(angle) * petalSize * 0.7;
    
    // Draw petal
    p.push();
    p.translate(petalX * 0.5, petalY * 0.5);
    p.rotate(angle + p.PI/2);
    
    // Petal shape
    if (isPixelated) {
      drawPixelatedCircle(p, 0, 0, size * 0.2, pixelSize);
    } else {
      p.ellipse(0, 0, size * 0.3, size * 0.5);
    }
    
    p.pop();
  }
  
  // Inner petals with contrasting color
  p.stroke((baseHue + 180) % 360, 80, 95, 200);
  
  for (let i = 0; i < innerPetalCount; i++) {
    const angle = i * p.TWO_PI / innerPetalCount + time * -0.2 + p.PI / innerPetalCount;
    const petalSize = size * 0.4;
    const petalX = Math.cos(angle) * petalSize * 0.7;
    const petalY = Math.sin(angle) * petalSize * 0.7;
    
    p.push();
    p.translate(petalX * 0.5, petalY * 0.5);
    p.rotate(angle + p.PI/2);
    
    if (isPixelated) {
      drawPixelatedCircle(p, 0, 0, size * 0.12, pixelSize);
    } else {
      p.ellipse(0, 0, size * 0.18, size * 0.3);
    }
    
    p.pop();
  }
  
  // Draw orbiting particles with enhanced trail effect
  const particleCount = 8;
  const particleTrailLength = 5;
  
  for (let i = 0; i < particleCount; i++) {
    const speed = 0.5 + (i % 3) * 0.2;
    const angle = i * p.TWO_PI / particleCount + time * speed;
    const distance = size * (0.8 + Math.sin(time * 0.8 + i) * 0.1);
    
    // Draw particle with trail
    for (let t = 0; t < particleTrailLength; t++) {
      const trailAngle = angle - (t * 0.1);
      const trailDistance = distance - (t * 2);
      const alpha = 255 * (1 - t/particleTrailLength);
      
      const particleX = Math.cos(trailAngle) * trailDistance;
      const particleY = Math.sin(trailAngle) * trailDistance;
      
      // Particle color based on position
      const particleHue = (baseHue + i * 30) % 360;
      p.stroke(particleHue, 90, 95, alpha);
      p.strokeWeight(pixelSize * (1.5 - t * 0.2));
      
      p.point(particleX, particleY);
    }
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
  // Set up color mode for more vibrant colors
  p.colorMode(p.HSB, 360, 100, 100, 255);
  
  p.push();
  p.translate(centerX, centerY);
  
  const pixelSize = isPixelated ? 2 : 1;
  
  // Draw the harmonic wave grid as the background/foundation
  drawHarmonicGrid(p, size, time, pixelSize, isPixelated);
  
  // Draw the fractal shrine structure on top
  drawFractalShrine(p, size, time, pixelSize, isPixelated);
  
  // Reset color mode back to RGB for compatibility with other patterns
  p.colorMode(p.RGB, 255, 255, 255, 255);
  
  p.pop();
}
