
// Type definitions for pattern renderer

export interface RenderOptions {
  time: number;
  isPixelated: boolean;
  isLowPerformanceMode: boolean;
  isTerminalMode: boolean;
}

export interface PatternFunction {
  (p: any, centerX: number, centerY: number, size: number, time: number, isPixelated: boolean): void;
}
