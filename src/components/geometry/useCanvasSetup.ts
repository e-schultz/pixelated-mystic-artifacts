
import { useRef, useEffect } from 'react';
import p5 from 'p5';

/**
 * Hook to handle p5 instance lifecycle with optimized performance
 */
export function useCanvasSetup(
  containerRef: React.RefObject<HTMLDivElement>,
  sketch: (p: any) => void,
  dependencies: any[] = []
) {
  const p5InstanceRef = useRef<p5 | null>(null);
  const prevDepsRef = useRef<any[]>(dependencies);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Compare dependencies to avoid unnecessary recreation
    const depsChanged = dependencies.some(
      (dep, i) => dep !== prevDepsRef.current[i]
    );
    
    // Only recreate the p5 instance if dependencies have changed
    if (depsChanged || !p5InstanceRef.current) {
      console.log('Canvas dependencies changed, recreating p5 instance');
      
      // Cleanup any existing p5 instance to prevent duplication
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
      
      // Create P5 instance with optimized settings
      p5InstanceRef.current = new p5(sketch, containerRef.current);
      prevDepsRef.current = [...dependencies];
    }
    
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
