
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAnimation } from '@/context/AnimationContext';
import { useIsMobile } from '@/hooks/use-mobile';

const NavigationControls: React.FC = () => {
  const { state, dispatch } = useAnimation();
  const { isAutoCycling } = state;
  const isMobile = useIsMobile();

  const handlePrevAnimation = () => {
    dispatch({ type: 'PREV_ANIMATION' });
  };

  const handleNextAnimation = () => {
    dispatch({ type: 'NEXT_ANIMATION' });
  };

  const toggleAutoCycling = () => {
    dispatch({ type: 'TOGGLE_AUTO_CYCLING' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center space-x-4"
    >
      <button 
        onClick={handlePrevAnimation}
        className="w-10 h-10 rounded-full flex items-center justify-center text-cyan-300 hover:text-cyan-100 transition-all backdrop-blur-sm bg-black/40 border border-white/10 group"
        aria-label="Previous animation"
      >
        <ChevronLeft className="w-4 h-4 group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={toggleAutoCycling}
        className={`px-3 py-1 rounded-full text-xs tracking-wider transition-all backdrop-blur-sm bg-black/40 border ${
          isAutoCycling 
            ? 'text-cyan-300 border-cyan-500/30' 
            : 'text-white/70 border-white/10'
        }`}
      >
        {isAutoCycling ? 'AUTO' : 'MANUAL'}
        {isAutoCycling && (
          <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
        )}
      </button>
      
      <button 
        onClick={handleNextAnimation}
        className="w-10 h-10 rounded-full flex items-center justify-center text-cyan-300 hover:text-cyan-100 transition-all backdrop-blur-sm bg-black/40 border border-white/10 group"
        aria-label="Next animation"
      >
        <ChevronRight className="w-4 h-4 group-hover:scale-110 transition-transform" />
      </button>
    </motion.div>
  );
};

export default NavigationControls;
