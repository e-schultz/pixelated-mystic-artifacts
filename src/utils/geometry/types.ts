
// Type definitions for geometric rendering

export interface GeometrySettings {
  scale: number;
  rotation: number;
  opacity: number;
  segments: number;
  variance: number;
  pixelSize: number;
  color: string;
  speed: number;
}

// Get default settings with optional overrides
export const getDefaultSettings = (overrides: Partial<GeometrySettings> = {}): GeometrySettings => ({
  scale: 0.8,
  rotation: 0,
  opacity: 0.9,
  segments: 8,
  variance: 0.2,
  pixelSize: 3,
  color: "#f0f0e4",
  speed: 0.005,
  ...overrides
});
