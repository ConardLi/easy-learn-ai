import React from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { 
  FileCode, 
  Terminal, 
  Brain, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Lock,
  Cpu,
  Zap
} from 'lucide-react';

export const SceneRuntimeScript: React.FC<SceneProps> = ({ step }) => {
  // Steps:
  // 0: Title "Scripts"
  // 1: The Setup (Code File vs Brain)
  // 2: The Command (Brain -> Code)
  // 3: The Execution (Code runs in Black Box)
  // 4: The Result (Result -> Brain)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center max-w-7xl px-4 relative">
        
        {/* Header */}
        <motion.div 
            initial={{ y: -50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            className="mb-12 text-center"
        >
            <div className="inline-flex items-center gap-2 bg-green-500/10 px-4 py-1 rounded-full border border-green-500/30 text-green-300 text-sm font-mono mb-4">
                <ShieldCheck size={14} />
                <span>Zero Token Cost</span>
            </div>
            <ChalkText as="h2" size="2xl" color="white">第三层：脚本执行 (Scripts)</ChalkText>
        </motion.div>

        {/* The Wall Divider */}
        <div className="absolute top-20 bottom-20 left-1/2 w-px bg-dashed border-r-2 border-gray-600/50 -translate-x-1/2 hidden md:block" />

        <div className="flex w-full items-center justify-center gap-8 md:gap-32 relative">

            {/* LEFT SIDE: THE BRAIN (Claude) */}
            <motion.div 
                className="flex-1 flex flex-col items-center z-10"
                initial={{ x: -50, opacity: 0 }}
                animate={step >= 1 ? { x: 0, opacity: 1 } : { opacity: 0.3 }}
            >
                <div className="relative">
                     <div className="w-32 h-32 rounded-full bg-blue-900/20 border-4 border-blue-400 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.3)]">
                         <Brain size={64} className="text-blue-300" />
                     </div>
                     <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                         Claude Context
                     </div>
                </div>
                
                {/* Result Bubble */}
                {step >= 4 && (
                    <motion.div 
                        initial={{ scale: 0, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        className="mt-6 bg-green-500 text-black p-4 rounded-xl rounded-tl-none shadow-lg font-bold"
                    >
                        "Result: Success!"
                    </motion.div>
                )}
            </motion.div>


            {/* RIGHT SIDE: THE RUNTIME (Black Box) */}
            <motion.div 
                className="flex-1 flex flex-col items-center z-10"
                initial={{ x: 50, opacity: 0 }}
                animate={step >= 1 ? { x: 0, opacity: 1 } : { opacity: 0.3 }}
            >
                <div className="relative group">
                     {/* The Heavy File */}
                     <div className="w-40 h-48 bg-[#1e1e24] border-2 border-red-500/50 rounded-xl p-4 flex flex-col gap-2 relative shadow-2xl">
                         <div className="flex items-center gap-2 border-b border-gray-700 pb-2">
                             <FileCode size={20} className="text-red-400" />
                             <span className="text-xs text-red-300 font-mono">script.py</span>
                         </div>
                         <div className="space-y-1 opacity-30">
                             <div className="h-1 bg-gray-500 rounded w-full" />
                             <div className="h-1 bg-gray-500 rounded w-full" />
                             <div className="h-1 bg-gray-500 rounded w-3/4" />
                             <div className="h-1 bg-gray-500 rounded w-full" />
                             <div className="h-1 bg-gray-500 rounded w-1/2" />
                         </div>

                         {/* Token Cost Label */}
                         <div className="absolute -right-4 -bottom-4 bg-red-900 border border-red-500 text-red-200 text-xs px-2 py-1 rounded shadow-lg transform rotate-6">
                             Cost: 0 Tokens
                         </div>

                         {/* Execution Overlay */}
                         {step >= 3 && (
                             <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm rounded-xl"
                             >
                                 <Terminal size={32} className="text-green-400 mb-2" />
                                 <div className="text-xs font-mono text-green-300">
                                     Running...
                                 </div>
                             </motion.div>
                         )}
                     </div>

                     {/* The "Wall" visualization for this side */}
                     <div className="absolute -left-12 top-0 bottom-0 flex items-center">
                          <div className="bg-[#1e1e24] p-2 border border-gray-600 rounded-full z-20">
                              <Lock size={20} className="text-gray-400" />
                          </div>
                     </div>
                </div>
            </motion.div>

            {/* ANIMATIONS ACROSS THE BORDER */}
            
            {/* 1. Command: Brain -> Script */}
            {step >= 2 && step < 4 && (
                <motion.div 
                    className="absolute top-[40%] left-[30%] z-30 flex items-center gap-2 text-yellow-300 font-mono text-xs bg-black/50 px-2 rounded"
                    initial={{ left: '30%', opacity: 0 }}
                    animate={{ left: '60%', opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                    <span>Run()</span>
                    <ArrowRight size={16} />
                </motion.div>
            )}

            {/* 2. Result: Script -> Brain */}
            {step >= 4 && (
                <motion.div 
                    className="absolute top-[50%] left-[60%] z-30 flex items-center gap-2 text-green-300 font-mono text-xs bg-black/50 px-2 rounded"
                    initial={{ left: '60%', opacity: 0 }}
                    animate={{ left: '30%', opacity: 1 }}
                    transition={{ duration: 0.8, ease: "backOut" }}
                >
                    <ArrowLeft size={16} />
                    <span>Return Data</span>
                </motion.div>
            )}

        </div>

        {/* Bottom Explanation */}
        {step >= 1 && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-16 text-center"
            >
                <ChalkText size="xl" className="text-gray-300">
                    {step < 3 ? "Claude 只是下达指令..." : "代码在外部环境运行，不会进入大脑"}
                </ChalkText>
                {step >= 3 && (
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-2 text-green-400 font-bold flex items-center justify-center gap-2"
                    >
                        <Zap size={18} />
                        <span>无需消耗 Token 阅读几千行代码</span>
                    </motion.div>
                )}
            </motion.div>
        )}

    </div>
  );
};