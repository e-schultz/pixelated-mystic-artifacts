
import { ArtState } from './types';
import { ActionType } from './actions';
import { 
  navigateToNextPattern, 
  navigateToPreviousPattern, 
  jumpToPattern,
  getRandomPattern
} from "@/utils/geometry/navigation";
import { patterns } from './types';

// Reducer function
export function artReducer(state: ArtState, action: ActionType): ArtState {
  switch (action.type) {
    case 'SET_PATTERN':
      return { ...state, currentPattern: jumpToPattern(action.pattern, patterns.length) };
    case 'NEXT_PATTERN':
      return { ...state, currentPattern: navigateToNextPattern(state.currentPattern, patterns.length) };
    case 'PREV_PATTERN':
      return { ...state, currentPattern: navigateToPreviousPattern(state.currentPattern, patterns.length) };
    case 'SELECT_RANDOM_PATTERN':
      return { ...state, currentPattern: getRandomPattern(state.currentPattern, patterns.length) };
    case 'SET_SPEED':
      return { ...state, speed: action.speed };
    case 'TOGGLE_TERMINAL_MODE':
      return { ...state, isTerminalMode: !state.isTerminalMode };
    case 'TOGGLE_PIXELATED':
      return { ...state, isPixelated: !state.isPixelated };
    case 'TOGGLE_AUTO_PLAY':
      return { ...state, isAutoPlaying: !state.isAutoPlaying };
    case 'TOGGLE_CONTROLS':
      return { ...state, isControlsVisible: !state.isControlsVisible };
    default:
      return state;
  }
}
