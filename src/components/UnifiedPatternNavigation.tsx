
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useVisualization } from '@/contexts/VisualizationContext';

const UnifiedPatternNavigation: React.FC = () => {
  const { 
    handleNextPattern, 
    handlePrevPattern, 
    isAutoCycling, 
    currentPattern, 
    setCurrentPattern, 
    selectRandomPattern 
  } = useVisualization();
  
  const { patterns } = useVisualization as any; // Using 'as any' to access patterns from context
  const [showPatternList, setShowPatternList] = useState(false);

  const handlePatternClick = (index: number) => {
    setCurrentPattern(index);
    setShowPatternList(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 0.5 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center"
    >
      <div className="flex items-center space-x-4 mb-2">
        <button 
          onClick={handlePrevPattern}
          aria-label="Previous pattern"
          className="w-10 h-10 rounded-full border border-mystic/30 flex items-center justify-center text-mystic/70 hover:bg-mystic/10 hover:text-mystic transition-all"
        >
          ←
        </button>
        
        <button
          onClick={() => setShowPatternList(!showPatternList)}
          className="px-4 py-1 border border-mystic/30 rounded-full text-xs text-mystic/70 hover:bg-mystic/10 hover:text-mystic transition-all"
        >
          <span className={`${isAutoCycling ? 'text-mystic' : 'text-mystic/70'}`}>
            {currentPattern + 1}/{patterns.length}
          </span>
        </button>
        
        <button 
          onClick={handleNextPattern}
          aria-label="Next pattern"
          className="w-10 h-10 rounded-full border border-mystic/30 flex items-center justify-center text-mystic/70 hover:bg-mystic/10 hover:text-mystic transition-all"
        >
          →
        </button>
      </div>
      
      {/* Random pattern button */}
      <button
        onClick={selectRandomPattern}
        className="text-xs text-mystic/50 hover:text-mystic/80 transition-colors"
      >
        Random Pattern
      </button>
      
      {/* Pattern selection dropdown */}
      {showPatternList && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-16 bg-black/70 backdrop-blur-sm border border-mystic/20 rounded-lg p-2 w-48"
        >
          {patterns.map((pattern: any, index: number) => (
            <button
              key={pattern.id}
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

export default UnifiedPatternNavigation;
