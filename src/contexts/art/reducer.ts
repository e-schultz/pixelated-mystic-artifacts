
import { ArtState } from './types';
import { Action, ActionType } from './actions';
import { 
  navigateToNextPattern, 
  navigateToPreviousPattern, 
  jumpToPattern,
  getRandomPattern
} from "@/utils/geometry/navigation";
import { patterns } from './types';

// Reducer function
export function artReducer(state: ArtState, action: Action): ArtState {
  switch (action.type) {
    case ActionType.SET_PATTERN:
      return { ...state, currentPattern: jumpToPattern(action.pattern, patterns.length) };
    case ActionType.NEXT_PATTERN:
      return { ...state, currentPattern: navigateToNextPattern(state.currentPattern, patterns.length) };
    case ActionType.PREV_PATTERN:
      return { ...state, currentPattern: navigateToPreviousPattern(state.currentPattern, patterns.length) };
    case ActionType.SELECT_RANDOM_PATTERN:
      return { ...state, currentPattern: getRandomPattern(state.currentPattern, patterns.length) };
    case ActionType.SET_SPEED:
      return { ...state, speed: action.speed };
    case ActionType.TOGGLE_TERMINAL_MODE:
      return { ...state, isTerminalMode: !state.isTerminalMode };
    case ActionType.TOGGLE_PIXELATED:
      return { ...state, isPixelated: !state.isPixelated };
    case ActionType.TOGGLE_LOW_PERFORMANCE_MODE:
      return { ...state, isLowPerformanceMode: !state.isLowPerformanceMode };
    case ActionType.TOGGLE_AUTO_PLAY:
      return { ...state, isAutoPlaying: !state.isAutoPlaying };
    case ActionType.TOGGLE_CONTROLS:
      return { ...state, isControlsVisible: !state.isControlsVisible };
    default:
      return state;
  }
}
