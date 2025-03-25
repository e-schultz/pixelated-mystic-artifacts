
// Draw a diffusion field based on reaction-diffusion principles
export function drawDiffusionField(p: any, size: number, time: number, pixelSize: number, isPixelated: boolean) {
  const fieldSize = size * 0.8;
  const density = isPixelated ? 15 : 25; // Number of cells
  const cellSize = fieldSize / density;
  
  p.noFill();
  p.stroke(255, 40);
  p.strokeWeight(pixelSize);
  
  // Use a simple cellular automata-like pattern
  for (let i = -density/2; i < density/2; i++) {
    for (let j = -density/2; j < density/2; j++) {
      const x = i * cellSize;
      const y = j * cellSize;
      
      // Distance from center
      const distFromCenter = p.dist(0, 0, x, y);
      
      // Only draw some cells based on a mathematical pattern
      const noiseVal = p.noise(
        i * 0.1 + time * 0.05, 
        j * 0.1 + time * 0.03
      );
      
      const angleOffset = Math.atan2(y, x) + time * 0.2;
      const sineInfluence = p.sin(angleOffset + distFromCenter * 0.01) * 0.3 + 0.7;
      
      if (noiseVal * sineInfluence > 0.5 && distFromCenter < fieldSize * 0.5) {
        // Different cell representations for different regions
        if (distFromCenter < fieldSize * 0.2) {
          // Inner region: more ordered
          if ((i + j) % 2 === 0) {
            p.rect(x - cellSize/2, y - cellSize/2, cellSize * 0.8, cellSize * 0.8);
          }
        } else {
          // Middle region: mix of order and chaos
          if (noiseVal > 0.65) {
            p.circle(x, y, cellSize * 0.4);
          } else if (noiseVal < 0.4) {
            p.line(
              x - cellSize * 0.4, 
              y - cellSize * 0.4, 
              x + cellSize * 0.4, 
              y + cellSize * 0.4
            );
          }
        }
      }
    }
  }
}
