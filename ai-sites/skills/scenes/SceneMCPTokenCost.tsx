import React from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { Github, Package, Flame, AlertTriangle, MessageSquare } from 'lucide-react';

export const SceneMCPTokenCost: React.FC<SceneProps> = ({ step }) => {
  // Steps:
  // 0: Github MCP Example (30+ Tools)
  // 1: The Math (30 * 500 = 15000)
  // 2: Multi-Server Reality (x3 or x5)
  // 3: The Contrast (Simple Hi vs Huge Bill)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center max-w-7xl px-4 relative">
      
      {/* Step 3: Background Flame Effect for burning money */}
      {step >= 3 && (
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
             <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-orange-900/50 via-red-900/10 to-transparent" />
        </div>
      )}

      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 md:mb-12 text-center z-10 flex-none mt-8"
      >
        <ChalkText as="h2" size="2xl" color="white">恐怖的 Token 消耗</ChalkText>
      </motion.div>

      {/* Main Content Stage - Using Flex for centering */}
      <div className="flex-1 w-full flex items-center justify-center relative z-10 min-h-[400px]">
        <LayoutGroup>
            <motion.div layout className="flex items-center justify-center gap-6 md:gap-12 flex-wrap md:flex-nowrap">
                
                {/* LEFT: Github MCP Visual */}
                <motion.div 
                    layout
                    className="flex flex-col items-center"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                >
                    <div className="relative">
                        <div className="w-32 h-32 md:w-40 md:h-40 bg-[#1e1e24] border-4 border-gray-600 rounded-2xl flex items-center justify-center shadow-2xl z-10 relative">
                            <Github size={64} className="text-white" />
                        </div>
                        
                        {/* Badge */}
                        <div className="absolute -top-4 -right-4 bg-purple-600 text-white font-bold px-3 py-1 rounded-full border-2 border-[#1e1e24] shadow-lg z-20">
                            Github MCP
                        </div>

                        {/* Exploding Tools Animation */}
                        {step >= 0 && (
                             <div className="absolute inset-0 pointer-events-none">
                                {[...Array(12)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute top-1/2 left-1/2 w-8 h-8 bg-gray-700 border border-gray-500 rounded flex items-center justify-center"
                                        initial={{ opacity: 0, scale: 0, x: -16, y: -16 }}
                                        animate={{ 
                                            opacity: [0, 1, 0], 
                                            scale: [0, 1, 0.8],
                                            x: (Math.random() - 0.5) * 300,
                                            y: (Math.random() - 0.5) * 300
                                        }}
                                        transition={{ 
                                            duration: 2, 
                                            repeat: Infinity, 
                                            delay: i * 0.2,
                                            ease: "circOut"
                                        }}
                                    >
                                        <Package size={14} className="text-blue-300" />
                                    </motion.div>
                                ))}
                             </div>
                        )}
                    </div>
                    
                    <div className="mt-6 text-center">
                         <ChalkText size="xl" className="font-bold">30+ Tools</ChalkText>
                         <ChalkText size="base" className="text-gray-400">inside one server</ChalkText>
                    </div>
                </motion.div>

                {/* CENTER: The Calculation */}
                {step >= 1 && (
                    <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.5, width: 0 }}
                        animate={{ opacity: 1, scale: 1, width: 'auto' }}
                        className="bg-black/40 p-6 rounded-xl border border-white/10 backdrop-blur-sm flex flex-col gap-2 shrink-0"
                    >
                        <div className="flex items-center gap-4 text-2xl md:text-3xl font-mono text-gray-300">
                            <span className="text-blue-400 font-bold">30</span> 
                            <span className="text-sm">tools</span>
                            <span>×</span> 
                            <span className="text-yellow-400 font-bold">500</span> 
                            <span className="text-sm">tokens</span>
                        </div>
                        <div className="h-px bg-white/20 w-full" />
                        <div className="text-right text-4xl md:text-5xl font-mono font-bold text-red-400">
                            = 15,000
                        </div>
                        <div className="text-right text-xs text-red-300/70 uppercase tracking-widest">
                            Context Load (Single Server)
                        </div>
                    </motion.div>
                )}

                {/* RIGHT: The Reality Multiplier */}
                {step >= 2 && (
                    <motion.div 
                        layout
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="bg-red-900/80 p-6 rounded-2xl border-2 border-red-500 shadow-[0_0_50px_rgba(220,38,38,0.5)] z-20 max-w-xs text-center shrink-0"
                    >
                         <div className="flex items-center justify-center gap-2 mb-2">
                             <AlertTriangle size={32} className="text-red-300 animate-bounce" />
                         </div>
                         <ChalkText size="xl" className="font-bold text-white mb-2">
                             真实环境<br/>不止一个
                         </ChalkText>
                         <div className="flex justify-center gap-2 mb-4">
                             {[1,2,3].map(i => (
                                 <div key={i} className="w-8 h-8 rounded bg-gray-700 border border-gray-500" />
                             ))}
                             <span className="self-end text-xl font-bold text-white">...</span>
                         </div>
                         <div className="text-3xl font-mono font-bold text-red-300 bg-black/30 rounded p-2">
                             {">"} 50,000 Tokens
                         </div>
                    </motion.div>
                )}

            </motion.div>
        </LayoutGroup>
      </div>

      {/* Step 3: The Ultimate Contrast */}
      {step >= 3 && (
          <motion.div 
             layout
             initial={{ y: 50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             className="w-full max-w-5xl bg-[#1e1e24] border-t-4 border-orange-500 rounded-xl shadow-2xl p-6 flex items-center justify-between gap-8 z-30 mb-8 md:mb-16"
          >
              <div className="flex flex-col gap-2">
                   <div className="text-gray-400 text-sm font-bold uppercase">User Input</div>
                   <div className="bg-blue-600 text-white px-4 py-2 rounded-lg rounded-tl-none inline-flex items-center gap-2 w-fit">
                       <MessageSquare size={16} />
                       "Hi"
                   </div>
                   <div className="text-xs text-blue-300 font-mono">Cost: ~5 Tokens</div>
              </div>

              <div className="flex-1 flex flex-col gap-2">
                   <div className="text-gray-400 text-sm font-bold uppercase text-right">System Overhead</div>
                   <div className="w-full h-8 bg-gray-800 rounded-full overflow-hidden relative border border-gray-600">
                       <motion.div 
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 to-orange-500"
                          initial={{ width: "0%" }}
                          animate={{ width: "98%" }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                       />
                       <div className="absolute inset-0 flex items-center justify-end px-4 font-mono font-bold text-white text-shadow">
                           50,000+ Tokens
                       </div>
                   </div>
                   <div className="text-xs text-red-400 font-mono text-right flex items-center justify-end gap-1">
                       <Flame size={12} />
                       <span>Burning Cash...</span>
                   </div>
              </div>
          </motion.div>
      )}

    </div>
  );
};