
import { RenderOptions } from "./patternTypes";
import { drawBackgroundGrid } from "./patterns/helpers";

// Import all pattern drawing functions
import { drawDigitalCorridor } from "./patterns/digitalCorridor";
import { drawNeuralLattice } from "./patterns/neuralLattice";
import { drawTesseractMatrix } from "./patterns/tesseractMatrix";
import { drawSacredGeometry } from "./patterns/sacredGeometry";
import { drawQuantumField } from "./patterns/quantumField";
import { drawPulseGrid } from "./patterns/pulseGrid";
import { drawSineWaveGrid } from "./patterns/sineWaveGrid";
import { drawCyberGrid } from "./patterns/cyberGrid";
import { drawDiffusionOracle } from "./patterns/diffusionOracle";
import { drawResonanceContour } from "./patterns/resonanceContour";
import { drawRecursiveCollapseShrine } from "./patterns/recursiveCollapseShrine";
import { drawHybridConstellation } from "./patterns/hybridConstellation";
import { drawFractalHarmonicShrine } from "./patterns/fractalHarmonicShrine";

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
  const validPatternIndex = Math.max(0, Math.min(patternIndex, 12));
  
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
    case 6:
      drawSineWaveGrid(p, centerX, centerY, size, time, isPixelated);
      break;
    case 7:
      drawCyberGrid(p, centerX, centerY, size, time, isPixelated, options);
      break;
    case 8:
      drawDiffusionOracle(p, centerX, centerY, size, time, isPixelated, options);
      break;
    case 9:
      drawResonanceContour(p, centerX, centerY, size, time, isPixelated, options);
      break;
    case 10:
      drawRecursiveCollapseShrine(p, centerX, centerY, size, time, isPixelated, options);
      break;
    case 11:
      drawHybridConstellation(p, centerX, centerY, size, time, isPixelated, options);
      break;
    case 12:
      drawFractalHarmonicShrine(p, centerX, centerY, size, time, isPixelated, options);
      break;
    default:
      drawDigitalCorridor(p, centerX, centerY, size, time, isPixelated);
  }
  
  // Draw subtle background grid
  if (!isLowPerformanceMode || p.frameCount % 3 === 0) {
    drawBackgroundGrid(p, size, isLowPerformanceMode);
  }
}
