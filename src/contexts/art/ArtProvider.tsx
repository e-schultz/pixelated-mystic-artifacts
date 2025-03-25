
import React, { createContext, useReducer, useCallback, useEffect } from 'react';
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ArtState, ArtContextType, patterns, defaultParameters, PatternParameters } from './types';
import { ActionType, Action } from './actions';
import { artReducer } from './reducer';
import { selectPatternById } from "@/utils/geometry/navigation";

// Create context
export const ArtContext = createContext<ArtContextType | undefined>(undefined);

export function ArtProvider({ children }: { children: React.ReactNode }) {
  // Check if device is mobile/low performance
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isLowPerformanceMode = isMobile;
  
  // Initialize state
  const initialState: ArtState = {
    currentPattern: 0,
    speed: isLowPerformanceMode ? 0.7 : 1,
    isTerminalMode: false,
    isPixelated: true,
    isAutoPlaying: true,
    isLowPerformanceMode,
    isControlsVisible: false,
    parameters: { ...defaultParameters }
  };
  
  // Use reducer for state management
  const [state, dispatch] = useReducer(artReducer, initialState);
  
  // Action creators
  const setCurrentPattern = useCallback((index: number) => {
    console.log(`Switching to pattern ${index}`);
    dispatch({ type: ActionType.SET_PATTERN, pattern: index });
  }, []);
  
  const nextPattern = useCallback(() => {
    dispatch({ type: ActionType.NEXT_PATTERN });
  }, []);
  
  const previousPattern = useCallback(() => {
    dispatch({ type: ActionType.PREV_PATTERN });
  }, []);
  
  // Alias for previousPattern
  const prevPattern = previousPattern;
  
  const selectPatternById = useCallback((id: number) => {
    console.log(`Selecting pattern with ID ${id}`);
    dispatch({ type: ActionType.SET_PATTERN, pattern: id });
  }, []);
  
  const selectRandomPattern = useCallback(() => {
    console.log('Selecting a random pattern');
    dispatch({ type: ActionType.SELECT_RANDOM_PATTERN });
  }, []);
  
  const setSpeed = useCallback((speed: number) => {
    dispatch({ type: ActionType.SET_SPEED, speed });
  }, []);
  
  const toggleTerminalMode = useCallback(() => {
    dispatch({ type: ActionType.TOGGLE_TERMINAL_MODE });
  }, []);
  
  const togglePixelated = useCallback(() => {
    dispatch({ type: ActionType.TOGGLE_PIXELATED });
  }, []);
  
  const toggleAutoPlay = useCallback(() => {
    dispatch({ type: ActionType.TOGGLE_AUTO_PLAY });
  }, []);
  
  const toggleControls = useCallback(() => {
    dispatch({ type: ActionType.TOGGLE_CONTROLS });
  }, []);
  
  // New function to toggle low performance mode
  const toggleLowPerformanceMode = useCallback(() => {
    dispatch({ type: ActionType.TOGGLE_LOW_PERFORMANCE_MODE });
  }, []);
  
  // New functions to manage pattern parameters
  const setPatternParameters = useCallback((parameters: Partial<PatternParameters>) => {
    console.log('Updating pattern parameters:', parameters);
    dispatch({ type: ActionType.SET_PATTERN_PARAMETERS, parameters });
  }, []);
  
  const resetPatternParameters = useCallback(() => {
    console.log('Resetting pattern parameters to defaults');
    dispatch({ type: ActionType.RESET_PATTERN_PARAMETERS });
  }, []);
  
  // Handle auto play
  useEffect(() => {
    if (!state.isAutoPlaying) return;
    
    console.log(`Auto-cycling enabled with speed ${state.speed}`);
    const interval = setInterval(() => {
      nextPattern();
    }, isLowPerformanceMode ? 15000 / state.speed : 12000 / state.speed);
    
    return () => clearInterval(interval);
  }, [state.isAutoPlaying, state.speed, nextPattern, isLowPerformanceMode]);
  
  // Log when pattern changes for debugging
  useEffect(() => {
    console.log(`Current pattern set to: ${state.currentPattern}`);
  }, [state.currentPattern]);
  
  return (
    <ArtContext.Provider
      value={{
        ...state,
        setCurrentPattern,
        nextPattern,
        previousPattern,
        prevPattern,
        setSpeed,
        toggleTerminalMode,
        togglePixelated,
        toggleLowPerformanceMode,
        toggleAutoPlay,
        toggleControls,
        selectPatternById,
        selectRandomPattern,
        setPatternParameters,
        resetPatternParameters
      }}
    >
      {children}
    </ArtContext.Provider>
  );
}
