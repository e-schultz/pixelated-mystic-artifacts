
import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useGeometry } from '@/hooks/useGeometry';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  GeometrySettings, 
  getDefaultSettings,
  drawMetatronCube,
  drawFlowerOfLife,
  drawSriYantra,
  drawGeometricGrid
} from '@/utils/geometryUtils';

interface SacredGeometryCanvasProps {
  currentAnimation?: number;
  animationSpeed?: number;
  showAsciiOverlay?: boolean;
}

const SacredGeometryCanvas: React.FC<SacredGeometryCanvasProps> = ({ 
  currentAnimation = 0,
  animationSpeed = 1,
  showAsciiOverlay = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<p5 | null>(null);
  const prevAnimationRef = useRef<number>(currentAnimation);
  const { time, smallShapes } = useGeometry(animationSpeed);
  const isMobile = useIsMobile();
  
  // Animation configurations - mobile-first
  const animationFunctions = [
    {
      name: "Metatron's Cube",
      drawFunction: drawMetatronCube,
      settings: getDefaultSettings({ 
        segments: isMobile ? 6 : 12, 
        pixelSize: isMobile ? 1 : 2 
      })
    },
    {
      name: "Flower of Life",
      drawFunction: drawFlowerOfLife,
      settings: getDefaultSettings({ 
        segments: isMobile ? 4 : 8, 
        pixelSize: isMobile ? 1 : 2 
      })
    },
    {
      name: "Sri Yantra",
      drawFunction: drawSriYantra,
      settings: getDefaultSettings({ 
        segments: isMobile ? 6 : 9, 
        pixelSize: isMobile ? 1 : 2 
      })
    },
    {
      name: "Geometric Grid",
      drawFunction: drawGeometricGrid,
      settings: getDefaultSettings({ 
        segments: isMobile ? 4 : 6, 
        pixelSize: isMobile ? 1 : 2 
      })
    }
  ];

  // Simple ASCII effect
  const drawAsciiOverlay = (p: any) => {
    if (isMobile) return; // Skip ASCII on mobile
    
    const charSize = 12;
    const cols = Math.floor(p.width / charSize);
    const rows = Math.floor(p.height / charSize);
    
    p.push();
    p.fill(240, 240, 228, 120);
    p.textSize(charSize);
    p.textFont('monospace');
    
    for (let y = 0; y < rows; y += 2) {
      for (let x = 0; x < cols; x += 2) {
        const pixelX = x * charSize;
        const pixelY = y * charSize;
        
        let char = '';
        if ((x + y) % 7 === 0) char = '.';
        else if ((x + y) % 5 === 0) char = '*';
        else if ((x * y) % 11 === 0) char = '/';
        else char = ' ';
        
        p.text(char, pixelX, pixelY + charSize);
      }
    }
    p.pop();
  };

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Remove any existing canvas
    if (canvasRef.current) {
      canvasRef.current.remove();
    }
    
    // Create new p5 instance
    const sketch = (p: any) => {
      // For transitions
      let prevFrame: p5.Image;
      let transitionProgress = 0;
      let lastFrameTime = 0;
      
      p.setup = () => {
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent(containerRef.current!);
        p.background(18, 18, 18);
        p.frameRate(isMobile ? 30 : 60); // Lower framerate on mobile
        prevFrame = p.createImage(p.width, p.height);
        lastFrameTime = p.millis();
      };
      
      p.draw = () => {
        // Calculate delta time for smoother transitions
        const currentTime = p.millis();
        const deltaTime = (currentTime - lastFrameTime) / 1000; // convert to seconds
        lastFrameTime = currentTime;
        
        // Less frequent background refresh - helps reduce flickering
        // Only fade background slowly instead of redrawing it completely
        p.background(18, 18, 18, isMobile ? 15 : 8);
        
        // Handle transition if animation changed
        if (currentAnimation !== prevAnimationRef.current) {
          // Capture current frame before switching
          prevFrame.copy(p, 0, 0, p.width, p.height, 0, 0, p.width, p.height);
          prevAnimationRef.current = currentAnimation;
          transitionProgress = 0;
        }
        
        // Process transition more smoothly using delta time
        if (transitionProgress < 1) {
          // Scale transition speed by delta time for consistency across devices
          transitionProgress += 0.04 * animationSpeed * Math.min(deltaTime * 60, 2);
          if (transitionProgress < 1) {
            p.push();
            // Apply previous frame with fading opacity
            p.tint(255, 255, 255, (1 - transitionProgress) * 255);
            p.image(prevFrame, 0, 0);
            p.pop();
          }
        }
        
        // Draw main animation
        const currentAnim = animationFunctions[currentAnimation % animationFunctions.length];
        const centerX = p.width / 2;
        const centerY = p.height / 2;
        // Mobile-first: smaller size on mobile
        const size = Math.min(p.width, p.height) * (isMobile ? 0.7 : 0.6);
        
        // Animation settings - smoother rotation based on delta time
        const animSettings = { 
          ...currentAnim.settings,
          rotation: time * 0.1,
        };
        
        // Draw the main geometry with smoother transition
        p.push();
        if (transitionProgress < 1) {
          // Smooth fade-in effect
          p.tint(255, 255, 255, Math.min(transitionProgress * 1.5, 1) * 255);
        }
        currentAnim.drawFunction(p, centerX, centerY, size, animSettings);
        p.pop();
        
        // Draw small background shapes - fewer on mobile and with smoother rendering
        p.push();
        p.noStroke();
        smallShapes.forEach(shape => {
          // Only draw shapes that are within the screen bounds with some padding
          // This helps reduce unnecessary rendering that could cause flickering
          if (
            shape.x > -shape.size && 
            shape.x < p.width + shape.size && 
            shape.y > -shape.size && 
            shape.y < p.height + shape.size
          ) {
            const shapeSettings = {
              ...shape.settings,
              rotation: shape.rotation,
              color: `rgba(240, 240, 228, ${shape.settings.opacity})`
            };
            
            shape.drawFunction(p, shape.x, shape.y, shape.size, shapeSettings);
          }
        });
        p.pop();
        
        // Draw ASCII overlay if enabled (desktop only)
        if (showAsciiOverlay && !isMobile) {
          drawAsciiOverlay(p);
        }
      };
      
      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
        prevFrame = p.createImage(p.width, p.height);
      };
    };
    
    canvasRef.current = new p5(sketch);
    
    return () => {
      if (canvasRef.current) {
        canvasRef.current.remove();
      }
    };
  }, [currentAnimation, animationSpeed, showAsciiOverlay, smallShapes, time, isMobile]);

  return <div ref={containerRef} />;
};

export default SacredGeometryCanvas;
