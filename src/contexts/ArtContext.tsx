
import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { useMediaQuery } from "@/hooks/useMediaQuery";

// Pattern data with titles and descriptions
export const patterns = [
  {
    id: 0,
    title: "Digital Corridor",
    description: "A perspective grid system with vector lines creating a digital space corridor."
  },
  {
    id: 1,
    title: "Neural Lattice",
    description: "Interconnected node system reminiscent of neural networks and digital consciousness."
  },
  {
    id: 2,
    title: "Tesseract Matrix",
    description: "Multi-dimensional grid system representing higher dimensional space unfolding."
  },
  {
    id: 3,
    title: "Sacred Geometry",
    description: "Patterns based on the mathematical principles found throughout the natural world."
  },
  {
    id: 4,
    title: "Quantum Field",
    description: "Visualization of quantum probability fields and particle interactions."
  },
  {
    id: 5,
    title: "Pulse Grid",
    description: "Rhythmic digital pulse patterns flowing through a geometric network."
  },
];

// Define action types
type ActionType = 
  | { type: 'SET_PATTERN'; pattern: number }
  | { type: 'NEXT_PATTERN' }
  | { type: 'PREV_PATTERN' }
  | { type: 'SET_SPEED'; speed: number }
  | { type: 'TOGGLE_TERMINAL_MODE' }
  | { type: 'TOGGLE_PIXELATED' }
  | { type: 'TOGGLE_AUTO_PLAY' }
  | { type: 'TOGGLE_CONTROLS' };

// Define state interface
interface ArtState {
  currentPattern: number;
  speed: number;
  isTerminalMode: boolean;
  isPixelated: boolean;
  isAutoPlaying: boolean;
  isLowPerformanceMode: boolean;
  isControlsVisible: boolean;
}

// Define context interface
interface ArtContextType extends ArtState {
  setCurrentPattern: (index: number) => void;
  nextPattern: () => void;
  prevPattern: () => void;
  setSpeed: (speed: number) => void;
  toggleTerminalMode: () => void;
  togglePixelated: () => void;
  toggleAutoPlay: () => void;
  toggleControls: () => void;
}

// Create context
const ArtContext = createContext<ArtContextType | undefined>(undefined);

// Reducer function
function artReducer(state: ArtState, action: ActionType): ArtState {
  switch (action.type) {
    case 'SET_PATTERN':
      return { ...state, currentPattern: action.pattern };
    case 'NEXT_PATTERN':
      return { ...state, currentPattern: (state.currentPattern + 1) % patterns.length };
    case 'PREV_PATTERN':
      return { ...state, currentPattern: (state.currentPattern - 1 + patterns.length) % patterns.length };
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
    isControlsVisible: false
  };
  
  // Use reducer for state management
  const [state, dispatch] = useReducer(artReducer, initialState);
  
  // Action creators
  const setCurrentPattern = useCallback((index: number) => {
    console.log(`Switching to pattern ${index}`);
    dispatch({ type: 'SET_PATTERN', pattern: index });
  }, []);
  
  const nextPattern = useCallback(() => {
    dispatch({ type: 'NEXT_PATTERN' });
  }, []);
  
  const prevPattern = useCallback(() => {
    dispatch({ type: 'PREV_PATTERN' });
  }, []);
  
  const setSpeed = useCallback((speed: number) => {
    dispatch({ type: 'SET_SPEED', speed });
  }, []);
  
  const toggleTerminalMode = useCallback(() => {
    dispatch({ type: 'TOGGLE_TERMINAL_MODE' });
  }, []);
  
  const togglePixelated = useCallback(() => {
    dispatch({ type: 'TOGGLE_PIXELATED' });
  }, []);
  
  const toggleAutoPlay = useCallback(() => {
    dispatch({ type: 'TOGGLE_AUTO_PLAY' });
  }, []);
  
  const toggleControls = useCallback(() => {
    dispatch({ type: 'TOGGLE_CONTROLS' });
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
        prevPattern,
        setSpeed,
        toggleTerminalMode,
        togglePixelated,
        toggleAutoPlay,
        toggleControls
      }}
    >
      {children}
    </ArtContext.Provider>
  );
}

export function useArt() {
  const context = useContext(ArtContext);
  if (context === undefined) {
    throw new Error('useArt must be used within an ArtProvider');
  }
  return context;
}
