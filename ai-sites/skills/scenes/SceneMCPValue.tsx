import React from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { Network, Globe, Database, Plug, CheckCircle2, XCircle } from 'lucide-react';

export const SceneMCPValue: React.FC<SceneProps> = ({ step }) => {
  // Steps:
  // 0: Title & Core Value Statement
  // 1: What it is NOT (Prompt Stuffing) vs What it IS (Standard Interface)
  // 2: The Universal Connector (Platforms connecting)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center max-w-7xl px-4 relative">
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#4ade80 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Header */}
      <motion.div 
        initial={{ y: -30, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        className="mb-12 text-center z-10"
      >
        <div className="inline-block bg-purple-500/10 px-4 py-1 rounded-full text-purple-300 text-sm font-mono mb-4 border border-purple-500/30">
            Protocol Layer
        </div>
        <ChalkText as="h2" size="2xl" color="white">MCP 协议层的价值不可替代</ChalkText>
      </motion.div>

      <div className="flex w-full flex-col items-center gap-12 z-10">
        
        {/* Step 1: Contrast - Not Prompt, But Interface */}
        {step >= 1 && (
            <div className="flex items-center justify-center gap-8 md:gap-16 w-full">
                
                {/* The "Wrong" View */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 0.5, x: 0 }} // Dimmed to show it's not the point
                    className="flex flex-col items-center gap-2 grayscale"
                >
                    <div className="w-32 h-24 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center relative">
                        <div className="text-gray-500 text-xs text-center p-2">
                            System Prompt:<br/>...tools definition...
                        </div>
                        <div className="absolute -top-3 -right-3 bg-[#1e1e24] rounded-full">
                            <XCircle size={24} className="text-gray-500" />
                        </div>
                    </div>
                    <div className="text-gray-500 font-bold strike-through decoration-gray-500 line-through">
                        塞进 Prompt
                    </div>
                </motion.div>

                {/* The "Right" View */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-2"
                >
                    <div className="w-40 h-32 bg-[#1e1e24] border-4 border-green-500 rounded-xl flex flex-col items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.3)] relative">
                        <Network size={48} className="text-green-400 mb-2" />
                        <div className="bg-green-900/50 px-2 py-1 rounded text-xs text-green-300 font-mono border border-green-500/30">
                            Protocol Spec
                        </div>
                        <div className="absolute -top-3 -right-3 bg-[#1e1e24] rounded-full">
                            <CheckCircle2 size={32} className="text-green-500" />
                        </div>
                    </div>
                    <ChalkText size="xl" className="font-bold text-green-300">
                        一套标准接口
                    </ChalkText>
                </motion.div>

            </div>
        )}

        {/* Step 2: Universal Connector */}
        {step >= 2 && (
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl bg-[#1e1e24]/80 border border-gray-700 p-8 rounded-3xl relative mt-8"
            >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                    <Globe size={18} />
                    统一 AI 连接世界的方式
                </div>

                <div className="flex items-center justify-around mt-6 relative">
                    
                    {/* Central Hub */}
                    <div className="flex flex-col items-center z-10">
                        <div className="w-24 h-24 bg-gray-800 rounded-full border-4 border-white/20 flex items-center justify-center">
                             <Plug size={40} className="text-white" />
                        </div>
                        <div className="mt-2 font-bold text-gray-400">Any Agent</div>
                    </div>

                    {/* Connection Lines Animation */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                         <motion.line 
                            x1="50%" y1="50%" x2="15%" y2="50%" 
                            stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 4"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
                         />
                         <motion.line 
                            x1="50%" y1="50%" x2="85%" y2="50%" 
                            stroke="#facc15" strokeWidth="2" strokeDasharray="4 4"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
                         />
                    </svg>

                    {/* Platform 1 */}
                    <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col items-center z-10 bg-[#1e1e24] p-4 rounded-xl border border-blue-500/30"
                    >
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-2">
                            <Database size={24} className="text-blue-400" />
                        </div>
                        <div className="font-bold text-blue-200">Notion</div>
                        <div className="text-xs text-gray-500">Universal Tool</div>
                    </motion.div>

                    {/* Platform 2 */}
                    <motion.div 
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-col items-center z-10 bg-[#1e1e24] p-4 rounded-xl border border-yellow-500/30"
                    >
                        <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-2">
                            <Globe size={24} className="text-yellow-400" />
                        </div>
                        <div className="font-bold text-yellow-200">高德地图</div>
                        <div className="text-xs text-gray-500">Universal Tool</div>
                    </motion.div>

                </div>
            </motion.div>
        )}

      </div>
    </div>
  );
};