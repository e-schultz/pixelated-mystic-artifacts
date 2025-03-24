
// ASCII art overlay effect - optimized for performance
export const drawAsciiOverlay = (
  p: any, 
  cols: number, 
  rows: number, 
  charSize: number, 
  performanceMode: boolean
) => {
  p.push();
  p.fill(240, 240, 228, 160);
  p.textSize(charSize);
  p.textFont('monospace');
  
  // On mobile, skip rows to improve performance
  const rowStep = performanceMode ? 3 : 2;
  const colStep = performanceMode ? 3 : 2;
  
  // Pre-defined character patterns for better performance
  const chars = ['.', '*', '/', '|', '\\', ' '];
  
  for (let y = 0; y < rows; y += rowStep) {
    for (let x = 0; x < cols; x += colStep) {
      // Use deterministic pattern instead of pure random for better performance
      const patternValue = (x * 3 + y * 5 + p.frameCount) % 13;
      const charIndex = patternValue % chars.length;
      
      // More aggressive filtering on mobile
      if (patternValue < (performanceMode ? 5 : 9)) {
        p.text(chars[charIndex], x * charSize, y * charSize + charSize);
      }
    }
  }
  p.pop();
};
