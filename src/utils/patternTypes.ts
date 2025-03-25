
// Types for pattern rendering system

export interface RenderOptions {
  time: number;
  isPixelated: boolean;
  isLowPerformanceMode: boolean;
  isTerminalMode?: boolean;
  parameters: {
    complexity: number;
    rotationSpeed: number;
    colorIntensity: number;
    lineThickness: number;
    trailPersistence: number;
  };
}
