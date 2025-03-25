
// Fractal Harmonic Shrine pattern implementation
import { RenderOptions } from "../patternTypes";
import { drawPixelatedLine, drawPixelatedCircle } from './helpers';

// Pattern: Fractal Harmonic Shrine
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
  
  // Get isTerminalMode from options if available
  const isTerminalMode = options?.isTerminalMode || false;
  const isLowPerformanceMode = options?.isLowPerformanceMode || false;
  
  // Use color only if terminal mode is enabled
  const useColor = isTerminalMode;
  
  // Draw harmonic wave grid as base
  drawHarmonicGrid(p, size, time, pixelSize, isPixelated, useColor, isLowPerformanceMode);
  
  // Draw shrine structure
  drawWireframeShrine(p, size, time, pixelSize, isPixelated, useColor);
  
  // Draw fractal recursions
  drawFractalElements(p, size, time, pixelSize, isPixelated, useColor, isLowPerformanceMode);
  
  p.pop();
}

// Draw harmonic wave grid
function drawHarmonicGrid(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean, useColor: boolean, isLowPerformanceMode: boolean) {
  const gridSize = size * 0.8;
  const lineCount = isLowPerformanceMode ? 8 : 12;
  
  p.stroke(255, 40);
  p.strokeWeight(pixelSize);
  p.noFill();
  
  // Draw horizontal wave lines
  for (let i = -lineCount/2; i <= lineCount/2; i++) {
    const y = (i / (lineCount/2)) * gridSize;
    
    let prevX = -gridSize;
    let prevY = y;
    
    // Draw with fewer points in low performance mode
    const steps = isLowPerformanceMode ? 6 : 12;
    
    for (let j = 0; j <= steps; j++) {
      const x = -gridSize + j * (gridSize * 2) / steps;
      const waveY = y + p.sin(x * 0.01 + time + i * 0.2) * (size * 0.05);
      
      if (j > 0) {
        if (isPixelated) {
          drawPixelatedLine(p, prevX, prevY, x, waveY, pixelSize);
        } else {
          p.line(prevX, prevY, x, waveY);
        }
      }
      
      prevX = x;
      prevY = waveY;
    }
  }
  
  // Draw vertical wave lines (fewer to reduce density)
  for (let i = -lineCount/2; i <= lineCount/2; i += 2) {
    const x = (i / (lineCount/2)) * gridSize;
    
    let prevX = x;
    let prevY = -gridSize;
    
    const steps = isLowPerformanceMode ? 6 : 12;
    
    for (let j = 0; j <= steps; j++) {
      const y = -gridSize + j * (gridSize * 2) / steps;
      const waveX = x + p.sin(y * 0.01 + time * 1.3 + i * 0.2) * (size * 0.05);
      
      if (j > 0) {
        if (isPixelated) {
          drawPixelatedLine(p, prevX, prevY, waveX, y, pixelSize);
        } else {
          p.line(prevX, prevY, waveX, y);
        }
      }
      
      prevX = waveX;
      prevY = y;
    }
  }
}

// Draw wireframe shrine structure
function drawWireframeShrine(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean, useColor: boolean) {
  p.push();
  
  // Basic parameters
  const levels = 3; // Fewer levels for wireframe look
  const baseSize = size * 0.3;
  
  for (let i = 0; i < levels; i++) {
    const levelY = (i * size * 0.06) - (size * 0.1); // Stack vertically
    const levelSize = baseSize * (1 - (i * 0.2)); // Decrease size with each level
    const rotation = time * (0.1 + i * 0.05) + (i * p.PI / 4); // Different rotation for each level
    
    p.push();
    p.translate(0, levelY);
    p.rotate(rotation);
    
    // Set color based on settings
    if (useColor) {
      const hue = (i * 40 + time * 10) % 360;
      p.stroke(hue, 100, 100, 100);
    } else {
      p.stroke(255, 100 + i * 30);
    }
    p.strokeWeight(pixelSize);
    p.noFill();
    
    // Draw octagonal wireframe for each level
    const sides = 8;
    const vertices = [];
    
    for (let j = 0; j < sides; j++) {
      const angle = j * p.TWO_PI / sides;
      const x = p.cos(angle) * levelSize;
      const y = p.sin(angle) * levelSize;
      vertices.push({ x, y });
    }
    
    // Connect vertices with lines
    for (let j = 0; j < vertices.length; j++) {
      const next = (j + 1) % vertices.length;
      if (isPixelated) {
        drawPixelatedLine(p, vertices[j].x, vertices[j].y, vertices[next].x, vertices[next].y, pixelSize);
      } else {
        p.line(vertices[j].x, vertices[j].y, vertices[next].x, vertices[next].y);
      }
    }
    
    // Add cross connections for more wireframe aesthetic (only on some levels)
    if (i % 2 === 0) {
      for (let j = 0; j < vertices.length/2; j++) {
        const opposite = (j + vertices.length/2) % vertices.length;
        if (isPixelated) {
          drawPixelatedLine(p, vertices[j].x, vertices[j].y, vertices[opposite].x, vertices[opposite].y, pixelSize);
        } else {
          p.line(vertices[j].x, vertices[j].y, vertices[opposite].x, vertices[opposite].y);
        }
      }
    }
    
    p.pop();
  }
  
  p.pop();
}

// Draw fractal elements with recursion
function drawFractalElements(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean, useColor: boolean, isLowPerformanceMode: boolean) {
  // Draw a few nested triangles with recursion
  const depth = isLowPerformanceMode ? 2 : 3;
  const initialSize = size * 0.4;
  
  p.push();
  p.rotate(time * 0.1);
  
  // Define recursive function
  const drawFractalTriangle = (x: number, y: number, triSize: number, depth: number) => {
    if (depth <= 0) return;
    
    // Draw current triangle
    const vertices = [];
    
    for (let i = 0; i < 3; i++) {
      const angle = i * p.TWO_PI / 3 + time * 0.05;
      const vx = x + p.cos(angle) * triSize;
      const vy = y + p.sin(angle) * triSize;
      vertices.push({ x: vx, y: vy });
    }
    
    // Set color based on depth
    if (useColor) {
      const hue = (depth * 60 + time * 20) % 360;
      p.stroke(hue, 100, 100, 140 - depth * 20);
    } else {
      p.stroke(255, 120 - depth * 20);
    }
    
    // Draw triangle edges
    for (let i = 0; i < vertices.length; i++) {
      const next = (i + 1) % vertices.length;
      if (isPixelated) {
        drawPixelatedLine(p, vertices[i].x, vertices[i].y, vertices[next].x, vertices[next].y, pixelSize);
      } else {
        p.line(vertices[i].x, vertices[i].y, vertices[next].x, vertices[next].y);
      }
    }
    
    // Draw recursive triangles
    const newSize = triSize * 0.5;
    const newDepth = depth - 1;
    
    // Only recurse on specific points for wire-frame aesthetic
    for (let i = 0; i < vertices.length; i++) {
      drawFractalTriangle(vertices[i].x, vertices[i].y, newSize, newDepth);
    }
  };
  
  // Start recursive drawing
  drawFractalTriangle(0, 0, initialSize, depth);
  
  p.pop();
}
