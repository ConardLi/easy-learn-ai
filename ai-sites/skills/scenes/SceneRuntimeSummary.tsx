import React from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { Box, FileText, FileCode, Shield, Brain, X, Check } from 'lucide-react';

export const SceneRuntimeSummary: React.FC<SceneProps> = ({ step }) => {
  // Steps:
  // 0: Title
  // 1: The Heavy Package (Docs + Scripts)
  // 2: The Context Window (Clean)
  // 3: The Block (Protection)
  // 4: Conclusion Text

  return (
    <div className="w-full h-full flex flex-col items-center justify-center max-w-7xl px-4 relative overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        {/* Header */}
        <motion.div 
            initial={{ y: -30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            className="mb-12 text-center z-10"
        >
            <ChalkText as="h2" size="2xl" color="white">这意味着...</ChalkText>
        </motion.div>

        <div className="flex w-full items-center justify-center gap-8 md:gap-24 relative z-10">
            
            {/* LEFT: The Heavy Skill Package */}
            <motion.div 
                className="flex flex-col items-center"
                initial={{ x: -100, opacity: 0 }}
                animate={step >= 1 ? { x: 0, opacity: 1 } : { opacity: 0.1 }}
            >
                <div className="relative w-48 h-56 bg-[#1e1e24] border-2 border-yellow-500 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.1)] group">
                    {/* Badge */}
                    <div className="absolute -top-4 bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                        One Skill
                    </div>

                    {/* Contents (Packed) */}
                    <div className="grid grid-cols-3 gap-2 p-4 opacity-50">
                        {[...Array(9)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center gap-1">
                                {i % 2 === 0 ? <FileText size={20} className="text-gray-400" /> : <FileCode size={20} className="text-gray-400" />}
                                <div className="h-1 w-6 bg-gray-600 rounded" />
                            </div>
                        ))}
                    </div>
                    
                    {/* Weight Label */}
                    <div className="absolute bottom-4 font-mono text-yellow-500/50 text-xs">
                        Size: Heavy
                    </div>
                </div>
                <ChalkText size="lg" className="mt-4 text-gray-400">打包整套文档 & 脚本</ChalkText>
            </motion.div>

            {/* CENTER: The Barrier */}
            <div className="relative h-64 flex items-center justify-center w-12">
                 {step >= 3 && (
                     <motion.div 
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        className="absolute w-1 h-full bg-gradient-to-b from-transparent via-red-500/50 to-transparent"
                     />
                 )}
                 {step >= 3 && (
                     <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                        className="z-10 bg-[#1e1e24] p-3 rounded-full border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                     >
                         <Shield size={32} className="text-red-500" />
                     </motion.div>
                 )}
            </div>

            {/* RIGHT: The Brain (Clean) */}
            <motion.div 
                className="flex flex-col items-center"
                initial={{ x: 100, opacity: 0 }}
                animate={step >= 2 ? { x: 0, opacity: 1 } : { opacity: 0.1 }}
            >
                 <div className="relative w-48 h-56 bg-[#1e1e24] border-2 border-blue-500 rounded-xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                     <Brain size={64} className="text-blue-400 mb-2" />
                     <div className="text-blue-300 font-bold">Context</div>
                     
                     {/* Status */}
                     <div className="mt-4 flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/30">
                         <Check size={14} className="text-green-400" />
                         <span className="text-green-300 text-xs">Clean</span>
                     </div>
                 </div>
                 <ChalkText size="lg" className="mt-4 text-gray-400">Context Window</ChalkText>
            </motion.div>

        </div>

        {/* Conclusion Text */}
        {step >= 4 && (
            <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mt-12 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md max-w-3xl text-center"
            >
                <ChalkText size="xl">
                    只要任务<span className="text-red-400 font-bold mx-2">不需要</span>，
                </ChalkText>
                <div className="h-2" />
                <ChalkText size="xl">
                    这些内容就<span className="text-green-400 font-bold mx-2 text-3xl">永远不会</span>占用上下文
                </ChalkText>
            </motion.div>
        )}

        {/* Interactive Particles attempting to cross */}
        {step >= 3 && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute top-1/2 left-[30%]"
                        initial={{ opacity: 0, x: 0, y: (i - 2) * 20 }}
                        animate={{ 
                            opacity: [0, 1, 1, 0],
                            x: [0, 100, 50, 0], // Move towards barrier then bounce back/fade
                        }}
                        transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            delay: i * 0.5,
                            ease: "easeOut"
                        }}
                    >
                        <X size={16} className="text-red-500/50" />
                    </motion.div>
                ))}
            </div>
        )}

    </div>
  );
};