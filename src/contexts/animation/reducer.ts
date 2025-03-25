
import { AnimationState } from './types';
import { AnimationActionType } from './actions';
import { animations } from '@/data/animationData';

// Initial state for the animation context
export const initialAnimationState: AnimationState = {
  currentAnimation: 0,
  animationSpeed: 1,
  isAutoCycling: true,
  showAsciiOverlay: false,
  performanceMode: false,
  randomOffset: Math.random() * 1000, // Initialize with a random value
  isScreenSaverMode: false, // Added for screen saver mode
};

// Reducer function for managing animation state
export function animationReducer(state: AnimationState, action: AnimationActionType): AnimationState {
  switch (action.type) {
    case 'SET_ANIMATION':
      return {
        ...state,
        currentAnimation: action.index
      };
    case 'PREV_ANIMATION':
      return {
        ...state,
        currentAnimation: (state.currentAnimation - 1 + animations.length) % animations.length
      };
    case 'NEXT_ANIMATION':
      return {
        ...state,
        currentAnimation: (state.currentAnimation + 1) % animations.length
      };
    case 'SET_ANIMATION_SPEED':
      return {
        ...state,
        animationSpeed: action.speed
      };
    case 'SET_AUTO_CYCLING':
      return {
        ...state,
        isAutoCycling: action.isAuto
      };
    case 'SET_ASCII_OVERLAY':
      return {
        ...state,
        showAsciiOverlay: action.show
      };
    case 'SET_PERFORMANCE_MODE':
      return {
        ...state,
        performanceMode: action.isPerformanceMode
      };
    case 'SET_RANDOM_OFFSET':
      return {
        ...state,
        randomOffset: action.offset
      };
    case 'TOGGLE_SCREEN_SAVER_MODE':
      return {
        ...state,
        isScreenSaverMode: !state.isScreenSaverMode,
        isAutoCycling: !state.isScreenSaverMode, // Enable auto cycling when entering screen saver mode
      };
    default:
      return state;
  }
}
