
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { animations } from '@/data/animationData';

interface AnimationContextType {
  currentAnimation: number;
  setCurrentAnimation: (index: number) => void;
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
  isAutoCycling: boolean;
  setIsAutoCycling: (isAuto: boolean) => void;
  showAsciiOverlay: boolean;
  setShowAsciiOverlay: (show: boolean) => void;
  handlePrevAnimation: () => void;
  handleNextAnimation: () => void;
  performanceMode: boolean;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(isMobile ? 0.7 : 1);
  const [showAsciiOverlay, setShowAsciiOverlay] = useState(false);
  const [performanceMode, setPerformanceMode] = useState(isMobile);
  
  // Update performance mode when mobile status changes
  useEffect(() => {
    setPerformanceMode(isMobile);
    
    // Automatically reduce animation speed on mobile
    if (isMobile && animationSpeed > 0.7) {
      setAnimationSpeed(0.7);
    }
  }, [isMobile, animationSpeed]);

  // Optimize animation cycling using useCallback
  const handlePrevAnimation = useCallback(() => {
    setCurrentAnimation((prev) => (prev - 1 + animations.length) % animations.length);
  }, []);

  const handleNextAnimation = useCallback(() => {
    setCurrentAnimation((prev) => (prev + 1) % animations.length);
  }, []);

  // Optimized auto cycling with proper timing
  useEffect(() => {
    if (!isAutoCycling) return;
    
    // Adjust cycle time based on device capability
    const cycleTime = performanceMode ? 
      12000 / animationSpeed : // Slower on mobile
      10000 / animationSpeed;  // Normal on desktop
      
    const intervalId = setInterval(() => {
      setCurrentAnimation((prev) => (prev + 1) % animations.length);
    }, cycleTime);
    
    return () => clearInterval(intervalId);
  }, [isAutoCycling, animationSpeed, performanceMode]);

  // Log ASCII art with throttling
  useEffect(() => {
    if (showAsciiOverlay) {
      console.log(`
,---.   .--.   .---. ,--. ,-. 
|    \\  |  |   | .-' | .--' | 
|  ,  \\ |  |   | \`-. | |    | 
|  |\\  \\|  |   | .-' | |    | 
|  | \\  '  '--.|  \`--' \`--. | 
\`--'  \`--\`-----'\`------\`---' ' 
.---.   ,---.  ,--.  ,---.   
| .-.\\ /  .-. ) |  | /  .-'  
| |-' )| ('-. \\ |  || \`--.   
| |--' |  --. ) |  ||.--.    
| |    /  '--'  |  ||  --'   
)('    \`------' \`--' \`----'  
                               
      `);
    }
  }, [showAsciiOverlay]);

  return (
    <AnimationContext.Provider
      value={{
        currentAnimation,
        setCurrentAnimation,
        animationSpeed,
        setAnimationSpeed,
        isAutoCycling,
        setIsAutoCycling,
        showAsciiOverlay,
        setShowAsciiOverlay,
        handlePrevAnimation,
        handleNextAnimation,
        performanceMode
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}
