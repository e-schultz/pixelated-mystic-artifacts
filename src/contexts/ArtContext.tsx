
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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

interface ArtContextType {
  // Pattern management
  currentPattern: number;
  setCurrentPattern: (index: number) => void;
  nextPattern: () => void;
  prevPattern: () => void;
  
  // Animation settings
  speed: number;
  setSpeed: (speed: number) => void;
  
  // Display modes
  isTerminalMode: boolean;
  toggleTerminalMode: () => void;
  isPixelated: boolean;
  togglePixelated: () => void;

  // Auto play
  isAutoPlaying: boolean;
  toggleAutoPlay: () => void;
  
  // Device performance
  isLowPerformanceMode: boolean;
  
  // UI state
  isControlsVisible: boolean;
  toggleControls: () => void;
}

const ArtContext = createContext<ArtContextType | undefined>(undefined);

export function ArtProvider({ children }: { children: React.ReactNode }) {
  // Check if device is mobile/low performance
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isLowPerformanceMode = isMobile;
  
  // Pattern state
  const [currentPattern, setCurrentPattern] = useState(0);
  
  // Animation settings
  const [speed, setSpeed] = useState(isLowPerformanceMode ? 0.7 : 1);
  
  // Display modes
  const [isTerminalMode, setIsTerminalMode] = useState(false);
  const [isPixelated, setIsPixelated] = useState(true);
  
  // Auto play
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // UI state
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  
  // Navigation functions - ensure they are memoized and work correctly
  const nextPattern = useCallback(() => {
    setCurrentPattern((prev) => {
      const nextIndex = (prev + 1) % patterns.length;
      console.log(`Switching from pattern ${prev} to ${nextIndex}`);
      return nextIndex;
    });
  }, []);
  
  const prevPattern = useCallback(() => {
    setCurrentPattern((prev) => {
      const prevIndex = (prev - 1 + patterns.length) % patterns.length;
      console.log(`Switching from pattern ${prev} to ${prevIndex}`);
      return prevIndex;
    });
  }, []);
  
  // Toggle functions
  const toggleTerminalMode = useCallback(() => {
    setIsTerminalMode((prev) => !prev);
  }, []);
  
  const togglePixelated = useCallback(() => {
    setIsPixelated((prev) => !prev);
  }, []);
  
  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => !prev);
  }, []);
  
  const toggleControls = useCallback(() => {
    setIsControlsVisible((prev) => !prev);
  }, []);
  
  // Handle auto play
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    console.log(`Auto-cycling enabled with speed ${speed}`);
    const interval = setInterval(() => {
      nextPattern();
    }, isLowPerformanceMode ? 15000 / speed : 12000 / speed);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, speed, nextPattern, isLowPerformanceMode]);
  
  // Log when pattern changes for debugging
  useEffect(() => {
    console.log(`Current pattern set to: ${currentPattern}`);
  }, [currentPattern]);
  
  return (
    <ArtContext.Provider
      value={{
        currentPattern,
        setCurrentPattern,
        nextPattern,
        prevPattern,
        speed,
        setSpeed,
        isTerminalMode,
        toggleTerminalMode,
        isPixelated,
        togglePixelated,
        isAutoPlaying,
        toggleAutoPlay,
        isLowPerformanceMode,
        isControlsVisible,
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
