interface RenderOptions {
  time: number;
  isPixelated: boolean;
  isLowPerformanceMode: boolean;
  isTerminalMode: boolean;
}

// Draw different patterns based on the currentPattern index
export function drawPatterns(
  p: any, 
  patternIndex: number, 
  centerX: number, 
  centerY: number, 
  size: number,
  options: RenderOptions
) {
  const { time, isPixelated, isLowPerformanceMode } = options;
  
  // Validate pattern index to ensure it's within bounds
  const validPatternIndex = Math.max(0, Math.min(patternIndex, 5));
  
  // Determine which pattern to draw
  switch (validPatternIndex) {
    case 0:
      drawDigitalCorridor(p, centerX, centerY, size, time, isPixelated);
      break;
    case 1:
      drawNeuralLattice(p, centerX, centerY, size, time, isPixelated);
      break;
    case 2:
      drawTesseractMatrix(p, centerX, centerY, size, time, isPixelated);
      break;
    case 3:
      drawSacredGeometry(p, centerX, centerY, size, time, isPixelated);
      break;
    case 4:
      drawQuantumField(p, centerX, centerY, size, time, isPixelated);
      break;
    case 5:
      drawPulseGrid(p, centerX, centerY, size, time, isPixelated);
      break;
    default:
      drawDigitalCorridor(p, centerX, centerY, size, time, isPixelated);
  }
  
  // Draw subtle background grid
  if (!isLowPerformanceMode || p.frameCount % 3 === 0) {
    drawBackgroundGrid(p, size, isLowPerformanceMode);
  }
}

// Pattern 0: Digital Corridor
function drawDigitalCorridor(
  p: any, 
  centerX: number, 
  centerY: number, 
  size: number, 
  time: number,
  isPixelated: boolean
) {
  p.push();
  p.translate(centerX, centerY);
  p.rotate(time * 0.1);
  
  const corridorDepth = 12;
  const pixelSize = isPixelated ? 2 : 1;
  
  p.stroke(255, 200);
  p.strokeWeight(pixelSize);
  p.noFill();
  
  // Draw receding squares
  for (let i = 0; i < corridorDepth; i++) {
    const scale = 1 - (i / corridorDepth * 0.8);
    const squareSize = size * scale;
    
    if (isPixelated) {
      drawPixelatedRect(p, 0, 0, squareSize, squareSize, pixelSize);
    } else {
      p.rect(-squareSize/2, -squareSize/2, squareSize, squareSize);
    }
    
    // Connect corners on alternating frames for depth effect
    if (i > 0 && i % 2 === 0) {
      const prevScale = 1 - ((i-1) / corridorDepth * 0.8);
      const prevSize = size * prevScale;
      
      // Connect corners between frames
      for (let corner = 0; corner < 4; corner++) {
        const angle = corner * p.PI/2;
        const currX = p.cos(angle) * squareSize/2;
        const currY = p.sin(angle) * squareSize/2;
        const prevX = p.cos(angle) * prevSize/2;
        const prevY = p.sin(angle) * prevSize/2;
        
        if (isPixelated) {
          drawPixelatedLine(p, currX, currY, prevX, prevY, pixelSize);
        } else {
          p.line(currX, currY, prevX, prevY);
        }
      }
    }
  }
  
  // Draw central point
  p.fill(255);
  p.noStroke();
  if (isPixelated) {
    drawPixelatedCircle(p, 0, 0, size * 0.02, pixelSize);
  } else {
    p.circle(0, 0, size * 0.04);
  }
  
  p.pop();
}

// Pattern 1: Neural Lattice
function drawNeuralLattice(
  p: any, 
  centerX: number, 
  centerY: number, 
  size: number, 
  time: number,
  isPixelated: boolean
) {
  p.push();
  p.translate(centerX, centerY);
  p.rotate(time * 0.05);
  
  const nodeCount = 12;
  const radius = size * 0.4;
  const pixelSize = isPixelated ? 2 : 1;
  
  // Generate nodes
  const nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    const angle = i * p.TWO_PI / nodeCount;
    const x = p.cos(angle) * radius;
    const y = p.sin(angle) * radius;
    const pulseSize = (p.sin(time * 2 + i * 0.5) + 1) * 0.5 * 8 + 4;
    
    nodes.push({ x, y, pulseSize });
  }
  
  // Draw connections between nodes
  p.stroke(255, 120);
  p.strokeWeight(pixelSize);
  
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      // Only connect some nodes for aesthetic effect
      if ((i + j) % 3 === 0 || i * j % 5 === 0) {
        if (isPixelated) {
          drawPixelatedLine(p, nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y, pixelSize);
        } else {
          p.line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
        }
      }
    }
  }
  
  // Draw nodes
  p.fill(255);
  p.noStroke();
  
  nodes.forEach(node => {
    if (isPixelated) {
      drawPixelatedCircle(p, node.x, node.y, node.pulseSize, pixelSize);
    } else {
      p.circle(node.x, node.y, node.pulseSize * 2);
    }
  });
  
  p.pop();
}

// Pattern 2: Tesseract Matrix
function drawTesseractMatrix(
  p: any, 
  centerX: number, 
  centerY: number, 
  size: number, 
  time: number,
  isPixelated: boolean
) {
  p.push();
  p.translate(centerX, centerY);
  
  const pixelSize = isPixelated ? 2 : 1;
  p.stroke(255, 180);
  p.strokeWeight(pixelSize);
  p.noFill();
  
  // Create proper 3D-to-2D projection
  const scale = size * 0.35;
  const innerScale = scale * 0.6;
  
  // Animation parameters
  const rotationX = time * 0.2;
  const rotationY = time * 0.15;
  const rotationZ = time * 0.1;
  
  // Draw the outer cube first
  drawRotatedCube(p, 0, 0, 0, scale, rotationX, rotationY, rotationZ, pixelSize, isPixelated);
  
  // Draw the inner cube with different rotation
  drawRotatedCube(p, 0, 0, 0, innerScale, rotationX * 1.5, rotationY * 1.2, rotationZ * 0.8, pixelSize, isPixelated);
  
  // Connect vertices between inner and outer cubes to create the tesseract effect
  connectTesseractVertices(p, scale, innerScale, rotationX, rotationY, rotationZ, pixelSize, isPixelated);
  
  p.pop();
}

// Helper function to draw a 3D cube with proper rotation and projection
function drawRotatedCube(
  p: any, 
  x: number, 
  y: number, 
  z: number, 
  size: number, 
  rotX: number, 
  rotY: number, 
  rotZ: number, 
  pixelSize: number,
  isPixelated: boolean
) {
  // Cube vertices in 3D space (centered at origin)
  const halfSize = size / 2;
  const vertices = [
    [-halfSize, -halfSize, -halfSize], // 0: left-bottom-back
    [halfSize, -halfSize, -halfSize],  // 1: right-bottom-back
    [halfSize, halfSize, -halfSize],   // 2: right-top-back
    [-halfSize, halfSize, -halfSize],  // 3: left-top-back
    [-halfSize, -halfSize, halfSize],  // 4: left-bottom-front
    [halfSize, -halfSize, halfSize],   // 5: right-bottom-front
    [halfSize, halfSize, halfSize],    // 6: right-top-front
    [-halfSize, halfSize, halfSize]    // 7: left-top-front
  ];
  
  // Edges connecting vertices (each pair of indices forms an edge)
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0], // back face
    [4, 5], [5, 6], [6, 7], [7, 4], // front face
    [0, 4], [1, 5], [2, 6], [3, 7]  // connecting edges
  ];
  
  // Apply 3D rotations and project to 2D
  const projectedVertices = vertices.map(v => {
    let [vx, vy, vz] = v;
    
    // Apply rotations
    // Rotate around X-axis
    const y1 = vy * Math.cos(rotX) - vz * Math.sin(rotX);
    const z1 = vy * Math.sin(rotX) + vz * Math.cos(rotX);
    
    // Rotate around Y-axis
    const x2 = vx * Math.cos(rotY) + z1 * Math.sin(rotY);
    const z2 = -vx * Math.sin(rotY) + z1 * Math.cos(rotY);
    
    // Rotate around Z-axis
    const x3 = x2 * Math.cos(rotZ) - y1 * Math.sin(rotZ);
    const y3 = x2 * Math.sin(rotZ) + y1 * Math.cos(rotZ);
    
    // Simple perspective projection (just scale based on z-distance)
    const zDepth = 1200; // Controls perspective strength
    const scale = zDepth / (zDepth + z2);
    
    return [x3 * scale + x, y3 * scale + y];
  });
  
  // Draw the edges
  p.stroke(255, 180);
  p.strokeWeight(pixelSize);
  
  edges.forEach(([i, j]) => {
    const [x1, y1] = projectedVertices[i];
    const [x2, y2] = projectedVertices[j];
    
    if (isPixelated) {
      drawPixelatedLine(p, x1, y1, x2, y2, pixelSize);
    } else {
      p.line(x1, y1, x2, y2);
    }
  });
  
  // Draw subtle vertex points
  p.fill(255, 200);
  p.noStroke();
  
  projectedVertices.forEach(([x, y]) => {
    if (isPixelated) {
      p.rect(x, y, pixelSize, pixelSize);
    } else {
      p.circle(x, y, pixelSize * 1.5);
    }
  });
}

// Helper to connect tesseract vertices between inner and outer cubes
function connectTesseractVertices(
  p: any, 
  outerSize: number, 
  innerSize: number, 
  rotX: number, 
  rotY: number, 
  rotZ: number, 
  pixelSize: number,
  isPixelated: boolean
) {
  const outerHalf = outerSize / 2;
  const innerHalf = innerSize / 2;
  
  // Create 4D-like connections by connecting specific vertices
  // between the inner and outer cubes
  const outerVertices = [
    [-outerHalf, -outerHalf, -outerHalf], // 0
    [outerHalf, -outerHalf, -outerHalf],  // 1 
    [outerHalf, outerHalf, -outerHalf],   // 2
    [-outerHalf, outerHalf, -outerHalf],  // 3
  ];
  
  const innerVertices = [
    [-innerHalf, -innerHalf, innerHalf],  // 4
    [innerHalf, -innerHalf, innerHalf],   // 5
    [innerHalf, innerHalf, innerHalf],    // 6
    [-innerHalf, innerHalf, innerHalf]    // 7
  ];
  
  // Apply same rotations and projection to both sets of vertices
  const projectVertex = (v: number[]) => {
    let [vx, vy, vz] = v;
    
    // Apply rotations (same as in drawRotatedCube)
    const y1 = vy * Math.cos(rotX) - vz * Math.sin(rotX);
    const z1 = vy * Math.sin(rotX) + vz * Math.cos(rotX);
    
    const x2 = vx * Math.cos(rotY) + z1 * Math.sin(rotY);
    const z2 = -vx * Math.sin(rotY) + z1 * Math.cos(rotY);
    
    const x3 = x2 * Math.cos(rotZ) - y1 * Math.sin(rotZ);
    const y3 = x2 * Math.sin(rotZ) + y1 * Math.cos(rotZ);
    
    // Perspective projection
    const zDepth = 1200;
    const scale = zDepth / (zDepth + z2);
    
    return [x3 * scale, y3 * scale];
  };
  
  const projectedOuter = outerVertices.map(projectVertex);
  const projectedInner = innerVertices.map(projectVertex);
  
  // Draw connections with varying opacity based on rotation
  p.stroke(255, 70 + Math.sin(rotX * 2) * 30);
  p.strokeWeight(pixelSize);
  
  // Connect corresponding vertices
  for (let i = 0; i < 4; i++) {
    const [x1, y1] = projectedOuter[i];
    const [x2, y2] = projectedInner[i];
    
    if (isPixelated) {
      drawPixelatedLine(p, x1, y1, x2, y2, pixelSize);
    } else {
      p.line(x1, y1, x2, y2);
    }
    
    // Add some diagonal connections for more complex visual
    if (i % 2 === 0) {
      const nextI = (i + 1) % 4;
      const [x3, y3] = projectedInner[nextI];
      
      if (isPixelated) {
        drawPixelatedLine(p, x1, y1, x3, y3, pixelSize);
      } else {
        p.line(x1, y1, x3, y3);
      }
    }
  }
  
  // Draw a pulsing center point for added effect
  const pulseSize = (Math.sin(rotX * 3) + 1) * 2 + 2;
  p.fill(255, 220);
  p.noStroke();
  
  if (isPixelated) {
    drawPixelatedCircle(p, 0, 0, pulseSize, pixelSize);
  } else {
    p.circle(0, 0, pulseSize * 2);
  }
}

// Pattern 3: Sacred Geometry
function drawSacredGeometry(
  p: any, 
  centerX: number, 
  centerY: number, 
  size: number, 
  time: number,
  isPixelated: boolean
) {
  p.push();
  p.translate(centerX, centerY);
  p.rotate(time * 0.1);
  
  const pixelSize = isPixelated ? 2 : 1;
  const radius = size * 0.4;
  
  p.stroke(255, 200);
  p.strokeWeight(pixelSize);
  p.noFill();
  
  // Draw flower of life pattern
  const circleCount = 7;
  const centralCircleRadius = radius / 3;
  
  // Draw central circle
  if (isPixelated) {
    drawPixelatedCircle(p, 0, 0, centralCircleRadius, pixelSize);
  } else {
    p.circle(0, 0, centralCircleRadius * 2);
  }
  
  // Draw surrounding circles
  for (let i = 0; i < circleCount; i++) {
    const angle = i * p.TWO_PI / circleCount;
    const x = p.cos(angle) * centralCircleRadius;
    const y = p.sin(angle) * centralCircleRadius;
    
    if (isPixelated) {
      drawPixelatedCircle(p, x, y, centralCircleRadius, pixelSize);
    } else {
      p.circle(x, y, centralCircleRadius * 2);
    }
  }
  
  // Draw outer circle
  if (isPixelated) {
    drawPixelatedCircle(p, 0, 0, radius, pixelSize);
  } else {
    p.circle(0, 0, radius * 2);
  }
  
  // Draw simple hexagon
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = i * p.TWO_PI / 6;
    const x = p.cos(angle) * radius * 0.8;
    const y = p.sin(angle) * radius * 0.8;
    points.push({ x, y });
  }
  
  for (let i = 0; i < points.length; i++) {
    const next = (i + 1) % points.length;
    if (isPixelated) {
      drawPixelatedLine(p, points[i].x, points[i].y, points[next].x, points[next].y, pixelSize);
    } else {
      p.line(points[i].x, points[i].y, points[next].x, points[next].y);
    }
  }
  
  p.pop();
}

// Pattern 4: Quantum Field
function drawQuantumField(
  p: any, 
  centerX: number, 
  centerY: number, 
  size: number, 
  time: number,
  isPixelated: boolean
) {
  p.push();
  p.translate(centerX, centerY);
  
  const pixelSize = isPixelated ? 2 : 1;
  const fieldSize = size * 0.8;
  const particleCount = 100;
  
  p.noFill();
  p.stroke(255, 100);
  p.strokeWeight(pixelSize);
  
  // Draw particles
  for (let i = 0; i < particleCount; i++) {
    const angle = i * p.TWO_PI / particleCount + time;
    const radiusVariation = p.noise(i * 0.1, time * 0.2) * fieldSize * 0.4;
    const radius = fieldSize * 0.2 + radiusVariation;
    
    const x = p.cos(angle) * radius;
    const y = p.sin(angle) * radius;
    
    const particleSize = p.noise(i, time) * 6 + 2;
    
    p.fill(255, p.noise(i, time * 0.5) * 200 + 55);
    
    if (isPixelated) {
      drawPixelatedCircle(p, x, y, particleSize, pixelSize);
    } else {
      p.circle(x, y, particleSize * 2);
    }
    
    // Draw connections between some particles
    if (i % 5 === 0) {
      const j = (i + 20) % particleCount;
      const angle2 = j * p.TWO_PI / particleCount + time;
      const radius2 = fieldSize * 0.2 + p.noise(j * 0.1, time * 0.2) * fieldSize * 0.4;
      
      const x2 = p.cos(angle2) * radius2;
      const y2 = p.sin(angle2) * radius2;
      
      p.stroke(255, 50);
      
      if (isPixelated) {
        drawPixelatedLine(p, x, y, x2, y2, pixelSize);
      } else {
        p.line(x, y, x2, y2);
      }
    }
  }
  
  p.pop();
}

// Pattern 5: Pulse Grid
function drawPulseGrid(
  p: any, 
  centerX: number, 
  centerY: number, 
  size: number, 
  time: number,
  isPixelated: boolean
) {
  p.push();
  p.translate(centerX, centerY);
  p.rotate(time * 0.05);
  
  const pixelSize = isPixelated ? 2 : 1;
  const gridSize = size * 0.7;
  const cellCount = 8;
  const cellSize = gridSize / cellCount;
  
  p.stroke(255, 160);
  p.strokeWeight(pixelSize);
  p.noFill();
  
  // Draw grid
  for (let x = -cellCount/2; x <= cellCount/2; x++) {
    for (let y = -cellCount/2; y <= cellCount/2; y++) {
      const posX = x * cellSize;
      const posY = y * cellSize;
      
      // Pulse effect based on distance from center
      const dist = p.sqrt(x*x + y*y);
      const pulse = p.sin(time * 2 - dist * 0.5) * 0.5 + 0.5;
      const cellPulseSize = cellSize * (0.5 + pulse * 0.5);
      
      if (isPixelated) {
        drawPixelatedRect(p, posX, posY, cellPulseSize, cellPulseSize, pixelSize);
      } else {
        p.rect(posX - cellPulseSize/2, posY - cellPulseSize/2, cellPulseSize, cellPulseSize);
      }
      
      // Draw cell connections
      if (x < cellCount/2 && y < cellCount/2) {
        if (isPixelated) {
          drawPixelatedLine(p, posX, posY, posX + cellSize, posY, pixelSize);
          drawPixelatedLine(p, posX, posY, posX, posY + cellSize, pixelSize);
        } else {
          p.line(posX, posY, posX + cellSize, posY);
          p.line(posX, posY, posX, posY + cellSize);
        }
      }
    }
  }
  
  p.pop();
}

// Helper: Draw background grid
function drawBackgroundGrid(p: any, size: number, isLowPerformanceMode: boolean) {
  p.stroke(255, 20);
  p.strokeWeight(1);
  
  const gridSize = isLowPerformanceMode ? 60 : 30;
  const threshold = isLowPerformanceMode ? 0.96 : 0.92;
  
  for (let x = 0; x < p.width; x += gridSize) {
    for (let y = 0; y < p.height; y += gridSize) {
      if (Math.random() > threshold) {
        p.point(x, y);
      }
    }
  }
}

// Helper: Draw pixelated circle
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

// Helper: Draw pixelated rectangle
function drawPixelatedRect(p: any, x: number, y: number, width: number, height: number, pixelSize: number) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  
  for (let px = x - halfWidth; px < x + halfWidth; px += pixelSize) {
    for (let py = y - halfHeight; py < y + halfHeight; py += pixelSize) {
      if (
        px >= x - halfWidth && 
        px < x + halfWidth && 
        py >= y - halfHeight && 
        py < y + halfHeight
      ) {
        // Only draw pixels on the border
        const isOnBorder = 
          px < x - halfWidth + pixelSize || 
          px >= x + halfWidth - pixelSize || 
          py < y - halfHeight + pixelSize || 
          py >= y + halfHeight - pixelSize;
          
        if (isOnBorder) {
          p.rect(px, py, pixelSize, pixelSize);
        }
      }
    }
  }
}

// Helper: Draw pixelated line
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
