
// Draw the central focal point
export function drawCenterPoint(
  p: any, 
  size: number, 
  pixelSize: number, 
  isPixelated: boolean, 
  parameters: any
) {
  const centerSize = size * 0.05;
  
  p.push();
  p.rotate(p.frameCount * 0.01 * parameters.rotationSpeed);
  
  // Apply color intensity parameter
  const intensity = parameters.colorIntensity;
  const r = 100 + 155 * intensity;
  const g = 200 * intensity;
  const b = 255 * intensity;
  
  if (isPixelated) {
    p.stroke(r, g, b, 200);
    p.strokeWeight(pixelSize);
    p.noFill();
    
    // Draw pixelated center shapes
    const size1 = centerSize;
    const size2 = centerSize * 0.6;
    
    // Outer square
    p.rect(-size1/2, -size1/2, size1, size1);
    
    // Inner square (rotated)
    p.push();
    p.rotate(Math.PI / 4);
    p.rect(-size2/2, -size2/2, size2, size2);
    p.pop();
    
  } else {
    // Smooth rendering for center point
    p.fill(r, g, b, 180);
    p.noStroke();
    p.ellipse(0, 0, centerSize, centerSize);
    
    p.stroke(r, g, b, 120);
    p.strokeWeight(pixelSize);
    p.noFill();
    p.ellipse(0, 0, centerSize * 1.5, centerSize * 1.5);
  }
  
  p.pop();
}
