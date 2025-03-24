
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-mystic-dark crt-overlay">
      <div className="text-center p-8 border border-mystic/10 backdrop-blur-sm bg-black/30 rounded-lg">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-light mb-6 text-mystic tracking-widest"
        >
          404
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-mystic/70 mb-8 tracking-wider">
            The artifact you seek has vanished from this dimension
          </p>
          
          <div className="w-16 h-16 mx-auto mb-8 border border-mystic/20 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-mystic rounded-full animate-pulse"></div>
          </div>
          
          <a 
            href="/" 
            className="text-mystic inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-mystic after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
          >
            Return to digital sanctuary
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
