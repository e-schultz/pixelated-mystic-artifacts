
import React from 'react';
import { motion } from 'framer-motion';
import { Slider } from "@/components/ui/slider";
import { useAnimation } from '@/context/AnimationContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { X } from 'lucide-react';

interface ControlPanelProps {
  onClose: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onClose }) => {
  const { state, dispatch } = useAnimation();
  const { animationSpeed, isAutoCycling, showAsciiOverlay } = state;
  const isMobile = useIsMobile();

  const handleSpeedChange = (values: number[]) => {
    dispatch({ type: 'SET_ANIMATION_SPEED', payload: values[0] });
  };

  const toggleAutoCycling = () => {
    dispatch({ type: 'TOGGLE_AUTO_CYCLING' });
  };

  const toggleAsciiOverlay = () => {
    dispatch({ type: 'TOGGLE_ASCII_OVERLAY' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed z-20 inset-x-4 bottom-20 bg-black/70 backdrop-blur-md border border-mystic/20 rounded-lg p-4`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-mystic text-base font-light tracking-wider">Settings</h3>
        <button 
          onClick={onClose}
          className="text-mystic/60 hover:text-mystic transition-colors p-1"
          aria-label="Close settings"
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-mystic/80 text-sm">Animation Speed</p>
          <div className="flex items-center space-x-3">
            <span className="text-mystic/60 text-xs">Slow</span>
            <Slider
              value={[animationSpeed]}
              min={0.5}
              max={2}
              step={0.1}
              onValueChange={handleSpeedChange}
              className="flex-1"
            />
            <span className="text-mystic/60 text-xs">Fast</span>
          </div>
          <div className="text-center text-mystic/70 text-xs mt-1">
            {animationSpeed.toFixed(1)}x
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-mystic/80 text-sm">Auto-Cycling</p>
          <button
            onClick={toggleAutoCycling}
            className={`w-full py-2 border border-mystic/30 rounded text-sm text-mystic/70 hover:bg-mystic/10 hover:text-mystic transition-all ${isAutoCycling ? 'bg-mystic/20' : ''}`}
          >
            {isAutoCycling ? 'Enabled' : 'Disabled'}
          </button>
        </div>
        
        {!isMobile && (
          <div className="space-y-2">
            <p className="text-mystic/80 text-sm">ASCII Overlay</p>
            <button
              onClick={toggleAsciiOverlay}
              className={`w-full py-2 border border-mystic/30 rounded text-sm text-mystic/70 hover:bg-mystic/10 hover:text-mystic transition-all ${showAsciiOverlay ? 'bg-green-800/30 text-green-400/90 border-green-400/30' : ''}`}
            >
              {showAsciiOverlay ? 'Enabled' : 'Disabled'}
            </button>
            <div className="text-xs text-mystic/50 mt-1">
              Adds a retro computer terminal effect
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ControlPanel;
