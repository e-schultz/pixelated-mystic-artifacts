
import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { 
  navigateToNextPattern, 
  navigateToPreviousPattern, 
  jumpToPattern,
  getRandomPattern
} from "@/utils/geometry/navigation";
import { animations } from '@/data/animationData';

// Pattern data from the original ArtContext
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

// Define action types for the reducer
type ActionType = 
  | { type: 'SET_CURRENT_PATTERN'; pattern: number }
  | { type: 'NEXT_PATTERN' }
  | { type: 'PREV_PATTERN' }
  | { type: 'SELECT_RANDOM_PATTERN' }
  | { type: 'SET_ANIMATION_SPEED'; speed: number }
  | { type: 'TOGGLE_ASCII_OVERLAY' }
  | { type: 'TOGGLE_PIXELATED' }
  | { type: 'TOGGLE_TERMINAL_MODE' }
  | { type: 'TOGGLE_AUTO_CYCLING' }
  | { type: 'TOGGLE_CONTROLS_VISIBLE' };

// Define state interface
interface VisualizationState {
  currentPattern: number;
  animationSpeed: number;
  isTerminalMode: boolean;
  isPixelated: boolean;
  isAutoCycling: boolean;
  showAsciiOverlay: boolean;
  isLowPerformanceMode: boolean;
  isControlsVisible: boolean;
}

// Define context interface
interface VisualizationContextType extends VisualizationState {
  // Pattern navigation methods
  setCurrentPattern: (index: number) => void;
  handleNextPattern: () => void;
  handlePrevPattern: () => void;
  selectRandomPattern: () => void;
  
  // Animation control methods
  setAnimationSpeed: (speed: number) => void;
  toggleAsciiOverlay: () => void;
  togglePixelated: () => void;
  toggleTerminalMode: () => void;
  toggleAutoCycling: () => void;
  toggleControls: () => void;
  
  // UI convenience methods
  getCurrentPatternInfo: () => { title: string; description: string };
}

// Create context
const VisualizationContext = createContext<VisualizationContextType | undefined>(undefined);

// Reducer function
function visualizationReducer(state: VisualizationState, action: ActionType): VisualizationState {
  switch (action.type) {
    case 'SET_CURRENT_PATTERN':
      return { ...state, currentPattern: jumpToPattern(action.pattern, patterns.length) };
    case 'NEXT_PATTERN':
      return { ...state, currentPattern: navigateToNextPattern(state.currentPattern, patterns.length) };
    case 'PREV_PATTERN':
      return { ...state, currentPattern: navigateToPreviousPattern(state.currentPattern, patterns.length) };
    case 'SELECT_RANDOM_PATTERN':
      return { ...state, currentPattern: getRandomPattern(state.currentPattern, patterns.length) };
    case 'SET_ANIMATION_SPEED':
      return { ...state, animationSpeed: action.speed };
    case 'TOGGLE_ASCII_OVERLAY':
      return { ...state, showAsciiOverlay: !state.showAsciiOverlay };
    case 'TOGGLE_PIXELATED':
      return { ...state, isPixelated: !state.isPixelated };
    case 'TOGGLE_TERMINAL_MODE':
      return { ...state, isTerminalMode: !state.isTerminalMode };
    case 'TOGGLE_AUTO_CYCLING':
      return { ...state, isAutoCycling: !state.isAutoCycling };
    case 'TOGGLE_CONTROLS_VISIBLE':
      return { ...state, isControlsVisible: !state.isControlsVisible };
    default:
      return state;
  }
}

export function VisualizationProvider({ children }: { children: React.ReactNode }) {
  // Check if device is mobile/low performance
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isLowPerformanceMode = isMobile;
  
  // Initialize state
  const initialState: VisualizationState = {
    currentPattern: 0,
    animationSpeed: isLowPerformanceMode ? 0.7 : 1,
    isTerminalMode: false,
    isPixelated: true,
    isAutoCycling: true,
    showAsciiOverlay: false,
    isLowPerformanceMode,
    isControlsVisible: false
  };
  
  // Use reducer for state management
  const [state, dispatch] = useReducer(visualizationReducer, initialState);
  
  // Action creators
  const setCurrentPattern = useCallback((index: number) => {
    console.log(`Switching to pattern ${index}`);
    dispatch({ type: 'SET_CURRENT_PATTERN', pattern: index });
  }, []);
  
  const handleNextPattern = useCallback(() => {
    dispatch({ type: 'NEXT_PATTERN' });
  }, []);
  
  const handlePrevPattern = useCallback(() => {
    dispatch({ type: 'PREV_PATTERN' });
  }, []);
  
  const selectRandomPattern = useCallback(() => {
    console.log('Selecting a random pattern');
    dispatch({ type: 'SELECT_RANDOM_PATTERN' });
  }, []);
  
  const setAnimationSpeed = useCallback((speed: number) => {
    dispatch({ type: 'SET_ANIMATION_SPEED', speed });
  }, []);
  
  const toggleTerminalMode = useCallback(() => {
    dispatch({ type: 'TOGGLE_TERMINAL_MODE' });
  }, []);
  
  const togglePixelated = useCallback(() => {
    dispatch({ type: 'TOGGLE_PIXELATED' });
  }, []);
  
  const toggleAutoCycling = useCallback(() => {
    dispatch({ type: 'TOGGLE_AUTO_CYCLING' });
  }, []);
  
  const toggleAsciiOverlay = useCallback(() => {
    dispatch({ type: 'TOGGLE_ASCII_OVERLAY' });
  }, []);
  
  const toggleControls = useCallback(() => {
    dispatch({ type: 'TOGGLE_CONTROLS_VISIBLE' });
  }, []);
  
  // Helper method to get the current pattern info
  const getCurrentPatternInfo = useCallback(() => {
    const pattern = patterns[state.currentPattern];
    return {
      title: pattern.title,
      description: pattern.description
    };
  }, [state.currentPattern]);
  
  // Handle auto play
  useEffect(() => {
    if (!state.isAutoCycling) return;
    
    console.log(`Auto-cycling enabled with speed ${state.animationSpeed}`);
    const intervalTime = isLowPerformanceMode ? 
      15000 / state.animationSpeed : 
      12000 / state.animationSpeed;
      
    const interval = setInterval(() => {
      handleNextPattern();
    }, intervalTime);
    
    return () => clearInterval(interval);
  }, [state.isAutoCycling, state.animationSpeed, handleNextPattern, isLowPerformanceMode]);
  
  // Log when pattern changes for debugging
  useEffect(() => {
    console.log(`Current pattern set to: ${state.currentPattern}`);
  }, [state.currentPattern]);
  
  // Log ASCII art when ASCII overlay is enabled
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
    <VisualizationContext.Provider
      value={{
        ...state,
        setCurrentPattern,
        handleNextPattern,
        handlePrevPattern,
        selectRandomPattern,
        setAnimationSpeed,
        toggleTerminalMode,
        togglePixelated,
        toggleAutoCycling,
        toggleAsciiOverlay,
        toggleControls,
        getCurrentPatternInfo
      }}
    >
      {children}
    </VisualizationContext.Provider>
  );
}

export function useVisualization() {
  const context = useContext(VisualizationContext);
  if (context === undefined) {
    throw new Error('useVisualization must be used within a VisualizationProvider');
  }
  return context;
}
