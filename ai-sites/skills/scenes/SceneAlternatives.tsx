import React from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { MessageSquare, Settings, Workflow, FileText, ArrowDown, Box } from 'lucide-react';

export const SceneAlternatives: React.FC<SceneProps> = ({ step }) => {
  // Steps:
  // 0: Title "Looks ordinary?"
  // 1: Show 4 discrete options floating
  // 2: Animate them MERGING into the Context Window (The Funnel)
  // 3: Conclusion text

  const inputs = [
    { id: 'chat', label: '直接对话', sub: 'Chat', icon: MessageSquare, color: 'blue', rotate: -5 },
    { id: 'sys', label: '系统提示词', sub: 'System', icon: Settings, color: 'green', rotate: 5 },
    { id: 'flow', label: 'Workflow', sub: 'Flow', icon: Workflow, color: 'yellow', rotate: -3 },
    { id: 'rule', label: 'Agent.md', sub: 'Rules', icon: FileText, color: 'red', rotate: 3 },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center max-w-6xl px-4 relative overflow-hidden">
      
      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: step >= 0 ? 1 : 0, y: 0 }}
        className="absolute top-12 z-20 text-center"
      >
        <ChalkText as="h2" size="2xl" color="white">看起来挺普通的？</ChalkText>
        <ChalkText size="lg" className="text-gray-400 mt-2">本质上，它们都是在做同一件事</ChalkText>
      </motion.div>

      {/* Main Stage */}
      <div className="flex-1 w-full flex flex-col items-center justify-center relative mt-20">
        
        {/* The 4 Inputs */}
        <div className="flex gap-4 md:gap-8 mb-12 h-32 items-end">
            {inputs.map((item, index) => {
                // If step >= 2, they should move DOWN and merge
                // We use layout animations for this magic
                return (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: -50 }}
                        animate={
                            step >= 2 
                            ? { 
                                opacity: 0, 
                                y: 200, 
                                scale: 0.5,
                                x: 0 
                              } 
                            : step >= 1 
                            ? { opacity: 1, y: 0, scale: 1, rotate: item.rotate }
                            : { opacity: 0, y: -50 }
                        }
                        transition={{ duration: 0.8, type: 'spring' }}
                        className={`
                            relative w-32 h-40 md:w-40 md:h-48 rounded-xl border-2 border-${item.color}-500/50 bg-[#1e1e24] 
                            flex flex-col items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,0,0,0.3)]
                            z-10
                        `}
                    >
                        <item.icon size={40} className={`text-${item.color}-400`} />
                        <div className="text-center">
                            <div className={`font-bold text-${item.color}-300`}>{item.label}</div>
                            <div className="text-xs text-gray-500 font-mono">{item.sub}</div>
                        </div>
                    </motion.div>
                );
            })}
        </div>

        {/* The Funnel / Context Window Container */}
        <div className="relative flex flex-col items-center">
            
            {/* Arrows pointing down */}
            <motion.div 
                animate={step >= 2 ? { opacity: 1, y: 10 } : { opacity: 0 }}
                className="flex flex-col items-center text-gray-500 mb-2"
            >
                <ArrowDown size={32} className="animate-bounce" />
            </motion.div>

            {/* The Unified "Context Window" Box */}
            <motion.div
                initial={{ width: 300, height: 0, opacity: 0 }}
                animate={step >= 2 ? { height: 180, opacity: 1, width: 600 } : { height: 0, opacity: 0 }}
                className="bg-gray-800/80 border-2 border-dashed border-gray-500 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden"
            >
                <div className="absolute top-2 left-4 text-xs font-mono text-gray-500 uppercase">Current Context Window</div>
                
                {/* The Stacked Content inside */}
                {step >= 2 && (
                    <div className="flex flex-wrap items-center justify-center gap-2 p-4 w-full">
                        {inputs.map((item, i) => (
                            <motion.div
                                key={'inner-'+item.id}
                                initial={{ scale: 0, y: -50 }}
                                animate={{ scale: 1, y: 0 }}
                                transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                                className={`px-4 py-2 rounded-lg bg-${item.color}-900/40 border border-${item.color}-500/30 flex items-center gap-2`}
                            >
                                <item.icon size={16} className={`text-${item.color}-400`} />
                                <span className={`text-${item.color}-200 text-sm`}>{item.label}</span>
                            </motion.div>
                        ))}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="w-full text-center mt-4 pt-4 border-t border-gray-700"
                        >
                             <ChalkText size="lg" className="text-white">
                                 每次对话都会<span className="text-red-400 font-bold mx-2">带上所有内容</span>
                             </ChalkText>
                        </motion.div>
                    </div>
                )}
            </motion.div>

            {/* Step 3: The Punchline */}
            {step >= 3 && (
                 <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mt-8 bg-red-900/20 p-6 rounded-xl border border-red-500/50 backdrop-blur-sm max-w-2xl text-center"
                 >
                    <ChalkText size="xl" color="red">这就引出了一个巨大的问题...</ChalkText>
                 </motion.div>
            )}

        </div>
      </div>
    </div>
  );
};