
# Pixelated Mystic Artifacts

**A mesmerizing generative art visualization experience featuring sacred geometry and cybernetic patterns with a retro-futuristic aesthetic.**

[![GitHub](https://img.shields.io/badge/GitHub-pixelated--mystic--artifacts-black?style=for-the-badge&logo=github)](https://github.com/e-schultz/pixelated-mystic-artifacts)
[![Built with Lovable](https://img.shields.io/badge/Built%20with-Lovable-black?style=for-the-badge)](https://lovable.dev/projects/d8bc4ad9-4c88-4651-99d9-133692c7020e)

## Screenshots

<img width="628" height="500" alt="Digital Corridor - Sacred Geometry" src="https://github.com/user-attachments/assets/e7aa113c-8d56-4d0e-a884-f61da80f37e3" />
<img width="597" height="500" alt="Neural Lattice Visualization" src="https://github.com/user-attachments/assets/1426597c-48ac-4e67-b544-363248118e7c" />
<img width="599" height="500" alt="Quantum Field Patterns" src="https://github.com/user-attachments/assets/3c50c9a2-cd2d-4ea5-ae02-39d897c944ec" />
<img width="586" height="500" alt="ASCII Terminal Mode" src="https://github.com/user-attachments/assets/62a36946-2c56-4e62-b84b-baa5bae7235c" />

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

## Philosophy

**Sacred geometry meets cybernetic aesthetics** - This project explores the intersection of ancient mathematical principles and modern digital computation. Each pattern is both a technical demonstration and a meditation on the recursive nature of consciousness, computation, and cosmic patterns.

The **ASCII overlay mode** bridges retro computing nostalgia with contemporary generative art, acknowledging the terminal aesthetics that underpin consciousness technology infrastructure.

## Integration

Part of the **ritual-forest** consciousness technology laboratory:
- **Repository**: [github.com/e-schultz/pixelated-mystic-artifacts](https://github.com/e-schultz/pixelated-mystic-artifacts)
- **Ecosystem**: Ritual Stack & FLOAT consciousness technology
- **Purpose**: Generative art as consciousness technology - visualizing mathematical and quantum principles through interactive digital mysticism

## 🙏 Acknowledgements

- Inspired by sacred geometry, cybernetic aesthetics, and digital mysticism
- Built with [p5.js](https://p5js.org/)
- Development facilitated by [Lovable](https://lovable.dev/)

---

*Consciousness technology deployed. The infrastructure holds. ⚡*
