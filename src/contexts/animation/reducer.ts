
import { AnimationState } from './types';
import { AnimationActionType } from './actions';
import { animations } from '@/data/animationData';

// Reducer function
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
    default:
      return state;
  }
}
