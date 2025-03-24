
import React, { createContext, useContext, useReducer, useCallback, useEffect, useRef } from 'react';
import { useArt } from './ArtContext';

// Define the structure for a sequence item
export interface SequenceItem {
  patternId: number;
  duration: number; // Duration in seconds
  transitionType: 'fade' | 'dissolve' | 'none';
  transitionDuration: number; // Transition duration in seconds
}

// Default sequence with available patterns
export const defaultSequence: SequenceItem[] = [
  { patternId: 0, duration: 5, transitionType: 'fade', transitionDuration: 1 },
  { patternId: 1, duration: 5, transitionType: 'dissolve', transitionDuration: 1 },
  { patternId: 2, duration: 5, transitionType: 'fade', transitionDuration: 1 },
];

interface SequenceState {
  sequence: SequenceItem[];
  isPlaying: boolean;
  currentPosition: number; // Position in seconds within the sequence
  currentItemIndex: number; // Index of the current pattern in the sequence
  playbackSpeed: number; // Playback speed multiplier
  isLooping: boolean;
}

type SequenceAction =
  | { type: 'SET_SEQUENCE'; sequence: SequenceItem[] }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'STOP' }
  | { type: 'SET_POSITION'; position: number }
  | { type: 'SET_ITEM_INDEX'; index: number }
  | { type: 'SET_SPEED'; speed: number }
  | { type: 'TOGGLE_LOOP' }
  | { type: 'ADD_ITEM'; item: SequenceItem }
  | { type: 'UPDATE_ITEM'; index: number; item: Partial<SequenceItem> }
  | { type: 'REMOVE_ITEM'; index: number }
  | { type: 'REORDER_ITEMS'; newOrder: number[] }
  | { type: 'TICK'; deltaTime: number };

interface SequenceContextType extends SequenceState {
  playSequence: () => void;
  pauseSequence: () => void;
  stopSequence: () => void;
  setSequence: (sequence: SequenceItem[]) => void;
  setPlaybackPosition: (position: number) => void;
  setPlaybackSpeed: (speed: number) => void;
  toggleLooping: () => void;
  addItem: (item: SequenceItem) => void;
  updateItem: (index: number, item: Partial<SequenceItem>) => void;
  removeItem: (index: number) => void;
  reorderItems: (newOrder: number[]) => void;
  getTotalDuration: () => number;
}

const SequenceContext = createContext<SequenceContextType | undefined>(undefined);

function sequenceReducer(state: SequenceState, action: SequenceAction): SequenceState {
  switch (action.type) {
    case 'SET_SEQUENCE':
      return { ...state, sequence: action.sequence };
    case 'PLAY':
      return { ...state, isPlaying: true };
    case 'PAUSE':
      return { ...state, isPlaying: false };
    case 'STOP':
      return { ...state, isPlaying: false, currentPosition: 0, currentItemIndex: 0 };
    case 'SET_POSITION':
      return { ...state, currentPosition: action.position };
    case 'SET_ITEM_INDEX':
      return { ...state, currentItemIndex: action.index };
    case 'SET_SPEED':
      return { ...state, playbackSpeed: action.speed };
    case 'TOGGLE_LOOP':
      return { ...state, isLooping: !state.isLooping };
    case 'ADD_ITEM':
      return { ...state, sequence: [...state.sequence, action.item] };
    case 'UPDATE_ITEM':
      return {
        ...state,
        sequence: state.sequence.map((item, i) =>
          i === action.index ? { ...item, ...action.item } : item
        ),
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        sequence: state.sequence.filter((_, i) => i !== action.index),
      };
    case 'REORDER_ITEMS': {
      const newSequence = action.newOrder.map(i => state.sequence[i]);
      return { ...state, sequence: newSequence };
    }
    case 'TICK': {
      const newPosition = state.currentPosition + action.deltaTime * state.playbackSpeed;
      
      // Find current item and index based on position
      let cumulativeTime = 0;
      let currentIndex = 0;
      
      for (let i = 0; i < state.sequence.length; i++) {
        const item = state.sequence[i];
        const itemEndTime = cumulativeTime + item.duration;
        
        if (newPosition < itemEndTime || i === state.sequence.length - 1) {
          currentIndex = i;
          break;
        }
        
        cumulativeTime = itemEndTime;
      }
      
      // Handle looping
      const totalDuration = state.sequence.reduce((sum, item) => sum + item.duration, 0);
      const loopedPosition = state.isLooping && totalDuration > 0 
        ? newPosition % totalDuration 
        : newPosition;
      
      // Stop at the end if not looping
      if (!state.isLooping && newPosition >= totalDuration) {
        return { 
          ...state, 
          isPlaying: false, 
          currentPosition: totalDuration,
          currentItemIndex: state.sequence.length - 1
        };
      }
      
      return { 
        ...state, 
        currentPosition: state.isLooping ? loopedPosition : newPosition,
        currentItemIndex: currentIndex
      };
    }
    default:
      return state;
  }
}

export function SequenceProvider({ children }: { children: React.ReactNode }) {
  const { setCurrentPattern } = useArt();
  const [state, dispatch] = useReducer(sequenceReducer, {
    sequence: defaultSequence,
    isPlaying: false,
    currentPosition: 0,
    currentItemIndex: 0,
    playbackSpeed: 1,
    isLooping: true
  });
  
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  
  // Calculate total duration of the sequence
  const getTotalDuration = useCallback(() => {
    return state.sequence.reduce((sum, item) => sum + item.duration, 0);
  }, [state.sequence]);
  
  // Action creators
  const setSequence = useCallback((sequence: SequenceItem[]) => {
    dispatch({ type: 'SET_SEQUENCE', sequence });
  }, []);
  
  const playSequence = useCallback(() => {
    dispatch({ type: 'PLAY' });
  }, []);
  
  const pauseSequence = useCallback(() => {
    dispatch({ type: 'PAUSE' });
  }, []);
  
  const stopSequence = useCallback(() => {
    dispatch({ type: 'STOP' });
  }, []);
  
  const setPlaybackPosition = useCallback((position: number) => {
    dispatch({ type: 'SET_POSITION', position });
  }, []);
  
  const setPlaybackSpeed = useCallback((speed: number) => {
    dispatch({ type: 'SET_SPEED', speed });
  }, []);
  
  const toggleLooping = useCallback(() => {
    dispatch({ type: 'TOGGLE_LOOP' });
  }, []);
  
  const addItem = useCallback((item: SequenceItem) => {
    dispatch({ type: 'ADD_ITEM', item });
  }, []);
  
  const updateItem = useCallback((index: number, item: Partial<SequenceItem>) => {
    dispatch({ type: 'UPDATE_ITEM', index, item });
  }, []);
  
  const removeItem = useCallback((index: number) => {
    dispatch({ type: 'REMOVE_ITEM', index });
  }, []);
  
  const reorderItems = useCallback((newOrder: number[]) => {
    dispatch({ type: 'REORDER_ITEMS', newOrder });
  }, []);
  
  // Animation loop using requestAnimationFrame for performance
  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined && state.isPlaying) {
      const deltaTime = (time - previousTimeRef.current) / 1000; // Convert to seconds
      dispatch({ type: 'TICK', deltaTime });
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [state.isPlaying]);
  
  // Start and stop the animation loop
  useEffect(() => {
    if (state.isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
      return () => {
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
        }
      };
    }
  }, [state.isPlaying, animate]);
  
  // Sync the current pattern with the sequence
  useEffect(() => {
    if (state.sequence.length > 0 && state.currentItemIndex >= 0 && state.currentItemIndex < state.sequence.length) {
      const currentItem = state.sequence[state.currentItemIndex];
      setCurrentPattern(currentItem.patternId);
    }
  }, [state.currentItemIndex, state.sequence, setCurrentPattern]);
  
  return (
    <SequenceContext.Provider
      value={{
        ...state,
        playSequence,
        pauseSequence,
        stopSequence,
        setSequence,
        setPlaybackPosition,
        setPlaybackSpeed,
        toggleLooping,
        addItem,
        updateItem,
        removeItem,
        reorderItems,
        getTotalDuration
      }}
    >
      {children}
    </SequenceContext.Provider>
  );
}

export function useSequence() {
  const context = useContext(SequenceContext);
  if (context === undefined) {
    throw new Error('useSequence must be used within a SequenceProvider');
  }
  return context;
}
