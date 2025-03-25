
import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import { AnimationState, AnimationContextType } from './types';
import { animationReducer, initialAnimationState } from './reducer';
import { animations } from '@/data/animationData';

// Create the context
export const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

// Animation provider component
export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(animationReducer, initialAnimationState);
  
  // Handlers for updating animation state
  const setCurrentAnimation = useCallback((index: number) => {
    dispatch({ type: 'SET_ANIMATION', index });
  }, []);
  
  const handlePrevAnimation = useCallback(() => {
    dispatch({ type: 'PREV_ANIMATION' });
  }, []);
  
  const handleNextAnimation = useCallback(() => {
    dispatch({ type: 'NEXT_ANIMATION' });
  }, []);
  
  const setAnimationSpeed = useCallback((speed: number) => {
    dispatch({ type: 'SET_ANIMATION_SPEED', speed });
  }, []);
  
  const setIsAutoCycling = useCallback((isAuto: boolean) => {
    dispatch({ type: 'SET_AUTO_CYCLING', isAuto });
  }, []);
  
  const setShowAsciiOverlay = useCallback((show: boolean) => {
    dispatch({ type: 'SET_ASCII_OVERLAY', show });
  }, []);
  
  const setPerformanceMode = useCallback((isPerformanceMode: boolean) => {
    dispatch({ type: 'SET_PERFORMANCE_MODE', isPerformanceMode });
  }, []);
  
  // Auto-cycling effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (state.isAutoCycling) {
      intervalId = setInterval(() => {
        dispatch({ type: 'NEXT_ANIMATION' });
      }, 12000 / state.animationSpeed);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [state.isAutoCycling, state.animationSpeed]);
  
  const contextValue: AnimationContextType = {
    ...state,
    setCurrentAnimation,
    handlePrevAnimation,
    handleNextAnimation,
    setAnimationSpeed,
    setIsAutoCycling,
    setShowAsciiOverlay,
    setPerformanceMode: (isPerformanceMode) => {
      setPerformanceMode(isPerformanceMode);
    }
  };
  
  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
    </AnimationContext.Provider>
  );
};
