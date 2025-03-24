
import { useRef, useEffect } from 'react';
import p5 from 'p5';

// This hook manages the p5 instance lifecycle
export function useCanvasSetup(
  containerRef: React.RefObject<HTMLDivElement>,
  sketch: (p: any) => void,
  dependencies: any[] = []
) {
  const p5InstanceRef = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Cleanup any existing p5 instance to prevent duplication
    if (p5InstanceRef.current) {
      p5InstanceRef.current.remove();
      p5InstanceRef.current = null;
    }
    
    // Create P5 instance
    p5InstanceRef.current = new p5(sketch, containerRef.current);
    
    // Cleanup on unmount
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, dependencies);

  return p5InstanceRef;
}
