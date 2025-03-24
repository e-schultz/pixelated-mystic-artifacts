
import { generateSmallShapes, drawSmallShapes } from './smallShapesManager';
import { drawAsciiOverlay } from './asciiRenderer';
import { drawBackgroundGrid } from './gridRenderer';
import { getAnimationConfig } from '../animationConfigs';
import { recordFrameTime, isPerformanceMonitoring } from '@/utils/performanceMonitor';

// Create a p5 sketch with all animation logic
export const createAnimationSketch = (
  currentAnimation: number, 
  animationSpeed: number, 
  showAsciiOverlay: boolean, 
  performanceMode: boolean
) => {
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
      
      smallShapes = generateSmallShapes(p, currentAnimation, performanceMode, smallShapes);
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
        drawSmallShapes(p, smallShapes, animationSpeed, deltaTime, performanceMode);
      }
      
      // Draw subtle grid in background - simplified and throttled on mobile
      if ((!performanceMode && p.frameCount % 3 === 0) || 
          (performanceMode && p.frameCount % 6 === 0)) {
        drawBackgroundGrid(p, performanceMode);
      }
      
      // Draw ASCII overlay if enabled - optimized to update less frequently
      if (showAsciiOverlay && currentTime - lastAsciiUpdate > (performanceMode ? 250 : 150)) {
        drawAsciiOverlay(p, cols, rows, charSize, performanceMode);
        lastAsciiUpdate = currentTime;
      }
      
      // Regenerate small shapes occasionally - much less frequently on mobile
      const regenerateThreshold = performanceMode ? 0.0005 : 0.002;
      if (p.random() < regenerateThreshold * animationSpeed) {
        smallShapes = generateSmallShapes(p, currentAnimation, performanceMode, []);
      }
      
      // Record performance metrics
      if (isPerformanceMonitoring()) {
        const frameTime = performance.now() - frameStartTime;
        recordFrameTime(frameTime);
      }
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
};
