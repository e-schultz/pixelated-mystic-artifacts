
import { useContext } from 'react';
import { ArtContext } from './ArtProvider';

export function useArt() {
  const context = useContext(ArtContext);
  if (context === undefined) {
    throw new Error('useArt must be used within an ArtProvider');
  }
  return context;
}
