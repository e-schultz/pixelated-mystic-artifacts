
// Draw a subtle background grid
export const drawBackgroundGrid = (p: any, performanceMode: boolean) => {
  p.stroke(240, 240, 228, 10);
  p.strokeWeight(1);
  const gridSize = performanceMode ? 80 : 30;
  const gridThreshold = performanceMode ? 0.97 : 0.92; 
  
  for (let x = 0; x < p.width; x += gridSize) {
    for (let y = 0; y < p.height; y += gridSize) {
      if (Math.random() > gridThreshold) {
        p.point(x, y);
      }
    }
  }
};
