
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
    <div className="relative w-full h-screen overflow-hidden crt-overlay bg-black">
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 mb-4"
          >
            <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/70 text-sm font-mono tracking-widest"
          >
            LOADING NEO ARTIFACTS
          </motion.p>
          
          <motion.pre
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-green-400/70 text-xs font-mono mt-8 tracking-widest px-4 text-center max-w-full overflow-x-hidden"
          >
{`[...............]\n INITIALIZING SYSTEMS\n LOADING VISUAL MATRIX\n CALIBRATING FREQUENCIES`}
          </motion.pre>
        </div>
      )}

      {/* Main Canvas */}
      <SacredGeometryCanvas />
      
      {/* NEO ARTIFACTS Header */}
      <header className="fixed top-0 left-0 right-0 p-4 sm:p-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-white text-2xl font-mono tracking-[0.2em] text-center">
            NEO ARTIFACTS
          </h1>
        </motion.div>
      </header>
      
      {/* NEOSYS Terminal Header - Only visible when ASCII overlay is on */}
      {showAsciiOverlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed top-16 left-4 right-4 sm:left-6 sm:right-6 z-8 border border-green-400/40 bg-black/40 rounded px-3 py-1"
        >
          <p className="text-green-400/90 font-mono text-xs tracking-widest">
            NEOSYS [VER 2.3]
          </p>
        </motion.div>
      )}
      
      {/* Animation Info Display */}
      <OptimizedAnimationInfo />
      
      {/* Pattern Navigation - only show if control panel isn't open */}
      {!showControlPanel && <PatternNavigation />}
      
      {/* Settings Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        onClick={toggleControlPanel}
        className="fixed top-4 sm:top-6 right-4 sm:right-6 z-10 w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all"
        aria-label="Toggle settings panel"
      >
        <Settings className="h-5 w-5" />
      </motion.button>
      
      {/* ASCII Toggle Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        onClick={toggleAsciiOverlay}
        className={`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-10 px-3 py-1.5 border rounded-full transition-all flex items-center ${
          showAsciiOverlay 
            ? 'border-green-400/50 text-green-400/90 bg-green-900/30' 
            : 'border-white/30 text-white/60 hover:bg-white/10 hover:text-white'
        }`}
      >
        <Terminal className="h-3.5 w-3.5 mr-1.5" />
        <span className="font-mono text-xs tracking-wide">
          TERMINAL {showAsciiOverlay ? 'ON' : 'OFF'}
        </span>
        {showAsciiOverlay && (
          <span className="ml-2 h-2 w-2 rounded-full bg-green-400/90 animate-pulse"></span>
        )}
      </motion.button>
      
      {/* Performance Monitor */}
      <PerformanceMonitor />
      
      {/* Settings Panel */}
      {showControlPanel && (
        <OptimizedControlPanel onClose={toggleControlPanel} />
      )}
      
      {/* ASCII Art Elements - Only shown when ASCII mode is on */}
      {showAsciiOverlay && (
        <pre className="fixed left-4 bottom-20 z-9 text-green-400/60 text-[8px] sm:text-xs font-mono">
{`
,--.    ,--.   ,--. ,---. 
|   \\ ,-'  '-. \`.' / .--'
|  . \\'-.  .-'  / | \\--. 
|  |\\  \\|  |   /| \\.-. \\
\`--' '--'   '--' '--'\`----'`}
        </pre>
      )}
    </div>
  );
};

export default HomePage;
