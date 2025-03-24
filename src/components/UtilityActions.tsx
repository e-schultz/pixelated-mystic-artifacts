
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Settings } from 'lucide-react';
import { useAnimation } from '@/context/AnimationContext';

interface UtilityActionsProps {
  onOpenSettings: () => void;
}

const UtilityActions: React.FC<UtilityActionsProps> = ({ onOpenSettings }) => {
  const { state, dispatch } = useAnimation();
  const { showAsciiOverlay } = state;

  const toggleAsciiOverlay = () => {
    dispatch({ type: 'TOGGLE_ASCII_OVERLAY' });
  };

  // Log ASCII art to console when enabled
  React.useEffect(() => {
    if (showAsciiOverlay) {
      console.log(`
,---.   .--.   .---. ,--. ,-. 
|    \\  |  |   | .-' | .--' | 
|  ,  \\ |  |   | \`-. | |    | 
|  |\\  \\|  |   | .-' | |    | 
|  | \\  '  '--.|  \`--' \`--. | 
\`--'  \`--\`-----'\`------\`---' ' 
.---.   ,---.  ,--.  ,---.   
| .-.\\ /  .-. ) |  | /  .-'  
| |-' )| ('-. \\ |  || \`--.   
| |--' |  --. ) |  ||.--.    
| |    /  '--'  |  ||  --'   
)('    \`------' \`--' \`----'  
                               
      `);
    }
  }, [showAsciiOverlay]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        className="fixed bottom-8 right-8 z-10 flex items-center space-x-4"
      >
        <button
          onClick={toggleAsciiOverlay}
          className={`flex items-center justify-center px-4 py-1.5 text-xs rounded-full transition-all ${
            showAsciiOverlay 
              ? 'border border-green-400/30 text-green-400/90 bg-black/40 backdrop-blur-md' 
              : 'neo-blur text-white/70 hover:text-white'
          }`}
        >
          <Zap className={`w-3.5 h-3.5 mr-1.5 ${showAsciiOverlay ? 'text-green-400' : 'text-white/70'}`} />
          <span className="font-mono tracking-wide">
            {showAsciiOverlay ? 'QUANTUM MODE' : 'QUANTUM'}
          </span>
          {showAsciiOverlay && (
            <span className="ml-2 h-1.5 w-1.5 rounded-full bg-green-400/90 animate-pulse"></span>
          )}
        </button>
        
        <p className="text-white/40 text-xs">
          sacred.io {new Date().getFullYear()}
        </p>
      </motion.div>
      
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        onClick={onOpenSettings}
        className="fixed top-8 right-8 z-10 w-12 h-12 neo-blur rounded-full flex items-center justify-center text-cyan-300 hover:text-cyan-100 transition-all"
      >
        <Settings className="w-5 h-5" />
      </motion.button>
    </>
  );
};

export default UtilityActions;
