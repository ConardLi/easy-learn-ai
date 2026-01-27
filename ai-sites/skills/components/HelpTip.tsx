import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MousePointerClick } from 'lucide-react';

export const HelpTip: React.FC = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed bottom-12 right-12 z-40 text-white/30 flex items-center gap-2 pointer-events-none select-none"
    >
      <span className="text-lg">Click or Space to continue</span>
      <MousePointerClick size={20} />
    </motion.div>
  );
};