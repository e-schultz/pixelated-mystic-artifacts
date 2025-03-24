
import React from 'react';
import { motion } from 'framer-motion';
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useAnimation } from '@/contexts/AnimationContext';
import { useArt } from '@/contexts/ArtContext';
import { X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { patterns } from '@/contexts/ArtContext';

interface ControlPanelProps {
  onClose: () => void;
}

const OptimizedControlPanel: React.FC<ControlPanelProps> = ({ onClose }) => {
  const { 
    animationSpeed, 
    setAnimationSpeed, 
    isAutoCycling, 
    setIsAutoCycling, 
    showAsciiOverlay, 
    setShowAsciiOverlay,
    performanceMode
  } = useAnimation();

  const {
    currentPattern,
    setCurrentPattern,
    isPixelated,
    togglePixelated
  } = useArt();

  const isMobile = useIsMobile();

  // Memoized handlers
  const handleSpeedChange = React.useCallback((values: number[]) => {
    setAnimationSpeed(values[0]);
  }, [setAnimationSpeed]);

  const toggleAutoCycle = React.useCallback(() => {
    setIsAutoCycling(!isAutoCycling);
  }, [setIsAutoCycling, isAutoCycling]);

  const toggleAsciiOverlay = React.useCallback(() => {
    setShowAsciiOverlay(!showAsciiOverlay);
  }, [setShowAsciiOverlay, showAsciiOverlay]);

  const handlePatternSelect = React.useCallback((index: number) => {
    setCurrentPattern(index);
  }, [setCurrentPattern]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className={cn(
        "fixed z-20 bg-black/90 border border-white/20 rounded-lg overflow-hidden shadow-lg",
        isMobile 
          ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[350px]" 
          : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px]"
      )}
    >
      <div className="flex justify-between items-center p-4 border-b border-white/10">
        <h3 className="text-white text-lg font-mono">Controls</h3>
        <button 
          onClick={onClose}
          className="text-white/60 hover:text-white transition-colors"
          aria-label="Close settings"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="p-5 space-y-6">
        <div>
          <p className="text-white/90 font-mono mb-3">Pattern</p>
          <div className="grid grid-cols-3 gap-2">
            {patterns.map((pattern, index) => (
              <button
                key={pattern.id}
                onClick={() => handlePatternSelect(index)}
                className={`aspect-square border flex items-center justify-center text-lg font-mono
                  ${currentPattern === index 
                    ? 'border-white text-white bg-white/10' 
                    : 'border-white/30 text-white/50 hover:border-white/50 hover:text-white/70'
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-white/90 font-mono">
            Speed: {animationSpeed.toFixed(1)}x
          </p>
          <Slider
            value={[animationSpeed]}
            min={0.5}
            max={performanceMode ? 2 : 3}
            step={0.1}
            onValueChange={handleSpeedChange}
            className="w-full"
            aria-label="Animation speed"
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white/90 font-mono">Auto Play</span>
            <Switch 
              checked={isAutoCycling} 
              onCheckedChange={toggleAutoCycle}
              className="data-[state=checked]:bg-white/70 data-[state=unchecked]:bg-white/20"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-white/90 font-mono">Pixelated</span>
            <Switch 
              checked={isPixelated} 
              onCheckedChange={togglePixelated}
              className="data-[state=checked]:bg-white/70 data-[state=unchecked]:bg-white/20"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-white/90 font-mono">Terminal</span>
            <Switch 
              checked={showAsciiOverlay} 
              onCheckedChange={toggleAsciiOverlay}
              className="data-[state=checked]:bg-green-400/70 data-[state=unchecked]:bg-white/20"
            />
          </div>
        </div>
        
        <div className="pt-4 border-t border-white/10">
          <p className="text-white/50 text-center font-mono text-sm">
            Neo Artifacts v1.0.0
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Helper function to avoid importing cn separately
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default React.memo(OptimizedControlPanel);
