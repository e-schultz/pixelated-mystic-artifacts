
// Draw central glow effect
export function drawCentralGlow(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean, useColor: boolean) {
  // Draw pulsing central circle
  const pulseSize = size * 0.15 * (0.8 + 0.2 * p.sin(time * 2));
  
  if (useColor) {
    // Create gradient-like effect with concentric circles
    const rings = 5;
    for (let i = rings; i > 0; i--) {
      const ringSize = pulseSize * (i / rings);
      const opacity = 150 * (1 - (i / rings));
      
      // Shift hue over time
      const glowHue = (300 + time * 20) % 360;
      p.stroke(glowHue, 100, 70, opacity);
      p.strokeWeight(pixelSize);
      p.noFill();
      
      if (isPixelated) {
        drawPixelatedCircle(p, 0, 0, ringSize, pixelSize);
      } else {
        p.circle(0, 0, ringSize * 2);
      }
    }
  } else {
    // Monochrome version
    const rings = 3;
    for (let i = rings; i > 0; i--) {
      const ringSize = pulseSize * (i / rings);
      const opacity = 100 * (1 - (i / rings));
      
      p.stroke(255, opacity);
      p.strokeWeight(pixelSize);
      p.noFill();
      
      if (isPixelated) {
        drawPixelatedCircle(p, 0, 0, ringSize, pixelSize);
      } else {
        p.circle(0, 0, ringSize * 2);
      }
    }
  }
  
  // Central point
  p.fill(255);
  p.noStroke();
  const centerSize = pixelSize * 2 * (1 + 0.3 * p.sin(time * 3));
  p.rect(-centerSize/2, -centerSize/2, centerSize, centerSize);
}

// Helper function to draw a pixelated circle
function drawPixelatedCircle(p: any, x: number, y: number, radius: number, pixelSize: number) {
  p.noStroke();
  
  for (let px = x - radius; px < x + radius; px += pixelSize) {
    for (let py = y - radius; py < y + radius; py += pixelSize) {
      if (p.dist(x, y, px, py) <= radius) {
        p.rect(px, py, pixelSize, pixelSize);
      }
    }
  }
}
