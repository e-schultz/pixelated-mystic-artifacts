
import React, { useState, useEffect } from 'react';
import UnifiedCanvasManager from '@/components/geometry/UnifiedCanvasManager';
import AnimationInfoPanel from '@/components/AnimationInfoPanel';
import UnifiedControlPanel from '@/components/UnifiedControlPanel';
import UnifiedPatternNavigation from '@/components/UnifiedPatternNavigation';
import { useVisualization } from '@/contexts/VisualizationContext';
import { motion } from 'framer-motion';

const HomePage = () => {
  const [showControlPanel, setShowControlPanel] = useState(false);
  const { 
    isControlsVisible, 
    toggleControlsVisibility, 
    showAsciiOverlay, 
    isLowPerformanceMode,
    currentPattern
  } = useVisualization();

  useEffect(() => {
    console.log('HomePage: Current pattern is', currentPattern);
  }, [currentPattern]);

  const toggleControlPanel = () => {
    setShowControlPanel(!showControlPanel);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <UnifiedCanvasManager className="w-full h-full" />
      
      <header className="fixed top-0 left-0 right-0 p-6 z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="text-white text-2xl font-light tracking-[0.2em] text-center"
        >
          SACRED GEOMETRY
        </motion.h1>
      </header>
      
      <AnimationInfoPanel />
      
      <UnifiedPatternNavigation />
      
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        onClick={toggleControlsVisibility}
        className="fixed top-6 right-6 z-10 w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all"
      >
        ⚙️
      </motion.button>
      
      {isControlsVisible && (
        <UnifiedControlPanel onClose={toggleControlsVisibility} />
      )}
      
      {showAsciiOverlay && (
        <div className="fixed top-16 left-6 right-6 z-8 border border-green-400/30 bg-black/40 rounded px-3 py-1">
          <div className="text-green-400/80 font-mono text-xs tracking-widest">
            SACRED.SYS [VERSION 8.15.23]
          </div>
        </div>
      )}
      
      {isLowPerformanceMode && (
        <div className="fixed top-16 right-6 z-10 px-3 py-1 bg-amber-900/20 border border-amber-500/30 rounded text-amber-400/80 text-xs">
          Performance Mode
        </div>
      )}
    </div>
  );
};

export default HomePage;
