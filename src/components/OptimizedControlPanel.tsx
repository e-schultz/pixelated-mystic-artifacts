
import React from 'react';
import { motion } from 'framer-motion';
import { Slider } from "@/components/ui/slider";
import { useAnimation } from '@/contexts/AnimationContext';
import { useArt } from '@/contexts/ArtContext';
import { X, Info, Zap, EyeOff, Eye, Gauge, SkipForward } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={cn(
        "fixed z-20 bg-black/60 backdrop-blur-md border border-mystic/20 rounded-lg overflow-hidden",
        isMobile 
          ? "top-16 right-4 left-4 max-h-[calc(100vh-8rem)]" 
          : "top-20 right-6 w-72"
      )}
    >
      <div className="flex justify-between items-center p-4 border-b border-mystic/10">
        <h3 className="text-mystic text-lg font-light tracking-wider">Settings</h3>
        <button 
          onClick={onClose}
          className="text-mystic/60 hover:text-mystic transition-colors"
          aria-label="Close settings"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className={cn(
        "space-y-5 p-4",
        isMobile && "overflow-y-auto max-h-[calc(100vh-16rem)]"
      )}>
        <div className="space-y-3">
          <div className="flex items-center mb-1">
            <Gauge className="h-4 w-4 text-mystic/70 mr-2" />
            <p className="text-mystic/80 text-sm">Animation Speed</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-mystic/60 text-xs">Slow</span>
            <Slider
              value={[animationSpeed]}
              min={0.5}
              max={performanceMode ? 2 : 3} // Limit max speed on mobile
              step={0.1}
              onValueChange={handleSpeedChange}
              className="flex-1"
              aria-label="Animation speed"
            />
            <span className="text-mystic/60 text-xs">Fast</span>
          </div>
          <div className="text-center text-mystic/70 text-xs mt-1">
            {animationSpeed.toFixed(1)}x
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center mb-1">
            <SkipForward className="h-4 w-4 text-mystic/70 mr-2" />
            <p className="text-mystic/80 text-sm">Pattern Auto-Cycling</p>
          </div>
          <button
            onClick={toggleAutoCycle}
            className={`w-full py-2 border border-mystic/30 rounded text-sm text-mystic/70 hover:bg-mystic/10 hover:text-mystic transition-all ${isAutoCycling ? 'bg-mystic/20' : ''}`}
            aria-pressed={isAutoCycling}
          >
            {isAutoCycling ? 'Enabled' : 'Disabled'}
          </button>
          <div className="text-xs text-mystic/50 mt-1">
            {isAutoCycling 
              ? 'Patterns will automatically change over time' 
              : 'Use navigation buttons to change patterns'}
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center mb-1">
            {showAsciiOverlay ? (
              <Eye className="h-4 w-4 text-green-400/70 mr-2" />
            ) : (
              <EyeOff className="h-4 w-4 text-mystic/70 mr-2" />
            )}
            <p className="text-mystic/80 text-sm">ASCII Terminal Overlay</p>
          </div>
          <button
            onClick={toggleAsciiOverlay}
            className={`w-full py-2 border rounded text-sm transition-all ${showAsciiOverlay ? 'bg-green-800/30 text-green-400/90 border-green-400/30' : 'text-mystic/70 border-mystic/30 hover:bg-mystic/10 hover:text-mystic'}`}
            aria-pressed={showAsciiOverlay}
          >
            {showAsciiOverlay ? 'Enabled' : 'Disabled'}
          </button>
          <div className="text-xs text-mystic/50 mt-1">
            Adds a retro computer terminal effect
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center mb-1">
            <Zap className="h-4 w-4 text-mystic/70 mr-2" />
            <p className="text-mystic/80 text-sm">Pixelated Effect</p>
          </div>
          <button
            onClick={togglePixelated}
            className={`w-full py-2 border border-mystic/30 rounded text-sm text-mystic/70 hover:bg-mystic/10 hover:text-mystic transition-all ${isPixelated ? 'bg-mystic/20' : ''}`}
            aria-pressed={isPixelated}
          >
            {isPixelated ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        {performanceMode && (
          <div className="pt-3 border-t border-mystic/10">
            <div className="flex items-center">
              <Info className="h-4 w-4 text-amber-400/70 mr-2" />
              <p className="text-amber-400/70 text-xs">
                Performance mode active for mobile devices
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Helper function to avoid importing cn separately
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default React.memo(OptimizedControlPanel);
