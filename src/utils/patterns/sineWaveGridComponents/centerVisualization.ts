
// Draw center visualization for the sine wave grid
export function drawCenterVisualization(
  p: any,
  time: number,
  gridSize: number,
  pixelSize: number
) {
  // Draw a subtle pulsating circle to represent the frequency modulation
  const pulseSize = (Math.sin(time * 0.5) * 0.2 + 0.8) * gridSize * 0.4;
  p.stroke(255, 40);
  p.strokeWeight(pixelSize);
  p.ellipse(0, 0, pulseSize, pulseSize);
}
