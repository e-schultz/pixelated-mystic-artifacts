
import { useArt } from '@/contexts/ArtContext';
import { drawPatterns } from '@/utils/patternRenderer';
import { useCallback, useMemo } from 'react';
import { recordFrameTime, isPerformanceMonitoring } from '@/utils/performanceMonitor';

// This hook handles the creation of the sketch function for the art canvas
export function useArtCanvasSketch() {
  const { 
    currentPattern, 
    speed, 
    isTerminalMode, 
    isPixelated,
    isLowPerformanceMode,
    parameters 
  } = useArt();

  // Create the sketch function
  const createSketch = useCallback(() => {
    return (p: any) => {
      let time = 0;
      let lastFrameTime = 0;
      let lastTerminalUpdate = 0;
      const targetFrameRate = isLowPerformanceMode ? 30 : 60;
      
      // Pre-calculate terminal rendering settings
      const terminalUpdateInterval = isLowPerformanceMode ? 200 : 100; // ms
      const terminalCharSize = isLowPerformanceMode ? 16 : 12;
      const terminalCols = Math.floor(window.innerWidth / terminalCharSize);
      const terminalRows = Math.floor(window.innerHeight / terminalCharSize);
      
      p.setup = () => {
        console.log('Setting up p5 canvas with pattern:', currentPattern);
        console.log('Current parameters:', parameters);
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        if (canvas.parent) {
          canvas.parent(p.canvas.parentElement);
        }
        // Set colorMode to HSB for more intuitive color control
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.background(0);
        p.frameRate(targetFrameRate);
        
        // Add these to ensure WebGL is properly initialized
        if (p.WEBGL) {
          try {
            p.setAttributes('antialias', true);
            p.smooth();
          } catch (e) {
            console.log('WebGL initialization warning:', e);
          }
        }
      };
      
      p.draw = () => {
        // Calculate delta time for smooth animations
        const frameStartTime = performance.now();
        const currentTime = p.millis();
        const deltaTime = (currentTime - lastFrameTime) / 1000;
        lastFrameTime = currentTime;
        
        // Clear with trail effect - optimize based on device
        // Apply trail persistence parameter here
        const baseAlpha = isLowPerformanceMode ? 30 : 12;
        const alphaValue = baseAlpha * (1 - (parameters.trailPersistence * 0.9)); // Lower alpha = more trail
        p.background(0, alphaValue);
        
        // Update time based on animation speed and rotationSpeed parameter
        time += 0.01 * speed * deltaTime * 60 * parameters.rotationSpeed;
        
        // Draw current pattern
        drawPatterns(
          p, 
          currentPattern, 
          p.width / 2, 
          p.height / 2, 
          Math.min(p.width, p.height) * 0.8,
          {
            time,
            isPixelated,
            isLowPerformanceMode,
            isTerminalMode,
            parameters
          }
        );
        
        // Draw terminal overlay if enabled - optimized to run less frequently
        if (isTerminalMode && currentTime - lastTerminalUpdate > terminalUpdateInterval) {
          drawTerminalOverlay(p, terminalCols, terminalRows, terminalCharSize);
          lastTerminalUpdate = currentTime;
        }
        
        // Calculate and record frame time for performance monitoring
        if (isPerformanceMonitoring()) {
          const frameTime = performance.now() - frameStartTime;
          recordFrameTime(frameTime);
        }
      };
      
      // Optimized terminal overlay with pre-calculated values
      const drawTerminalOverlay = (p: any, cols: number, rows: number, charSize: number) => {
        p.push();
        p.fill(0, 220, 0, 40);
        p.textSize(charSize);
        p.textFont('monospace');
        
        // Skip rows for performance
        const rowStep = isLowPerformanceMode ? 3 : 2;
        const colStep = isLowPerformanceMode ? 3 : 2;
        
        // Pre-defined character set for better performance
        const chars = ['0', '1', '.', ' ', '|', '/', '\\', '*'];
        const charsLength = chars.length;
        
        for (let y = 0; y < rows; y += rowStep) {
          for (let x = 0; x < cols; x += colStep) {
            if (Math.random() < 0.3) {
              const char = chars[Math.floor(Math.random() * charsLength)];
              p.text(char, x * charSize, y * charSize + charSize);
            }
          }
        }
        p.pop();
      };
      
      // Optimized window resize handler with debounce
      let resizeTimeout: ReturnType<typeof setTimeout>;
      p.windowResized = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          p.resizeCanvas(window.innerWidth, window.innerHeight);
        }, 200); // Increased debounce time for better performance
      };
    };
  }, [currentPattern, speed, isTerminalMode, isPixelated, isLowPerformanceMode, parameters]);

  // Memoize the sketch creation and dependencies for improved rendering performance
  const sketch = useMemo(() => createSketch(), [createSketch]);

  return {
    createSketch: () => sketch,
    dependencies: [currentPattern, speed, isTerminalMode, isPixelated, isLowPerformanceMode, parameters]
  };
}
