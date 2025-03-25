
import { drawPixelatedLine } from '../helpers';

// Draw wavy connections between nodes
export function drawWavyConnection(
  p: any, 
  x1: number, 
  y1: number, 
  x2: number, 
  y2: number, 
  time: number, 
  seed: number, 
  pixelSize: number
) {
  // Calculate angle and distance between points
  const angle = p.atan2(y2 - y1, x2 - x1);
  const dist = p.dist(x1, y1, x2, y2);
  
  // Determine number of segments based on distance
  const segments = Math.max(5, Math.min(20, Math.floor(dist / 15)));
  
  // Wave parameters
  const waveFrequency = 0.2 + (seed % 5) * 0.05;
  const waveAmplitude = 5 + (seed % 3) * 2;
  const wavePhase = time * 0.5 + seed * 0.2;
  
  // Generate points along wavy path
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    
    // Linear interpolation for base position
    const x = p.lerp(x1, x2, t);
    const y = p.lerp(y1, y2, t);
    
    // Calculate perpendicular direction for wave offset
    const perpX = -Math.sin(angle);
    const perpY = Math.cos(angle);
    
    // Apply sine wave offset perpendicular to line
    const wave = Math.sin(t * Math.PI * waveFrequency * segments + wavePhase) * waveAmplitude;
    const offsetX = perpX * wave;
    const offsetY = perpY * wave;
    
    points.push({
      x: x + offsetX,
      y: y + offsetY
    });
  }
  
  // Draw the wavy line
  for (let i = 0; i < points.length - 1; i++) {
    if (pixelSize > 1) {
      drawPixelatedLine(p, points[i].x, points[i].y, points[i+1].x, points[i+1].y, pixelSize);
    } else {
      p.line(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
    }
  }
}
