
import { useAnimation } from '@/contexts/AnimationContext';
import { getAnimationConfig } from './animationConfigs';
import { useCallback, useMemo } from 'react';
import { recordFrameTime, isPerformanceMonitoring } from '@/utils/performanceMonitor';

// This hook creates the sketch function used by p5
export function useAnimationSketch() {
  const { 
    currentAnimation, 
    animationSpeed, 
    showAsciiOverlay, 
    performanceMode 
  } = useAnimation();

  // Create the sketch function with optimizations
  const createSketch = useCallback(() => {
    return (p: any) => {
      // Animation state
      let time = 0;
      let smallShapes: Array<{
        x: number;
        y: number;
        size: number;
        rotation: number;
        speed: number;
        drawFunction: Function;
        settings: any;
      }> = [];
      
      // Frame rate control
      let targetFrameRate = performanceMode ? 30 : 60;
      let lastFrameTime = 0;
      let lastAsciiUpdate = 0;
      
      // Configuration
      const maxSmallShapes = performanceMode ? 5 : 15;
      const asciiUpdateInterval = performanceMode ? 250 : 150; // ms
      
      // Precalculate ASCII dimensions once
      const charSize = performanceMode ? 16 : 12;
      const cols = Math.floor(p.width / charSize);
      const rows = Math.floor(p.height / charSize);
      
      // Animation setup
      p.setup = () => {
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        if (canvas.parent) {
          canvas.parent(p.canvas.parentElement);
        }
        p.background(18, 18, 18);
        p.frameRate(targetFrameRate);
        
        generateSmallShapes();
      };
      
      // Generate background shapes - optimized for performance
      const generateSmallShapes = () => {
        // Only regenerate if needed to avoid GC pressure
        if (smallShapes.length === 0) {
          smallShapes = [];
          // Fewer shapes on mobile
          const numShapes = performanceMode ? 
            Math.floor(p.random(3, 5)) : 
            Math.floor(p.random(5, 12));
          
          for (let i = 0; i < numShapes; i++) {
            // Use simplified shapes on mobile
            const shapeConfig = getAnimationConfig(p, currentAnimation, performanceMode);
            smallShapes.push({
              x: p.random(p.width),
              y: p.random(p.height),
              size: p.random(20, 70),
              rotation: p.random(p.TWO_PI),
              speed: p.random(0.0005, 0.002) * (performanceMode ? 0.7 : 1),
              drawFunction: shapeConfig.drawFunction,
              settings: {
                ...shapeConfig.settings,
                pixelSize: Math.max(1, Math.floor(p.random(1, performanceMode ? 2 : 3))),
                opacity: p.random(0.3, 0.8)
              }
            });
          }
        }
      };
      
      // Draw function with delta time for consistent animation speed
      p.draw = () => {
        const frameStartTime = performance.now();
        
        // Calculate delta time for smooth animations regardless of frame rate
        const currentTime = p.millis();
        const deltaTime = (currentTime - lastFrameTime) / 1000; // in seconds
        lastFrameTime = currentTime;
        
        // Clear background with trail effect
        p.background(18, 18, 18, performanceMode ? 20 : 10);
        
        // Update time based on animation speed and delta time
        // This ensures consistent animation speed regardless of frame rate
        time += 0.005 * animationSpeed * deltaTime * 60;
        
        // Draw main animation
        const animation = getAnimationConfig(p, currentAnimation, performanceMode);
        
        // Draw the main geometry at center of screen with dynamic sizing
        const centerX = p.width / 2;
        const centerY = p.height / 2;
        const size = Math.min(p.width, p.height) * 0.6;
        
        // Animation settings with time-based rotation
        const animSettings = { 
          ...animation.settings,
          rotation: time * 0.2,
        };
        
        // Draw main geometry
        animation.drawFunction(p, centerX, centerY, size, animSettings);
        
        // Draw background shapes with performance optimizations
        // Skip frames based on performance mode
        if (!performanceMode || p.frameCount % 2 === 0) {
          p.push();
          p.noStroke();
          
          // Only update a subset of shapes each frame for better performance
          const updateRatio = performanceMode ? 0.5 : 0.75;
          const shapesToUpdate = smallShapes.filter(() => Math.random() < updateRatio);
            
          shapesToUpdate.forEach(shape => {
            shape.rotation += shape.speed * animationSpeed * deltaTime * 60;
            const shapeSettings = {
              ...shape.settings,
              rotation: shape.rotation,
              color: `rgba(240, 240, 228, ${shape.settings.opacity})`
            };
            
            shape.drawFunction(p, shape.x, shape.y, shape.size, shapeSettings);
          });
          p.pop();
        }
        
        // Draw subtle grid in background - simplified and throttled on mobile
        if ((!performanceMode && p.frameCount % 3 === 0) || 
            (performanceMode && p.frameCount % 6 === 0)) {
          p.stroke(240, 240, 228, 10);
          p.strokeWeight(1);
          const gridSize = performanceMode ? 80 : 30;
          const gridThreshold = performanceMode ? 0.97 : 0.92; 
          
          for (let x = 0; x < p.width; x += gridSize) {
            for (let y = 0; y < p.height; y += gridSize) {
              if (Math.random() > gridThreshold) {
                p.point(x, y);
              }
            }
          }
        }
        
        // Draw ASCII overlay if enabled - optimized to update less frequently
        if (showAsciiOverlay && currentTime - lastAsciiUpdate > asciiUpdateInterval) {
          drawAsciiOverlay(p, cols, rows, charSize);
          lastAsciiUpdate = currentTime;
        }
        
        // Regenerate small shapes occasionally - much less frequently on mobile
        const regenerateThreshold = performanceMode ? 0.0005 : 0.002;
        if (p.random() < regenerateThreshold * animationSpeed) {
          generateSmallShapes();
        }
        
        // Record performance metrics
        if (isPerformanceMonitoring()) {
          const frameTime = performance.now() - frameStartTime;
          recordFrameTime(frameTime);
        }
      };
      
      // ASCII art overlay effect - optimized for performance
      const drawAsciiOverlay = (p: any, cols: number, rows: number, charSize: number) => {
        p.push();
        p.fill(240, 240, 228, 160);
        p.textSize(charSize);
        p.textFont('monospace');
        
        // On mobile, skip rows to improve performance
        const rowStep = performanceMode ? 3 : 2;
        const colStep = performanceMode ? 3 : 2;
        
        // Pre-defined character patterns for better performance
        const chars = ['.', '*', '/', '|', '\\', ' '];
        
        for (let y = 0; y < rows; y += rowStep) {
          for (let x = 0; x < cols; x += colStep) {
            // Use deterministic pattern instead of pure random for better performance
            const patternValue = (x * 3 + y * 5 + p.frameCount) % 13;
            const charIndex = patternValue % chars.length;
            
            // More aggressive filtering on mobile
            if (patternValue < (performanceMode ? 5 : 9)) {
              p.text(chars[charIndex], x * charSize, y * charSize + charSize);
            }
          }
        }
        p.pop();
      };
      
      // Optimized resize handling with increased debounce
      let resizeTimeout: ReturnType<typeof setTimeout>;
      p.windowResized = () => {
        // Debounce resize to prevent multiple canvas recreations
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          p.resizeCanvas(window.innerWidth, window.innerHeight);
        }, 200);
      };
    };
  }, [currentAnimation, animationSpeed, showAsciiOverlay, performanceMode]);

  // Memoize the sketch creation for better performance
  const sketch = useMemo(() => createSketch(), [createSketch]);

  return {
    createSketch: () => sketch,
    dependencies: [currentAnimation, animationSpeed, showAsciiOverlay, performanceMode]
  };
}
