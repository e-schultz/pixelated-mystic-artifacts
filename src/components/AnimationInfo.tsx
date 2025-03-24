
import React from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from '@/context/AnimationContext';
import { animations } from '@/data/animationData';
import { useIsMobile } from '@/hooks/use-mobile';

const AnimationInfo: React.FC = () => {
  const { state } = useAnimation();
  const { currentAnimation, isLoading } = state;
  const isMobile = useIsMobile();
  
  // Get current animation data
  const animationData = animations[currentAnimation];
  
  if (isLoading || !animationData) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.5 }}
      className={`fixed left-0 right-0 bottom-16 mx-auto text-center z-10 px-4 pointer-events-none`}
    >
      <div className="inline-block backdrop-blur-sm bg-black/30 border border-white/10 rounded-lg px-3 py-2">
        <h2 className="text-cyan-300 text-sm font-light tracking-wider mb-1">
          {animationData.title}
        </h2>
        {!isMobile && (
          <p className="text-white/60 text-xs max-w-xs mx-auto">
            {animationData.description}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default AnimationInfo;
