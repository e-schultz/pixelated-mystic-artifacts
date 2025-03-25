
// Define action types
export type ActionType = 
  | { type: 'SET_PATTERN'; pattern: number }
  | { type: 'NEXT_PATTERN' }
  | { type: 'PREV_PATTERN' }
  | { type: 'SET_SPEED'; speed: number }
  | { type: 'TOGGLE_TERMINAL_MODE' }
  | { type: 'TOGGLE_PIXELATED' }
  | { type: 'TOGGLE_AUTO_PLAY' }
  | { type: 'TOGGLE_CONTROLS' }
  | { type: 'SELECT_RANDOM_PATTERN' };
