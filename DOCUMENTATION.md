
# Pixelated Mystic Artifacts - Developer Documentation

## Architecture Overview

Pixelated Mystic Artifacts is built on a React foundation with TypeScript, using a component-based architecture and the context API for state management. The application leverages p5.js for creative coding and visualization rendering.

## Core Concepts

### 1. Animation System

The animation system is built around the `p5.js` library and uses a factory pattern to create different visualization sketches. Each animation has its own configuration and rendering logic.

#### Key Components:

- **sketchFactory.ts**: Creates p5.js sketch functions based on the current animation settings
- **useAnimationSketch.ts**: React hook that manages the creation and updating of sketch instances
- **useCanvasSetup.ts**: Handles canvas initialization, resizing, and cleanup

### 2. State Management

The application uses the React Context API with reducers for state management, separating concerns between animation control and art rendering.

#### Animation Context:

- **AnimationProvider.tsx**: Provides animation state and actions to components
- **actions.ts**: Defines action types for the animation reducer
- **reducer.ts**: Implements state updates based on dispatched actions
- **types.ts**: Defines TypeScript interfaces for animation state

#### Art Context:

- Similar structure to Animation Context, but focused on art pattern state

### 3. Pattern Rendering

Each visualization pattern is implemented as a separate module with specific rendering logic. Patterns are rendered using the p5.js draw loop.

#### Pattern Structure:

- **patternRenderer.ts**: Central renderer that delegates to specific pattern implementations
- **Pattern Modules**: Individual pattern rendering logic in separate files

## Performance Optimization Strategies

### 1. Canvas Performance

- **Performance Mode**: Reduces rendering quality when enabled
- **Frame Rate Control**: Adjusts frame rate based on device capabilities
- **Element Throttling**: Limits the number of rendered elements on lower-powered devices

### 2. React Optimization

- **Memoization**: Components are memoized to prevent unnecessary re-renders
- **useCallback & useMemo**: Optimizes function and value creation
- **Lazy Loading**: Pages are lazy-loaded to improve initial load time

## Adding New Patterns

To add a new pattern:

1. Create a new file in `src/utils/patterns/` for your pattern implementation
2. Implement the drawing function following the pattern interface
3. Add any helper components in a subdirectory if needed
4. Register the pattern in `patternRenderer.ts`
5. Add metadata for the pattern in `animationData.ts`

Example pattern implementation:

```typescript
export function drawMyNewPattern(
  p: any, 
  centerX: number, 
  centerY: number, 
  size: number,
  time: number, 
  isPixelated: boolean,
  options?: any
) {
  // Pattern drawing logic here
  p.push();
  
  // Transform and style setup
  p.translate(centerX, centerY);
  p.stroke(255, 200, 100, 150);
  p.noFill();
  
  // Drawing operations
  p.ellipse(0, 0, size * Math.sin(time), size * Math.cos(time));
  
  p.pop();
}
```

## Random Offset Feature

The random offset feature adds visual variety to animations by randomizing their starting state. This creates unique variations each time an animation is viewed.

### Implementation:

- **State Management**: The random offset value is stored in the animation context
- **Initialization**: A new random offset is generated when changing animations
- **Usage**: Pattern rendering functions use the offset to vary initial parameters

## ASCII Overlay Mode

The ASCII overlay transforms the visual output into text characters, creating a retro terminal aesthetic.

### Implementation:

- **asciiRenderer.ts**: Handles the conversion of graphic output to ASCII characters
- **Post-processing**: Applied as a filter after the main rendering is complete
- **Styling**: Custom styling for the ASCII output with a green terminal color scheme

## Testing Guidelines

### Component Testing:

- Test components in isolation using React Testing Library
- Verify both rendering and interaction behavior
- Mock context providers when testing components that consume context

### Animation Testing:

- Use visual regression testing for animation outputs
- Test performance metrics on various device profiles
- Verify pattern rendering with different settings

## Common Issues and Solutions

### Performance Issues

- **Problem**: Slow rendering on mobile devices
- **Solution**: Enable performance mode, which reduces the number of elements and simplifies calculations

### Canvas Sizing

- **Problem**: Canvas not resizing properly on window resize
- **Solution**: Ensure the canvas setup hook is capturing window resize events correctly

### Pattern Transitions

- **Problem**: Abrupt transitions between patterns
- **Solution**: Implement cross-fade effects between pattern changes

## Future Development Roadmap

### Planned Features

1. **User Customization**: Allow users to modify and save custom pattern configurations
2. **Pattern Blending**: Enable smooth transitions and blending between different patterns
3. **Export Functionality**: Add the ability to export animations as GIFs or videos
4. **Audio Reactivity**: Incorporate microphone input to make patterns react to sound
5. **VR Mode**: Create an immersive VR viewing experience for the patterns

### Technical Improvements

1. **Web Workers**: Move heavy calculations to web workers for better performance
2. **WebGL Rendering**: Upgrade to WebGL rendering for more complex effects
3. **Shader Integration**: Incorporate GLSL shaders for advanced visual effects
