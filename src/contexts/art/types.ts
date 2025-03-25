// Pattern data with titles and descriptions
export const patterns = [
  {
    title: "Digital Corridor",
    description: "A digital corridor with perspective lines and dynamic central element."
  },
  {
    title: "Neural Lattice",
    description: "Connected nodes forming a neural network with pulse waves."
  },
  {
    title: "Tesseract Matrix",
    description: "A four-dimensional cube projection with matrix-like elements."
  },
  {
    title: "Sacred Geometry",
    description: "Ancient geometric patterns with cosmic significance."
  },
  {
    title: "Quantum Field",
    description: "Particles in a quantum probability field with wave function."
  },
  {
    title: "Pulse Grid",
    description: "Grid cells pulsing with energy in a synchronized pattern."
  },
  {
    title: "Sine Wave Grid",
    description: "Modulated sine waves creating an undulating grid structure."
  },
  {
    title: "Cyber Grid",
    description: "Digital matrix with perspective and floating elements."
  },
  {
    title: "Diffusion Oracle",
    description: "Reaction-diffusion pattern resembling a mystical oracle."
  },
  {
    title: "Resonance Contour",
    description: "Standing wave patterns with resonance points and vector field."
  },
  {
    title: "Recursive Collapse Shrine",
    description: "A spiraling, multi-layered structure with recursive elements."
  },
  {
    title: "Hybrid Constellation",
    description: "Celestial patterns forming hybrid geometric constellations."
  },
  {
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
  setSpeed: (speed: number) => void;
}
