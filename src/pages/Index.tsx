
import React, { useState, useEffect } from 'react';
import SacredGeometryCanvas from '@/components/SacredGeometryCanvas';
import AnimationInfo from '@/components/AnimationInfo';
import { animations } from '@/data/animationData';
import { motion } from 'framer-motion';

const Index = () => {
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-cycle through animations
    const intervalId = setInterval(() => {
      setCurrentAnimation((prev) => (prev + 1) % animations.length);
    }, 10000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden crt-overlay">
      {/* Loading screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-mystic-dark flex flex-col items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 mb-4"
          >
            <div className="w-16 h-16 border-2 border-mystic rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-mystic rounded-full animate-pulse"></div>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-mystic/70 text-sm tracking-widest"
          >
            LOADING MYSTIC ARTIFACTS
          </motion.p>
        </div>
      )}

      {/* Main content */}
      <SacredGeometryCanvas />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 p-6 z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="text-mystic text-2xl font-light tracking-[0.2em] text-center"
        >
          PIXELATED MYSTIC ARTIFACTS
        </motion.h1>
      </header>
      
      {/* Animation info */}
      <AnimationInfo
        title={animations[currentAnimation].title}
        description={animations[currentAnimation].description}
      />
      
      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-10"
      >
        <p className="text-mystic/50 text-xs">
          sacred geometry patterns • {new Date().getFullYear()}
        </p>
      </motion.footer>
    </div>
  );
};

export default Index;
