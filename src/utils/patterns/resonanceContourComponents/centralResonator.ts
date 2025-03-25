
// Draw central resonance structure
export function drawCentralResonator(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean, useColor: boolean) {
  const resonatorSize = size * 0.1;
  
  p.push();
  p.rotate(time * 0.2);
  
  // Draw minimalist geometric resonator - concentric squares with rotation
  for (let i = 4; i > 0; i--) {
    const layerSize = resonatorSize * (i / 4);
    p.stroke(255, 100 + i * 30);
    p.strokeWeight(pixelSize * (i === 1 ? 1.5 : 1));
    p.noFill();
    
    // Alternate between square and diamond shapes
    p.push();
    if (i % 2 === 0) {
      p.rotate(p.PI / 4); // 45-degree rotation for diamond
    }
    
    if (isPixelated) {
      const rectSize = layerSize * p.SQRT2; // Adjust for rotation
      drawPixelatedRect(p, 0, 0, rectSize, rectSize, pixelSize);
    } else {
      p.rect(-layerSize/2, -layerSize/2, layerSize, layerSize);
    }
    p.pop();
  }
  
  // Central point
  p.fill(255);
  p.noStroke();
  if (isPixelated) {
    p.rect(-pixelSize/2, -pixelSize/2, pixelSize, pixelSize);
  } else {
    p.circle(0, 0, pixelSize * 2);
  }
  
  p.pop();
}

// Helper function to draw pixelated rectangle outlines
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
