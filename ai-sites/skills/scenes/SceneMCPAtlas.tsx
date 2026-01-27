import React from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { Brain, Map, Activity, Target, Trophy, XCircle } from 'lucide-react';

export const SceneMCPAtlas: React.FC<SceneProps> = ({ step }) => {
  // Steps:
  // 0: Attention Drop Problem (Brain overloaded)
  // 1: MCP Atlas Intro (Map/Grid)
  // 2: The Complexity (40 Servers, 300 Tools)
  // 3: The Results (Bar Chart: Opus 4.5 vs Others)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center max-w-7xl px-4 relative">

        {/* Header */}
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center z-10"
        >
             <ChalkText as="h2" size="2xl" color="white">
                更深层的问题：注意力涣散
             </ChalkText>
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 w-full flex items-center justify-center relative min-h-[500px]">

            {/* STEP 0: ATTENTION DROP */}
            {step === 0 && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex flex-col items-center relative"
                >
                    <div className="relative w-48 h-48 flex items-center justify-center">
                        <Brain size={100} className="text-gray-400 opacity-50" />
                        
                        {/* Swarming Icons */}
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-yellow-500/50"
                                initial={{ x: 0, y: 0 }}
                                animate={{ 
                                    x: (Math.random() - 0.5) * 300,
                                    y: (Math.random() - 0.5) * 300,
                                    rotate: Math.random() * 360
                                }}
                                transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
                            >
                                <Target size={20} />
                            </motion.div>
                        ))}
                        
                        {/* Confusion Marks */}
                        <motion.div 
                            className="absolute -top-10 -right-10 text-red-400 font-bold text-6xl font-serif"
                            animate={{ opacity: [0, 1, 0], y: -20 }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            ?
                        </motion.div>
                    </div>
                    
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mt-8 bg-red-900/30 p-6 rounded-xl border border-red-500/30 text-center"
                    >
                        <div className="flex items-center gap-2 text-red-300 font-bold text-xl mb-2 justify-center">
                            <Activity className="animate-pulse" />
                            <span>Attention Drop</span>
                        </div>
                        <ChalkText size="lg" className="text-gray-300">
                            连接过多 Server 导致模型<br/>降低工具调用的准确性
                        </ChalkText>
                    </motion.div>
                </motion.div>
            )}

            {/* STEP 1 & 2: MCP ATLAS SETUP */}
            {step >= 1 && step < 3 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full flex flex-col items-center"
                >
                    {/* The Atlas Map Visual */}
                    <div className="relative w-full max-w-4xl h-[300px] bg-[#1e1e24] border-2 border-blue-500/30 rounded-2xl p-4 overflow-hidden grid grid-cols-8 grid-rows-5 gap-2 opacity-80">
                         {[...Array(40)].map((_, i) => (
                             <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.02 }}
                                className="bg-blue-500/10 border border-blue-500/20 rounded flex items-center justify-center"
                             >
                                 <div className="w-2 h-2 rounded-full bg-blue-400/50" />
                             </motion.div>
                         ))}
                         
                         {/* Overlay Title */}
                         <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                             <div className="text-center">
                                 <div className="flex items-center justify-center gap-4 mb-2">
                                     <Map size={48} className="text-blue-300" />
                                     <ChalkText size="4xl" className="font-bold text-white">MCP Atlas</ChalkText>
                                 </div>
                                 <ChalkText size="lg" className="text-blue-200">Tool Accuracy Benchmark</ChalkText>
                             </div>
                         </div>
                    </div>

                    {/* Step 2: Stats */}
                    {step >= 2 && (
                        <div className="flex gap-8 mt-12">
                             <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="bg-white/10 p-6 rounded-2xl border border-white/20 text-center"
                             >
                                 <div className="text-4xl font-bold text-yellow-400 font-mono">40+</div>
                                 <div className="text-gray-400 mt-1">MCP Servers</div>
                             </motion.div>
                             <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white/10 p-6 rounded-2xl border border-white/20 text-center"
                             >
                                 <div className="text-4xl font-bold text-red-400 font-mono">300+</div>
                                 <div className="text-gray-400 mt-1">Tools</div>
                             </motion.div>
                        </div>
                    )}
                </motion.div>
            )}

            {/* STEP 3: RESULTS CHART */}
            {step >= 3 && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-4xl flex flex-col items-center"
                >
                     <div className="w-full flex items-end justify-center gap-16 h-[400px] border-b-2 border-gray-600 pb-4 px-12 relative">
                         
                         {/* Grid Lines */}
                         <div className="absolute inset-0 pointer-events-none flex flex-col justify-between opacity-20">
                             <div className="border-t border-gray-400 w-full" />
                             <div className="border-t border-gray-400 w-full" />
                             <div className="border-t border-gray-400 w-full" />
                             <div className="border-t border-gray-400 w-full" />
                             <div className="border-t border-gray-400 w-full" />
                         </div>

                         {/* Bar 1: Others */}
                         <div className="flex flex-col items-center gap-4 w-32 relative z-10">
                             <div className="text-xl font-bold text-red-400">{'<'} 50%</div>
                             <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: '200px' }} // Approx 50% of 400px
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="w-full bg-red-900/50 border-t-4 border-red-500 rounded-t-lg relative group"
                             >
                                <div className="absolute inset-0 bg-red-500/10 animate-pulse" />
                             </motion.div>
                             <ChalkText size="lg" className="text-gray-400">Others</ChalkText>
                             <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity">
                                <XCircle className="text-red-500" size={32} />
                             </div>
                         </div>

                         {/* Bar 2: Claude Opus 4.5 */}
                         <div className="flex flex-col items-center gap-4 w-40 relative z-10">
                             <div className="flex items-center gap-2">
                                <Trophy size={20} className="text-yellow-400" />
                                <div className="text-2xl font-bold text-yellow-400">62%</div>
                             </div>
                             <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: '248px' }} // 62% of 400px
                                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                                className="w-full bg-blue-600/50 border-t-4 border-yellow-400 rounded-t-lg relative overflow-hidden"
                             >
                                 <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-blue-500/20" />
                             </motion.div>
                             <div className="text-center">
                                <ChalkText size="lg" className="font-bold text-white">Claude Opus</ChalkText>
                                <div className="text-xs text-blue-300 font-mono">v4.5</div>
                             </div>
                         </div>

                     </div>

                     <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="mt-8 bg-black/40 px-6 py-3 rounded-full border border-gray-600 backdrop-blur-md"
                     >
                         <ChalkText size="lg" className="text-gray-300">
                             即使是最强模型，在复杂环境中也<span className="text-red-400 font-bold mx-2">很难及格</span>
                         </ChalkText>
                     </motion.div>
                </motion.div>
            )}

        </div>
    </div>
  );
};