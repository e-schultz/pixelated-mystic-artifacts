
import React from 'react';
import { motion } from 'framer-motion';
import { Slider } from "@/components/ui/slider";

interface ControlPanelProps {
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
  isAutoCycling: boolean;
  setIsAutoCycling: (isAuto: boolean) => void;
  showAsciiOverlay: boolean;
  setShowAsciiOverlay: (showAscii: boolean) => void;
  onClose: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  animationSpeed,
  setAnimationSpeed,
  isAutoCycling,
  setIsAutoCycling,
  showAsciiOverlay,
  setShowAsciiOverlay,
  onClose
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="fixed top-20 right-6 z-20 w-72 bg-black/60 backdrop-blur-md border border-mystic/20 rounded-lg p-5"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-mystic text-lg font-light tracking-wider">Settings</h3>
        <button 
          onClick={onClose}
          className="text-mystic/60 hover:text-mystic transition-colors"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-mystic/80 text-sm">Animation Speed</p>
          <div className="flex items-center space-x-4">
            <span className="text-mystic/60 text-xs">Slow</span>
            <Slider
              value={[animationSpeed]}
              min={0.5}
              max={3}
              step={0.1}
              onValueChange={(values) => setAnimationSpeed(values[0])}
              className="flex-1"
            />
            <span className="text-mystic/60 text-xs">Fast</span>
          </div>
          <div className="text-center text-mystic/70 text-xs mt-1">
            {animationSpeed.toFixed(1)}x
          </div>
        </div>
        
        <div className="space-y-3">
          <p className="text-mystic/80 text-sm">Auto-Cycling</p>
          <button
            onClick={() => setIsAutoCycling(!isAutoCycling)}
            className={`w-full py-2 border border-mystic/30 rounded text-sm text-mystic/70 hover:bg-mystic/10 hover:text-mystic transition-all ${isAutoCycling ? 'bg-mystic/20' : ''}`}
          >
            {isAutoCycling ? 'Enabled' : 'Disabled'}
          </button>
        </div>
        
        <div className="space-y-3">
          <p className="text-mystic/80 text-sm">ASCII Terminal Overlay</p>
          <button
            onClick={() => setShowAsciiOverlay(!showAsciiOverlay)}
            className={`w-full py-2 border border-mystic/30 rounded text-sm text-mystic/70 hover:bg-mystic/10 hover:text-mystic transition-all ${showAsciiOverlay ? 'bg-green-800/30 text-green-400/90 border-green-400/30' : ''}`}
          >
            {showAsciiOverlay ? 'Enabled' : 'Disabled'}
          </button>
          <div className="text-xs text-mystic/50 mt-1">
            Adds a retro computer terminal effect
          </div>
        </div>
        
        <div className="pt-3 border-t border-mystic/10">
          <p className="text-mystic/60 text-xs">
            Use arrow buttons below to manually navigate between patterns.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ControlPanel;
