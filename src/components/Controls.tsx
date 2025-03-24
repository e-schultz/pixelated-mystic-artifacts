
import React from 'react';
import { motion } from 'framer-motion';
import { Slider } from "@/components/ui/slider";
import { useArt } from '@/contexts/ArtContext';

interface ControlsProps {
  onClose: () => void;
}

const Controls: React.FC<ControlsProps> = ({ onClose }) => {
  const { 
    speed, 
    setSpeed, 
    isAutoPlaying, 
    toggleAutoPlay, 
    isTerminalMode, 
    toggleTerminalMode,
    isPixelated,
    togglePixelated,
    isLowPerformanceMode
  } = useArt();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="fixed top-20 right-6 z-20 w-72 bg-black/60 backdrop-blur-md border border-white/20 rounded-lg p-5"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white text-lg font-light tracking-wider">Settings</h3>
        <button 
          onClick={onClose}
          className="text-white/60 hover:text-white transition-colors"
          aria-label="Close settings"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-white/80 text-sm">Animation Speed</p>
          <div className="flex items-center space-x-4">
            <span className="text-white/60 text-xs">Slow</span>
            <Slider
              value={[speed]}
              min={0.5}
              max={isLowPerformanceMode ? 2 : 3}
              step={0.1}
              onValueChange={(values) => setSpeed(values[0])}
              className="flex-1"
            />
            <span className="text-white/60 text-xs">Fast</span>
          </div>
          <div className="text-center text-white/70 text-xs mt-1">
            {speed.toFixed(1)}x
          </div>
        </div>
        
        <div className="space-y-3">
          <p className="text-white/80 text-sm">Auto-Cycling</p>
          <button
            onClick={toggleAutoPlay}
            className={`w-full py-2 border border-white/30 rounded text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all ${isAutoPlaying ? 'bg-white/20' : ''}`}
          >
            {isAutoPlaying ? 'Enabled' : 'Disabled'}
          </button>
        </div>
        
        <div className="space-y-3">
          <p className="text-white/80 text-sm">Terminal Overlay</p>
          <button
            onClick={toggleTerminalMode}
            className={`w-full py-2 border border-white/30 rounded text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all ${isTerminalMode ? 'bg-green-800/30 text-green-400/90 border-green-400/30' : ''}`}
          >
            {isTerminalMode ? 'Enabled' : 'Disabled'}
          </button>
          <div className="text-xs text-white/50 mt-1">
            Adds a retro computer terminal effect
          </div>
        </div>
        
        <div className="space-y-3">
          <p className="text-white/80 text-sm">Pixelated Mode</p>
          <button
            onClick={togglePixelated}
            className={`w-full py-2 border border-white/30 rounded text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all ${isPixelated ? 'bg-white/20' : ''}`}
          >
            {isPixelated ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        {isLowPerformanceMode && (
          <div className="pt-3 border-t border-white/10">
            <p className="text-amber-400/70 text-xs">
              Performance mode active for mobile devices
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Controls;
