
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Repeat, Plus, Minus } from 'lucide-react';
import { useSequence } from '@/contexts/SequenceContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { patterns } from '@/contexts/ArtContext';

const SequenceControls: React.FC = () => {
  const {
    isPlaying,
    playSequence,
    pauseSequence,
    stopSequence,
    currentItemIndex,
    sequence,
    playbackSpeed,
    setPlaybackSpeed,
    isLooping,
    toggleLooping
  } = useSequence();
  
  const isMobile = useIsMobile();
  
  // Go to previous item in sequence
  const handlePrevious = () => {
    if (currentItemIndex > 0) {
      // Get the start time of the previous item
      const prevStartTime = sequence
        .slice(0, currentItemIndex - 1)
        .reduce((sum, item) => sum + item.duration, 0);
      
      stopSequence();
      setTimeout(() => {
        // Set position to the start of the previous item
        playSequence();
      }, 10);
    } else {
      // If at the beginning, just restart
      stopSequence();
    }
  };
  
  // Go to next item in sequence
  const handleNext = () => {
    if (currentItemIndex < sequence.length - 1) {
      // Get the start time of the next item
      const nextStartTime = sequence
        .slice(0, currentItemIndex + 1)
        .reduce((sum, item) => sum + item.duration, 0);
      
      stopSequence();
      setTimeout(() => {
        // Set position to the start of the next item
        playSequence();
      }, 10);
    }
  };
  
  // Increase/decrease playback speed
  const adjustSpeed = (delta: number) => {
    const newSpeed = Math.max(0.25, Math.min(2, playbackSpeed + delta));
    setPlaybackSpeed(newSpeed);
  };

  // Safely get pattern title with null checks
  const getCurrentPatternTitle = () => {
    if (!patterns || !sequence) return 'None';
    
    if (currentItemIndex >= 0 && 
        currentItemIndex < sequence.length && 
        sequence[currentItemIndex].patternId >= 0 &&
        sequence[currentItemIndex].patternId < patterns.length) {
      return patterns[sequence[currentItemIndex].patternId]?.title || 'Unknown Pattern';
    }
    return 'None';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className={`flex ${isMobile ? 'flex-col gap-3' : 'flex-row'} items-center justify-center mt-3`}
    >
      {/* Current pattern info */}
      <div className={`text-center ${isMobile ? 'mb-2 w-full' : 'mr-4'}`}>
        <div className="text-xs text-mystic/50">CURRENT PATTERN</div>
        <div className="text-sm text-mystic">
          {getCurrentPatternTitle()}
        </div>
      </div>
      
      {/* Main controls */}
      <div className="flex items-center justify-center gap-3">
        {/* Loop toggle */}
        <button
          onClick={toggleLooping}
          className={`p-2 rounded-full ${isLooping ? 'text-green-400 bg-green-900/30' : 'text-mystic/50 hover:text-mystic/80'}`}
        >
          <Repeat className={`${isMobile ? 'h-5 w-5' : 'h-4 w-4'}`} />
        </button>
        
        {/* Skip back */}
        <button
          onClick={handlePrevious}
          className="p-2 rounded-full text-mystic/70 hover:bg-mystic/10 hover:text-mystic"
        >
          <SkipBack className={`${isMobile ? 'h-6 w-6' : 'h-5 w-5'}`} />
        </button>
        
        {/* Play/Pause */}
        <button
          onClick={isPlaying ? pauseSequence : playSequence}
          className={`${isMobile ? 'h-12 w-12' : 'h-10 w-10'} rounded-full flex items-center justify-center ${
            isPlaying 
              ? 'bg-mystic text-mystic-dark' 
              : 'bg-mystic/20 text-mystic hover:bg-mystic/30'
          }`}
        >
          {isPlaying ? (
            <Pause className={`${isMobile ? 'h-6 w-6' : 'h-5 w-5'}`} />
          ) : (
            <Play className={`${isMobile ? 'h-6 w-6' : 'h-5 w-5'} ml-0.5`} />
          )}
        </button>
        
        {/* Skip forward */}
        <button
          onClick={handleNext}
          className="p-2 rounded-full text-mystic/70 hover:bg-mystic/10 hover:text-mystic"
        >
          <SkipForward className={`${isMobile ? 'h-6 w-6' : 'h-5 w-5'}`} />
        </button>
        
        {/* Speed control */}
        <div className="flex items-center">
          <button
            onClick={() => adjustSpeed(-0.25)}
            className="p-1 text-mystic/70 hover:text-mystic"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="mx-1 text-xs text-mystic/70 min-w-[30px] text-center">
            {playbackSpeed.toFixed(2)}x
          </span>
          <button
            onClick={() => adjustSpeed(0.25)}
            className="p-1 text-mystic/70 hover:text-mystic"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SequenceControls;
