
import React, { useEffect, useRef, useState } from 'react';
import { useAnimation } from '@/contexts/AnimationContext';
import { animations } from '@/data/animationData';

const ScreenSaverManager: React.FC = () => {
  const { 
    isScreenSaverMode,
    toggleScreenSaverMode,
    setCurrentAnimation,
    setAnimationSpeed,
    setShowAsciiOverlay
  } = useAnimation();
  
  const [startTime] = useState<number>(Date.now());
  const speedCycleRef = useRef<NodeJS.Timeout | null>(null);
  const featureToggleRef = useRef<NodeJS.Timeout | null>(null);
  const patternCycleRef = useRef<NodeJS.Timeout | null>(null);
  
  // Handle key press or mouse click to exit screen saver
  useEffect(() => {
    if (!isScreenSaverMode) {
      // Clear all timeouts when exiting screen saver mode
      if (speedCycleRef.current) {
        clearInterval(speedCycleRef.current);
        speedCycleRef.current = null;
      }
      if (featureToggleRef.current) {
        clearInterval(featureToggleRef.current);
        featureToggleRef.current = null;
      }
      if (patternCycleRef.current) {
        clearInterval(patternCycleRef.current);
        patternCycleRef.current = null;
      }
      return;
    }
    
    const handleKeyPress = () => {
      toggleScreenSaverMode();
    };
    
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('click', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('click', handleKeyPress);
    };
  }, [isScreenSaverMode, toggleScreenSaverMode]);
  
  // Random pattern selection
  useEffect(() => {
    if (!isScreenSaverMode) return;
    
    const randomPatternChange = () => {
      const randomIndex = Math.floor(Math.random() * animations.length);
      setCurrentAnimation(randomIndex);
    };
    
    // Initial pattern change when entering screen saver mode
    randomPatternChange();
    
    patternCycleRef.current = setInterval(randomPatternChange, 8000); // Change pattern every 8 seconds
    
    return () => {
      if (patternCycleRef.current) {
        clearInterval(patternCycleRef.current);
        patternCycleRef.current = null;
      }
    };
  }, [isScreenSaverMode, setCurrentAnimation]);
  
  // Smooth sine wave speed adjustment
  useEffect(() => {
    if (!isScreenSaverMode) {
      if (speedCycleRef.current) {
        clearInterval(speedCycleRef.current);
        speedCycleRef.current = null;
      }
      return;
    }
    
    const speedCycle = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      // Sine wave oscillation between 0.6 and 1.5 speed
      const speed = 0.6 + 0.45 * (Math.sin(elapsed / 10) + 1);
      setAnimationSpeed(speed);
    };
    
    speedCycleRef.current = setInterval(speedCycle, 100); // Update speed smoothly
    
    return () => {
      if (speedCycleRef.current) {
        clearInterval(speedCycleRef.current);
        speedCycleRef.current = null;
      }
    };
  }, [isScreenSaverMode, setAnimationSpeed, startTime]);
  
  // Toggle ASCII/Pixelated modes
  useEffect(() => {
    if (!isScreenSaverMode) {
      if (featureToggleRef.current) {
        clearInterval(featureToggleRef.current);
        featureToggleRef.current = null;
      }
      return;
    }
    
    const featureToggle = () => {
      // Toggle ASCII overlay randomly
      setShowAsciiOverlay(Math.random() > 0.5);
    };
    
    featureToggleRef.current = setInterval(featureToggle, 10000); // Toggle every 10 seconds
    
    return () => {
      if (featureToggleRef.current) {
        clearInterval(featureToggleRef.current);
        featureToggleRef.current = null;
      }
    };
  }, [isScreenSaverMode, setShowAsciiOverlay]);
  
  // No visible UI for this component
  return null;
};

export default ScreenSaverManager;
