
import React from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 p-6 z-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="w-full flex justify-center"
      >
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 text-2xl font-light tracking-[0.2em] text-center px-6 py-2 backdrop-blur-sm rounded-full border border-white/10">
          SACRED GEOMETRY MATRIX
        </h1>
      </motion.div>
    </header>
  );
};

export default Header;
