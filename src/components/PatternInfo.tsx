
import React from 'react';
import { motion } from 'framer-motion';
import { useArt } from '@/contexts/ArtContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface PatternInfoProps {
  title: string;
  description: string;
  isTerminal?: boolean;
  isAutoCycling?: boolean;
}

const PatternInfo: React.FC<PatternInfoProps> = ({ 
  title, 
  description, 
  isTerminal,
  isAutoCycling 
}) => {
  const { isAutoPlaying, isTerminalMode } = useArt();
  const isMobile = useIsMobile();
  
  // Use props if provided, otherwise fall back to context values
  const displayAutoPlaying = isAutoCycling !== undefined ? isAutoCycling : isAutoPlaying;
  const displayTerminalMode = isTerminal !== undefined ? isTerminal : isTerminalMode;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      className={`${isMobile ? 'fixed bottom-40 left-4 right-4 max-w-full' : 'fixed bottom-6 left-6 max-w-sm'} backdrop-blur-sm bg-black/40 border border-white/10 rounded-lg p-4 z-10`}
    >
      <h2 className="text-white text-xl font-light tracking-wider mb-2">
        {title}
      </h2>
      <p className={`text-white/80 ${isMobile ? 'text-xs' : 'text-sm'} mb-4`}>
        {description}
      </p>
      
      <div className="flex flex-col space-y-2">
        {displayAutoPlaying && (
          <div className="flex items-center space-x-2">
            <div className="h-1 flex-grow bg-white/20 rounded-full">
              <div className="h-1 bg-white/50 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
            <span className="text-white/60 text-xs">Auto-cycling</span>
          </div>
        )}
        
        {displayTerminalMode && (
          <div className="flex items-center space-x-2 mt-1">
            <div className="h-1 w-4 bg-green-400/50 rounded-full animate-pulse"></div>
            <span className="text-green-400/90 text-xs font-mono">TERMINAL MODE</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PatternInfo;
