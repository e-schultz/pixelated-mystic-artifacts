
import { getAnimationConfig } from '../animationConfigs';

// Generate small floating shapes for visual enhancement
export function generateSmallShapes(
  p: any, 
  currentAnimation: number, 
  performanceMode: boolean, 
  existingShapes: Array<any> = [],
  randomOffset: number = 0  // Add the randomOffset parameter with default value
) {
  // Optimize: If we have existing shapes, just return them
  if (existingShapes && existingShapes.length > 0) {
    return existingShapes;
  }
  
  // Number of shapes based on performance mode
  const numShapes = performanceMode ? 15 : 30;
  const shapes = [];
  
  // Current animation for style consistency
  const animation = getAnimationConfig(p, currentAnimation, performanceMode);
  
  // Create shapes with properties
  for (let i = 0; i < numShapes; i++) {
    // Use randomOffset to influence shape creation for more variety
    const multiplier = (i + randomOffset) * 0.1;
    
    shapes.push({
      x: p.random(-p.width / 2, p.width / 2),
      y: p.random(-p.height / 2, p.height / 2),
      size: p.random(5, 15) * (performanceMode ? 1.5 : 1),
      rotation: p.random(p.TWO_PI),
      speed: p.random(0.2, 1.5) * (performanceMode ? 1.2 : 1),
      drawFunction: animation.drawFunction,
      settings: { ...animation.settings, isSmallShape: true }
    });
  }
  
  return shapes;
}

// Draw and update small shapes with optimizations
export function drawSmallShapes(
  p: any, 
  shapes: Array<any>, 
  animationSpeed: number, 
  deltaTime: number, 
  performanceMode: boolean
) {
  // Optimized factor for small shapes movement
  const moveFactor = deltaTime * 60 * animationSpeed;
  
  p.push();
  
  // Lower opacity for background shapes
  if (performanceMode) {
    p.opacity = 0.6;
  }
  
  // Update and draw each shape with limited calls
  for (let i = 0; i < shapes.length; i++) {
    const shape = shapes[i];
    
    // Update shape position
    shape.x += p.cos(shape.rotation) * shape.speed * moveFactor;
    shape.y += p.sin(shape.rotation) * shape.speed * moveFactor;
    
    // Wrap around screen edges with buffer
    const buffer = shape.size * 2;
    if (shape.x < -p.width / 2 - buffer) shape.x = p.width / 2 + buffer;
    if (shape.x > p.width / 2 + buffer) shape.x = -p.width / 2 - buffer;
    if (shape.y < -p.height / 2 - buffer) shape.y = p.height / 2 + buffer;
    if (shape.y > p.height / 2 + buffer) shape.y = -p.height / 2 - buffer;
    
    // Draw the shape at reduced size
    p.push();
    p.translate(shape.x, shape.y);
    p.rotate(shape.rotation + p.frameCount * 0.01 * shape.speed);
    
    // Use slightly different settings for small shapes
    const smallShapeSettings = {
      ...shape.settings,
      pixelSize: performanceMode ? 2 : 1.5,
      segments: Math.max(3, Math.floor((shape.settings.segments || 8) * 0.5))
    };
    
    // Scale down for small shapes
    const smallSize = shape.size * (performanceMode ? 2 : 1);
    
    // Draw with the animation's draw function
    shape.drawFunction(
      p, 
      0, 
      0, 
      smallSize, 
      smallShapeSettings
    );
    
    p.pop();
  }
  
  p.pop();
  
  return shapes;
}
