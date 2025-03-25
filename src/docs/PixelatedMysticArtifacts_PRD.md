
# Pixelated Mystic Artifacts - Product Requirements Document

## 1. Executive Summary

Pixelated Mystic Artifacts is an interactive web application that showcases algorithmically generated sacred geometry and cybernetic patterns with a retro-futuristic aesthetic. Built on React, TypeScript, and p5.js, it offers users a mesmerizing visual experience featuring 12 unique animation patterns with customizable viewing options, including an ASCII overlay mode and performance optimizations for various devices.

The application serves as both an artistic showcase and a technical demonstration of creative coding techniques, combining sacred geometry principles with modern web technologies.

## 2. Technical Architecture

### Component Structure
```
src/
├── components/          # Primary UI components
│   ├── ArtCanvas        # Main canvas renderer component 
│   ├── PatternNavigation# Controls for pattern selection
│   └── Controls         # Settings and customization panel
├── contexts/            # State management using Context API
│   ├── animation/       # Animation state and controls
│   └── art/             # Pattern-specific state
├── utils/               # Utility functions and rendering logic
│   ├── patterns/        # Pattern implementations
│   └── geometry/        # Geometry utility functions
├── hooks/               # Custom React hooks
└── pages/               # Page components
```

### State Management
- **Context API** with separate contexts for animation and art state
- **Reducers** for predictable state updates in both contexts
- **Action types** for type-safe state mutations

### Rendering Pipeline
1. **Canvas Setup**: Initialize p5.js canvas with responsive dimensions
2. **Sketch Generation**: Create sketch function based on current state
3. **Animation Loop**: Execute draw() with delta-time calculations
4. **Pattern Rendering**: Delegate to specific pattern implementation
5. **Post-processing**: Apply effects (ASCII overlay) if enabled

### Performance Strategy
- Frame rate throttling on lower-powered devices
- Element quantity reduction in performance mode
- Render quality adjustment based on device capabilities
- Optimized post-processing with reduced update frequency
- Frame skipping for complex effects on mobile devices

## 3. Core Features

### Visualization Patterns

| Pattern | Technical Implementation | State Requirements | Performance Considerations |
|---------|--------------------------|-------------------|---------------------------|
| Digital Corridor | Perspective grid with depth illusion | time, centerX/Y, size | Grid density reduced in performance mode |
| Neural Lattice | Node-based network with organic connections | time, node positions, connection weights | Node count reduced by 40% on mobile |
| Tesseract Matrix | 4D cube visualization with rotation mapping | time, rotation matrices, projection values | Simplified wireframe on low-power devices |
| Sacred Geometry | Geometric patterns based on ancient principles | time, segment count, rotation values | Lower segment count in performance mode |
| Quantum Field | Particle system with quantum-inspired behavior | time, particle array, vector fields | Particle count dynamically adjusted |
| Pulse Grid | Grid of elements with synchronized pulsing | time, grid size, pulse phase | Grid density reduced on mobile |
| Sine Wave Grid | Harmonic wave patterns with interference | time, amplitude, frequency, phase | Frequency sampling reduced for performance |
| Cyber Grid | Perspective grid with cybernetic elements | time, grid perspective, element positions | Element count scaled with device performance |
| Diffusion Oracle | Pattern based on reaction-diffusion algorithms | time, diffusion field, reaction rates | Field resolution reduced on mobile |
| Resonance Contour | Visualization of resonance patterns | time, contour points, amplitude | Contour point count reduction on mobile |
| Recursive Collapse Shrine | Shrine structure with recursive elements | time, recursion depth, shrine components | Recursion depth limited on mobile |
| Hybrid Constellation | Cosmic-digital hybrid pattern | time, constellation points, connection paths | Point count dynamically scaled |

### Animation Controls

**Technical Implementation:**
- Custom slider component for speed control
- Throttled state updates to prevent rendering bottlenecks
- Memoized UI components to prevent unnecessary re-renders

**State Requirements:**
- `animationSpeed` (number: 0.1 to 2.0)
- `currentAnimation` (number: 0-11)
- `isAutoCycling` (boolean)

**Performance Considerations:**
- Debounced speed control updates
- Animation speed affects delta-time calculations, not frame rate

### ASCII Overlay Mode

**Technical Implementation:**
- Canvas sampling with configurable resolution
- Character mapping based on brightness values
- Optimized rendering with framerate-independent updates

**State Requirements:**
- `showAsciiOverlay` (boolean)
- ASCII character set and mapping values
- Last update timestamp for throttling

**Performance Considerations:**
- Reduced sampling frequency on mobile devices
- Throttled updates independent of main animation frame rate
- Pre-calculated character lookup tables

### Performance Mode

**Technical Implementation:**
- Device capability detection via `useMediaQuery` hook
- Dynamic quality settings based on detected capabilities
- Element quantity scaling for patterns

**State Requirements:**
- `isLowPerformanceMode` (boolean)
- Device-specific optimization parameters
- Frame rate targets by device class

**Performance Considerations:**
- Mobile devices default to performance mode
- Element counts reduced by 30-50% in performance mode
- Post-processing effects simplified or disabled

## 4. User Flows

### Application Initialization

1. **Component Mount**: HomePage component mounts
2. **Context Initialization**: ArtProvider and AnimationProvider initialize
3. **Canvas Setup**: ArtCanvas initializes with useCanvasSetup hook
4. **Sketch Creation**: useArtCanvasSketch creates p5 sketch function
5. **Rendering Begins**: p5 instance starts animation loop

```typescript
// Key component relationship
<ArtProvider>
  <AnimationProvider>
    <HomePage>
      <ArtCanvas /> // Uses useCanvasSetup() with sketch from useArtCanvasSketch()
      <Controls />  // Updates state in contexts
    </HomePage>
  </AnimationProvider>
</ArtProvider>
```

### Pattern Selection & Transition

1. User clicks next/previous pattern button
2. PatternNavigation component dispatches action to art context
3. State update triggers useEffect in ArtProvider
4. New pattern index updates current pattern state
5. useArtCanvasSketch detects dependency change and recreates sketch
6. Canvas rerenders with new pattern

### Settings Modification

1. User toggles ASCII mode in Controls component
2. Action dispatched to animation context
3. State update flows to useArtCanvasSketch dependencies
4. Sketch recreation includes updated ASCII mode value
5. Next render cycle applies ASCII overlay if enabled

## 5. API Documentation

### Custom Hooks

#### `useCanvasSetup`
```typescript
function useCanvasSetup(
  containerRef: React.RefObject<HTMLDivElement>,
  sketch: (p: any) => void,
  dependencies: any[] = []
): React.RefObject<p5 | null>
```
Handles p5 instance lifecycle with optimized dependency tracking.

#### `useArtCanvasSketch`
```typescript
function useArtCanvasSketch(): {
  createSketch: () => (p: any) => void,
  dependencies: any[]
}
```
Creates sketch function based on current art context state.

#### `useAnimation`
```typescript
function useAnimation(): AnimationContextType
```
Access the animation context state and actions.

#### `useArt`
```typescript
function useArt(): ArtContextType
```
Access the art context state and actions.

### Utility Functions

#### `drawPatterns`
```typescript
function drawPatterns(
  p: any, 
  patternIndex: number, 
  centerX: number, 
  centerY: number, 
  size: number,
  options: RenderOptions
): void
```
Main pattern rendering delegation function.

#### `generateSmallShapes`
```typescript
function generateSmallShapes(
  p: any, 
  animationIndex: number, 
  performanceMode: boolean,
  existingShapes: Array<ShapeType>,
  randomOffset: number
): Array<ShapeType>
```
Generates decorative shapes appropriate for current animation.

#### `recordFrameTime`
```typescript
function recordFrameTime(frameTime: number): void
```
Records frame rendering time for performance monitoring.

## 6. Non-Functional Requirements

### Performance Benchmarks

| Device Class | Target Frame Rate | Max Elements | ASCII Update Frequency |
|--------------|-------------------|--------------|------------------------|
| Desktop      | 60 FPS            | 100%         | 150ms                  |
| Tablet       | 45-60 FPS         | 70%          | 200ms                  |
| Mobile       | 30-45 FPS         | 50%          | 250ms                  |
| Low-end      | 24-30 FPS         | 30%          | 350ms                  |

### Browser Support

- **Full Support**: Chrome 80+, Firefox 75+, Safari 13.1+, Edge 80+
- **Partial Support**: IE11 (basic functionality only, no animations)

### Device Optimization

- **Touch Devices**: Larger UI controls, optimized touch event handling
- **Small Screens**: Responsive layout with adjusted control positioning
- **Low Memory Devices**: Reduced particle counts, simplified effects
- **High DPI Displays**: Quality scaling based on pixel ratio

### Accessibility

- **Keyboard Navigation**: All controls accessible via keyboard
- **Reduced Motion**: Optional reduced motion mode for animations
- **Color Contrast**: UI elements maintain minimum 4.5:1 contrast ratio
- **Screen Reader**: Descriptive labels for all controls and information

## 7. Technical Dependencies

| Dependency       | Version    | Usage                                  |
|------------------|------------|----------------------------------------|
| React            | ^18.3.1    | UI component system                    |
| TypeScript       | ^5.0.2     | Type-safe JavaScript                   |
| p5.js            | ^1.11.3    | Creative coding and canvas management  |
| Framer Motion    | ^12.5.0    | UI animations and transitions          |
| Tailwind CSS     | ^3.3.3     | Utility-first styling                  |
| React Router     | ^6.26.2    | Routing (minimal usage currently)      |
| React Query      | ^5.56.2    | Future data fetching needs             |
| lucide-react     | ^0.462.0   | Icon system                            |

## 8. Implementation Roadmap

### Phase 1: Core Functionality (Current)
- [x] Canvas rendering system
- [x] Base animation framework
- [x] Initial pattern implementations (12 patterns)
- [x] Basic UI controls

### Phase 2: Enhanced Interaction (Next)
- [ ] Mobile optimization improvements
- [ ] Animation transition effects
- [ ] UI accessibility enhancements
- [ ] Dark/light theme toggle

### Phase 3: Extended Features
- [ ] Audio reactivity integration
- [ ] New pattern types (4 additional)
- [ ] Pattern customization controls
- [ ] Save/load configuration options

### Phase 4: Community & Sharing
- [ ] Export functionality (GIF/image/video)
- [ ] Sharing capabilities
- [ ] Gallery mode with presets
- [ ] Community submissions section

## 9. Technical Constraints & Debt

### Current Limitations
- Frame rate inconsistencies on certain Android devices
- Memory usage grows over time with certain patterns
- ASCII mode significantly impacts performance on low-end devices
- Safari has occasional rendering artifacts with certain patterns

### Technical Debt
- Pattern renderer needs refactoring for better modularity
- Animation context has grown too large and should be split
- Some pattern implementations share duplicated code
- Performance optimizations are inconsistently applied across patterns

## 10. Testing Strategy

### Functional Testing
- UI control validation across supported browsers
- Pattern rendering verification
- State management and transitions
- Responsive layout on various screen sizes

### Performance Testing
- Frame rate benchmarking on target device classes
- Memory usage monitoring over extended periods
- CPU utilization during intensive animations
- Battery impact assessment on mobile devices

### Visual Regression Testing
- Screenshot comparison for pattern consistency
- Animation keyframe validation
- UI component appearance across themes

### Accessibility Testing
- Keyboard navigation verification
- Screen reader compatibility
- Color contrast validation
- Focus management assessment

---

## Appendix A: Pattern Descriptions

### Digital Corridor
A dynamic perspective grid creating the illusion of movement through a digital corridor. Implements a recursive grid structure with z-depth calculation and perspective projection.

### Neural Lattice
An interconnected network of nodes and connections resembling neural pathways. Uses force-directed graph algorithms with spring physics for organic movement.

### Tesseract Matrix
A 4-dimensional cube visualization with rotating elements. Implements 4D to 3D to 2D projection matrices with controllable rotation across multiple axes.

### Sacred Geometry
Patterns based on ancient geometric principles like the Flower of Life. Uses precise mathematical formulations of sacred ratios and geometric construction.

### Quantum Field
Particle simulations representing quantum field theory. Implements a particle system with probabilistic behavior and field interactions.

### Pulse Grid
A grid of elements that pulse with synchronized or phase-shifted intensity. Uses sine wave calculations with configurable frequency and phase.

### Sine Wave Grid
Harmonic wave patterns creating mesmerizing interference patterns. Implements multiple overlapping sine waves with dynamic parameters.

### Cyber Grid
A cybernetic landscape with perspective elements. Combines multiple rendering techniques including grids, floating elements, and focal points.

### Diffusion Oracle
A pattern inspired by diffusion and reaction processes. Implements simplified reaction-diffusion algorithms in real-time.

### Resonance Contour
Visualizations of resonance and standing wave patterns. Uses harmonic oscillator equations with damping and driving forces.

### Recursive Collapse Shrine
A shrine-like structure with recursive elements. Implements controlled recursion with transformation matrices and depth limiting.

### Hybrid Constellation
A blend of cosmic and digital elements forming a constellation. Combines particle systems with Voronoi diagrams and connecting structures.
