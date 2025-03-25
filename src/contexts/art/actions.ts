
// Define action types
export enum ActionType {
  SET_PATTERN = 'SET_PATTERN',
  NEXT_PATTERN = 'NEXT_PATTERN',
  PREV_PATTERN = 'PREV_PATTERN',
  SET_SPEED = 'SET_SPEED',
  TOGGLE_TERMINAL_MODE = 'TOGGLE_TERMINAL_MODE',
  TOGGLE_PIXELATED = 'TOGGLE_PIXELATED',
  TOGGLE_LOW_PERFORMANCE_MODE = 'TOGGLE_LOW_PERFORMANCE_MODE',
  TOGGLE_AUTO_PLAY = 'TOGGLE_AUTO_PLAY',
  TOGGLE_CONTROLS = 'TOGGLE_CONTROLS',
  SELECT_RANDOM_PATTERN = 'SELECT_RANDOM_PATTERN'
}

// Define action interfaces
export type Action =
  | { type: ActionType.SET_PATTERN; pattern: number }
  | { type: ActionType.NEXT_PATTERN }
  | { type: ActionType.PREV_PATTERN }
  | { type: ActionType.SET_SPEED; speed: number }
  | { type: ActionType.TOGGLE_TERMINAL_MODE }
  | { type: ActionType.TOGGLE_PIXELATED }
  | { type: ActionType.TOGGLE_LOW_PERFORMANCE_MODE }
  | { type: ActionType.TOGGLE_AUTO_PLAY }
  | { type: ActionType.TOGGLE_CONTROLS }
  | { type: ActionType.SELECT_RANDOM_PATTERN };
