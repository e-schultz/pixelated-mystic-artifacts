
import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import { useArt } from '@/contexts/ArtContext';
import { drawPatterns } from '@/utils/patternRenderer';

const ArtCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  
  const { 
    currentPattern, 
    speed, 
    isTerminalMode, 
    isPixelated,
    isLowPerformanceMode 
  } = useArt();

  // Initialize and manage p5 instance
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Clean up any existing p5 instance to prevent duplication
    if (p5InstanceRef.current) {
      p5InstanceRef.current.remove();
      p5InstanceRef.current = null;
    }
    
    const sketch = (p: any) => {
      let time = 0;
      let lastFrameTime = 0;
      const targetFrameRate = isLowPerformanceMode ? 30 : 60;
      
      p.setup = () => {
        console.log('Setting up p5 canvas with pattern:', currentPattern);
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent(canvasRef.current!);
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
        const currentTime = p.millis();
        const deltaTime = (currentTime - lastFrameTime) / 1000;
        lastFrameTime = currentTime;
        
        // Clear with trail effect
        p.background(0, 12);
        
        // Update time based on animation speed
        time += 0.01 * speed * deltaTime * 60;
        
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
            isTerminalMode
          }
        );
        
        // Draw terminal overlay if enabled
        if (isTerminalMode && (!isLowPerformanceMode || p.frameCount % 3 === 0)) {
          drawTerminalOverlay(p);
        }
      };
      
      const drawTerminalOverlay = (p: any) => {
        const charSize = isLowPerformanceMode ? 16 : 12;
        const cols = Math.floor(p.width / charSize);
        const rows = Math.floor(p.height / charSize);
        
        p.push();
        p.fill(0, 220, 0, 40);
        p.textSize(charSize);
        p.textFont('monospace');
        
        // Skip rows for performance
        const rowStep = isLowPerformanceMode ? 2 : 1;
        const colStep = isLowPerformanceMode ? 2 : 1;
        
        for (let y = 0; y < rows; y += rowStep) {
          for (let x = 0; x < cols; x += colStep) {
            if (Math.random() < 0.3) {
              const chars = ['0', '1', '.', ' ', '|', '/', '\\', '*'];
              const char = chars[Math.floor(Math.random() * chars.length)];
              p.text(char, x * charSize, y * charSize + charSize);
            }
          }
        }
        p.pop();
      };
      
      // Handle window resize
      let resizeTimeout: ReturnType<typeof setTimeout>;
      p.windowResized = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          p.resizeCanvas(window.innerWidth, window.innerHeight);
        }, 100);
      };
    };
    
    // Create p5 instance
    p5InstanceRef.current = new p5(sketch);
    
    // Cleanup
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, [currentPattern, speed, isTerminalMode, isPixelated, isLowPerformanceMode]); // Include all dependencies

  return <div ref={canvasRef} className="absolute inset-0 z-0" />;
};

export default ArtCanvas;
