
import React from 'react';
import { cn } from '@/lib/utils';
import { useAnimation } from '@/contexts/AnimationContext';
import { animations } from '@/data/animationData';
import { useIsMobile } from '@/hooks/use-mobile';
import { useArt } from '@/contexts/ArtContext';
import { patterns } from '@/contexts/ArtContext';

interface AnimationInfoProps {
  className?: string;
}

const OptimizedAnimationInfo: React.FC<AnimationInfoProps> = ({ 
  className 
}) => {
  const { isAutoCycling, showAsciiOverlay } = useAnimation();
  const { currentPattern } = useArt();
  const isMobile = useIsMobile();
  
  // Safety check for pattern index
  const patternsArray = patterns || [];
  const patternsLength = patternsArray.length || 0;
  const currentPatternIndex = currentPattern >= 0 && currentPattern < patternsLength ? currentPattern : 0;
  
  // Get current pattern data with safety checks
  const patternData = patternsArray[currentPatternIndex] || { 
    title: "Unknown Pattern", 
    description: "No description available" 
  };
  
  // For mobile, truncate the description if it's too long
  const mobileDescription = isMobile && patternData.description.length > 120 
    ? `${patternData.description.substring(0, 120)}...` 
    : patternData.description;
  
  return (
    <div 
      className={cn(
        "fixed left-0 right-0 bottom-0 mx-auto mb-8 max-w-sm backdrop-blur-sm bg-black/80 border border-white/20 rounded-lg p-5 transition-all duration-500 z-10",
        isMobile && "w-[90%] max-w-[350px] p-4 mb-6",
        className
      )}
    >
      <h2 className={cn(
        "text-white font-mono tracking-wider mb-2",
        isMobile ? "text-xl" : "text-2xl"
      )}>
        {patternData.title}
      </h2>
      <p className={cn(
        "text-white/80 mb-4 font-mono",
        isMobile ? "text-xs" : "text-sm"
      )}>
        {isMobile ? mobileDescription : patternData.description}
      </p>
      
      {/* Progress bar at the bottom */}
      <div className="flex items-center space-x-2">
        <div className="h-1 flex-grow bg-white/20 rounded-full">
          {isAutoCycling && (
            <div className="h-1 bg-white/50 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          )}
        </div>
        <span className="text-white/60 text-xs font-mono">
          {isAutoCycling ? 'Auto-cycling' : ''}
        </span>
      </div>
      
      {/* Terminal mode indicator */}
      {showAsciiOverlay && (
        <div className="flex items-center mt-2">
          <div className="h-1 w-3 bg-green-400/70 rounded-full animate-pulse mr-2"></div>
          <span className="text-green-400/90 text-xs font-mono">TERMINAL MODE</span>
        </div>
      )}
    </div>
  );
};

export default React.memo(OptimizedAnimationInfo);
