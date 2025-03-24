
import React from 'react';
import { motion } from 'framer-motion';
import { LOADING_ASCII } from '@/constants/asciiArt';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black to-blue-950 flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="w-20 h-20 mb-6 relative"
      >
        <div className="absolute inset-0 w-20 h-20 border-2 border-t-blue-400 border-r-indigo-500 border-b-purple-600 border-l-cyan-400 rounded-full flex items-center justify-center animate-spin-slow opacity-75"></div>
        <div className="absolute inset-0 w-20 h-20 border-2 border-cyan-400 rounded-full flex items-center justify-center animate-pulse-subtle"></div>
        <div className="absolute inset-2 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-500/50"></div>
        </div>
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-cyan-300 text-sm tracking-[0.25em] font-light"
      >
        INITIALIZING NEURAL MATRIX
      </motion.p>
      
      <motion.div 
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "220px", opacity: 1 }}
        transition={{ delay: 0.7, duration: 1.5 }}
        className="h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 mt-6 rounded-full"
      />
      
      <motion.pre
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="text-cyan-400/70 text-xs font-mono mt-8 tracking-widest"
      >
        {LOADING_ASCII}
      </motion.pre>
    </div>
  );
};

export default LoadingScreen;
