
import React, { useState, useEffect } from 'react';
import UnifiedCanvasManager from '@/components/geometry/UnifiedCanvasManager';
import UnifiedControlPanel from '@/components/UnifiedControlPanel';
import AnimationInfoPanel from '@/components/AnimationInfoPanel';
import { useVisualization } from '@/contexts/VisualizationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import UnifiedPatternNavigation from '@/components/UnifiedPatternNavigation';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const { 
    currentPattern, 
    handleNextPattern, 
    handlePrevPattern,
    isControlsVisible,
    toggleControlsVisibility,
    showAsciiOverlay,
    isAutoCycling,
    getCurrentPatternInfo
  } = useVisualization();

  // Simulate loading for visual effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    
    return () => clearTimeout(timer);
  }, []);

  // Track current pattern changes for debugging
  useEffect(() => {
    console.log('HomePage: Current pattern is', currentPattern);
  }, [currentPattern]);

  // Get current pattern info
  const patternInfo = getCurrentPatternInfo();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50">
          <div className="w-16 h-16 mb-8 border-2 border-white/50 border-t-white/90 rounded-full animate-spin"></div>
          <h1 className="text-white text-xl tracking-[0.5em] font-light">
            LOADING
          </h1>
          <div className="mt-12 w-64 h-8 border border-white/20 overflow-hidden">
            <div className="h-full bg-white/10 animate-pulse"></div>
          </div>
        </div>
      ) : (
        <>
          {/* Main Canvas */}
          <UnifiedCanvasManager className="absolute inset-0 z-0" />
          
          {/* Header */}
          <header className="absolute top-0 left-0 right-0 p-6 flex justify-center">
            <h1 className="text-white text-2xl font-light tracking-[0.3em]">
              NEO ARTIFACTS
            </h1>
            <button 
              onClick={toggleControlsVisibility}
              className="absolute right-6 top-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/20"
            >
              <span className="text-white/70">⚙️</span>
            </button>
          </header>
          
          {/* Controls Panel */}
          <AnimatePresence>
            {isControlsVisible && (
              <UnifiedControlPanel onClose={toggleControlsVisibility} />
            )}
          </AnimatePresence>
          
          {/* Pattern Navigation */}
          <UnifiedPatternNavigation />
          
          {/* Pattern Info Panel */}
          <AnimationInfoPanel />
          
          {/* System Status Bar */}
          <div className="absolute bottom-6 left-0 right-0 px-6">
            <div className={`mx-auto w-full ${isMobile ? 'max-w-full' : 'max-w-md'} border border-green-400/30 bg-black/60 rounded-lg px-3 py-1`}>
              <div className="text-green-400/90 font-mono text-xs tracking-widest flex justify-between items-center">
                <span>NEOSYS [VER 2.3]</span>
                {isMobile && (
                  <span>PATTERN: {currentPattern + 1}</span>
                )}
              </div>
            </div>
            
            {/* Terminal Mode Indicator */}
            {showAsciiOverlay && !isMobile && (
              <div className="absolute left-6 bottom-0 text-green-400/90 text-xs font-mono tracking-widest flex items-center">
                <span className="w-2 h-2 bg-green-400/90 mr-2 rounded-full animate-pulse"></span>
                TERMINAL MODE
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
