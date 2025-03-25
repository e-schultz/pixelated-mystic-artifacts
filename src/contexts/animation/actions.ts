
export type AnimationActionType =
  | { type: 'SET_ANIMATION'; index: number }
  | { type: 'PREV_ANIMATION' }
  | { type: 'NEXT_ANIMATION' }
  | { type: 'SET_ANIMATION_SPEED'; speed: number }
  | { type: 'SET_AUTO_CYCLING'; isAuto: boolean }
  | { type: 'SET_ASCII_OVERLAY'; show: boolean }
  | { type: 'SET_PERFORMANCE_MODE'; isPerformanceMode: boolean }
  | { type: 'SET_RANDOM_OFFSET'; offset: number }
  | { type: 'TOGGLE_SCREEN_SAVER_MODE' }; // Added for screen saver mode
