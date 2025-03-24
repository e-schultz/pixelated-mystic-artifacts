
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { useAnimation } from '@/contexts/AnimationContext';
import { animations } from '@/data/animationData';
import { useIsMobile } from '@/hooks/use-mobile';

interface AnimationInfoProps {
  className?: string;
}

const OptimizedAnimationInfo: React.FC<AnimationInfoProps> = ({ 
  className 
}) => {
  const { currentAnimation, isAutoCycling, showAsciiOverlay } = useAnimation();
  const isMobile = useIsMobile();
  const title = animations[currentAnimation].title;
  const description = animations[currentAnimation].description;
  
  // For mobile, truncate the description if it's too long
  const mobileDescription = isMobile && description.length > 120 
    ? `${description.substring(0, 120)}...` 
    : description;
  
  return (
    <div 
      className={cn(
        "fixed bottom-6 left-6 max-w-sm backdrop-blur-sm bg-black/40 border border-mystic/10 rounded-lg p-4 transition-all duration-500 z-10 opacity-100 translate-y-0",
        isMobile && "bottom-4 left-4 max-w-[calc(100vw-2rem)] p-3",
        className
      )}
    >
      <h2 className={cn(
        "text-mystic font-light tracking-wider mb-2",
        isMobile ? "text-lg" : "text-xl"
      )}>
        {title}
      </h2>
      <p className={cn(
        "text-mystic/80 mb-4",
        isMobile ? "text-xs" : "text-sm"
      )}>
        {isMobile ? mobileDescription : description}
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
