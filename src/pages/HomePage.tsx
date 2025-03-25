
import React, { useState, useEffect } from 'react';
import ArtCanvas from '@/components/ArtCanvas';
import Controls from '@/components/Controls';
import PatternInfo from '@/components/PatternInfo';
import PatternNavigation from '@/components/PatternNavigation';
import ScreenSaverManager from '@/components/ScreenSaverManager';
import { useArt } from '@/contexts/ArtContext';
import { useAnimation } from '@/contexts/AnimationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { patterns } from '@/contexts/ArtContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Play } from 'lucide-react';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  
  // Use safe access to context
  const { 
    currentPattern = 0, 
    isControlsVisible = false,
    toggleControls = () => {},
    isTerminalMode = false,
    isAutoPlaying = false,
  } = useArt();
  
  // Animation context for screen saver
  const { isScreenSaverMode, toggleScreenSaverMode } = useAnimation();

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

  // Safe access to pattern info
  const patternInfo = patterns[currentPattern] || {
    title: "Loading...",
    description: "Please wait while we load the patterns."
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Screen Saver Manager - Always render */}
      <ScreenSaverManager />
      
      {/* Loading screen */}
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
          {/* Main Canvas - Always render */}
          <ArtCanvas />
          
          {/* UI Elements - Only render when NOT in screen saver mode */}
          {!isScreenSaverMode && (
            <>
              {/* Header */}
              <header className="absolute top-0 left-0 right-0 p-6 flex justify-center">
                <h1 className="text-white text-2xl font-light tracking-[0.3em]">
                  NEO ARTIFACTS
                </h1>
                <div className="absolute right-6 top-6 flex space-x-2">
                  <button 
                    onClick={toggleScreenSaverMode}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/20"
                    title="Screen Saver Mode"
                  >
                    <Play size={18} className="text-white/70" />
                  </button>
                  <button 
                    onClick={toggleControls}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/20"
                  >
                    <span className="text-white/70">⚙️</span>
                  </button>
                </div>
              </header>
              
              {/* Controls Panel */}
              <AnimatePresence>
                {isControlsVisible && (
                  <Controls onClose={toggleControls} />
                )}
              </AnimatePresence>
              
              {/* System Status Bar */}
              <div className={`fixed ${isMobile ? 'bottom-28' : 'bottom-6'} left-0 right-0 px-6`}>
                <div className={`mx-auto w-full ${isMobile ? 'max-w-full' : 'max-w-md'} border border-green-400/30 bg-black/60 rounded-lg px-3 py-1`}>
                  <div className="text-green-400/90 font-mono text-xs tracking-widest flex justify-between items-center">
                    <span>NEOSYS [VER 2.3]</span>
                    <span>PATTERN: {currentPattern + 1}/{patterns.length}</span>
                  </div>
                </div>
              </div>
              
              {/* Pattern Info */}
              <PatternInfo 
                title={patternInfo.title} 
                description={patternInfo.description}
                isTerminal={isTerminalMode}
                isAutoCycling={isAutoPlaying}
              />
              
              {/* Navigation Controls */}
              <PatternNavigation />
              
              {/* Terminal Mode Indicator */}
              {isTerminalMode && !isMobile && (
                <div className="absolute left-6 bottom-0 text-green-400/90 text-xs font-mono tracking-widest flex items-center">
                  <span className="w-2 h-2 bg-green-400/90 mr-2 rounded-full animate-pulse"></span>
                  TERMINAL MODE
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
