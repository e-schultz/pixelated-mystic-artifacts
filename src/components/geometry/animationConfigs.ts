
import { 
  drawFlowerOfLife,
  drawMetatronCube,
  drawSriYantra,
  drawMeditationCube,
  drawGeometricGrid,
  drawPerspectiveCorridor,
  drawLightPrism,
  drawRetroComputer,
  getDefaultSettings
} from '@/utils/geometry';

// Get animation configuration based on index and performance mode
export const getAnimationConfig = (p5: any, index: number, performanceMode: boolean = false) => {
  // Base animations array
  const animations = [
    {
      name: "Metatron's Cube",
      drawFunction: drawMetatronCube,
      settings: getDefaultSettings({ 
        segments: performanceMode ? 8 : 12, 
        pixelSize: performanceMode ? 3 : 2 
      })
    },
    {
      name: "Flower of Life",
      drawFunction: drawFlowerOfLife,
      settings: getDefaultSettings({ 
        segments: performanceMode ? 6 : 8, 
        pixelSize: performanceMode ? 3 : 3 
      })
    },
    {
      name: "Sri Yantra",
      drawFunction: drawSriYantra,
      settings: getDefaultSettings({ 
        segments: performanceMode ? 7 : 9, 
        pixelSize: performanceMode ? 3 : 2 
      })
    },
    {
      name: "Sacred Grid",
      drawFunction: drawMeditationCube,
      settings: getDefaultSettings({ 
        segments: performanceMode ? 8 : 12, 
        pixelSize: performanceMode ? 3 : 2 
      })
    },
    {
      name: "Geometric Grid",
      drawFunction: drawGeometricGrid,
      settings: getDefaultSettings({ 
        segments: performanceMode ? 4 : 6, 
        pixelSize: performanceMode ? 3 : 3 
      })
    },
    {
      name: "Perspective Corridor",
      drawFunction: drawPerspectiveCorridor,
      settings: getDefaultSettings({ 
        segments: performanceMode ? 8 : 10, 
        pixelSize: performanceMode ? 3 : 2 
      })
    },
    {
      name: "Light Prism",
      drawFunction: drawLightPrism,
      settings: getDefaultSettings({ 
        segments: performanceMode ? 8 : 12, 
        pixelSize: performanceMode ? 3 : 2 
      })
    },
    {
      name: "Retro Computer",
      drawFunction: drawRetroComputer,
      settings: getDefaultSettings({ 
        segments: performanceMode ? 6 : 8, 
        pixelSize: performanceMode ? 3 : 2 
      })
    }
  ];

  // Handle invalid index
  const safeIndex = index % animations.length;
  return animations[safeIndex];
};
