
import React, { useState, useEffect } from 'react';
import SacredGeometryCanvas from '@/components/SacredGeometryCanvas';
import OptimizedAnimationInfo from '@/components/OptimizedAnimationInfo';
import OptimizedControlPanel from '@/components/OptimizedControlPanel';
import PatternNavigation from '@/components/PatternNavigation';
import PatternSequencer from '@/components/PatternSequencer';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import { useAnimation } from '@/contexts/AnimationContext';
import { useArt } from '@/contexts/ArtContext';
import { patterns } from '@/contexts/ArtContext';
import { animations } from '@/data/animationData';
import { motion } from 'framer-motion';
import { Settings, Terminal } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showControlPanel, setShowControlPanel] = useState(false);
  const isMobile = useIsMobile();
  
  const {
    currentAnimation,
    isAutoCycling,
    animationSpeed,
    showAsciiOverlay,
    setShowAsciiOverlay,
    performanceMode
  } = useAnimation();

  const { currentPattern } = useArt();
  
  // Safety checks for animations length
  const animationsLength = animations?.length || 0;
  const currentAnimationIndex = currentAnimation >= 0 && currentAnimation < animationsLength ? currentAnimation : 0;
  
  // Safety checks for patterns
  const patternsArray = patterns || [];
  const currentPatternData = patternsArray[currentPattern] || { title: "Unknown Pattern" };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, performanceMode ? 1000 : 1500);

    return () => clearTimeout(timer);
  }, [performanceMode]);

  const toggleControlPanel = () => {
    setShowControlPanel(prev => !prev);
  };

  const toggleAsciiOverlay = () => {
    setShowAsciiOverlay(!showAsciiOverlay);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden crt-overlay">
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-mystic-dark flex flex-col items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 mb-4"
          >
            <div className="w-16 h-16 border-2 border-mystic rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-mystic rounded-full animate-pulse"></div>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-mystic/70 text-sm tracking-widest"
          >
            LOADING MYSTIC ARTIFACTS
          </motion.p>
          
          <motion.pre
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-green-400/70 text-xs font-mono mt-8 tracking-widest px-4 text-center max-w-full overflow-x-hidden"
          >
{`[...............]\n INITIALIZING SACRED GEOMETRY\n LOADING VISUAL MATRIX\n CALIBRATING MYSTIC FREQUENCIES`}
          </motion.pre>
        </div>
      )}

      {/* Main Canvas */}
      <SacredGeometryCanvas />
      
      {/* Header - Responsive adjustments */}
      <header className="fixed top-0 left-0 right-0 p-4 sm:p-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-mystic text-xl sm:text-2xl font-light tracking-[0.2em] text-center">
            PIXELATED MYSTIC ARTIFACTS
          </h1>
          {!isLoading && (
            <p className="text-mystic/50 text-xs mt-2">
              {currentPatternData.title}
            </p>
          )}
        </motion.div>
      </header>
      
      {/* Animation Info Display - Responsive sizing */}
      <OptimizedAnimationInfo className={isMobile ? "mx-4 max-w-[calc(100%-2rem)]" : ""} />
      
      {/* Pattern Navigation and Sequencer */}
      <PatternNavigation />
      <PatternSequencer />
      
      {/* Bottom Information - Responsive adjustments */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-10 flex items-center space-x-3"
      >
        <button
          onClick={toggleAsciiOverlay}
          className={`flex items-center justify-center px-3 py-1 text-xs border rounded-full transition-all ${
            showAsciiOverlay 
              ? 'border-green-400/50 text-green-400/90 bg-green-900/30' 
              : 'border-mystic/30 text-mystic/60 hover:bg-mystic/10 hover:text-mystic'
          }`}
          aria-pressed={showAsciiOverlay}
        >
          <Terminal className="h-3 w-3 mr-1" />
          <span className="font-mono tracking-wide">
            {showAsciiOverlay ? 'ASCII ON' : 'ASCII'}
          </span>
          {showAsciiOverlay && (
            <span className="ml-2 h-2 w-2 rounded-full bg-green-400/90 animate-pulse"></span>
          )}
        </button>
        
        <p className="text-mystic/50 text-xs hidden sm:block">
          sacred geometry {new Date().getFullYear()}
        </p>
      </motion.div>
      
      {/* Settings Button - Responsive position */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        onClick={toggleControlPanel}
        className="fixed top-4 sm:top-6 right-4 sm:right-6 z-10 w-10 h-10 border border-mystic/30 rounded-full flex items-center justify-center text-mystic/70 hover:bg-mystic/10 hover:text-mystic transition-all"
        aria-label="Toggle settings panel"
      >
        <Settings className="h-5 w-5" />
      </motion.button>
      
      {/* Performance Monitor */}
      <PerformanceMonitor />
      
      {/* Settings Panel */}
      {showControlPanel && (
        <OptimizedControlPanel onClose={toggleControlPanel} />
      )}
      
      {/* ASCII Overlay Elements - Mobile responsive */}
      {showAsciiOverlay && (
        <>
          <div className="fixed top-16 left-4 right-4 sm:left-6 sm:right-6 z-8 border border-green-400/30 bg-black/40 rounded px-3 py-1">
            <div className="flex justify-between items-center">
              <div className="text-green-400/80 font-mono text-[10px] sm:text-xs tracking-widest truncate">
                MYSTIC.SYS [VERSION 8.15.23]
              </div>
              <div className="text-green-400/60 font-mono text-[10px] sm:text-xs tracking-widest truncate ml-2">
                {`${currentPatternData.title} | ${animationSpeed.toFixed(1)}X`}
              </div>
            </div>
          </div>
          
          <pre className="fixed left-4 sm:left-6 bottom-24 sm:bottom-32 z-9 text-green-400/60 text-[8px] sm:text-xs font-mono hidden sm:block">
{`,--.    ,--.   ,--. ,---.,---.  ,--.  ,---.  
|   \\ ,-'  '-. \`.' |/ .--' ,-. \\ |  | /  .-'  
|  . \\'-.  .-'  /  || \\--. | | | |\`-'' \`--.   
|  |\\  \\|  |   /|  |\\.-. \\' | | |,--.  .-'   
\`--' '--'   '--' '--'\`----' -----'/\`--' \`----'`}
          </pre>
          
          {/* Mobile version of ASCII art */}
          <pre className="fixed left-4 bottom-24 z-9 text-green-400/60 text-[8px] font-mono sm:hidden">
{`,--.    ,--.   ,--.,---. 
|   \\ ,-'  '-. \`.' / .--'
|  . \\'-.  .-'  / | \\--. 
|  |\\  \\|  |   /| \\.-. \\
\`--' '--'   '--' '--'\`----'`}
          </pre>
        </>
      )}
      
      {/* Performance Mode Indicator - Responsive position */}
      {performanceMode && (
        <div className="fixed top-16 right-4 sm:right-6 z-10 px-3 py-1 bg-amber-900/20 border border-amber-500/30 rounded text-amber-400/80 text-[10px] sm:text-xs">
          Performance Mode
        </div>
      )}
    </div>
  );
};

export default HomePage;
