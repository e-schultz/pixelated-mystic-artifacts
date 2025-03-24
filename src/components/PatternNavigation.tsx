
import React from 'react';
import { motion } from 'framer-motion';
import { useArt } from '@/contexts/ArtContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { patterns } from '@/contexts/ArtContext';

/**
 * A component for navigating between patterns
 */
const PatternNavigation: React.FC = () => {
  const { nextPattern, prevPattern, currentPattern } = useArt();
  const isMobile = useIsMobile();

  // Safety checks for patterns
  const patternsArray = patterns || [];
  const patternsLength = patternsArray.length || 0;
  const currentPatternIndex = currentPattern >= 0 && currentPattern < patternsLength ? currentPattern : 0;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 0.5 }}
      className="fixed bottom-28 left-1/2 transform -translate-x-1/2 z-10 flex items-center space-x-6"
    >
      <button 
        onClick={prevPattern}
        aria-label="Previous pattern"
        className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      
      <button 
        onClick={nextPattern}
        aria-label="Next pattern"
        className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </motion.div>
  );
};

export default PatternNavigation;
