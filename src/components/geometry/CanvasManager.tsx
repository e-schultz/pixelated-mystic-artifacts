
import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import { useAnimation } from '@/contexts/AnimationContext';
import { getAnimationConfig } from './animationConfigs';

interface CanvasManagerProps {
  className?: string;
}

// This component handles the P5 instance and doesn't re-create it on prop changes
const CanvasManager: React.FC<CanvasManagerProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const { 
    currentAnimation, 
    animationSpeed, 
    showAsciiOverlay, 
    performanceMode 
  } = useAnimation();

  // Set up the P5 sketch only once
  useEffect(() => {
    if (!containerRef.current) return;
    
    const sketch = (p: any) => {
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
      
      // Configuration
      const maxSmallShapes = performanceMode ? 5 : 15;
      
      // Animation setup
      p.setup = () => {
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent(containerRef.current!);
        p.background(18, 18, 18);
        p.frameRate(targetFrameRate);
        
        generateSmallShapes();
      };
      
      // Generate background shapes - optimized for performance
      const generateSmallShapes = () => {
        smallShapes = [];
        // Fewer shapes on mobile
        const numShapes = performanceMode ? 
          Math.floor(p.random(3, 6)) : 
          Math.floor(p.random(5, 15));
        
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
      };
      
      // Draw function with delta time for consistent animation speed
      p.draw = () => {
        // Calculate delta time for smooth animations regardless of frame rate
        const currentTime = p.millis();
        const deltaTime = (currentTime - lastFrameTime) / 1000; // in seconds
        lastFrameTime = currentTime;
        
        // Clear background with trail effect
        p.background(18, 18, 18, 10);
        
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
        if (!performanceMode || p.frameCount % 2 === 0) { // Skip every other frame on mobile
          p.push();
          p.noStroke();
          
          // Only update a subset of shapes each frame on mobile
          const shapesToUpdate = performanceMode ? 
            smallShapes.filter((_, i) => i % 2 === p.frameCount % 2) : 
            smallShapes;
            
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
        
        // Draw subtle grid in background - simplified on mobile
        if (!performanceMode || p.frameCount % 3 === 0) {
          p.stroke(240, 240, 228, 10);
          p.strokeWeight(1);
          const gridSize = performanceMode ? 60 : 30;
          const gridThreshold = performanceMode ? 0.96 : 0.92; 
          
          for (let x = 0; x < p.width; x += gridSize) {
            for (let y = 0; y < p.height; y += gridSize) {
              if (Math.random() > gridThreshold) {
                p.point(x, y);
              }
            }
          }
        }
        
        // Draw ASCII overlay if enabled - optimized
        if (showAsciiOverlay) {
          drawAsciiOverlay(p);
        }
        
        // Regenerate small shapes occasionally - less frequently on mobile
        const regenerateThreshold = performanceMode ? 0.001 : 0.005;
        if (p.random() < regenerateThreshold * animationSpeed) {
          generateSmallShapes();
        }
      };
      
      // ASCII art overlay effect - optimized for performance
      const drawAsciiOverlay = (p: any) => {
        // Larger character size on mobile for better performance
        const charSize = performanceMode ? 16 : 12;
        const cols = Math.floor(p.width / charSize);
        const rows = Math.floor(p.height / charSize);
        
        p.push();
        p.fill(240, 240, 228, 160);
        p.textSize(charSize);
        p.textFont('monospace');
        
        // On mobile, skip rows to improve performance
        const rowStep = performanceMode ? 2 : 1;
        const colStep = performanceMode ? 2 : 1;
        
        // Only redraw ASCII every few frames on mobile
        if (performanceMode && p.frameCount % 3 !== 0) {
          p.pop();
          return;
        }
        
        for (let y = 0; y < rows; y += rowStep) {
          for (let x = 0; x < cols; x += colStep) {
            const pixelX = x * charSize;
            const pixelY = y * charSize;
            
            // Simplified pattern calculation
            let char = '';
            const patternValue = (x * 3 + y * 5) % 13;
            
            // Simplified character selection
            if (patternValue < 2) char = '.';
            else if (patternValue < 4) char = '*';
            else if (patternValue < 6) char = '/';
            else if (patternValue < 8) char = '|';
            else if (patternValue < 10) char = '\\';
            else char = ' ';
            
            // More aggressive random filtering on mobile
            if (Math.random() < (performanceMode ? 0.5 : 0.7)) {
              p.text(char, pixelX, pixelY + charSize);
            }
          }
        }
        p.pop();
      };
      
      // Optimized resize handling
      let resizeTimeout: number;
      p.windowResized = () => {
        // Debounce resize to prevent multiple canvas recreations
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          p.resizeCanvas(window.innerWidth, window.innerHeight);
        }, 100);
      };
    };
    
    // Create P5 instance only once
    if (!p5InstanceRef.current) {
      p5InstanceRef.current = new p5(sketch);
    }
    
    // Cleanup on unmount
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }
    };
  }, []); // Empty dependency array - canvas is created once

  // Update sketch parameters when animation props change
  useEffect(() => {
    // We intentionally don't recreate the canvas, just update the config
    // The canvas will read these values on the next draw cycle
  }, [currentAnimation, animationSpeed, showAsciiOverlay, performanceMode]);

  return (
    <div ref={containerRef} className={className} />
  );
};

export default React.memo(CanvasManager);
