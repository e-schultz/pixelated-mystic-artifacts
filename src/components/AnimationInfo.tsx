
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface AnimationInfoProps {
  title: string;
  description: string;
  isAutoCycling?: boolean;
  className?: string;
}

const AnimationInfo: React.FC<AnimationInfoProps> = ({ 
  title, 
  description, 
  isAutoCycling = true,
  className 
}) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Show animation info with a delay for a nice entrance effect
    const timer = setTimeout(() => {
      setVisible(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [title]);
  
  return (
    <div 
      className={cn(
        "fixed bottom-6 left-6 max-w-sm backdrop-blur-sm bg-black/40 border border-mystic/10 rounded-lg p-4 transition-all duration-500 z-10",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
    >
      <h2 className="text-mystic text-xl font-light tracking-wider mb-2">
        {title}
      </h2>
      <p className="text-mystic/80 text-sm mb-4">
        {description}
      </p>
      {isAutoCycling && (
        <div className="flex items-center space-x-2">
          <div className="h-1 flex-grow bg-mystic/20 rounded-full">
            <div className="h-1 bg-mystic/50 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
          <span className="text-mystic/60 text-xs">Auto-cycling</span>
        </div>
      )}
    </div>
  );
};

export default AnimationInfo;
