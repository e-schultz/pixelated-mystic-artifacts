
// Generate neural nodes
export function generateNodes(
  p: any, 
  nodeCount: number, 
  radius: number, 
  time: number
) {
  const nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    const angle = i * p.TWO_PI / nodeCount;
    const x = p.cos(angle) * radius;
    const y = p.sin(angle) * radius;
    const pulseSize = (p.sin(time * 2 + i * 0.5) + 1) * 0.5 * 8 + 4;
    
    nodes.push({ x, y, pulseSize });
  }
  
  return nodes;
}
