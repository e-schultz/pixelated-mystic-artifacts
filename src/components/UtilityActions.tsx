
import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface UtilityActionsProps {
  onOpenSettings: () => void;
}

const UtilityActions: React.FC<UtilityActionsProps> = ({ onOpenSettings }) => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.5 }}
      className="fixed top-4 right-4 z-10"
    >
      <button
        onClick={onOpenSettings}
        className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors backdrop-blur-sm bg-black/40 border border-white/10"
        aria-label="Settings"
      >
        <Settings className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default UtilityActions;
