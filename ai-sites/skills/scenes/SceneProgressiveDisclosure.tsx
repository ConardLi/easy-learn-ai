import React from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { Layers, ArrowRight, Zap, Lightbulb } from 'lucide-react';

export const SceneProgressiveDisclosure: React.FC<SceneProps> = ({ step }) => {
  // Steps:
  // 0: The Solution Title
  // 1: The Term "Progressive Disclosure"
  // 2: "Speak Human" - Load on Demand
  // 3: "Smartest Design"

  return (
    <div className="w-full h-full flex flex-col items-center justify-center max-w-6xl px-4 relative">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
         <Layers size={400} className="text-white" />
      </div>

      {/* Step 0: Context Transition */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center z-10"
      >
        <ChalkText size="xl" className="text-gray-400 mb-2">为了解决 Context 爆炸...</ChalkText>
        <ChalkText as="h2" size="2xl" color="white">Agent Skills 的核心机制</ChalkText>
      </motion.div>

      {/* Main Content Area */}
      <div className="relative flex flex-col items-center justify-center min-h-[300px] w-full">
         
         {/* Step 1: The Term */}
         {step >= 1 && (
             <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[#1e1e24] border-2 border-blue-500 p-8 rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.3)] z-20 text-center"
             >
                 <ChalkText size="4xl" className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-blue-300">
                     Progressive Disclosure
                 </ChalkText>
                 <ChalkText size="xl" className="text-blue-400 mt-2 font-mono">
                     渐进式披露
                 </ChalkText>
             </motion.div>
         )}

         {/* Step 2: "Speak Human" translation */}
         {step >= 2 && (
             <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-12 flex items-center gap-6"
             >
                 <div className="bg-white/10 px-4 py-2 rounded-full text-gray-400 text-sm border border-white/20">
                    说人话就是
                 </div>
                 <ArrowRight size={32} className="text-white/50" />
                 <div className="flex gap-4">
                     <div className="bg-green-900/30 border border-green-500/50 p-4 rounded-xl flex items-center gap-3">
                         <Zap size={24} className="text-green-400" />
                         <ChalkText size="xl" className="font-bold text-green-300">按需加载</ChalkText>
                     </div>
                     <div className="bg-yellow-900/30 border border-yellow-500/50 p-4 rounded-xl flex items-center gap-3">
                         <Layers size={24} className="text-yellow-400" />
                         <ChalkText size="xl" className="font-bold text-yellow-300">用多少拿多少</ChalkText>
                     </div>
                 </div>
             </motion.div>
         )}

         {/* Step 3: Smartest Design Badge */}
         {step >= 3 && (
             <motion.div
                initial={{ scale: 0, rotate: 10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="absolute -top-10 -right-4 md:right-20 bg-gradient-to-br from-purple-500 to-pink-600 p-1 rounded-full shadow-2xl z-30"
             >
                 <div className="bg-[#1e1e24] p-6 rounded-full flex flex-col items-center justify-center border-4 border-transparent w-40 h-40">
                     <Lightbulb size={40} className="text-yellow-400 mb-2 animate-pulse" />
                     <ChalkText size="lg" className="font-bold text-center leading-tight">最聪明的<br/>设计</ChalkText>
                 </div>
             </motion.div>
         )}

      </div>

    </div>
  );
};