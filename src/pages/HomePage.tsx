
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArtCanvas from '@/components/ArtCanvas';
import PatternInfo from '@/components/PatternInfo';
import Controls from '@/components/Controls';
import { useArt, patterns } from '@/contexts/ArtContext';

const HomePage = () => {
  const {
    currentPattern,
    nextPattern,
    prevPattern,
    isTerminalMode,
    isControlsVisible,
    toggleControls
  } = useArt();
  
  const [isLoading, setIsLoading] = useState(true);
  
  // Handle initial loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-mono">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 mb-6 border-2 border-white rounded-full flex items-center justify-center"
            >
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/70 text-sm tracking-widest"
            >
              NEO ARTIFACTS INITIALIZING
            </motion.p>
            
            <motion.pre
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-green-400/70 text-xs font-mono mt-8 max-w-[300px] text-center"
            >
{`[SYSTEM] Loading patterns
[SYSTEM] Calibrating display
[SYSTEM] Initializing generators`}
            </motion.pre>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Canvas */}
      <ArtCanvas />
      
      {/* UI Header */}
      <header className="fixed top-0 left-0 right-0 p-4 z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="text-white text-center text-xl font-light tracking-[0.2em]"
        >
          NEO ARTIFACTS
        </motion.h1>
      </header>
      
      {/* Pattern Info */}
      <PatternInfo 
        title={patterns[currentPattern].title}
        description={patterns[currentPattern].description}
      />
      
      {/* Controls Panel */}
      <AnimatePresence>
        {isControlsVisible && (
          <Controls onClose={toggleControls} />
        )}
      </AnimatePresence>
      
      {/* Navigation Controls */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex items-center space-x-4"
      >
        <button 
          onClick={prevPattern}
          className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:bg-white/10 transition-all"
          aria-label="Previous pattern"
        >
          ←
        </button>
        
        <button
          onClick={nextPattern}
          className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:bg-white/10 transition-all"
          aria-label="Next pattern"
        >
          →
        </button>
      </motion.div>
      
      {/* Controls Toggle Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        onClick={toggleControls}
        className="fixed top-4 right-4 z-10 w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white/70 hover:bg-white/10 transition-all"
        aria-label="Toggle controls"
      >
        ⚙️
      </motion.button>
      
      {/* Terminal Overlay */}
      {isTerminalMode && (
        <>
          <div className="fixed top-16 left-4 right-4 z-8 border border-green-400/30 bg-black/40 rounded px-3 py-1">
            <div className="flex justify-between items-center">
              <div className="text-green-400/80 font-mono text-xs tracking-widest">
                NEOSYS [VER 2.3.1]
              </div>
              <div className="text-green-400/60 font-mono text-xs tracking-widest">
                {`PATTERN: ${currentPattern + 1}/${patterns.length}`}
              </div>
            </div>
          </div>
          
          <pre className="fixed left-4 bottom-32 z-9 text-green-400/60 text-xs font-mono">
{`,--.   ,--. ,-----. ,-----. 
|  \\  |  | |  |__  |  |__  
|   \\ |  | |  __|| |  __|| 
|  |\\ |  | |  |___ |  |___ 
|__| \\|__| |______||______|`}
          </pre>
        </>
      )}
    </div>
  );
};

export default HomePage;
