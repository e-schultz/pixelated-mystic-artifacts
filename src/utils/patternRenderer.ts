
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
  
  // Determine which pattern to draw
  switch (patternIndex) {
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
  const cubeSize = size * 0.6;
  const rotation = time * 0.2;
  
  p.stroke(255, 180);
  p.strokeWeight(pixelSize);
  p.noFill();
  
  // Draw inner cube
  p.push();
  p.rotateX(rotation);
  p.rotateY(rotation * 0.7);
  p.rotateZ(rotation * 0.5);
  
  const innerSize = cubeSize * 0.6;
  const vertices = [];
  
  // Create cube vertices
  for (let x = -1; x <= 1; x += 2) {
    for (let y = -1; y <= 1; y += 2) {
      for (let z = -1; z <= 1; z += 2) {
        vertices.push({
          x: x * innerSize / 2,
          y: y * innerSize / 2,
          z: z * innerSize / 2
        });
      }
    }
  }
  
  // Draw edges
  for (let i = 0; i < vertices.length; i++) {
    for (let j = i + 1; j < vertices.length; j++) {
      const v1 = vertices[i];
      const v2 = vertices[j];
      
      // Only connect vertices that share exactly one coordinate
      const sharedAxes = 
        (v1.x === v2.x ? 1 : 0) + 
        (v1.y === v2.y ? 1 : 0) + 
        (v1.z === v2.z ? 1 : 0);
      
      if (sharedAxes === 2) {
        // Project 3D to 2D
        const x1 = v1.x;
        const y1 = v1.y;
        const x2 = v2.x;
        const y2 = v2.y;
        
        if (isPixelated) {
          drawPixelatedLine(p, x1, y1, x2, y2, pixelSize);
        } else {
          p.line(x1, y1, x2, y2);
        }
      }
    }
  }
  p.pop();
  
  // Draw outer cube
  p.push();
  p.rotateX(rotation * 0.6);
  p.rotateY(rotation * 0.4);
  p.rotateZ(rotation * 0.3);
  
  if (isPixelated) {
    drawPixelatedRect(p, 0, 0, cubeSize, cubeSize, pixelSize);
  } else {
    p.rect(-cubeSize/2, -cubeSize/2, cubeSize, cubeSize);
  }
  p.pop();
  
  p.pop();
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
