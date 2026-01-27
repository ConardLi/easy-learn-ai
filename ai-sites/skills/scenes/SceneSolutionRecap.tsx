import React from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { Layers, Zap, Filter, ArrowDown, Database, FileText, Target, CheckCircle2, TrendingDown } from 'lucide-react';

export const SceneSolutionRecap: React.FC<SceneProps> = ({ step }) => {
  // Steps:
  // 0: Title & Core Mechanism "Progressive Disclosure"
  // 1: Advantage 1: Saving Tokens (Comparison)
  // 2: Advantage 2: Improving Attention (The Funnel)
  // 3: Conclusion (High Accuracy)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center max-w-7xl px-4 relative overflow-hidden">
      
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 text-center z-10"
      >
        <ChalkText size="xl" className="text-gray-400 mb-2">
            核心机制：<span className="text-blue-300 font-bold">渐进式披露</span>
        </ChalkText>
        <ChalkText as="h2" size="2xl" color="white">完美解决双重难题</ChalkText>
      </motion.div>

      <div className="flex w-full items-stretch justify-center gap-4 md:gap-12 h-[500px]">
        
        {/* LEFT COLUMN: Token Saving */}
        <div className="flex-1 flex flex-col items-center">
            {step >= 1 && (
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full h-full bg-[#1e1e24] border border-gray-700 rounded-2xl p-6 flex flex-col relative overflow-hidden"
                >
                    <div className="flex items-center gap-3 mb-6 z-10">
                        <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
                            <TrendingDown size={24} />
                        </div>
                        <ChalkText size="xl" className="font-bold text-green-300">1. 节省 Token</ChalkText>
                    </div>

                    <div className="flex-1 flex items-end justify-center gap-8 px-4 pb-4 z-10 min-h-[300px]">
                        
                        {/* MCP Bar */}
                        <div className="flex flex-col items-center gap-2 w-1/3 group">
                            <div className="text-xs text-red-400 font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity">50k+</div>
                            <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: 220 }}
                                transition={{ duration: 1.5, type: 'spring' }}
                                className="w-full bg-red-900/40 border-2 border-red-500 rounded-t-lg relative overflow-hidden"
                            >
                                <div className="absolute inset-0 flex flex-col items-center justify-end p-2 gap-1 opacity-50">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} className="w-full h-1 bg-red-500/50 rounded" />
                                    ))}
                                </div>
                            </motion.div>
                            <div className="text-center mt-2">
                                <div className="font-bold text-red-400 text-sm">MCP</div>
                                <div className="text-[10px] text-gray-500">300+ Tools</div>
                            </div>
                        </div>

                        {/* VS */}
                        <div className="text-gray-600 font-bold italic text-xl mb-12">VS</div>

                        {/* Skills Bar */}
                        <div className="flex flex-col items-center gap-2 w-1/3 group">
                            <div className="text-xs text-green-400 font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity">~2k</div>
                            <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: 30 }} 
                                transition={{ duration: 1.5, delay: 0.5, type: 'spring' }}
                                className="w-full bg-green-900/40 border-2 border-green-500 rounded-t-lg relative overflow-hidden"
                            >
                                <div className="absolute inset-0 flex flex-col items-center justify-end p-2 gap-1 opacity-50">
                                    <div className="w-full h-1 bg-green-500/50 rounded" />
                                </div>
                            </motion.div>
                            <div className="text-center mt-2">
                                <div className="font-bold text-green-400 text-sm">Skills</div>
                                <div className="text-[10px] text-gray-500">Metadata Only</div>
                            </div>
                        </div>

                    </div>

                    <div className="mt-4 bg-green-500/10 p-3 rounded-lg border border-green-500/20 text-center z-10">
                        <ChalkText size="base" className="text-gray-300">
                            只加载<span className="text-green-300 font-bold mx-1">目录</span>而非全书
                        </ChalkText>
                    </div>
                </motion.div>
            )}
        </div>

        {/* RIGHT COLUMN: Attention Funnel */}
        <div className="flex-1 flex flex-col items-center">
            {step >= 2 && (
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full h-full bg-[#1e1e24] border border-gray-700 rounded-2xl p-6 flex flex-col relative overflow-hidden"
                >
                    <div className="flex items-center gap-3 mb-6 z-10">
                        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                            <Target size={24} />
                        </div>
                        <ChalkText size="xl" className="font-bold text-blue-300">2. 提升注意力</ChalkText>
                    </div>

                    <div className="flex-1 relative flex flex-col items-center justify-center">
                        
                        {/* The Funnel Shape Visual */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20">
                            <svg width="100%" height="100%" viewBox="0 0 200 300" preserveAspectRatio="none">
                                <path d="M 20 0 L 80 300 L 120 300 L 180 0 Z" fill="url(#funnelGradient)" />
                                <defs>
                                    <linearGradient id="funnelGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>

                        {/* Funnel Stages */}
                        <div className="flex flex-col items-center gap-4 w-full max-w-[240px] z-10">
                            
                            {/* Stage 1: Directory */}
                            <motion.div 
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="w-full bg-gray-800 border border-gray-600 p-3 rounded-lg text-center flex items-center justify-center gap-2"
                            >
                                <Database size={16} className="text-gray-400" />
                                <span className="text-sm font-bold text-gray-300">1. 目录筛选</span>
                            </motion.div>
                            
                            <ArrowDown size={20} className="text-blue-500/50" />

                            {/* Stage 2: Manual */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 }}
                                className="w-[80%] bg-blue-900/40 border border-blue-500 p-3 rounded-lg text-center flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                            >
                                <FileText size={16} className="text-blue-300" />
                                <span className="text-sm font-bold text-blue-200">2. 加载说明</span>
                            </motion.div>

                            <ArrowDown size={20} className="text-yellow-500/50" />

                            {/* Stage 3: Execution */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.0 }}
                                className="w-[60%] bg-yellow-900/40 border border-yellow-500 p-3 rounded-lg text-center flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(234,179,8,0.3)]"
                            >
                                <Zap size={16} className="text-yellow-300" />
                                <span className="text-sm font-bold text-yellow-200">3. 执行</span>
                            </motion.div>

                        </div>

                        {/* Particles Flowing Down */}
                        <div className="absolute inset-0 pointer-events-none">
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute left-1/2 w-1 h-1 bg-white rounded-full"
                                    initial={{ y: 0, x: (Math.random() - 0.5) * 160, opacity: 0 }}
                                    animate={{ 
                                        y: 300, 
                                        x: 0, // Converge to center
                                        opacity: [0, 1, 0] 
                                    }}
                                    transition={{ 
                                        duration: 2, 
                                        repeat: Infinity, 
                                        delay: i * 0.4,
                                        ease: "easeInOut" 
                                    }}
                                />
                            ))}
                        </div>

                    </div>

                    <div className="mt-4 bg-blue-500/10 p-3 rounded-lg border border-blue-500/20 text-center">
                        <ChalkText size="base" className="text-gray-300">
                            “漏斗式”引导，<span className="text-blue-300 font-bold mx-1">拒绝分心</span>
                        </ChalkText>
                    </div>
                </motion.div>
            )}
        </div>

      </div>

      {/* Step 3: Conclusion Badge */}
      {step >= 3 && (
          <motion.div 
            initial={{ scale: 0, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            className="absolute bottom-8 z-20 bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 rounded-full shadow-2xl border-2 border-white/20 flex items-center gap-4"
          >
              <div className="bg-white p-2 rounded-full">
                  <CheckCircle2 size={24} className="text-purple-600" />
              </div>
              <div>
                  <ChalkText size="lg" className="font-bold text-white">即使是弱模型也能拿高分</ChalkText>
                  <ChalkText size="base" className="text-purple-200">High Accuracy for All Models</ChalkText>
              </div>
          </motion.div>
      )}

    </div>
  );
};