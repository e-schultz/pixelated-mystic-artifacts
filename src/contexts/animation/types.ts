
import { animations } from '@/data/animationData';

// Pattern data with titles and descriptions
export const animationTypes = animations;

// Define state interface
export interface AnimationState {
  currentAnimation: number;
  animationSpeed: number;
  isAutoCycling: boolean;
  showAsciiOverlay: boolean;
  performanceMode: boolean;
  randomOffset: number;
}

// Define context interface
export interface AnimationContextType extends AnimationState {
  setCurrentAnimation: (index: number) => void;
  handlePrevAnimation: () => void;
  handleNextAnimation: () => void;
  setAnimationSpeed: (speed: number) => void;
  setIsAutoCycling: (isAuto: boolean) => void;
  setShowAsciiOverlay: (show: boolean) => void;
  setPerformanceMode: (isPerformanceMode: boolean) => void;
}
