
// Export all geometry utilities from a single entry point

// Re-export types and settings
export * from './types';

// Re-export core utilities
export * from './coreUtils';

// Re-export pattern renderers
export * from './sacredGeometry';
export * from './meditationCube';
export * from './gridPatterns';
export * from './perspectivePatterns';
export * from './lightEffects';
export * from './retroComputer';

// Function to get a random geometry function
import { drawMetatronCube } from './sacredGeometry';
import { drawFlowerOfLife } from './sacredGeometry';
import { drawSriYantra } from './sacredGeometry';
import { drawMeditationCube } from './meditationCube';
import { drawGeometricGrid } from './gridPatterns';
import { drawPerspectiveCorridor } from './perspectivePatterns';
import { drawLightPrism } from './lightEffects';
import { drawRetroComputer } from './retroComputer';

// Generate a random geometry function
export const getRandomGeometryFunction = () => {
  const functions = [
    drawMetatronCube,
    drawFlowerOfLife,
    drawSriYantra,
    drawMeditationCube,
    drawGeometricGrid,
    drawPerspectiveCorridor,
    drawLightPrism,
    drawRetroComputer
  ];
  
  return functions[Math.floor(Math.random() * functions.length)];
};
