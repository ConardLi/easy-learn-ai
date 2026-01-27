import React, { useEffect, useState } from 'react';
import { motion, animate, useMotionValue, useTransform } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { Brain, FileStack, AlertTriangle, Coins, HelpCircle, Mail, Image as ImageIcon, Code, Search, FileText } from 'lucide-react';

export const SceneContextExplosion: React.FC<SceneProps> = ({ step }) => {
  // Steps:
  // 0: Setup (50 Skills vs Brain)
  // 1: The Stuffing (Stream of docs enters brain)
  // 2: Cost Explosion (Counter counts up rapidly then STOPS)
  // 3: Attention Scatter (Distracting popups)

  const count = useMotionValue(0);
  const roundedCount = useTransform(count, (latest) => Math.round(latest));
  const [costDisplay, setCostDisplay] = useState("0.00");

  useEffect(() => {
    if (step >= 2) {
      // Animate Token Count from 0 to 85,000 over 1.5 seconds
      const controls = animate(count, 85420, { duration: 1.5, ease: "circOut" });
      
      // Animate Cost manually to sync format
      const costControls = animate(0, 4.25, {
        duration: 1.5,
        ease: "circOut",
        onUpdate: (latest) => setCostDisplay(latest.toFixed(2))
      });

      return () => {
        controls.stop();
        costControls.stop();
      };
    } else {
      count.set(0);
      setCostDisplay("0.00");
    }
  }, [step, count]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center max-w-6xl px-4 overflow-hidden relative">
      
      {/* Background Pulse for High Cost */}
      {step >= 2 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.15, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 bg-red-600/20 z-0 pointer-events-none"
          />
      )}

      {/* Header */}
      <motion.div 
        className="absolute top-8 md:top-12 left-0 right-0 text-center z-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <ChalkText size="xl" className="text-gray-300">
            如果把 <span className="text-yellow-300 font-bold text-3xl mx-2">50+ Skills</span> 全部塞进 Context...
        </ChalkText>
      </motion.div>

      {/* Main Diagram */}
      <div className="flex w-full items-center justify-center gap-4 md:gap-16 mt-12 z-10 relative">
          
          {/* LEFT: Skill Library */}
          <motion.div 
             className="flex flex-col items-center shrink-0 z-20"
             animate={step >= 1 ? { scale: 0.9, x: 20 } : { scale: 1, x: 0 }}
          >
             <div className="w-24 h-24 md:w-32 md:h-32 bg-[#1e1e24] border-2 border-gray-500 rounded-xl flex items-center justify-center relative shadow-xl">
                 <FileStack size={48} className="text-gray-400" />
                 <div className="absolute -top-3 -left-3 bg-yellow-500 text-black font-bold px-3 py-1 rounded-full text-sm shadow-lg">
                     x 50
                 </div>
             </div>
             <ChalkText size="lg" className="mt-4 text-gray-400">Skill Docs</ChalkText>
          </motion.div>

          {/* MIDDLE: Data Stream */}
          <div className="flex-1 max-w-md h-24 relative flex items-center justify-center">
              {/* Pipe Outline */}
              <div className="absolute inset-x-0 h-12 border-y-2 border-dashed border-gray-700/50" />
              
              {/* Particle Stream */}
              {step >= 1 && (
                  <div className="absolute inset-0 overflow-hidden">
                      {[...Array(12)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute top-1/2 left-0 flex items-center gap-2 bg-white/10 px-2 py-1 rounded border border-white/10"
                            initial={{ x: -50, opacity: 0, scale: 0.8, y: (i % 3 - 1) * 20 }}
                            animate={{ x: '120%', opacity: [0, 1, 1, 0] }}
                            transition={{ 
                                duration: 1.5, 
                                repeat: Infinity, 
                                delay: i * 0.15,
                                ease: "linear"
                            }}
                          >
                              <FileText size={16} className="text-blue-300" />
                              <div className="h-1 w-8 bg-white/20 rounded hidden md:block" />
                          </motion.div>
                      ))}
                  </div>
              )}
          </div>

          {/* RIGHT: AI Brain */}
          <div className="flex flex-col items-center shrink-0 z-20 relative">
             <motion.div 
                className="w-24 h-24 md:w-32 md:h-32 bg-[#1e1e24] border-4 rounded-full flex items-center justify-center relative shadow-2xl"
                animate={step >= 2 ? { 
                    borderColor: '#ef4444',
                    scale: [1, 1.05, 1],
                    transition: { repeat: Infinity, duration: 0.5 } 
                } : { 
                    borderColor: '#3b82f6' 
                }}
             >
                 <Brain size={56} className={step >= 2 ? "text-red-400" : "text-blue-400"} />
                 
                 {/* Step 3: Distractions popping up */}
                 {step >= 3 && (
                     <>
                        <DistractionBubble delay={0} x={-60} y={-50} icon={Mail} color="yellow" />
                        <DistractionBubble delay={0.5} x={60} y={-40} icon={ImageIcon} color="green" />
                        <DistractionBubble delay={1.0} x={-50} y={60} icon={Code} color="blue" />
                        <DistractionBubble delay={1.5} x={50} y={50} icon={Search} color="purple" />
                     </>
                 )}
             </motion.div>
             <ChalkText size="lg" className="mt-4 text-gray-400">Context Window</ChalkText>
          </div>
      </div>

      {/* OVERLAY: Consequences */}
      <div className="absolute bottom-12 w-full flex flex-col items-center gap-6 z-30 pointer-events-none">
         
         {/* Step 2: Cost Counter */}
         {step >= 2 && (
             <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-red-950/80 border border-red-500/50 p-6 rounded-2xl backdrop-blur-md flex items-center gap-8 shadow-[0_0_40px_rgba(220,38,38,0.4)]"
             >
                <div className="flex flex-col items-center border-r border-red-500/30 pr-8">
                    <div className="text-red-300 text-sm font-bold tracking-wider mb-1">TOKENS</div>
                    <div className="text-4xl md:text-5xl font-mono font-bold text-white tabular-nums">
                        <TokenCounter value={roundedCount} />
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-red-300 text-sm font-bold tracking-wider mb-1">COST / REQ</div>
                    <div className="text-4xl md:text-5xl font-mono font-bold text-yellow-400 tabular-nums">
                        ${costDisplay}
                    </div>
                </div>
             </motion.div>
         )}

         {/* Step 3: Attention Warning */}
         {step >= 3 && (
             <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 bg-orange-500 text-black px-6 py-2 rounded-full font-bold shadow-lg"
             >
                <AlertTriangle size={24} />
                <span>注意力分散 (Attention Scatter)</span>
             </motion.div>
         )}

      </div>

    </div>
  );
};

// Helper component to render the MotionValue as text
const TokenCounter = ({ value }: { value: any }) => {
    const [display, setDisplay] = useState(0);
    useEffect(() => value.on("change", (latest: number) => setDisplay(latest)), [value]);
    return <>{display.toLocaleString()}</>;
};

// Helper for distraction bubbles
const DistractionBubble = ({ delay, x, y, icon: Icon, color }: any) => (
    <motion.div
        className={`absolute bg-[#1e1e24] p-2 rounded-lg border border-${color}-500/50 shadow-lg flex items-center gap-2 z-30`}
        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
        animate={{ opacity: 1, scale: 1, x, y }}
        transition={{ delay, type: "spring", stiffness: 200, damping: 15 }}
    >
        <Icon size={16} className={`text-${color}-400`} />
        <HelpCircle size={16} className="text-gray-500" />
    </motion.div>
);