
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimationInfoProps {
  title: string;
  description: string;
  isAutoCycling?: boolean;
  showAsciiOverlay?: boolean;
  className?: string;
}

const AnimationInfo: React.FC<AnimationInfoProps> = ({ 
  title, 
  description, 
  isAutoCycling = true,
  showAsciiOverlay = false,
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
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -20 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed bottom-8 left-8 max-w-sm backdrop-blur-xl bg-black/40 border border-white/10 rounded-lg p-5 z-10 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)]",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <div className="w-8 h-8 rounded-full border border-cyan-500/20 flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10">
            <Info className="w-4 h-4 text-cyan-300" />
          </div>
        </div>
        
        <div>
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 text-xl font-light tracking-wider mb-2">
            {title}
          </h2>
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            {description}
          </p>
          
          <div className="flex flex-col space-y-2.5">
            {isAutoCycling && (
              <div className="flex items-center space-x-3">
                <div className="h-1 flex-grow bg-blue-900/50 rounded-full overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
                <span className="text-cyan-300/70 text-xs">Auto-sync</span>
              </div>
            )}
            
            {showAsciiOverlay && (
              <div className="flex items-center space-x-2 mt-1">
                <div className="h-1 w-4 bg-green-400/50 rounded-full animate-pulse"></div>
                <span className="text-green-400/90 text-xs font-mono">QUANTUM MODE</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimationInfo;
