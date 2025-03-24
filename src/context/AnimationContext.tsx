
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { animations } from '@/data/animationData';
import { useIsMobile } from '@/hooks/use-mobile';

// Define types for our animation state
export interface AnimationState {
  currentAnimation: number;
  isLoading: boolean;
  isAutoCycling: boolean;
  animationSpeed: number;
  showAsciiOverlay: boolean;
}

// Actions that can be dispatched
type AnimationAction =
  | { type: 'SET_ANIMATION'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'TOGGLE_AUTO_CYCLING' }
  | { type: 'SET_AUTO_CYCLING'; payload: boolean }
  | { type: 'SET_ANIMATION_SPEED'; payload: number }
  | { type: 'TOGGLE_ASCII_OVERLAY' }
  | { type: 'SET_ASCII_OVERLAY'; payload: boolean }
  | { type: 'NEXT_ANIMATION' }
  | { type: 'PREV_ANIMATION' };

// Context type definition
interface AnimationContextType {
  state: AnimationState;
  dispatch: React.Dispatch<AnimationAction>;
}

// Initial state - mobile-first approach
const initialState: AnimationState = {
  currentAnimation: 0,
  isLoading: true,
  isAutoCycling: true,
  animationSpeed: 1,
  showAsciiOverlay: false,
};

// Create context
const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

// Reducer function
function animationReducer(state: AnimationState, action: AnimationAction): AnimationState {
  switch (action.type) {
    case 'SET_ANIMATION':
      return { ...state, currentAnimation: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'TOGGLE_AUTO_CYCLING':
      return { ...state, isAutoCycling: !state.isAutoCycling };
    case 'SET_AUTO_CYCLING':
      return { ...state, isAutoCycling: action.payload };
    case 'SET_ANIMATION_SPEED':
      // Clamp animation speed between 0.5 and 2
      const clampedSpeed = Math.max(0.5, Math.min(2, action.payload));
      return { ...state, animationSpeed: clampedSpeed };
    case 'TOGGLE_ASCII_OVERLAY':
      return { ...state, showAsciiOverlay: !state.showAsciiOverlay };
    case 'SET_ASCII_OVERLAY':
      return { ...state, showAsciiOverlay: action.payload };
    case 'NEXT_ANIMATION':
      return { 
        ...state, 
        currentAnimation: (state.currentAnimation + 1) % animations.length 
      };
    case 'PREV_ANIMATION':
      return { 
        ...state, 
        currentAnimation: (state.currentAnimation - 1 + animations.length) % animations.length 
      };
    default:
      return state;
  }
}

// Provider component
export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(animationReducer, initialState);
  const isMobile = useIsMobile();

  // Set up auto-cycling effect
  useEffect(() => {
    if (state.isAutoCycling) {
      // Shorter cycle time on mobile
      const cycleTime = isMobile ? 10000 : 15000;
      const adjustedTime = cycleTime / Math.max(0.8, state.animationSpeed);
      
      const intervalId = setInterval(() => {
        dispatch({ type: 'NEXT_ANIMATION' });
      }, adjustedTime);
      
      return () => clearInterval(intervalId);
    }
  }, [state.isAutoCycling, state.animationSpeed, isMobile]);

  // Initial loading effect - shorter on mobile
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'SET_LOADING', payload: false });
    }, isMobile ? 1200 : 2000);

    return () => clearTimeout(timer);
  }, [isMobile]);

  return (
    <AnimationContext.Provider value={{ state, dispatch }}>
      {children}
    </AnimationContext.Provider>
  );
};

// Custom hook for using the animation context
export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};
