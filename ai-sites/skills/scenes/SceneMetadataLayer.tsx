import React from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { List, Power, Scale, MessageSquare, Brain, CheckCircle2, HelpCircle, FileJson } from 'lucide-react';

export const SceneMetadataLayer: React.FC<SceneProps> = ({ step }) => {
  // Steps:
  // 0: Title "Layer 1: Metadata"
  // 1: When & What (Startup + JSON snippet)
  // 2: Why (Low Cost + Notification)
  // 3: Result (Knows What, Not How)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center max-w-6xl px-4">
        
        {/* Header */}
        <motion.div 
            initial={{ y: -30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            className="mb-8 md:mb-12 text-center"
        >
            <div className="inline-block bg-white/10 px-4 py-1 rounded-full text-gray-400 text-sm font-mono mb-2 border border-white/10">
                Layer 01
            </div>
            <ChalkText as="h2" size="2xl" color="white">第一层：先看目录 (Metadata)</ChalkText>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-8">
            
            {/* Card 1: Time & Content */}
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={step >= 1 ? { x: 0, opacity: 1 } : {}}
                className="bg-[#1e1e24] p-6 rounded-2xl border border-gray-700 shadow-xl flex flex-col gap-6 relative overflow-hidden"
            >
                {/* Background Decor */}
                <FileJson className="absolute -right-4 -bottom-4 text-white/5 w-32 h-32 rotate-12" />

                {/* When */}
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-300">
                            <Power size={24} />
                        </div>
                        <ChalkText size="xl" className="font-bold text-blue-200">什么时候加载？</ChalkText>
                    </div>
                    <ChalkText size="lg" className="text-gray-300 pl-11">
                        系统刚启动的时候
                    </ChalkText>
                </div>

                {/* What */}
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-300">
                            <List size={24} />
                        </div>
                        <ChalkText size="xl" className="font-bold text-yellow-200">加载什么？</ChalkText>
                    </div>
                    
                    {/* Code Snippet */}
                    <div className="bg-black/40 rounded-lg p-4 font-mono text-sm text-gray-400 border border-white/10 relative z-10">
                        <div className="text-gray-500 mb-1">// 只加载名字和描述</div>
                        <div><span className="text-purple-400">name</span>: <span className="text-green-400">"excel-tool"</span></div>
                        <div><span className="text-purple-400">desc</span>: <span className="text-green-400">"Handle spreadsheets..."</span></div>
                        <div className="mt-2 text-gray-600 italic">... (Content omitted)</div>
                    </div>
                </div>
            </motion.div>

            {/* Card 2: Utility & Cost */}
            <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={step >= 2 ? { x: 0, opacity: 1 } : {}}
                className="bg-[#1e1e24] p-6 rounded-2xl border border-gray-700 shadow-xl flex flex-col gap-6"
            >
                {/* Utility */}
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-500/20 rounded-lg text-green-300">
                            <Scale size={24} />
                        </div>
                        <ChalkText size="xl" className="font-bold text-green-200">有什么用？</ChalkText>
                    </div>
                    <div className="pl-11 mb-4">
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-green-400">~200</span>
                            <span className="text-gray-400 text-lg">Tokens</span>
                        </div>
                        <div className="text-xs text-green-500/70 uppercase tracking-widest font-bold mt-1">Extremely Lightweight</div>
                    </div>

                    {/* Dialogue Bubble */}
                    <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl relative ml-4">
                        <div className="absolute -left-2 top-4 w-4 h-4 bg-[#1e1e24] border-l border-b border-blue-500/30 rotate-45 transform" />
                        <div className="flex gap-3">
                            <MessageSquare size={20} className="text-blue-400 shrink-0 mt-1" />
                            <ChalkText size="base" className="text-blue-100 italic">
                                "Hey Claude，你的工具箱里有 <span className="text-yellow-300">查周报</span>、<span className="text-yellow-300">处理 Excel</span> 这几个工具哦。"
                            </ChalkText>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>

        {/* Footer: Result State */}
        {step >= 3 && (
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.4 }}
                className="w-full bg-gradient-to-r from-purple-900/40 to-indigo-900/40 p-6 rounded-2xl border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm"
            >
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <Brain size={64} className="text-purple-300" />
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1"
                        >
                            <CheckCircle2 size={16} className="text-black" />
                        </motion.div>
                    </div>
                    <div>
                        <ChalkText size="xl" className="font-bold text-white mb-1">
                            结果：Claude 知道自己“会什么”
                        </ChalkText>
                        <div className="flex items-center gap-2 text-white/50">
                            <HelpCircle size={18} />
                            <span className="text-lg">但还不知道“具体怎么做”</span>
                        </div>
                    </div>
                </div>

                <div className="h-12 w-px bg-white/10 hidden md:block" />

                <div className="text-right opacity-60">
                    <div className="text-sm text-gray-400">Current Context Load</div>
                    <div className="text-2xl font-mono text-green-400">Low</div>
                </div>
            </motion.div>
        )}

    </div>
  );
};