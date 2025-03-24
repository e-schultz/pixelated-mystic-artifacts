
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSequence } from '@/contexts/SequenceContext';
import { useArt } from '@/contexts/ArtContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { patterns } from '@/contexts/ArtContext';

const PatternTimeline: React.FC = () => {
  const { 
    sequence,
    currentPosition,
    currentItemIndex,
    isPlaying,
    setPlaybackPosition,
    getTotalDuration
  } = useSequence();
  
  const isMobile = useIsMobile();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [timelineWidth, setTimelineWidth] = useState(0);
  
  // Calculate total duration only when sequence changes
  const totalDuration = getTotalDuration();
  
  // Update timeline width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (timelineRef.current) {
        setTimelineWidth(timelineRef.current.clientWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  
  // Calculate position percentage along the timeline
  const positionPercentage = totalDuration > 0 
    ? (currentPosition / totalDuration) * 100 
    : 0;
  
  // Handler for when user clicks or touches the timeline
  const handleTimelineClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      let clientX: number;
      
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
      } else {
        clientX = e.clientX;
      }
      
      const clickPositionX = clientX - rect.left;
      const percentClicked = clickPositionX / rect.width;
      const newPosition = percentClicked * totalDuration;
      
      setPlaybackPosition(Math.max(0, Math.min(newPosition, totalDuration)));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="w-full px-3 md:px-6"
    >
      <div className="mb-1 flex justify-between text-xs text-mystic/50">
        <span>0:00</span>
        <span>{Math.floor(totalDuration / 60)}:{(totalDuration % 60).toString().padStart(2, '0')}</span>
      </div>
      
      {/* Main timeline container */}
      <div 
        ref={timelineRef}
        className="relative h-10 bg-black/30 rounded-lg border border-mystic/10 overflow-hidden cursor-pointer"
        onClick={handleTimelineClick}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={(e) => isDragging && handleTimelineClick(e)}
      >
        {/* Pattern segments */}
        <div className="absolute top-0 left-0 bottom-0 flex w-full h-full">
          {sequence.map((item, index) => {
            // Calculate width percentage for this segment
            const widthPercentage = (item.duration / totalDuration) * 100;
            const patternTitle = item.patternId < patterns.length 
              ? patterns[item.patternId]?.title 
              : `Pattern ${item.patternId + 1}`;
            
            return (
              <div 
                key={index} 
                className={`h-full ${index === currentItemIndex ? 'bg-mystic/20' : 'bg-mystic/10'} relative border-r border-mystic/20`}
                style={{ width: `${widthPercentage}%` }}
              >
                <div className={`absolute inset-0 flex items-center justify-center ${isMobile ? 'text-[10px]' : 'text-xs'} text-mystic/70 truncate px-1`}>
                  {patternTitle}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Playhead indicator */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-green-400 z-10"
          style={{ left: `${positionPercentage}%` }}
        >
          <div className="h-3 w-3 rounded-full bg-green-400 -ml-1.5 -mt-1 relative" />
        </div>
      </div>
      
      {/* Current time indicator */}
      <div className="mt-1 text-xs text-mystic/70">
        {Math.floor(currentPosition / 60)}:{Math.floor(currentPosition % 60).toString().padStart(2, '0')}
      </div>
    </motion.div>
  );
};

export default PatternTimeline;
