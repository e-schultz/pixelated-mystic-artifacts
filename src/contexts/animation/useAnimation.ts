
import { useContext } from 'react';
import { AnimationContext } from './AnimationProvider';
import { AnimationContextType } from './types';

// Hook for accessing the animation context
export function useAnimation(): AnimationContextType {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}
