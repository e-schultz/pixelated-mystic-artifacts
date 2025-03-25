
// Draw vertical beams/lines
export function drawVerticalBeams(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean, useColor: boolean) {
  const beamCount = 16;
  
  p.strokeWeight(pixelSize);
  
  for (let i = 0; i < beamCount; i++) {
    const angle = i * p.TWO_PI / beamCount;
    const x = p.cos(angle) * size * 0.7;
    const y = p.sin(angle) * size * 0.7;
    
    // Beam height varies with time
    const height = size * (0.5 + 0.2 * p.sin(time * 0.3 + i * 0.4));
    
    // Beam opacity varies with time
    const opacity = 60 + 40 * p.sin(time + i);
    
    if (useColor) {
      // Color based on position
      const hue = (i * 20 + time * 10) % 360;
      p.stroke(hue, 80, 70, opacity);
    } else {
      p.stroke(255, opacity * 0.6);
    }
    
    // Draw vertical beam
    if (isPixelated) {
      drawPixelatedLine(p, x, y, x, y - height, pixelSize);
    } else {
      p.line(x, y, x, y - height);
    }
    
    // Add small details along the beam
    const detailCount = 3;
    for (let j = 0; j < detailCount; j++) {
      const detailY = y - (height * (j + 1) / (detailCount + 1));
      const detailSize = size * 0.01;
      
      if (isPixelated) {
        p.rect(x - detailSize/2, detailY - detailSize/2, pixelSize * 2, pixelSize * 2);
      } else {
        p.point(x, detailY);
      }
    }
  }
}

// Helper function to draw a pixelated line
function drawPixelatedLine(p: any, x1: number, y1: number, x2: number, y2: number, pixelSize: number) {
  const d = p.dist(x1, y1, x2, y2);
  const steps = Math.max(1, Math.floor(d / pixelSize));
  
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = p.lerp(x1, x2, t);
    const y = p.lerp(y1, y2, t);
    p.rect(x, y, pixelSize, pixelSize);
  }
}
