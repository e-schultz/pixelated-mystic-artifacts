
import { GeometrySettings } from "@/utils/geometry/types";

// Define available pattern types
export const patterns = [
  {
    id: 0,
    title: "Digital Corridor",
    description: "A digital tunnel of geometric grids that creates an immersive perspective experience."
  },
  {
    id: 1,
    title: "Tesseract Matrix",
    description: "A four-dimensional cube projection that transforms through hyperspace."
  },
  {
    id: 2,
    title: "Fractal Harmonic Shrine",
    description: "An evolving fractal structure that represents harmonic resonance patterns."
  },
  {
    id: 3,
    title: "Sacred Geometry",
    description: "Classic sacred geometry patterns including the Flower of Life and Metatron's Cube."
  },
  {
    id: 4,
    title: "Quantum Field",
    description: "A visualization of quantum probability fields with entangled particles."
  },
  {
    id: 5,
    title: "Pulse Grid",
    description: "A pulsating grid structure that expands and contracts with energy waves."
  },
  {
    id: 6,
    title: "Resonance Contour",
    description: "Topographic-like visualization of energy resonance patterns."
  },
  {
    id: 7,
    title: "CyberGrid",
    description: "A cyberpunk-inspired grid with sacred geometry elements."
  }
];

// Define pattern parameters that users can adjust
export interface PatternParameters {
  complexity: number;    // Controls the number of elements/segments (0-1)
  rotationSpeed: number; // Controls animation speed multiplier (0-2)
  colorIntensity: number; // Controls the intensity of colors (0-1)
  lineThickness: number; // Controls the thickness of lines (0-1)
  trailPersistence: number; // Controls how long visuals persist (0-1)
}

// Define default pattern parameters
export const defaultParameters: PatternParameters = {
  complexity: 0.5,
  rotationSpeed: 1.0,
  colorIntensity: 0.7,
  lineThickness: 0.5,
  trailPersistence: 0.5
};

// Define application state
export interface ArtState {
  currentPattern: number;
  speed: number;
  isTerminalMode: boolean;
  isPixelated: boolean;
  isLowPerformanceMode: boolean;
  isAutoPlaying: boolean;
  isControlsVisible: boolean;
  parameters: PatternParameters;
}

// Define context type
export interface ArtContextType extends ArtState {
  setCurrentPattern: (index: number) => void;
  nextPattern: () => void;
  previousPattern: () => void;
  prevPattern: () => void; // Alias for previousPattern
  setSpeed: (speed: number) => void;
  toggleTerminalMode: () => void;
  togglePixelated: () => void;
  toggleLowPerformanceMode: () => void;
  toggleAutoPlay: () => void;
  toggleControls: () => void;
  selectPatternById: (id: number) => void;
  selectRandomPattern: () => void;
  
  // New parameter adjustment methods
  setPatternParameters: (parameters: Partial<PatternParameters>) => void;
  resetPatternParameters: () => void;
}
