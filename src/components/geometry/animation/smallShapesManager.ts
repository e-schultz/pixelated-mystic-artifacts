
import { getAnimationConfig } from '../animationConfigs';

// Generate background shapes optimized for performance
export const generateSmallShapes = (p: any, currentAnimation: number, performanceMode: boolean, smallShapes: any[]) => {
  // Only regenerate if needed to avoid GC pressure
  if (smallShapes.length === 0) {
    const shapes = [];
    // Fewer shapes on mobile
    const numShapes = performanceMode ? 
      Math.floor(p.random(3, 5)) : 
      Math.floor(p.random(5, 12));
    
    for (let i = 0; i < numShapes; i++) {
      // Use simplified shapes on mobile
      const shapeConfig = getAnimationConfig(p, currentAnimation, performanceMode);
      shapes.push({
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
    return shapes;
  }
  return smallShapes;
};

// Update and draw background shapes
export const drawSmallShapes = (
  p: any, 
  smallShapes: any[], 
  animationSpeed: number, 
  deltaTime: number, 
  performanceMode: boolean
) => {
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
};
