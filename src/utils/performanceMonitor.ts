
/**
 * Simple performance monitoring utility for canvas operations
 */

// Store frame timing data
let frameTimes: number[] = [];
const MAX_FRAME_SAMPLES = 60;
let isMonitoring = false;

/**
 * Start performance monitoring
 */
export const startPerformanceMonitoring = () => {
  isMonitoring = true;
  frameTimes = [];
  console.log('Performance monitoring started');
};

/**
 * Stop performance monitoring and log results
 */
export const stopPerformanceMonitoring = () => {
  isMonitoring = false;
  
  if (frameTimes.length === 0) {
    console.log('No frame data collected');
    return;
  }
  
  // Calculate stats
  const sum = frameTimes.reduce((a, b) => a + b, 0);
  const avg = sum / frameTimes.length;
  const min = Math.min(...frameTimes);
  const max = Math.max(...frameTimes);
  
  console.log('--- Canvas Performance Results ---');
  console.log(`Frames analyzed: ${frameTimes.length}`);
  console.log(`Average frame time: ${avg.toFixed(2)}ms (${(1000 / avg).toFixed(1)} FPS)`);
  console.log(`Min frame time: ${min.toFixed(2)}ms (${(1000 / min).toFixed(1)} FPS)`);
  console.log(`Max frame time: ${max.toFixed(2)}ms (${(1000 / max).toFixed(1)} FPS)`);
  console.log('---------------------------------');
  
  frameTimes = [];
};

/**
 * Record frame time
 */
export const recordFrameTime = (frameTime: number) => {
  if (!isMonitoring) return;
  
  frameTimes.push(frameTime);
  if (frameTimes.length > MAX_FRAME_SAMPLES) {
    frameTimes.shift();
  }
};

/**
 * Check if monitoring is active
 */
export const isPerformanceMonitoring = () => isMonitoring;
