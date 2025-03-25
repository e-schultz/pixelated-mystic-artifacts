
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
  {
    id: 6,
    title: "Sine Wave Grid",
    description: "Dynamic grid of sine waves with frequency modulation creating flowing wave patterns."
  },
  {
    id: 7,
    title: "Cyber Grid",
    description: "Cyberpunk-inspired geometric grid with floating elements and a central focal point."
  },
  {
    id: 8,
    title: "Diffusion Oracle",
    description: "Reaction-diffusion system with binary states creating emergent patterns for divination."
  },
  {
    id: 9,
    title: "Resonance Contour",
    description: "Minimalist topographical contour lines representing energy fields and resonant nodes."
  },
  {
    id: 10,
    title: "Recursive Collapse Shrine",
    description: "Spiraling cybernetic structure with recursive elements and dimensional staircases."
  },
  {
    id: 11,
    title: "Hybrid Constellation",
    description: "Oracle crystalline center surrounded by floating geometric elements and energy fields."
  }
];

// Define state interface
export interface ArtState {
  currentPattern: number;
  speed: number;
  isTerminalMode: boolean;
  isPixelated: boolean;
  isAutoPlaying: boolean;
  isLowPerformanceMode: boolean;
  isControlsVisible: boolean;
}

// Define context interface
export interface ArtContextType extends ArtState {
  setCurrentPattern: (index: number) => void;
  nextPattern: () => void;
  prevPattern: () => void;
  setSpeed: (speed: number) => void;
  toggleTerminalMode: () => void;
  togglePixelated: () => void;
  toggleAutoPlay: () => void;
  toggleControls: () => void;
  selectPatternById: (id: number) => void;
  selectRandomPattern: () => void;
}
