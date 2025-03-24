
import React from 'react';
import { motion } from 'framer-motion';
import { useArt } from '@/contexts/ArtContext';

/**
 * A component for navigating between patterns
 */
const PatternNavigation: React.FC = () => {
  const { nextPattern, prevPattern, isAutoPlaying, currentPattern } = useArt();
  const { patterns } = useArt as any; // Using 'as any' to access patterns from context

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 0.5 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex items-center space-x-4"
    >
      <button 
        onClick={prevPattern}
        aria-label="Previous pattern"
        className="w-10 h-10 rounded-full border border-mystic/30 flex items-center justify-center text-mystic/70 hover:bg-mystic/10 hover:text-mystic transition-all"
      >
        ←
      </button>
      
      <div className="px-4 py-1 border border-mystic/30 rounded-full text-xs text-mystic/70">
        <span className={`${isAutoPlaying ? 'text-mystic' : 'text-mystic/70'}`}>
          {currentPattern + 1}/{patterns.length}
        </span>
      </div>
      
      <button 
        onClick={nextPattern}
        aria-label="Next pattern"
        className="w-10 h-10 rounded-full border border-mystic/30 flex items-center justify-center text-mystic/70 hover:bg-mystic/10 hover:text-mystic transition-all"
      >
        →
      </button>
    </motion.div>
  );
};

export default PatternNavigation;
