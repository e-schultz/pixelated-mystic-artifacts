
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import PatternTimeline from './PatternTimeline';
import SequenceControls from './SequenceControls';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const PatternSequencer: React.FC = () => {
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSequencerOpen, setIsSequencerOpen] = useState(false);
  
  if (isMobile) {
    return (
      <>
        {/* Mobile floating button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.5 }}
          className="fixed bottom-24 right-6 z-10"
        >
          <Sheet open={isSequencerOpen} onOpenChange={setIsSequencerOpen}>
            <SheetTrigger asChild>
              <button 
                className="w-12 h-12 rounded-full flex items-center justify-center bg-mystic/10 border border-mystic/30 text-mystic hover:bg-mystic/20 transition-all"
                aria-label="Open Pattern Sequencer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="8" rx="2" />
                  <rect x="2" y="14" width="20" height="8" rx="2" />
                  <line x1="6" y1="6" x2="18" y2="6" />
                  <line x1="6" y1="18" x2="18" y2="18" />
                </svg>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[60vh] bg-mystic-dark border-t border-mystic/20 p-4 pt-8 rounded-t-xl">
              <div className="absolute top-2 left-0 right-0 flex justify-center">
                <div className="w-12 h-1.5 rounded-full bg-mystic/20" />
              </div>
              <h3 className="text-center text-mystic font-light tracking-wider mb-4">PATTERN SEQUENCER</h3>
              <PatternTimeline />
              <SequenceControls />
            </SheetContent>
          </Sheet>
        </motion.div>
      </>
    );
  }
  
  // Desktop version
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 0.5 }}
      className="fixed left-0 right-0 bottom-0 z-10"
    >
      <div 
        className={`
          w-full bg-black/70 backdrop-blur-sm border-t border-mystic/20 transition-all duration-300 overflow-hidden
          ${isExpanded ? 'max-h-48' : 'max-h-10'}
        `}
      >
        {/* Header bar/trigger */}
        <div 
          className="h-10 px-4 flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="text-xs text-mystic/70 tracking-wider">PATTERN SEQUENCER</div>
          <button className="text-mystic/50 hover:text-mystic">
            {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>
        
        {/* Sequencer content */}
        <div className="p-4 pt-0">
          <PatternTimeline />
          <SequenceControls />
        </div>
      </div>
    </motion.div>
  );
};

export default PatternSequencer;
