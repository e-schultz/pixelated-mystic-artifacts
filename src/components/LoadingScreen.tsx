
import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const LoadingScreen: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-20 h-20 mb-6"
      >
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute inset-0 border-2 border-cyan-500/30 rounded-full"
        />
        <motion.span
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute inset-2 border-2 border-purple-500/30 rounded-full"
        />
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 flex items-center justify-center text-cyan-300 text-xs"
        >
          INIT
        </motion.span>
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-lg text-white/80 font-light tracking-wider mb-2"
      >
        SACRED GEOMETRY
      </motion.h2>
      
      {!isMobile && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-sm text-white/60 max-w-xs text-center"
        >
          Loading visualization matrix...
        </motion.p>
      )}
    </motion.div>
  );
};

export default LoadingScreen;
