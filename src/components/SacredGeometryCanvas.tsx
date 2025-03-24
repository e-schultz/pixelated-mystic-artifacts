import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useGeometry } from '@/hooks/useGeometry';
import { animations } from '@/data/animationData';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  getDefaultSettings,
  drawFlowerOfLife,
  drawMetatronCube,
  drawSriYantra,
  drawMeditationCube,
  drawGeometricGrid,
  drawPerspectiveCorridor,
  drawLightPrism,
  drawRetroComputer
} from '../utils/geometryUtils';

interface SacredGeometryCanvasProps {
  currentAnimation?: number;
  animationSpeed?: number;
  showAsciiOverlay?: boolean;
  className?: string;
}

const SacredGeometryCanvas: React.FC<SacredGeometryCanvasProps> = ({ 
  currentAnimation = 0,
  animationSpeed = 1,
  showAsciiOverlay = false,
  className 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<p5 | null>(null);
  const prevAnimationRef = useRef<number>(currentAnimation);
  const { time, smallShapes } = useGeometry(animationSpeed);
  const isMobile = useIsMobile();
  
  // Animation configurations
  const animationFunctions = [
    {
      name: "Metatron's Cube",
      drawFunction: drawMetatronCube,
      settings: getDefaultSettings({ segments: isMobile ? 8 : 12, pixelSize: isMobile ? 1 : 2 })
    },
    {
      name: "Flower of Life",
      drawFunction: drawFlowerOfLife,
      settings: getDefaultSettings({ segments: isMobile ? 6 : 8, pixelSize: isMobile ? 2 : 3 })
    },
    {
      name: "Sri Yantra",
      drawFunction: drawSriYantra,
      settings: getDefaultSettings({ segments: 9, pixelSize: 2 })
    },
    {
      name: "Sacred Grid",
      drawFunction: drawMeditationCube,
      settings: getDefaultSettings({ segments: 12, pixelSize: 2 })
    },
    {
      name: "Geometric Grid",
      drawFunction: drawGeometricGrid,
      settings: getDefaultSettings({ segments: 6, pixelSize: 3 })
    },
    {
      name: "Perspective Corridor",
      drawFunction: drawPerspectiveCorridor,
      settings: getDefaultSettings({ segments: 10, pixelSize: 2 })
    },
    {
      name: "Light Prism",
      drawFunction: drawLightPrism,
      settings: getDefaultSettings({ segments: 12, pixelSize: 2 })
    },
    {
      name: "Retro Computer",
      drawFunction: drawRetroComputer,
      settings: getDefaultSettings({ segments: 8, pixelSize: 2 })
    }
  ];

  // ASCII character mapping for brightness - simpler on mobile
  const asciiChars = isMobile ? '@#*+:. ' : '@%#*+=-:. ';
  
  // Draw ASCII overlay - simpler version for mobile
  const drawAsciiOverlay = (p: any) => {
    // Larger character size on mobile for better readability
    const charSize = isMobile ? 16 : 12;
    const cols = Math.floor(p.width / charSize);
    const rows = Math.floor(p.height / charSize);
    
    p.push();
    p.fill(240, 240, 228, 160);
    p.textSize(charSize);
    p.textFont('monospace');
    
    // Use fewer characters on mobile for better performance
    const sparseRate = isMobile ? 0.5 : 0.7;
    
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        // Skip more characters on mobile
        if (Math.random() > sparseRate) continue;
        
        const pixelX = x * charSize;
        const pixelY = y * charSize;
        
        // Create a simpler ASCII art pattern for mobile
        let char = '';
        
        if (isMobile) {
          // Simpler pattern for mobile
          if ((x + y) % 5 === 0) char = '.';
          else if ((x * y) % 11 === 0) char = '*';
          else if ((x - y) % 6 === 0) char = '/';
          else char = ' ';
        } else {
          // Full pattern for desktop
          if ((x + y) % 7 === 0) char = '.';
          else if ((x + y) % 5 === 0) char = '*';
          else if ((x * y) % 11 === 0) char = '/';
          else if ((x * y) % 13 === 0) char = '|';
          else if ((x - y) % 6 === 0) char = '\\';
          else if ((x + y * 2) % 15 === 0) char = '#';
          else if ((x * y) % 29 === 0) char = '+';
          else if ((x * y) % 17 === 0) char = ':';
          else char = ' ';
        }
        
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
      // Track previous frame for smoother transitions
      let prevFrame: p5.Image;
      let transitionProgress = 0;
      const isTransitioning = currentAnimation !== prevAnimationRef.current;
      
      p.setup = () => {
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent(containerRef.current!);
        p.background(18, 18, 18);
        p.frameRate(isMobile ? 30 : 60); // Lower framerate on mobile
        prevFrame = p.createImage(p.width, p.height);
      };
      
      p.draw = () => {
        // Apply less aggressive fade for reduced flickering
        p.background(18, 18, 18, isMobile ? 10 : 5); // Stronger fade on mobile
        
        // Check if animation changed
        if (currentAnimation !== prevAnimationRef.current) {
          // Save current frame for transition
          prevFrame.copy(p, 0, 0, p.width, p.height, 0, 0, p.width, p.height);
          prevAnimationRef.current = currentAnimation;
          transitionProgress = 0;
        }
        
        // Handle transition between animations
        if (transitionProgress < 1) {
          transitionProgress += 0.05 * animationSpeed;
          if (transitionProgress < 1) {
            // Draw previous frame with decreasing opacity
            p.push();
            p.tint(255, 255, 255, (1 - transitionProgress) * 255);
            p.image(prevFrame, 0, 0);
            p.pop();
          }
        }
        
        // Draw main animation
        const currentAnim = animationFunctions[currentAnimation % animationFunctions.length];
        const centerX = p.width / 2;
        const centerY = p.height / 2;
        // Smaller size on mobile
        const size = Math.min(p.width, p.height) * (isMobile ? 0.8 : 0.6);
        
        // Update settings for animation effect - smoother rotation
        const animSettings = { 
          ...currentAnim.settings,
          rotation: time * 0.1, // Reduced rotation speed to minimize strobing
        };
        
        // Draw the main geometry
        p.push();
        if (transitionProgress < 1) {
          // Fade in new animation
          p.tint(255, 255, 255, transitionProgress * 255);
        }
        currentAnim.drawFunction(p, centerX, centerY, size, animSettings);
        p.pop();
        
        // Draw small background shapes - fewer on mobile
        p.push();
        p.noStroke();
        smallShapes.forEach(shape => {
          const shapeSettings = {
            ...shape.settings,
            rotation: shape.rotation,
            color: `rgba(240, 240, 228, ${shape.settings.opacity})`
          };
          
          shape.drawFunction(p, shape.x, shape.y, shape.size, shapeSettings);
        });
        p.pop();
        
        // Draw subtle grid in background - simplified for mobile
        if (!isMobile) {
          p.stroke(240, 240, 228, 8);
          p.strokeWeight(1);
          const gridSize = 40;
          for (let x = 0; x < p.width; x += gridSize) {
            for (let y = 0; y < p.height; y += gridSize) {
              if ((x + y) % 5 === 0) {
                p.point(x, y);
              }
            }
          }
        }
        
        // Draw ASCII overlay if enabled
        if (showAsciiOverlay) {
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

  return (
    <div ref={containerRef} className={className} />
  );
};

export default SacredGeometryCanvas;
