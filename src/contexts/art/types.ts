
// Pattern data with titles and descriptions
export const patterns = [
  {
    id: 1,
    title: "Digital Corridor",
    description: "A digital corridor with perspective lines and dynamic central element."
  },
  {
    id: 2,
    title: "Neural Lattice",
    description: "Connected nodes forming a neural network with pulse waves."
  },
  {
    id: 3,
    title: "Tesseract Matrix",
    description: "A four-dimensional cube projection with matrix-like elements."
  },
  {
    id: 4,
    title: "Sacred Geometry",
    description: "Ancient geometric patterns with cosmic significance."
  },
  {
    id: 5,
    title: "Quantum Field",
    description: "Particles in a quantum probability field with wave function."
  },
  {
    id: 6,
    title: "Pulse Grid",
    description: "Grid cells pulsing with energy in a synchronized pattern."
  },
  {
    id: 7,
    title: "Sine Wave Grid",
    description: "Modulated sine waves creating an undulating grid structure."
  },
  {
    id: 8,
    title: "Cyber Grid",
    description: "Digital matrix with perspective and floating elements."
  },
  {
    id: 9,
    title: "Diffusion Oracle",
    description: "Reaction-diffusion pattern resembling a mystical oracle."
  },
  {
    id: 10,
    title: "Resonance Contour",
    description: "Standing wave patterns with resonance points and vector field."
  },
  {
    id: 11,
    title: "Recursive Collapse Shrine",
    description: "A spiraling, multi-layered structure with recursive elements."
  },
  {
    id: 12,
    title: "Hybrid Constellation",
    description: "Celestial patterns forming hybrid geometric constellations."
  },
  {
    id: 13,
    title: "Fractal Harmonic Shrine",
    description: "Sacred geometry shrine floating on a grid of harmonic waves with recursive fractal elements."
  }
];

// Define state interface
export interface ArtState {
  currentPattern: number;
  speed: number;
  isTerminalMode: boolean;
  isPixelated: boolean;
  isLowPerformanceMode: boolean;
  isControlsVisible: boolean;
  isAutoPlaying: boolean;
}

// Define context interface
export interface ArtContextType extends ArtState {
  toggleTerminalMode: () => void;
  togglePixelated: () => void;
  toggleLowPerformanceMode: () => void;
  toggleControls: () => void;
  toggleAutoPlay: () => void;
  setCurrentPattern: (pattern: number) => void;
  nextPattern: () => void;
  previousPattern: () => void;
  prevPattern: () => void; // Add this alias for previousPattern
  setSpeed: (speed: number) => void;
  selectPatternById: (id: number) => void;
  selectRandomPattern: () => void;
}
