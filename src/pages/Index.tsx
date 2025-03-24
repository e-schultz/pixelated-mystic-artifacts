import React, { useState, useEffect } from 'react';
import SacredGeometryCanvas from '@/components/SacredGeometryCanvas';
import AnimationInfo from '@/components/AnimationInfo';
import ControlPanel from '@/components/ControlPanel';
import { animations } from '@/data/animationData';
import { motion } from 'framer-motion';

const Index = () => {
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [showControlPanel, setShowControlPanel] = useState(false);
  const [showAsciiOverlay, setShowAsciiOverlay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isAutoCycling) {
      const cycleTime = 10000 / animationSpeed;
      const intervalId = setInterval(() => {
        setCurrentAnimation((prev) => (prev + 1) % animations.length);
      }, cycleTime);
      
      return () => clearInterval(intervalId);
    }
  }, [isAutoCycling, animationSpeed, animations.length]);

  const handlePrevAnimation = () => {
    setCurrentAnimation((prev) => (prev - 1 + animations.length) % animations.length);
  };

  const handleNextAnimation = () => {
    setCurrentAnimation((prev) => (prev + 1) % animations.length);
  };

  const toggleControlPanel = () => {
    setShowControlPanel(prev => !prev);
  };

  useEffect(() => {
    if (showAsciiOverlay) {
      console.log(`
,---.   .--.   .---. ,--. ,-. 
|    \\  |  |   | .-' | .--' | 
|  ,  \\ |  |   | \`-. | |    | 
|  |\\  \\|  |   | .-' | |    | 
|  | \\  '  '--.|  \`--' \`--. | 
\`--'  \`--\`-----'\`------\`---' ' 
.---.   ,---.  ,--.  ,---.   
| .-.\\ /  .-. ) |  | /  .-'  
| |-' )| ('-. \\ |  || \`--.   
| |--' |  --. ) |  ||.--.    
| |    /  '--'  |  ||  --'   
)('    \`------' \`--' \`----'  
                               
      `);
    }
  }, [showAsciiOverlay]);

  return (
    <div className="relative w-full h-screen overflow-hidden crt-overlay">
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
            className="text-green-400/70 text-xs font-mono mt-8 tracking-widest"
          >
{`[...............]\n INITIALIZING SACRED GEOMETRY\n LOADING VISUAL MATRIX\n CALIBRATING MYSTIC FREQUENCIES`}
          </motion.pre>
        </div>
      )}

      <SacredGeometryCanvas 
        currentAnimation={currentAnimation}
        animationSpeed={animationSpeed}
        showAsciiOverlay={showAsciiOverlay}
      />
      
      <header className="fixed top-0 left-0 right-0 p-6 z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="text-mystic text-2xl font-light tracking-[0.2em] text-center"
        >
          PIXELATED MYSTIC ARTIFACTS
        </motion.h1>
      </header>
      
      <AnimationInfo
        title={animations[currentAnimation].title}
        description={animations[currentAnimation].description}
        isAutoCycling={isAutoCycling}
        showAsciiOverlay={showAsciiOverlay}
      />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex items-center space-x-4"
      >
        <button 
          onClick={handlePrevAnimation}
          className="w-10 h-10 rounded-full border border-mystic/30 flex items-center justify-center text-mystic/70 hover:bg-mystic/10 hover:text-mystic transition-all"
        >
          ←
        </button>
        <button
          onClick={() => setIsAutoCycling(!isAutoCycling)}
          className={`px-4 py-1 border border-mystic/30 rounded-full text-xs text-mystic/70 hover:bg-mystic/10 hover:text-mystic transition-all ${isAutoCycling ? 'bg-mystic/20' : ''}`}
        >
          {isAutoCycling ? 'AUTO' : 'MANUAL'}
        </button>
        <button 
          onClick={handleNextAnimation}
          className="w-10 h-10 rounded-full border border-mystic/30 flex items-center justify-center text-mystic/70 hover:bg-mystic/10 hover:text-mystic transition-all"
        >
          →
        </button>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-10 flex items-center space-x-3"
      >
        <button
          onClick={() => setShowAsciiOverlay(!showAsciiOverlay)}
          className={`flex items-center justify-center px-3 py-1 text-xs border rounded-full transition-all ${
            showAsciiOverlay 
              ? 'border-green-400/50 text-green-400/90 bg-green-900/30' 
              : 'border-mystic/30 text-mystic/60 hover:bg-mystic/10 hover:text-mystic'
          }`}
        >
          <span className="font-mono tracking-wide">
            {showAsciiOverlay ? 'ASCII ON' : 'ASCII'}
          </span>
          {showAsciiOverlay && (
            <span className="ml-2 h-2 w-2 rounded-full bg-green-400/90 animate-pulse"></span>
          )}
        </button>
        
        <p className="text-mystic/50 text-xs">
          sacred geometry {new Date().getFullYear()}
        </p>
      </motion.div>
      
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        onClick={toggleControlPanel}
        className="fixed top-6 right-6 z-10 w-10 h-10 border border-mystic/30 rounded-full flex items-center justify-center text-mystic/70 hover:bg-mystic/10 hover:text-mystic transition-all"
      >
        ⚙️
      </motion.button>
      
      {showControlPanel && (
        <ControlPanel 
          animationSpeed={animationSpeed}
          setAnimationSpeed={setAnimationSpeed}
          isAutoCycling={isAutoCycling}
          setIsAutoCycling={setIsAutoCycling}
          showAsciiOverlay={showAsciiOverlay}
          setShowAsciiOverlay={setShowAsciiOverlay}
          onClose={toggleControlPanel}
        />
      )}
      
      {showAsciiOverlay && (
        <>
          <div className="fixed top-16 left-6 right-6 z-8 border border-green-400/30 bg-black/40 rounded px-3 py-1">
            <div className="flex justify-between items-center">
              <div className="text-green-400/80 font-mono text-xs tracking-widest">
                MYSTIC.SYS [VERSION 8.15.23]
              </div>
              <div className="text-green-400/60 font-mono text-xs tracking-widest">
                {`${currentAnimation + 1}/${animations.length} | ${animationSpeed.toFixed(1)}X`}
              </div>
            </div>
          </div>
          
          <pre className="fixed left-6 bottom-32 z-9 text-green-400/60 text-xs font-mono">
{`,--.    ,--.   ,--. ,---.,---.  ,--.  ,---.  
|   \\ ,-'  '-. \`.' |/ .--' ,-. \\ |  | /  .-'  
|  . \\'-.  .-'  /  || \\--. | | | |\`-'' \`--.   
|  |\\  \\|  |   /|  |\\.-. \\' | | |,--.  .-'   
\`--' '--'   '--' '--'\`----' -----'/\`--' \`----'`}
          </pre>
        </>
      )}
    </div>
  );
};

export default Index;
