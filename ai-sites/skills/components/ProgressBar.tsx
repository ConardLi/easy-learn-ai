import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneConfig } from '../types';

interface ProgressBarProps {
  scenes: SceneConfig[];
  currentIndex: number;
  onSeek: (index: number) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ scenes, currentIndex, onSeek }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center group"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {/* Invisible Trigger Area - Acts as a hit zone at the bottom of the screen */}
      <div className="h-6 w-full cursor-pointer bg-transparent hover:bg-white/5 transition-colors duration-300 flex items-center justify-center">
          {/* A very subtle hint line that only appears when hovering the hit zone, indicating interactivity */}
          <div className="w-32 h-1 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* The Bar */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full bg-slate-900/95 backdrop-blur-lg border-t border-white/10 p-4 md:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between text-white/50 text-sm mb-2 font-sans">
                <span>00:00</span>
                <span>END</span>
              </div>
              
              <div className="relative w-full h-3 bg-white/10 rounded-full overflow-hidden">
                {/* Background Track segments */}
                <div className="absolute inset-0 flex">
                   {scenes.map((scene, idx) => (
                      <div 
                        key={scene.id}
                        className="h-full border-r border-slate-900 last:border-0 relative group/segment cursor-pointer"
                        style={{ width: `${100 / scenes.length}%` }}
                        onClick={() => onSeek(idx)}
                      >
                         {/* Hover preview text */}
                         <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 hidden group-hover/segment:block bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50 border border-white/20">
                            {scene.title}
                         </div>
                      </div>
                   ))}
                </div>

                {/* Progress Fill */}
                <motion.div 
                  className="h-full bg-yellow-400/80 shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                  initial={false}
                  animate={{ 
                    width: `${((currentIndex + 1) / scenes.length) * 100}%` 
                  }}
                  transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                />
              </div>

              {/* Current Scene Title Display */}
              <div className="mt-4 text-center">
                 <span className="text-yellow-400 font-bold mr-2">CH.{currentIndex + 1}</span>
                 <span className="text-white text-lg">{scenes[currentIndex].title}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};