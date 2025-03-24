
import React, { useState } from 'react';
import { startPerformanceMonitoring, stopPerformanceMonitoring } from '@/utils/performanceMonitor';

/**
 * Component that provides UI for performance monitoring
 */
const PerformanceMonitor: React.FC = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  
  const toggleMonitoring = () => {
    if (isMonitoring) {
      stopPerformanceMonitoring();
      setIsMonitoring(false);
    } else {
      startPerformanceMonitoring();
      setIsMonitoring(true);
    }
  };
  
  return (
    <div className="fixed bottom-24 right-6 z-20">
      <button
        onClick={toggleMonitoring}
        className={`
          px-3 py-1 rounded-full text-xs font-mono
          border transition-colors
          ${isMonitoring 
            ? 'bg-amber-900/30 border-amber-500/40 text-amber-400/90' 
            : 'border-mystic/30 text-mystic/70 hover:bg-mystic/10 hover:text-mystic'}
        `}
      >
        {isMonitoring ? 'Stop Monitoring' : 'Monitor Performance'}
      </button>
    </div>
  );
};

export default React.memo(PerformanceMonitor);
