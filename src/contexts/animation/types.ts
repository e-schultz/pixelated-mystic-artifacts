
import { animations } from '@/data/animationData';

export interface AnimationState {
  currentAnimation: number;
  animationSpeed: number;
  isAutoCycling: boolean;
  showAsciiOverlay: boolean;
  performanceMode: boolean;
  randomOffset: number;
  isScreenSaverMode: boolean; // Added for screen saver mode
}

export interface AnimationContextType extends AnimationState {
  setCurrentAnimation: (index: number) => void;
  handlePrevAnimation: () => void;
  handleNextAnimation: () => void;
  setAnimationSpeed: (speed: number) => void;
  setIsAutoCycling: (isAuto: boolean) => void;
  setShowAsciiOverlay: (show: boolean) => void;
  setPerformanceMode: (isPerformanceMode: boolean) => void;
  toggleScreenSaverMode: () => void; // Added for screen saver mode
}
