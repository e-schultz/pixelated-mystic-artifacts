
import { RenderOptions } from "./patternTypes";
import { drawBackgroundGrid } from "./patterns/helpers";

// Import all pattern drawing functions
import { drawDigitalCorridor } from "./patterns/digitalCorridor";
import { drawNeuralLattice } from "./patterns/neuralLattice";
import { drawTesseractMatrix } from "./patterns/tesseractMatrix";
import { drawSacredGeometry } from "./patterns/sacredGeometry";
import { drawQuantumField } from "./patterns/quantumField";
import { drawPulseGrid } from "./patterns/pulseGrid";

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
