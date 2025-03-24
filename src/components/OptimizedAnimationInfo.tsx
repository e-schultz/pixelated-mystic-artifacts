
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { useAnimation } from '@/contexts/AnimationContext';
import { animations } from '@/data/animationData';

interface AnimationInfoProps {
  className?: string;
}

const OptimizedAnimationInfo: React.FC<AnimationInfoProps> = ({ 
  className 
}) => {
  const { currentAnimation, isAutoCycling, showAsciiOverlay } = useAnimation();
  const title = animations[currentAnimation].title;
  const description = animations[currentAnimation].description;
  
  return (
    <div 
      className={cn(
        "fixed bottom-6 left-6 max-w-sm backdrop-blur-sm bg-black/40 border border-mystic/10 rounded-lg p-4 transition-all duration-500 z-10 opacity-100 translate-y-0",
        className
      )}
    >
      <h2 className="text-mystic text-xl font-light tracking-wider mb-2">
        {title}
      </h2>
      <p className="text-mystic/80 text-sm mb-4">
        {description}
      </p>
      <div className="flex flex-col space-y-2">
        {isAutoCycling && (
          <div className="flex items-center space-x-2">
            <div className="h-1 flex-grow bg-mystic/20 rounded-full">
              <div className="h-1 bg-mystic/50 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
            <span className="text-mystic/60 text-xs">Auto-cycling</span>
          </div>
        )}
        
        {showAsciiOverlay && (
          <div className="flex items-center space-x-2 mt-1">
            <div className="h-1 w-4 bg-green-400/50 rounded-full animate-pulse"></div>
            <span className="text-green-400/90 text-xs font-mono">ASCII MODE</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(OptimizedAnimationInfo);
