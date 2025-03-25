
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useArt } from '@/contexts/ArtContext';
import { patterns } from '@/contexts/ArtContext';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * A component for navigating between patterns
 */
const PatternNavigation: React.FC = () => {
  // Try to use context, but provide fallbacks if not available
  let artContext = {
    nextPattern: () => console.log('Next pattern clicked'),
    prevPattern: () => console.log('Previous pattern clicked'),
    previousPattern: () => console.log('Previous pattern clicked'), // Alias
    isAutoPlaying: false,
    currentPattern: 0,
    setCurrentPattern: (_index: number) => {}, // Fix: Add parameter to match signature
    selectRandomPattern: () => console.log('Random pattern clicked')
  };

  try {
    const context = useArt();
    if (context) {
      artContext = {
        nextPattern: context.nextPattern,
        prevPattern: context.prevPattern,
        previousPattern: context.previousPattern,
        isAutoPlaying: context.isAutoPlaying,
        currentPattern: context.currentPattern,
        setCurrentPattern: context.setCurrentPattern,
        selectRandomPattern: context.selectRandomPattern
      };
    }
  } catch (error) {
    console.warn("Art context not available, using fallbacks", error);
  }

  const { nextPattern, prevPattern, isAutoPlaying, currentPattern, setCurrentPattern, selectRandomPattern } = artContext;
  const [showPatternList, setShowPatternList] = useState(false);
  const isMobile = useIsMobile();

  const handlePatternClick = (index: number) => {
    setCurrentPattern(index); // Fix: This passes an index and is now type-compatible
    setShowPatternList(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 0.5 }}
      className={`fixed ${isMobile ? 'bottom-8 left-0 right-0 px-4' : 'bottom-6 left-1/2 transform -translate-x-1/2'} z-10 flex flex-col items-center`}
    >
      <div className={`flex items-center ${isMobile ? 'justify-center w-full space-x-8' : 'space-x-4'} mb-2`}>
        <button 
          onClick={prevPattern}
          aria-label="Previous pattern"
          className={`${isMobile ? 'w-14 h-14' : 'w-10 h-10'} rounded-full border border-mystic/30 flex items-center justify-center text-mystic/70 hover:bg-mystic/10 hover:text-mystic transition-all ${isMobile ? 'text-xl' : ''}`}
        >
          ←
        </button>
        
        {!isMobile && (
          <button
            onClick={() => setShowPatternList(!showPatternList)}
            className="px-4 py-1 border border-mystic/30 rounded-full text-xs text-mystic/70 hover:bg-mystic/10 hover:text-mystic transition-all"
          >
            <span className={`${isAutoPlaying ? 'text-mystic' : 'text-mystic/70'}`}>
              {currentPattern + 1}/{patterns.length}
            </span>
          </button>
        )}
        
        <button 
          onClick={nextPattern}
          aria-label="Next pattern"
          className={`${isMobile ? 'w-14 h-14' : 'w-10 h-10'} rounded-full border border-mystic/30 flex items-center justify-center text-mystic/70 hover:bg-mystic/10 hover:text-mystic transition-all ${isMobile ? 'text-xl' : ''}`}
        >
          →
        </button>
      </div>
      
      {/* Small indicator for mobile */}
      {isMobile && (
        <div className="mt-2 text-xs text-mystic/60">
          {currentPattern + 1}/{patterns.length}
        </div>
      )}
      
      {/* Random pattern button - hide on mobile */}
      {!isMobile && (
        <button
          onClick={selectRandomPattern}
          className="text-xs text-mystic/50 hover:text-mystic/80 transition-colors"
        >
          Random Pattern
        </button>
      )}
      
      {/* Pattern selection dropdown */}
      {showPatternList && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-16 bg-black/70 backdrop-blur-sm border border-mystic/20 rounded-lg p-2 w-48"
        >
          {patterns.map((pattern, index) => (
            <button
              key={index}
              onClick={() => handlePatternClick(index)}
              className={`w-full text-left px-3 py-2 text-xs rounded ${
                currentPattern === index 
                  ? 'bg-mystic/20 text-mystic' 
                  : 'text-mystic/70 hover:bg-mystic/10 hover:text-mystic'
              } transition-colors`}
            >
              {pattern.title}
            </button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default PatternNavigation;
