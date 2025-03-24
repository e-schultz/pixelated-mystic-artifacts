
// Core utility functions for geometry rendering

// Helper function to determine if a point is inside a triangle
export const isPointInTriangle = (
  p5: any, 
  px: number, py: number,
  x1: number, y1: number,
  x2: number, y2: number,
  x3: number, y3: number
) => {
  // Calculate barycentric coordinates
  const denominator = ((y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3));
  
  // Avoid division by zero
  if (denominator === 0) return false;
  
  const a = ((y2 - y3) * (px - x3) + (x3 - x2) * (py - y3)) / denominator;
  const b = ((y3 - y1) * (px - x3) + (x1 - x3) * (py - y3)) / denominator;
  const c = 1 - a - b;
  
  // Check if point is inside triangle
  return a >= 0 && a <= 1 && b >= 0 && b <= 1 && c >= 0 && c <= 1;
};

// Drawing a pixelated line 
export const drawPixelatedLine = (p5: any, x1: number, y1: number, x2: number, y2: number, pixelSize: number, color: string) => {
  p5.noStroke();
  p5.fill(color);
  
  const d = p5.dist(x1, y1, x2, y2);
  const numPoints = Math.ceil(d / pixelSize);
  
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const x = p5.lerp(x1, x2, t);
    const y = p5.lerp(y1, y2, t);
    p5.rect(x, y, pixelSize, pixelSize);
  }
};

// Creating pixelated circle
export const drawPixelatedCircle = (p5: any, x: number, y: number, radius: number, pixelSize: number, color: string) => {
  p5.noStroke();
  p5.fill(color);
  
  for (let px = x - radius; px < x + radius; px += pixelSize) {
    for (let py = y - radius; py < y + radius; py += pixelSize) {
      // Check if point is within circle
      if (p5.dist(x, y, px, py) <= radius) {
        p5.rect(px, py, pixelSize, pixelSize);
      }
    }
  }
};

// Drawing a pixelated triangle
export const drawPixelatedTriangle = (
  p5: any, 
  x1: number, y1: number, 
  x2: number, y2: number, 
  x3: number, y3: number,
  pixelSize: number, 
  color: string
) => {
  // Find bounding box
  const minX = Math.min(x1, x2, x3);
  const maxX = Math.max(x1, x2, x3);
  const minY = Math.min(y1, y2, y3);
  const maxY = Math.max(y1, y2, y3);
  
  p5.noStroke();
  p5.fill(color);
  
  // Check each pixel in the bounding box
  for (let x = minX; x <= maxX; x += pixelSize) {
    for (let y = minY; y <= maxY; y += pixelSize) {
      if (isPointInTriangle(p5, x, y, x1, y1, x2, y2, x3, y3)) {
        p5.rect(x, y, pixelSize, pixelSize);
      }
    }
  }
};

// Draw a gradient line
export const drawGradientLine = (
  p5: any, 
  x1: number, y1: number, 
  x2: number, y2: number, 
  pixelSize: number, 
  startColor: string, 
  endColor: string
) => {
  const d = p5.dist(x1, y1, x2, y2);
  const numPoints = Math.ceil(d / pixelSize);
  
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const x = p5.lerp(x1, x2, t);
    const y = p5.lerp(y1, y2, t);
    
    // Linear interpolation between colors
    const r1 = p5.red(p5.color(startColor));
    const g1 = p5.green(p5.color(startColor));
    const b1 = p5.blue(p5.color(startColor));
    const a1 = p5.alpha(p5.color(startColor)) / 255;
    
    const r2 = p5.red(p5.color(endColor));
    const g2 = p5.green(p5.color(endColor));
    const b2 = p5.blue(p5.color(endColor));
    const a2 = p5.alpha(p5.color(endColor)) / 255;
    
    const r = p5.lerp(r1, r2, t);
    const g = p5.lerp(g1, g2, t);
    const b = p5.lerp(b1, b2, t);
    const a = p5.lerp(a1, a2, t);
    
    p5.fill(`rgba(${r}, ${g}, ${b}, ${a})`);
    p5.noStroke();
    p5.rect(x, y, pixelSize, pixelSize);
  }
};
