
// Shared helper functions for all patterns

// Helper: Draw pixelated circle
export function drawPixelatedCircle(p: any, x: number, y: number, radius: number, pixelSize: number) {
  p.noStroke();
  
  for (let px = x - radius; px < x + radius; px += pixelSize) {
    for (let py = y - radius; py < y + radius; py += pixelSize) {
      if (p.dist(x, y, px, py) <= radius) {
        p.rect(px, py, pixelSize, pixelSize);
      }
    }
  }
}

// Helper: Draw pixelated rectangle
export function drawPixelatedRect(p: any, x: number, y: number, width: number, height: number, pixelSize: number) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  
  for (let px = x - halfWidth; px < x + halfWidth; px += pixelSize) {
    for (let py = y - halfHeight; py < y + halfHeight; py += pixelSize) {
      if (
        px >= x - halfWidth && 
        px < x + halfWidth && 
        py >= y - halfHeight && 
        py < y + halfHeight
      ) {
        // Only draw pixels on the border
        const isOnBorder = 
          px < x - halfWidth + pixelSize || 
          px >= x + halfWidth - pixelSize || 
          py < y - halfHeight + pixelSize || 
          py >= y + halfHeight - pixelSize;
          
        if (isOnBorder) {
          p.rect(px, py, pixelSize, pixelSize);
        }
      }
    }
  }
}

// Helper: Draw pixelated line
export function drawPixelatedLine(p: any, x1: number, y1: number, x2: number, y2: number, pixelSize: number) {
  const d = p.dist(x1, y1, x2, y2);
  const steps = Math.max(1, Math.floor(d / pixelSize));
  
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = p.lerp(x1, x2, t);
    const y = p.lerp(y1, y2, t);
    p.rect(x, y, pixelSize, pixelSize);
  }
}

// Helper: Draw background grid
export function drawBackgroundGrid(p: any, size: number, isLowPerformanceMode: boolean) {
  p.stroke(255, 20);
  p.strokeWeight(1);
  
  const gridSize = isLowPerformanceMode ? 60 : 30;
  const threshold = isLowPerformanceMode ? 0.96 : 0.92;
  
  for (let x = 0; x < p.width; x += gridSize) {
    for (let y = 0; y < p.height; y += gridSize) {
      if (Math.random() > threshold) {
        p.point(x, y);
      }
    }
  }
}
