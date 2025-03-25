
import { drawPixelatedLine, drawPixelatedRect } from '../helpers';

// Draw a perspective grid with vanishing point
export function drawPerspectiveGrid(
  p: any, 
  size: number, 
  time: number, 
  pixelSize: number, 
  isPixelated: boolean, 
  useColor: boolean
) {
  const gridLines = 16;
  const maxDistance = size * 0.8;
  
  // Color palette inspired by the neon images
  const colors = useColor ? [
    [0, 255, 255, 150],   // Cyan
    [255, 0, 255, 150],   // Magenta
    [255, 255, 0, 150],   // Yellow
  ] : [
    [255, 255, 255, 150], // White
    [200, 200, 200, 150], // Light gray
    [150, 150, 150, 150], // Medium gray
  ];
  
  p.noFill();
  
  // Draw grid lines radiating from center
  for (let i = 0; i < gridLines; i++) {
    const angle = i * p.TWO_PI / gridLines + (time * 0.04);
    const endX = p.cos(angle) * maxDistance;
    const endY = p.sin(angle) * maxDistance;
    
    // Cycle through colors
    const colorIndex = i % colors.length;
    p.stroke(colors[colorIndex][0], colors[colorIndex][1], colors[colorIndex][2], colors[colorIndex][3]);
    p.strokeWeight(pixelSize);
    
    if (isPixelated) {
      drawPixelatedLine(p, 0, 0, endX, endY, pixelSize);
    } else {
      p.line(0, 0, endX, endY);
    }
    
    // Draw connecting points at intervals
    const intervals = 5;
    for (let j = 1; j <= intervals; j++) {
      const ratio = j / intervals;
      const x = endX * ratio;
      const y = endY * ratio;
      const pointSize = size * 0.01 * (1 - ratio) * (p.sin(time * 2 + i) * 0.2 + 0.8);
      
      if (j % 2 === 0) {
        p.push();
        p.translate(x, y);
        p.rotate(time * 0.2 + i);
        
        if (isPixelated) {
          drawPixelatedRect(p, 0, 0, pointSize * 2, pointSize * 2, pixelSize);
        } else {
          p.rect(-pointSize, -pointSize, pointSize * 2, pointSize * 2);
        }
        p.pop();
      }
    }
  }
  
  // Draw concentric hexagons for depth - like in the sacred geometry images
  const layers = 3;
  for (let i = 1; i <= layers; i++) {
    const layerSize = (size * 0.7) * (i / layers);
    const rotation = time * 0.1 * (i % 2 === 0 ? 1 : -1);
    
    p.push();
    p.rotate(rotation);
    
    // Draw hexagon
    const points = 6;
    const colorIndex = i % colors.length;
    p.stroke(colors[colorIndex][0], colors[colorIndex][1], colors[colorIndex][2], colors[colorIndex][3] + 50);
    p.strokeWeight(pixelSize);
    
    if (isPixelated) {
      drawPolygon(p, 0, 0, layerSize, points, pixelSize);
    } else {
      p.beginShape();
      for (let j = 0; j < points; j++) {
        const angle = j * p.TWO_PI / points;
        const px = p.cos(angle) * layerSize;
        const py = p.sin(angle) * layerSize;
        p.vertex(px, py);
      }
      p.endShape(p.CLOSE);
    }
    
    p.pop();
  }
}

// Helper function to draw polygons with pixelation
function drawPolygon(p: any, x: number, y: number, radius: number, sides: number, pixelSize: number) {
  const points = [];
  
  // Calculate all the vertex points
  for (let i = 0; i < sides; i++) {
    const angle = i * p.TWO_PI / sides;
    const px = x + p.cos(angle) * radius;
    const py = y + p.sin(angle) * radius;
    points.push({x: px, y: py});
  }
  
  // Draw the lines connecting the points
  for (let i = 0; i < points.length; i++) {
    const currentPoint = points[i];
    const nextPoint = points[(i + 1) % points.length];
    
    drawPixelatedLine(
      p, 
      currentPoint.x, currentPoint.y, 
      nextPoint.x, nextPoint.y,
      pixelSize
    );
  }
}
