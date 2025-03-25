
// Draw spiral staircases around the core
export function drawSpiralStaircase(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean, useColor: boolean) {
  const steps = 32; // Number of steps
  const baseRadius = size * 0.45;
  const spiralRadius = size * 0.15;
  
  p.noFill();
  p.strokeWeight(pixelSize);
  
  for (let spiral = 0; spiral < 3; spiral++) { // Draw 3 intertwined spirals
    const spiralOffset = spiral * (p.TWO_PI / 3) + time * 0.1;
    
    for (let i = 0; i < steps; i++) {
      const ratio = i / steps;
      const angle = ratio * p.TWO_PI * 2 + spiralOffset;
      const height = (ratio - 0.5) * size * 0.4;
      
      const radius = baseRadius - (ratio * spiralRadius);
      const x = p.cos(angle) * radius;
      const y = p.sin(angle) * radius;
      
      // Determine size of step based on position
      const stepSize = size * 0.02 * (1 - ratio * 0.5);
      
      // Draw step
      p.push();
      p.translate(x, y + height);
      p.rotate(angle + p.HALF_PI);
      
      if (useColor) {
        // Magenta to cyan colors
        if (spiral === 0) {
          p.stroke(320, 100, 70, 180); // Magenta
        } else if (spiral === 1) {
          p.stroke(180, 100, 70, 180); // Cyan
        } else {
          p.stroke(260, 100, 70, 180); // Purple
        }
      } else {
        p.stroke(255, 70 + ratio * 80);
      }
      
      if (isPixelated) {
        drawPixelatedRect(p, 0, 0, stepSize * 3, stepSize, pixelSize);
      } else {
        p.rect(-stepSize * 1.5, -stepSize/2, stepSize * 3, stepSize);
      }
      
      p.pop();
    }
  }
}

// Helper function to draw a pixelated rectangle outline
function drawPixelatedRect(p: any, x: number, y: number, width: number, height: number, pixelSize: number) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  
  // Draw individual pixels for each side of the rectangle
  // Top
  for (let px = x - halfWidth; px <= x + halfWidth; px += pixelSize) {
    p.rect(px, y - halfHeight, pixelSize, pixelSize);
  }
  
  // Bottom
  for (let px = x - halfWidth; px <= x + halfWidth; px += pixelSize) {
    p.rect(px, y + halfHeight - pixelSize, pixelSize, pixelSize);
  }
  
  // Left
  for (let py = y - halfHeight + pixelSize; py < y + halfHeight - pixelSize; py += pixelSize) {
    p.rect(x - halfWidth, py, pixelSize, pixelSize);
  }
  
  // Right
  for (let py = y - halfHeight + pixelSize; py < y + halfHeight - pixelSize; py += pixelSize) {
    p.rect(x + halfWidth - pixelSize, py, pixelSize, pixelSize);
  }
}
