
import { useContext } from 'react';
import { AnimationContext } from './AnimationProvider';

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}
