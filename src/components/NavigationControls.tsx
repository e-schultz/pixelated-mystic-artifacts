
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
      transition={{ delay: 2.2, duration: 0.5 }}
      className={`fixed ${isMobile ? 'bottom-4' : 'bottom-8'} left-1/2 transform -translate-x-1/2 z-10 flex items-center ${isMobile ? 'space-x-4' : 'space-x-6'}`}
    >
      <button 
        onClick={handlePrevAnimation}
        className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-full flex items-center justify-center text-cyan-300 hover:text-cyan-100 transition-all neo-blur group`}
        aria-label="Previous animation"
      >
        <ChevronLeft className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} group-hover:scale-110 transition-transform`} />
      </button>
      
      <button
        onClick={toggleAutoCycling}
        className={`px-4 py-1.5 rounded-full text-xs tracking-wider transition-all neo-blur ${
          isAutoCycling 
            ? 'text-cyan-300 border border-cyan-500/30' 
            : 'text-white/70 border border-white/10'
        }`}
      >
        {isAutoCycling ? (isMobile ? 'AUTO' : 'AUTO-SYNC') : 'MANUAL'}
        {isAutoCycling && (
          <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
        )}
      </button>
      
      <button 
        onClick={handleNextAnimation}
        className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-full flex items-center justify-center text-cyan-300 hover:text-cyan-100 transition-all neo-blur group`}
        aria-label="Next animation"
      >
        <ChevronRight className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} group-hover:scale-110 transition-transform`} />
      </button>
    </motion.div>
  );
};

export default NavigationControls;
