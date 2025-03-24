
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useArt } from '@/contexts/ArtContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft, ChevronRight, Shuffle, ChevronDown, X } from 'lucide-react';
import { patterns } from '@/contexts/ArtContext';

/**
 * A component for navigating between patterns
 */
const PatternNavigation: React.FC = () => {
  const { nextPattern, prevPattern, isAutoPlaying, currentPattern, setCurrentPattern, selectRandomPattern } = useArt();
  const [showPatternList, setShowPatternList] = useState(false);
  const isMobile = useIsMobile();

  // Safety checks for patterns
  const patternsArray = patterns || [];
  const patternsLength = patternsArray.length || 0;
  const currentPatternIndex = currentPattern >= 0 && currentPattern < patternsLength ? currentPattern : 0;
  
  // Get current pattern details
  const currentPatternData = patternsArray[currentPatternIndex] || { id: 0, title: "Unknown", description: "" };

  const handlePatternClick = (index: number) => {
    setCurrentPattern(index);
    setShowPatternList(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 0.5 }}
      className={`fixed ${isMobile ? 'bottom-4' : 'bottom-16'} left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center`}
    >
      <div className="flex items-center space-x-3 mb-2">
        <button 
          onClick={prevPattern}
          aria-label="Previous pattern"
          className={`${isMobile ? 'w-12 h-12' : 'w-10 h-10'} rounded-full border border-mystic/30 flex items-center justify-center text-mystic/70 hover:bg-mystic/10 hover:text-mystic transition-all`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <button
          onClick={() => setShowPatternList(!showPatternList)}
          className={`px-4 py-1.5 border border-mystic/30 rounded-full flex items-center ${isMobile ? 'text-sm' : 'text-xs'} text-mystic/70 hover:bg-mystic/10 hover:text-mystic transition-all ${showPatternList ? 'bg-mystic/10' : ''}`}
        >
          <span className={`${isAutoPlaying ? 'text-mystic' : 'text-mystic/70'} mr-1`}>
            {currentPatternData.title}
          </span>
          <ChevronDown className="h-3 w-3 ml-2" />
        </button>
        
        <button 
          onClick={nextPattern}
          aria-label="Next pattern"
          className={`${isMobile ? 'w-12 h-12' : 'w-10 h-10'} rounded-full border border-mystic/30 flex items-center justify-center text-mystic/70 hover:bg-mystic/10 hover:text-mystic transition-all`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      
      {/* Random pattern button */}
      <button
        onClick={selectRandomPattern}
        className="flex items-center text-xs text-mystic/50 hover:text-mystic/80 transition-colors"
      >
        <Shuffle className="h-3 w-3 mr-1" /> Random Pattern
      </button>
      
      {/* Pattern selection dropdown */}
      {showPatternList && patternsArray && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className={`absolute ${isMobile ? 'bottom-20 w-56' : 'bottom-16 w-48'} bg-black/70 backdrop-blur-sm border border-mystic/20 rounded-lg p-2`}
        >
          <div className="flex justify-between items-center mb-2 px-3 py-1">
            <h3 className="text-xs text-mystic/70">Select Pattern</h3>
            <button 
              onClick={() => setShowPatternList(false)} 
              className="text-mystic/50 hover:text-mystic"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
          
          {patternsArray.map((pattern, index) => (
            <button
              key={pattern.id}
              onClick={() => handlePatternClick(index)}
              className={`w-full text-left px-3 py-2 ${isMobile ? 'text-sm' : 'text-xs'} rounded ${
                currentPatternIndex === index 
                  ? 'bg-mystic/20 text-mystic' 
                  : 'text-mystic/70 hover:bg-mystic/10 hover:text-mystic'
              } transition-colors`}
            >
              {pattern.title}
              {currentPatternIndex === index && (
                <span className="ml-2 text-[9px] bg-mystic/20 px-1.5 py-0.5 rounded-full">Active</span>
              )}
            </button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default PatternNavigation;
