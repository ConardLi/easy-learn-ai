import React from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { MessageSquare, FileText, Brain, ArrowRight, HardDrive, Download, Search, CheckCircle2 } from 'lucide-react';

export const SceneInstructionsLayer: React.FC<SceneProps> = ({ step }) => {
  // Steps:
  // 0: Title "Layer 2: Instructions"
  // 1: When (User Prompt)
  // 2: What (Match & Read File)
  // 3: Utility (Context Injection & Result)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center max-w-7xl px-4">
        
        {/* Header */}
        <motion.div 
            initial={{ y: -30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            className="mb-8 md:mb-16 text-center"
        >
            <div className="inline-block bg-white/10 px-4 py-1 rounded-full text-gray-400 text-sm font-mono mb-2 border border-white/10">
                Layer 02
            </div>
            <ChalkText as="h2" size="2xl" color="white">第二层：翻开手册 (Instructions)</ChalkText>
        </motion.div>

        {/* Main Process Flow */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch relative">
            
            {/* COLUMN 1: WHEN */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={step >= 1 ? { opacity: 1, x: 0 } : { opacity: 0.1, x: -50 }}
                className="flex flex-col gap-6"
            >
                <div className="flex items-center gap-3 mb-2">
                     <div className="p-2 bg-blue-500/20 rounded-lg text-blue-300">
                         <MessageSquare size={24} />
                     </div>
                     <ChalkText size="xl" className="font-bold text-blue-200">什么时候？</ChalkText>
                </div>

                <div className="bg-[#1e1e24] p-6 rounded-2xl border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)] flex-1 flex flex-col justify-center relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                     <ChalkText size="base" className="text-gray-400 mb-4">当用户发出具体指令时...</ChalkText>
                     
                     {/* Chat Bubble */}
                     <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={step >= 1 ? { scale: 1, opacity: 1 } : {}}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="bg-blue-600 text-white p-4 rounded-2xl rounded-tl-sm shadow-lg max-w-[90%]"
                     >
                        <ChalkText size="lg" className="font-sans">
                            "帮我把这个 <span className="font-bold text-yellow-300 border-b-2 border-yellow-300/50">Excel</span> 处理一下"
                        </ChalkText>
                     </motion.div>
                </div>
            </motion.div>

            {/* COLUMN 2: WHAT */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={step >= 2 ? { opacity: 1, y: 0 } : { opacity: 0.1, y: 50 }}
                className="flex flex-col gap-6 relative"
            >   
                {/* Arrow connecting cols */}
                <div className="absolute top-1/2 -left-6 hidden md:block text-gray-600">
                    <ArrowRight size={24} />
                </div>

                <div className="flex items-center gap-3 mb-2">
                     <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-300">
                         <HardDrive size={24} />
                     </div>
                     <ChalkText size="xl" className="font-bold text-yellow-200">加载什么？</ChalkText>
                </div>

                <div className="bg-[#1e1e24] p-6 rounded-2xl border border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.1)] flex-1 flex flex-col items-center justify-center text-center relative">
                     
                     {/* Action 1: Match */}
                     <div className="mb-6 w-full">
                        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-2">
                            <Search size={14} /> 
                            <span>Matching Intent...</span>
                        </div>
                        <div className="bg-black/40 p-2 rounded border border-white/10 font-mono text-sm text-green-400">
                            Match: "excel-skill"
                        </div>
                     </div>

                     {/* Action 2: Read File */}
                     <div className="relative w-full flex justify-center py-4">
                         {/* File Moving Animation */}
                         <motion.div
                            initial={{ y: 0 }}
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="relative z-10"
                         >
                            <FileText size={64} className="text-gray-300" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-black bg-white/80 px-1 rounded">
                                SKILL.md
                            </div>
                         </motion.div>

                         {/* Background Rays */}
                         <motion.div 
                            className="absolute inset-0 bg-yellow-500/5 rounded-full blur-xl"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                         />
                     </div>

                     <div className="mt-4 flex items-center gap-2 text-yellow-300">
                         <Download size={18} />
                         <span className="font-bold">读取 SKILL.md</span>
                     </div>
                </div>
            </motion.div>

            {/* COLUMN 3: UTILITY */}
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={step >= 3 ? { opacity: 1, x: 0 } : { opacity: 0.1, x: 50 }}
                className="flex flex-col gap-6 relative"
            >
                {/* Arrow connecting cols */}
                <div className="absolute top-1/2 -left-6 hidden md:block text-gray-600">
                    <ArrowRight size={24} />
                </div>

                <div className="flex items-center gap-3 mb-2">
                     <div className="p-2 bg-green-500/20 rounded-lg text-green-300">
                         <Brain size={24} />
                     </div>
                     <ChalkText size="xl" className="font-bold text-green-200">有什么用？</ChalkText>
                </div>

                <div className="bg-[#1e1e24] p-6 rounded-2xl border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.1)] flex-1 flex flex-col relative overflow-hidden">
                     
                     {/* Stream Effect */}
                     {step >= 3 && (
                        <div className="absolute top-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_20px_#22c55e]" />
                     )}

                     <div className="flex items-center justify-between mb-4">
                         <ChalkText size="lg" className="text-gray-300">详细步骤进入大脑</ChalkText>
                         <CheckCircle2 size={24} className="text-green-500" />
                     </div>

                     {/* Context Content Visualization */}
                     <div className="bg-black/30 flex-1 rounded-xl p-3 border border-white/5 space-y-2 overflow-hidden relative">
                         {[1, 2, 3, 4].map((i) => (
                             <motion.div 
                                key={i}
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="h-3 bg-gray-700/50 rounded w-full"
                             />
                         ))}
                         <motion.div 
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="h-3 bg-green-900/50 rounded w-3/4"
                         />
                         
                         {/* Overlay Text */}
                         <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[#1e1e24] to-transparent">
                             <div className="bg-green-500/20 px-3 py-1 rounded border border-green-500/50 text-green-300 text-sm font-bold">
                                 Context Updated
                             </div>
                         </div>
                     </div>

                     <div className="mt-4 text-center">
                         <div className="text-xs text-gray-500 uppercase">Current Token Cost</div>
                         <div className="text-2xl font-mono text-red-400">+1,500 <span className="text-sm text-gray-500">tokens</span></div>
                     </div>
                </div>
            </motion.div>
            
        </div>
    </div>
  );
};