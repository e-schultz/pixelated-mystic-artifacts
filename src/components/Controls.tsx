
import React from 'react';
import { motion } from 'framer-motion';
import { useArt } from '@/contexts/ArtContext';
import { patterns } from '@/contexts/ArtContext';

interface ControlsProps {
  onClose: () => void;
}

const Controls: React.FC<ControlsProps> = ({ onClose }) => {
  const {
    currentPattern,
    setCurrentPattern,
    speed,
    setSpeed,
    isTerminalMode,
    toggleTerminalMode,
    isPixelated,
    togglePixelated,
    isAutoPlaying,
    toggleAutoPlay
  } = useArt();
  
  const handlePatternSelect = (index: number) => {
    console.log(`Selecting pattern ${index}`);
    setCurrentPattern(index);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-16 right-4 z-20 w-64 bg-black/80 border border-white/20 rounded-lg p-4 backdrop-blur-sm"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-sm font-light tracking-wider">Controls</h3>
        <button 
          onClick={onClose}
          className="text-white/70 hover:text-white"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-4">
        {/* Pattern selection */}
        <div>
          <label className="block text-white/70 text-xs mb-2">Pattern</label>
          <div className="grid grid-cols-3 gap-2">
            {patterns.map((pattern, index) => (
              <button
                key={pattern.id}
                onClick={() => handlePatternSelect(index)}
                className={`
                  w-full aspect-square border
                  flex items-center justify-center text-xs
                  hover:bg-white/10 transition-colors
                  ${currentPattern === index 
                    ? 'border-white text-white' 
                    : 'border-white/30 text-white/50'
                  }
                `}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        
        {/* Speed control */}
        <div>
          <label className="block text-white/70 text-xs mb-2">
            Speed: {speed.toFixed(1)}x
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-full accent-white/70"
          />
        </div>
        
        {/* Toggle options */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-white/70 text-xs">Auto Play</label>
            <button
              onClick={toggleAutoPlay}
              className={`w-10 h-5 rounded-full flex items-center ${
                isAutoPlaying ? 'bg-white/70 justify-end' : 'bg-white/20 justify-start'
              }`}
            >
              <span className="block w-4 h-4 rounded-full bg-white mx-0.5"></span>
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-white/70 text-xs">Pixelated</label>
            <button
              onClick={togglePixelated}
              className={`w-10 h-5 rounded-full flex items-center ${
                isPixelated ? 'bg-white/70 justify-end' : 'bg-white/20 justify-start'
              }`}
            >
              <span className="block w-4 h-4 rounded-full bg-white mx-0.5"></span>
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-white/70 text-xs">Terminal</label>
            <button
              onClick={toggleTerminalMode}
              className={`w-10 h-5 rounded-full flex items-center ${
                isTerminalMode ? 'bg-green-400/70 justify-end' : 'bg-white/20 justify-start'
              }`}
            >
              <span className="block w-4 h-4 rounded-full bg-white mx-0.5"></span>
            </button>
          </div>
        </div>
        
        <div className="pt-2 border-t border-white/10">
          <p className="text-white/50 text-xs text-center">
            Neo Artifacts v1.0.0
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Controls;
