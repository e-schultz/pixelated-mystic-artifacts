
# Pixelated Mystic Artifacts

![Pixelated Mystic Artifacts](public/screenshot.png)

A mesmerizing generative art visualization experience featuring sacred geometry and cybernetic patterns with a retro-futuristic aesthetic.

## 🌟 Overview

Pixelated Mystic Artifacts is an interactive web application that showcases a collection of algorithmically generated geometric patterns inspired by sacred geometry, quantum mechanics, and cybernetic aesthetics. The application features:

- 12 unique animation patterns with detailed descriptions
- Interactive controls for customizing the viewing experience
- ASCII overlay mode for a retro terminal feel
- Performance optimization settings for various devices
- Auto-cycling animation mode

## 🚀 Features

### Visualization Patterns

- **Digital Corridor**: A dynamic perspective grid creating the illusion of movement through a digital corridor
- **Neural Lattice**: An interconnected network of nodes and connections resembling neural pathways
- **Tesseract Matrix**: A 4-dimensional cube visualization with rotating elements
- **Sacred Geometry**: Patterns based on ancient geometric principles like the Flower of Life
- **Quantum Field**: Particle simulations representing quantum field theory
- **Pulse Grid**: A grid of elements that pulse and glow with changing intensity
- **Sine Wave Grid**: Harmonic wave patterns creating mesmerizing interference patterns
- **Cyber Grid**: A cybernetic landscape with perspective elements
- **Diffusion Oracle**: A pattern inspired by diffusion and reaction processes
- **Resonance Contour**: Visualizations of resonance and standing wave patterns
- **Recursive Collapse Shrine**: A shrine-like structure with recursive elements
- **Hybrid Constellation**: A blend of cosmic and digital elements forming a constellation

### Interactive Controls

- Animation speed adjustment
- Pattern selection and navigation
- ASCII overlay toggle for retro terminal aesthetics
- Auto-cycling toggle
- Performance mode for lower-powered devices

## 💻 Technology Stack

- **React**: For building the user interface
- **TypeScript**: For type-safe code
- **p5.js**: For creative coding and animations
- **TailwindCSS**: For styling
- **Framer Motion**: For UI animations and transitions

## 🧰 Project Structure

The project is organized using a clean, modular architecture:

```
src/
├── components/          # React components
│   ├── geometry/        # Animation and canvas components
│   └── ui/              # UI components
├── contexts/            # React contexts for state management
│   ├── animation/       # Animation state management
│   └── art/             # Art pattern state management
├── data/                # Static data like animation definitions
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
├── pages/               # Page components
└── utils/               # Utility functions
    ├── geometry/        # Geometry utility functions
    └── patterns/        # Pattern-specific rendering logic
```

## 🔄 State Management

The application uses React Context API with reducers for state management:

- **AnimationContext**: Manages animation state including current animation, speed, and visual options
- **ArtContext**: Manages art pattern rendering state and options

## 📱 Performance Optimization

- Performance mode for lower-powered devices
- Throttled rendering for complex animations
- Memoized components to prevent unnecessary re-renders
- Dynamic rendering quality based on device capabilities

## 🖥️ Local Development

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd pixelated-mystic-artifacts

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Building for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## 🎮 Usage

1. Navigate to the application in your browser
2. Use the left and right arrow buttons to change patterns
3. Click the gear icon to access additional controls
4. Toggle ASCII mode for a retro computer terminal aesthetic
5. Adjust animation speed using the slider in settings

## 🔍 Implementation Details

### Animation Engine

The core animation engine uses p5.js for rendering, with a custom sketch factory that dynamically generates visualization patterns. Each pattern is implemented as a separate module with its own rendering logic.

### Rendering Pipeline

1. **Canvas Setup**: Initialize canvas and prepare rendering context
2. **Pattern Selection**: Select current pattern based on user input
3. **Animation Loop**: Continuously render the selected pattern
4. **Post-processing**: Apply effects like ASCII overlay when enabled

### ASCII Rendering

When ASCII mode is enabled, the application transforms the visual output into ASCII characters, creating a retro terminal aesthetic reminiscent of early computer systems.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Inspired by sacred geometry, cybernetic aesthetics, and digital mysticism
- Built with [p5.js](https://p5js.org/)
- Development facilitated by [Lovable](https://lovable.dev/)
