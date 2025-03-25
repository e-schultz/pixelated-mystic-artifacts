
// Helper functions for drawing patterns

// Draw a pixelated line by rendering individual rectangles
export function drawPixelatedLine(
  p: any, 
  x1: number, 
  y1: number, 
  x2: number, 
  y2: number, 
  pixelSize: number = 2
) {
  // Get current stroke color to apply to the pixels
  const currentStroke = p.drawingContext.strokeStyle;
  p.fill(currentStroke);
  p.noStroke();
  
  // Calculate the number of steps based on distance and pixel size
  const d = p.dist(x1, y1, x2, y2);
  const steps = Math.max(Math.ceil(d / pixelSize), 1);
  
  for (let i = 0; i <= steps; i++) {
    const x = p.lerp(x1, x2, i / steps);
    const y = p.lerp(y1, y2, i / steps);
    p.rect(x, y, pixelSize, pixelSize);
  }
}

// Draw a pixelated circle using individual points
export function drawPixelatedCircle(
  p: any,
  centerX: number,
  centerY: number,
  radius: number,
  pixelSize: number = 2
) {
  // Get current stroke color to apply to the pixels
  const currentStroke = p.drawingContext.strokeStyle;
  p.fill(currentStroke);
  p.noStroke();
  
  // Determine number of points based on radius for a good looking circle
  const circumference = 2 * Math.PI * radius;
  const numPoints = Math.max(Math.ceil(circumference / pixelSize), 8);
  
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    p.rect(x, y, pixelSize, pixelSize);
  }
}

// Draw a pixelated rectangle
export function drawPixelatedRect(
  p: any,
  x: number,
  y: number,
  width: number,
  height: number,
  pixelSize: number = 2
) {
  // Top and bottom edges
  drawPixelatedLine(p, x, y, x + width, y, pixelSize);
  drawPixelatedLine(p, x, y + height, x + width, y + height, pixelSize);
  
  // Left and right edges
  drawPixelatedLine(p, x, y, x, y + height, pixelSize);
  drawPixelatedLine(p, x + width, y, x + width, y + height, pixelSize);
}

// Draw a subtle background grid
export function drawBackgroundGrid(
  p: any, 
  size: number, 
  isLowPerformanceMode: boolean = false
) {
  const gridSize = size * 1.4;
  const gridDivisions = isLowPerformanceMode ? 10 : 20;
  const cellSize = gridSize / gridDivisions;
  
  p.push();
  p.translate(p.width / 2, p.height / 2);
  p.stroke(0, 0, 40, 15); // Low opacity for subtle effect
  p.strokeWeight(1);
  
  // Draw grid
  for (let i = -gridDivisions / 2; i <= gridDivisions / 2; i++) {
    // Horizontal lines
    p.line(-gridSize / 2, i * cellSize, gridSize / 2, i * cellSize);
    
    // Vertical lines
    p.line(i * cellSize, -gridSize / 2, i * cellSize, gridSize / 2);
  }
  p.pop();
}
