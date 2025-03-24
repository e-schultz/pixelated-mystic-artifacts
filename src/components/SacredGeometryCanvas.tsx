
import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import { 
  GeometrySettings, 
  getDefaultSettings, 
  getRandomGeometryFunction,
  drawFlowerOfLife,
  drawMetatronCube,
  drawSriYantra,
  drawMeditationCube,
  drawGeometricGrid
} from '../utils/geometryUtils';

interface SacredGeometryCanvasProps {
  currentAnimation?: number;
  animationSpeed?: number;
  className?: string;
}

const SacredGeometryCanvas: React.FC<SacredGeometryCanvasProps> = ({ 
  currentAnimation = 0,
  animationSpeed = 1,
  className 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<p5 | null>(null);
  
  // Animation settings
  const animations = [
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
    }
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Remove any existing canvas
    if (canvasRef.current) {
      canvasRef.current.remove();
    }
    
    // Create new p5 instance
    const sketch = (p: any) => {
      let time = 0;
      let smallShapes: Array<{
        x: number;
        y: number;
        size: number;
        rotation: number;
        speed: number;
        drawFunction: Function;
        settings: GeometrySettings;
      }> = [];
      
      const generateSmallShapes = () => {
        smallShapes = [];
        const numShapes = Math.floor(p.random(5, 15));
        
        for (let i = 0; i < numShapes; i++) {
          const drawFunction = getRandomGeometryFunction();
          smallShapes.push({
            x: p.random(p.width),
            y: p.random(p.height),
            size: p.random(20, 70),
            rotation: p.random(p.TWO_PI),
            speed: p.random(0.001, 0.003),
            drawFunction,
            settings: getDefaultSettings({ 
              pixelSize: Math.floor(p.random(1, 3)),
              opacity: p.random(0.3, 0.8)
            })
          });
        }
      };
      
      p.setup = () => {
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent(containerRef.current!);
        p.background(18, 18, 18);
        p.frameRate(30);
        
        generateSmallShapes();
      };
      
      p.draw = () => {
        p.background(18, 18, 18, 10); // Slight trail effect
        
        // Use animationSpeed to control the time increment
        time += 0.005 * animationSpeed;
        
        // Draw main animation
        const currentAnim = animations[currentAnimation];
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
          shape.rotation += shape.speed * animationSpeed;
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
        
        // Rarely regenerate small shapes
        if (p.random() < 0.005 * animationSpeed) {
          generateSmallShapes();
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
  }, [currentAnimation, animationSpeed]);

  return (
    <div ref={containerRef} className={className} />
  );
};

export default SacredGeometryCanvas;
