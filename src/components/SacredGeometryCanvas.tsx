
import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useGeometry } from '@/hooks/useGeometry';
import { animations } from '@/data/animationData';
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
  const { time, smallShapes } = useGeometry(animationSpeed);
  
  // Animation configurations
  const animationFunctions = [
    {
      name: "Metatron's Cube",
      drawFunction: drawMetatronCube,
      settings: getDefaultSettings({ segments: 12, pixelSize: 2 })
    },
    {
      name: "Flower of Life",
      drawFunction: drawFlowerOfLife,
      settings: getDefaultSettings({ segments: 8, pixelSize: 3 })
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

  // ASCII character mapping for brightness
  const asciiChars = '@%#*+=-:. ';
  
  // Draw ASCII overlay
  const drawAsciiOverlay = (p: any) => {
    const charSize = 12;
    const cols = Math.floor(p.width / charSize);
    const rows = Math.floor(p.height / charSize);
    
    p.push();
    p.fill(240, 240, 228, 160);
    p.textSize(charSize);
    p.textFont('monospace');
    
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const pixelX = x * charSize;
        const pixelY = y * charSize;
        
        // Use a repeating pattern for the overlay
        let char = '';
        
        // Create an ASCII art pattern
        if ((x + y) % 7 === 0) char = '.';
        else if ((x + y) % 5 === 0) char = '*';
        else if ((x * y) % 11 === 0) char = '/';
        else if ((x * y) % 13 === 0) char = '|';
        else if ((x - y) % 6 === 0) char = '\\';
        else if ((x + y * 2) % 15 === 0) char = '#';
        else if ((x * y) % 29 === 0) char = '+';
        else if ((x * y) % 17 === 0) char = ':';
        else char = ' ';
        
        // Only draw the characters with a random chance to create a sparse effect
        if (Math.random() < 0.7) {
          p.text(char, pixelX, pixelY + charSize);
        }
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
      p.setup = () => {
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent(containerRef.current!);
        p.background(18, 18, 18);
        p.frameRate(30);
      };
      
      p.draw = () => {
        p.background(18, 18, 18, 10); // Slight trail effect
        
        // Draw main animation
        const currentAnim = animationFunctions[currentAnimation % animationFunctions.length];
        const centerX = p.width / 2;
        const centerY = p.height / 2;
        const size = Math.min(p.width, p.height) * 0.6;
        
        // Update settings for animation effect
        const animSettings = { 
          ...currentAnim.settings,
          rotation: time * 0.2,
        };
        
        // Draw the main geometry
        currentAnim.drawFunction(p, centerX, centerY, size, animSettings);
        
        // Draw small background shapes
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
        
        // Draw subtle grid in background
        p.stroke(240, 240, 228, 10);
        p.strokeWeight(1);
        const gridSize = 30;
        for (let x = 0; x < p.width; x += gridSize) {
          for (let y = 0; y < p.height; y += gridSize) {
            if (Math.random() > 0.92) {
              p.point(x, y);
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
      };
    };
    
    canvasRef.current = new p5(sketch);
    
    return () => {
      if (canvasRef.current) {
        canvasRef.current.remove();
      }
    };
  }, [currentAnimation, animationSpeed, showAsciiOverlay, smallShapes, time]);

  return (
    <div ref={containerRef} className={className} />
  );
};

export default SacredGeometryCanvas;
