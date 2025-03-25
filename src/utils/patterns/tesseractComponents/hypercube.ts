
// Hypercube implementation - Drawing n-dimensional cubes (from 2D to 10D)
import { drawPixelatedLine } from '../helpers';

/**
 * Generate vertices for an n-dimensional hypercube
 * @param dimension Number of dimensions (2 = square, 3 = cube, 4 = tesseract, etc.)
 */
function generateHypercubeVertices(dimension: number): number[][] {
  // For a dimension-D hypercube, we have 2^dimension vertices
  const vertices: number[][] = [];
  
  // Each vertex is represented as a binary number from 0 to 2^dimension-1
  // where each bit corresponds to a coordinate (-1 or 1)
  const numVertices = Math.pow(2, dimension);
  
  for (let i = 0; i < numVertices; i++) {
    const vertex: number[] = [];
    
    // For each vertex, create its coordinates based on binary representation
    for (let d = 0; d < dimension; d++) {
      // Extract the d-th bit of i
      const bit = (i >> d) & 1;
      // Map 0/1 to -1/1
      vertex.push(bit * 2 - 1);
    }
    
    // Pad with zeros for dimensions beyond what we need (for projection)
    while (vertex.length < 3) {
      vertex.push(0);
    }
    
    vertices.push(vertex);
  }
  
  return vertices;
}

/**
 * Generate edges for a hypercube
 * Two vertices are connected if they differ in exactly one coordinate
 */
function generateHypercubeEdges(dimension: number, vertices: number[][]): [number, number][] {
  const edges: [number, number][] = [];
  const numVertices = vertices.length;
  
  // For each pair of vertices
  for (let i = 0; i < numVertices; i++) {
    for (let j = i + 1; j < numVertices; j++) {
      // Check if they differ in exactly one coordinate
      let diffCount = 0;
      
      for (let d = 0; d < dimension; d++) {
        if (vertices[i][d] !== vertices[j][d]) {
          diffCount++;
        }
      }
      
      if (diffCount === 1) {
        edges.push([i, j]);
      }
    }
  }
  
  return edges;
}

/**
 * Project n-dimensional coordinates to 3D, then to 2D for rendering
 */
function projectVertex(vertex: number[], rotX: number, rotY: number, rotZ: number): [number, number] {
  let [x, y, z] = vertex;
  
  // For higher dimensions beyond 3, we project by rotating into the first 3 dimensions
  for (let d = 3; d < vertex.length; d++) {
    // Project the higher dimension onto the first three dimensions
    // Each higher dimension gets a unique rotation to create interesting projections
    const angle = rotX * (d * 0.1) + rotY * (d * 0.15);
    x += vertex[d] * Math.cos(angle) * 0.5;
    y += vertex[d] * Math.sin(angle) * 0.5;
    z += vertex[d] * Math.cos(angle + 1.2) * 0.5;
  }
  
  // Apply 3D rotations
  // Rotate around X-axis
  const y1 = y * Math.cos(rotX) - z * Math.sin(rotX);
  const z1 = y * Math.sin(rotX) + z * Math.cos(rotX);
  
  // Rotate around Y-axis
  const x2 = x * Math.cos(rotY) + z1 * Math.sin(rotY);
  const z2 = -x * Math.sin(rotY) + z1 * Math.cos(rotY);
  
  // Rotate around Z-axis
  const x3 = x2 * Math.cos(rotZ) - y1 * Math.sin(rotZ);
  const y3 = x2 * Math.sin(rotZ) + y1 * Math.cos(rotZ);
  
  // Simple perspective projection
  const zDepth = 1200;
  const scale = zDepth / (zDepth + z2);
  
  return [x3 * scale, y3 * scale];
}

/**
 * Draw a hypercube of the specified dimension
 */
export function drawHypercube(
  p: any,
  dimension: number,
  size: number,
  rotX: number,
  rotY: number,
  rotZ: number,
  pixelSize: number,
  isPixelated: boolean,
  colorIntensity: number
) {
  // Generate vertices and edges
  const vertices = generateHypercubeVertices(dimension);
  const edges = generateHypercubeEdges(dimension, vertices);
  
  // Scale vertices based on the size
  const scaledVertices = vertices.map(v => v.map(coord => coord * size / 2));
  
  // Project vertices to 2D
  const projectedVertices = scaledVertices.map(v => projectVertex(v, rotX, rotY, rotZ));
  
  // Draw the edges
  edges.forEach(([i, j], edgeIndex) => {
    const [x1, y1] = projectedVertices[i];
    const [x2, y2] = projectedVertices[j];
    
    // Vary colors based on dimension and edge index for visualization
    const hue = (dimension * 20 + edgeIndex * 2) % 360;
    const sat = 70 + dimension * 3;
    // Apply colorIntensity parameter
    const brightness = 70 + 30 * colorIntensity;
    
    p.stroke(hue, sat, brightness);
    
    if (isPixelated) {
      drawPixelatedLine(p, x1, y1, x2, y2, pixelSize);
    } else {
      p.line(x1, y1, x2, y2);
    }
  });
  
  // Draw the vertices
  p.fill(255, 200);
  p.noStroke();
  
  projectedVertices.forEach(([x, y], i) => {
    // Make vertex size depend on its dimension
    const vertexSize = pixelSize * (0.8 + dimension * 0.1);
    
    if (isPixelated) {
      p.rect(x, y, vertexSize, vertexSize);
    } else {
      p.circle(x, y, vertexSize * 1.5);
    }
  });
  
  // Label the dimension for better understanding
  p.fill(255);
  p.textSize(14);
  p.textAlign(p.CENTER, p.CENTER);
  p.text(`${dimension}D Hypercube`, 0, -size * 0.8);
}
