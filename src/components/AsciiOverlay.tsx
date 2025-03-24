
import React from 'react';
import { MYSTIC_ASCII } from '@/constants/asciiArt';
import { useAnimation } from '@/context/AnimationContext';
import { animations } from '@/data/animationData';

const AsciiOverlay: React.FC = () => {
  const { state } = useAnimation();
  const { currentAnimation, animationSpeed } = state;

  return (
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
        {MYSTIC_ASCII}
      </pre>
    </>
  );
};

export default AsciiOverlay;
