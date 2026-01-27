import React from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { Briefcase, Server, HelpCircle, GitMerge, Plug } from 'lucide-react';

export const SceneMCPTransition: React.FC<SceneProps> = ({ step }) => {
  // Steps:
  // 0: The Question (Skills vs MCP?)
  // 1: The Visual Comparison (Icons appearing)
  // 2: The Similarities (Why they look alike)
  // 3: The Confusion/Reality Check

  return (
    <div className="w-full h-full flex flex-col items-center justify-center max-w-6xl px-4 relative">
        
        {/* Header */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center z-10"
        >
             <ChalkText as="h2" size="2xl" color="white">
                Skills 和 MCP 有点像？
             </ChalkText>
        </motion.div>

        {/* Main Comparison Stage */}
        <div className="flex w-full items-center justify-center gap-8 md:gap-32 relative min-h-[300px]">
            
            {/* Left: Skills */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={step >= 1 ? { x: 0, opacity: 1 } : {}}
                className="flex flex-col items-center gap-4"
            >
                <div className="w-32 h-32 rounded-2xl bg-blue-500/20 border-4 border-blue-400 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                    <Briefcase size={64} className="text-blue-300" />
                </div>
                <ChalkText size="xl" className="font-bold text-blue-300">Agent Skills</ChalkText>
            </motion.div>

            {/* Right: MCP */}
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={step >= 1 ? { x: 0, opacity: 1 } : {}}
                className="flex flex-col items-center gap-4"
            >
                <div className="w-32 h-32 rounded-2xl bg-purple-500/20 border-4 border-purple-400 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                    <Server size={64} className="text-purple-300" />
                </div>
                <ChalkText size="xl" className="font-bold text-purple-300">MCP</ChalkText>
            </motion.div>

            {/* Middle: Connection/Similarity */}
            {step >= 2 && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-0 w-full">
                    {/* Connecting Lines */}
                    <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        className="w-[60%] h-1 bg-gradient-to-r from-blue-400 via-white to-purple-400 opacity-50 absolute top-1/2 -translate-y-1/2 -z-10"
                    />

                    {/* Shared Traits Badges */}
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: -40, opacity: 1 }}
                        className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2"
                    >
                         <GitMerge size={16} className="text-yellow-300" />
                         <span className="text-sm text-gray-200">按需加载 (On-Demand)</span>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 40, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2"
                    >
                         <Plug size={16} className="text-green-300" />
                         <span className="text-sm text-gray-200">扩展能力 (Extensions)</span>
                    </motion.div>
                </div>
            )}

            {/* Question Mark Overlay (Step 1 -> 2 transition hint) */}
            {step === 1 && (
                <motion.div 
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute top-0 right-[35%]"
                >
                    <HelpCircle size={48} className="text-gray-500/50" />
                </motion.div>
            )}

        </div>

        {/* Footer: The Reality Check */}
        {step >= 3 && (
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mt-16 bg-red-900/30 p-8 rounded-3xl border border-red-500/30 text-center max-w-2xl backdrop-blur-sm"
            >
                <div className="flex items-center justify-center gap-4 mb-2">
                    <HelpCircle size={32} className="text-red-400 animate-bounce" />
                    <ChalkText size="xl" className="font-bold text-white">
                        这也是很多同学容易<span className="text-red-300 underline decoration-wavy">弄混</span>的问题
                    </ChalkText>
                </div>
            </motion.div>
        )}

    </div>
  );
};