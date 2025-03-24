
// Sacred geometry utility functions
export interface GeometrySettings {
  scale: number;
  rotation: number;
  opacity: number;
  segments: number;
  variance: number;
  pixelSize: number;
  color: string;
  speed: number;
}

// Get default settings with optional overrides
export const getDefaultSettings = (overrides: Partial<GeometrySettings> = {}): GeometrySettings => ({
  scale: 0.8,
  rotation: 0,
  opacity: 0.9,
  segments: 8,
  variance: 0.2,
  pixelSize: 3,
  color: "#f0f0e4",
  speed: 0.005,
  ...overrides
});

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

// Draw a sacred metatron cube
export const drawMetatronCube = (p5: any, x: number, y: number, size: number, settings: GeometrySettings) => {
  const { rotation, pixelSize, color } = settings;
  
  p5.push();
  p5.translate(x, y);
  p5.rotate(rotation);
  
  // Draw outer circle
  drawPixelatedCircle(p5, 0, 0, size, pixelSize, color);
  
  // Inner structure
  p5.noFill();
  p5.stroke(color);
  p5.strokeWeight(pixelSize);
  
  // Draw inner hexagon
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = i * p5.TWO_PI / 6;
    const px = size * 0.7 * p5.cos(angle);
    const py = size * 0.7 * p5.sin(angle);
    points.push({ x: px, y: py });
    
    // Draw circles at vertices
    drawPixelatedCircle(p5, px, py, size * 0.15, pixelSize, color);
  }
  
  // Connect points with pixelated lines
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      drawPixelatedLine(p5, points[i].x, points[i].y, points[j].x, points[j].y, pixelSize, color);
    }
  }
  
  p5.pop();
};

// Draw a flower of life pattern
export const drawFlowerOfLife = (p5: any, x: number, y: number, size: number, settings: GeometrySettings) => {
  const { segments, rotation, pixelSize, color } = settings;
  const radius = size / 4;
  
  p5.push();
  p5.translate(x, y);
  p5.rotate(rotation);
  
  // Center circle
  drawPixelatedCircle(p5, 0, 0, radius, pixelSize, color);
  
  // First ring of circles
  for (let i = 0; i < 6; i++) {
    const angle = i * p5.TWO_PI / 6;
    const px = radius * 2 * p5.cos(angle);
    const py = radius * 2 * p5.sin(angle);
    drawPixelatedCircle(p5, px, py, radius, pixelSize, color);
  }
  
  // Second ring of circles (optional for more complexity)
  if (segments > 6) {
    for (let i = 0; i < 12; i++) {
      const angle = i * p5.TWO_PI / 12 + p5.PI / 12;
      const px = radius * 4 * p5.cos(angle);
      const py = radius * 4 * p5.sin(angle);
      drawPixelatedCircle(p5, px, py, radius, pixelSize, color);
    }
  }
  
  p5.pop();
};

// Draw a Sri Yantra
export const drawSriYantra = (p5: any, x: number, y: number, size: number, settings: GeometrySettings) => {
  const { rotation, pixelSize, color } = settings;
  
  p5.push();
  p5.translate(x, y);
  p5.rotate(rotation);
  
  // Outer circle
  drawPixelatedCircle(p5, 0, 0, size, pixelSize, color);
  
  // Draw triangles
  const layers = 4;
  for (let i = 0; i < layers; i++) {
    const scale = 1 - i * 0.2;
    
    // Upward triangle
    drawPixelatedTriangle(
      p5,
      0, -size * scale * 0.8, 
      -size * scale * 0.7, size * scale * 0.4, 
      size * scale * 0.7, size * scale * 0.4,
      pixelSize, color
    );
    
    // Downward triangle (slightly smaller)
    if (i < layers - 1) {
      drawPixelatedTriangle(
        p5,
        0, size * scale * 0.7, 
        -size * scale * 0.6, -size * scale * 0.3, 
        size * scale * 0.6, -size * scale * 0.3,
        pixelSize, color
      );
    }
  }
  
  // Center dot (bindu)
  drawPixelatedCircle(p5, 0, 0, size * 0.05, pixelSize, color);
  
  p5.pop();
};

// Draw a Metatron's Cube 
export const drawMeditationCube = (p5: any, x: number, y: number, size: number, settings: GeometrySettings) => {
  const { rotation, pixelSize, color } = settings;
  
  p5.push();
  p5.translate(x, y);
  p5.rotate(rotation);
  
  // Center point
  drawPixelatedCircle(p5, 0, 0, size * 0.05, pixelSize, color);
  
  // Outer circle
  drawPixelatedCircle(p5, 0, 0, size, pixelSize, color);
  
  // Star pattern
  const points = [];
  const numPoints = 12;
  
  for (let i = 0; i < numPoints; i++) {
    const angle = i * p5.TWO_PI / numPoints;
    const innerRadius = (i % 2 === 0) ? size * 0.4 : size * 0.8;
    
    const px = innerRadius * p5.cos(angle);
    const py = innerRadius * p5.sin(angle);
    
    points.push({ x: px, y: py });
    
    // Draw small circles at points
    if (i % 3 === 0) {
      drawPixelatedCircle(p5, px, py, size * 0.1, pixelSize, color);
    }
  }
  
  // Connect all points
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      if ((i + j) % 3 === 0 || (i * j) % 4 === 0) {
        drawPixelatedLine(
          p5, 
          points[i].x, points[i].y, 
          points[j].x, points[j].y, 
          pixelSize, color
        );
      }
    }
  }
  
  p5.pop();
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

// Helper function to determine if a point is inside a triangle
const isPointInTriangle = (
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

// Drawing a geometric grid
export const drawGeometricGrid = (p5: any, x: number, y: number, size: number, settings: GeometrySettings) => {
  const { rotation, pixelSize, color, segments } = settings;
  
  p5.push();
  p5.translate(x, y);
  p5.rotate(rotation);
  
  const gridSize = Math.floor(size / (pixelSize * 3));
  const spacing = size / gridSize;
  
  // Draw grid lines
  p5.noFill();
  p5.stroke(color);
  p5.strokeWeight(pixelSize);
  
  // Vertical and horizontal lines
  for (let i = -gridSize/2; i <= gridSize/2; i++) {
    const linePos = i * spacing;
    
    // Horizontal line with pixel effect
    if (i % 3 === 0) {
      drawPixelatedLine(p5, -size/2, linePos, size/2, linePos, pixelSize, color);
    }
    
    // Vertical line with pixel effect
    if (i % 4 === 0) {
      drawPixelatedLine(p5, linePos, -size/2, linePos, size/2, pixelSize, color);
    }
  }
  
  // Draw diagonal lines
  if (segments > 4) {
    for (let i = -gridSize/2; i <= gridSize/2; i += 2) {
      const linePos = i * spacing;
      drawPixelatedLine(p5, -size/2, linePos, linePos, size/2, pixelSize, color);
      drawPixelatedLine(p5, linePos, -size/2, size/2, linePos, pixelSize, color);
    }
  }
  
  p5.pop();
};

// Generate a random geometry function
export const getRandomGeometryFunction = () => {
  const functions = [
    drawMetatronCube,
    drawFlowerOfLife,
    drawSriYantra,
    drawMeditationCube,
    drawGeometricGrid
  ];
  
  return functions[Math.floor(Math.random() * functions.length)];
};
