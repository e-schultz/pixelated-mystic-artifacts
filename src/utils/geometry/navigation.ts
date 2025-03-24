
import { getDefaultSettings, GeometrySettings } from './types';

/**
 * Interface representing a geometry visualization pattern
 */
export interface GeometryPattern {
  name: string;
  drawFunction: (p5: any, x: number, y: number, size: number, settings: GeometrySettings) => void;
  settings: GeometrySettings;
}

/**
 * Navigates to the next pattern in the sequence
 * @param currentPattern - Current pattern index
 * @param totalPatterns - Total number of available patterns
 * @returns The index of the next pattern
 */
export const navigateToNextPattern = (currentPattern: number, totalPatterns: number): number => {
  return (currentPattern + 1) % totalPatterns;
};

/**
 * Navigates to the previous pattern in the sequence
 * @param currentPattern - Current pattern index
 * @param totalPatterns - Total number of available patterns
 * @returns The index of the previous pattern
 */
export const navigateToPreviousPattern = (currentPattern: number, totalPatterns: number): number => {
  return (currentPattern - 1 + totalPatterns) % totalPatterns;
};

/**
 * Jumps to a specific pattern by index
 * @param targetPattern - Target pattern index
 * @param totalPatterns - Total number of available patterns
 * @returns The validated pattern index (ensures it's within bounds)
 */
export const jumpToPattern = (targetPattern: number, totalPatterns: number): number => {
  // Ensure the pattern index is within bounds
  return Math.max(0, Math.min(targetPattern, totalPatterns - 1));
};

/**
 * Selects a pattern directly by ID or index
 * @param patternId - Pattern ID or index to select
 * @param totalPatterns - Total number of available patterns
 * @returns The validated pattern index (ensures it's within bounds)
 */
export const selectPatternById = (patternId: number, totalPatterns: number): number => {
  // Ensure the pattern index is within bounds
  return jumpToPattern(patternId, totalPatterns);
};

/**
 * Gets a random pattern index
 * @param currentPattern - Current pattern index to avoid selecting the same one
 * @param totalPatterns - Total number of available patterns
 * @returns A random pattern index different from the current one
 */
export const getRandomPattern = (currentPattern: number, totalPatterns: number): number => {
  if (totalPatterns <= 1) return 0;
  
  // Generate a random pattern index different from the current one
  let randomPattern;
  do {
    randomPattern = Math.floor(Math.random() * totalPatterns);
  } while (randomPattern === currentPattern);
  
  return randomPattern;
};
