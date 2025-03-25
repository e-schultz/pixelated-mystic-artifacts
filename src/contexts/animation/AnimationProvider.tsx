
import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { animations } from '@/data/animationData';
import { AnimationState, AnimationContextType } from './types';
import { animationReducer } from './reducer';

// Create context
export const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  
  // Initialize state
  const initialState: AnimationState = {
    currentAnimation: 0,
    animationSpeed: isMobile ? 0.7 : 1,
    isAutoCycling: true,
    showAsciiOverlay: false,
    performanceMode: isMobile
  };
  
  // Use reducer for state management
  const [state, dispatch] = useReducer(animationReducer, initialState);
  
  // Action creators
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
  
  // Update performance mode when mobile status changes
  useEffect(() => {
    dispatch({ type: 'SET_PERFORMANCE_MODE', isPerformanceMode: isMobile });
    
    // Automatically reduce animation speed on mobile
    if (isMobile && state.animationSpeed > 0.7) {
      setAnimationSpeed(0.7);
    }
  }, [isMobile, state.animationSpeed]);
  
  // Optimized auto cycling with proper timing
  useEffect(() => {
    if (!state.isAutoCycling) return;
    
    // Adjust cycle time based on device capability
    const cycleTime = state.performanceMode ? 
      12000 / state.animationSpeed : // Slower on mobile
      10000 / state.animationSpeed;  // Normal on desktop
      
    const intervalId = setInterval(() => {
      dispatch({ type: 'NEXT_ANIMATION' });
    }, cycleTime);
    
    return () => clearInterval(intervalId);
  }, [state.isAutoCycling, state.animationSpeed, state.performanceMode]);
  
  // Log ASCII art with throttling
  useEffect(() => {
    if (state.showAsciiOverlay) {
      console.log(`
,---.   .--.   .---. ,--. ,-. 
|    \\  |  |   | .-' | .--' | 
|  ,  \\ |  |   | \`-. | |    | 
|  |\\  \\|  |   | .-' | |    | 
|  | \\  '  '--.|  \`--' \`--. | 
\`--'  \`--\`-----'\`------\`---' ' 
.---.   ,---.  ,--.  ,---.   
| .-.\\ /  .-. ) |  | /  .-'  
| |-' )| ('-. \\ |  || \`--.   
| |--' |  --. ) |  ||.--.    
| |    /  '--'  |  ||  --'   
)('    \`------' \`--' \`----'  
                               
      `);
    }
  }, [state.showAsciiOverlay]);
  
  return (
    <AnimationContext.Provider
      value={{
        ...state,
        setCurrentAnimation,
        handlePrevAnimation,
        handleNextAnimation,
        setAnimationSpeed,
        setIsAutoCycling,
        setShowAsciiOverlay
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}
