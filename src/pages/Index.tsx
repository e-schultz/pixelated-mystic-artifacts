
import React, { useState, useEffect } from 'react';
import SacredGeometryCanvas from '@/components/SacredGeometryCanvas';
import AnimationInfo from '@/components/AnimationInfo';
import ControlPanel from '@/components/ControlPanel';
import { animations } from '@/data/animationData';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Settings, Zap } from 'lucide-react';

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
    <div className="relative w-full h-screen overflow-hidden perspective-1000">
      {isLoading && (
        <div className="fixed inset-0 bg-gradient-to-br from-black to-blue-950 flex flex-col items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="w-20 h-20 mb-6 relative"
          >
            <div className="absolute inset-0 w-20 h-20 border-2 border-t-blue-400 border-r-indigo-500 border-b-purple-600 border-l-cyan-400 rounded-full flex items-center justify-center animate-spin-slow opacity-75"></div>
            <div className="absolute inset-0 w-20 h-20 border-2 border-cyan-400 rounded-full flex items-center justify-center animate-pulse-subtle"></div>
            <div className="absolute inset-2 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-500/50"></div>
            </div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-cyan-300 text-sm tracking-[0.25em] font-light"
          >
            INITIALIZING NEURAL MATRIX
          </motion.p>
          
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "220px", opacity: 1 }}
            transition={{ delay: 0.7, duration: 1.5 }}
            className="h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 mt-6 rounded-full"
          />
          
          <motion.pre
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-cyan-400/70 text-xs font-mono mt-8 tracking-widest"
          >
{`[///////////////////]\n> CALIBRATING SACRED ALGORITHMS\n> LOADING QUANTUM VISUALS\n> SYNCHRONIZING DIMENSIONAL MATRIX`}
          </motion.pre>
        </div>
      )}

      <SacredGeometryCanvas 
        currentAnimation={currentAnimation}
        animationSpeed={animationSpeed}
        showAsciiOverlay={showAsciiOverlay}
      />
      
      <header className="fixed top-0 left-0 right-0 p-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="w-full flex justify-center"
        >
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 text-2xl font-light tracking-[0.2em] text-center px-6 py-2 backdrop-blur-sm rounded-full border border-white/10">
            SACRED GEOMETRY MATRIX
          </h1>
        </motion.div>
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
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex items-center space-x-6"
      >
        <button 
          onClick={handlePrevAnimation}
          className="w-12 h-12 rounded-full flex items-center justify-center text-cyan-300 hover:text-cyan-100 transition-all neo-blur group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
        
        <button
          onClick={() => setIsAutoCycling(!isAutoCycling)}
          className={`px-5 py-1.5 rounded-full text-xs tracking-wider transition-all neo-blur ${
            isAutoCycling 
              ? 'text-cyan-300 border border-cyan-500/30' 
              : 'text-white/70 border border-white/10'
          }`}
        >
          {isAutoCycling ? 'AUTO-SYNC' : 'MANUAL'}
          {isAutoCycling && (
            <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          )}
        </button>
        
        <button 
          onClick={handleNextAnimation}
          className="w-12 h-12 rounded-full flex items-center justify-center text-cyan-300 hover:text-cyan-100 transition-all neo-blur group"
        >
          <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        className="fixed bottom-8 right-8 z-10 flex items-center space-x-4"
      >
        <button
          onClick={() => setShowAsciiOverlay(!showAsciiOverlay)}
          className={`flex items-center justify-center px-4 py-1.5 text-xs rounded-full transition-all ${
            showAsciiOverlay 
              ? 'border border-green-400/30 text-green-400/90 bg-black/40 backdrop-blur-md' 
              : 'neo-blur text-white/70 hover:text-white'
          }`}
        >
          <Zap className={`w-3.5 h-3.5 mr-1.5 ${showAsciiOverlay ? 'text-green-400' : 'text-white/70'}`} />
          <span className="font-mono tracking-wide">
            {showAsciiOverlay ? 'QUANTUM MODE' : 'QUANTUM'}
          </span>
          {showAsciiOverlay && (
            <span className="ml-2 h-1.5 w-1.5 rounded-full bg-green-400/90 animate-pulse"></span>
          )}
        </button>
        
        <p className="text-white/40 text-xs">
          sacred.io {new Date().getFullYear()}
        </p>
      </motion.div>
      
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        onClick={toggleControlPanel}
        className="fixed top-8 right-8 z-10 w-12 h-12 neo-blur rounded-full flex items-center justify-center text-cyan-300 hover:text-cyan-100 transition-all"
      >
        <Settings className="w-5 h-5" />
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
          <div className="fixed top-20 left-8 right-8 z-8 border border-green-400/20 bg-black/50 backdrop-blur-md rounded-md px-4 py-2">
            <div className="flex justify-between items-center">
              <div className="text-green-400/90 font-mono text-xs tracking-widest">
                QUANTUM.SYS [VERSION 23.07.15]
              </div>
              <div className="text-green-400/70 font-mono text-xs tracking-widest">
                {`PATTERN ${currentAnimation + 1}/${animations.length} | SYNC ${animationSpeed.toFixed(1)}X`}
              </div>
            </div>
          </div>
          
          <pre className="fixed left-8 bottom-32 z-9 text-green-400/70 text-xs font-mono">
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
