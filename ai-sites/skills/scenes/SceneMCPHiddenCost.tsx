import React from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { Server, Brain, FileJson, AlertTriangle, Database, Globe, HardDrive } from 'lucide-react';

export const SceneMCPHiddenCost: React.FC<SceneProps> = ({ step }) => {
  // Steps:
  // 0: Title "The Hidden Cost"
  // 1: The Setup (Agent connected to multiple MCPs)
  // 2: The Illusion (Looks like it works on demand)
  // 3: The Reality (Tool Definitions Flooding Context)

  const servers = [
    { id: 'db', label: 'Database MCP', icon: Database, color: 'blue', x: -180, y: 50 },
    { id: 'web', label: 'Search MCP', icon: Globe, color: 'green', x: 0, y: 100 },
    { id: 'fs', label: 'Filesystem MCP', icon: HardDrive, color: 'yellow', x: 180, y: 50 },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center max-w-6xl px-4 relative">
        
        {/* Header */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center z-10"
        >
             <ChalkText as="h2" size="2xl" color="white">
                MCP 的“隐形成本”
             </ChalkText>
             {step >= 3 && (
                 <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-red-400 font-bold text-xl bg-red-900/20 inline-block px-4 py-1 rounded"
                 >
                     Context Overhead
                 </motion.div>
             )}
        </motion.div>

        {/* Main Diagram */}
        <div className="relative w-full h-[500px] flex items-center justify-center">
            
            {/* The Brain (Context Window) */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                <div className="relative w-40 h-40">
                    <motion.div 
                        className={`w-full h-full bg-[#1e1e24] border-4 rounded-full flex items-center justify-center z-20 relative overflow-hidden transition-colors duration-500 ${step >= 3 ? 'border-red-500 shadow-[0_0_50px_rgba(220,38,38,0.5)]' : 'border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.3)]'}`}
                    >
                        <Brain size={64} className={step >= 3 ? "text-red-300" : "text-purple-300"} />
                        
                        {/* Filling Effect (The Cost) */}
                        {step >= 3 && (
                            <motion.div 
                                className="absolute bottom-0 left-0 right-0 bg-red-500/30 z-0"
                                initial={{ height: '0%' }}
                                animate={{ height: '80%' }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                        )}
                    </motion.div>
                    
                    {/* Capacity Indicator */}
                    {step >= 3 && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute -right-12 top-0 bg-red-600 text-white font-bold px-2 py-1 rounded text-xs animate-bounce"
                        >
                            High Load!
                        </motion.div>
                    )}
                </div>
                <ChalkText size="lg" className="mt-4 text-gray-300">LLM Context</ChalkText>
            </div>

            {/* The MCP Servers */}
            {servers.map((server, i) => (
                <motion.div
                    key={server.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={step >= 1 ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.1 }}
                    className="absolute z-10 flex flex-col items-center"
                    style={{ 
                        left: `calc(50% + ${server.x}px)`, 
                        top: `calc(50% + ${server.y}px)` 
                    }}
                >
                    {/* Connection Line */}
                    <svg className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-1 h-[200px] overflow-visible pointer-events-none -z-10">
                        <line x1="0" y1="200" x2={-server.x * 0.8} y2="-100" stroke="#555" strokeWidth="2" strokeDasharray="4 4" />
                        
                        {/* Data Flow Animation (The Injection) */}
                        {step >= 3 && (
                            <motion.g>
                                {[...Array(5)].map((_, idx) => (
                                    <motion.rect 
                                        key={idx}
                                        width="20" height="14" rx="2" fill={server.color === 'blue' ? '#60a5fa' : server.color === 'green' ? '#4ade80' : '#facc15'}
                                        initial={{ y: 200, x: -10, opacity: 0 }}
                                        animate={{ 
                                            y: -100, 
                                            x: -server.x * 0.8 - 10,
                                            opacity: [0, 1, 1, 0] 
                                        }}
                                        transition={{ 
                                            duration: 1.5, 
                                            repeat: Infinity, 
                                            delay: idx * 0.3 + i * 0.2,
                                            ease: "linear" 
                                        }}
                                    />
                                ))}
                            </motion.g>
                        )}
                    </svg>

                    <div className={`w-24 h-24 bg-[#1e1e24] border-2 border-${server.color}-500 rounded-xl flex flex-col items-center justify-center shadow-lg relative`}>
                        <server.icon size={32} className={`text-${server.color}-400 mb-2`} />
                        
                        {/* Tool Count Badge */}
                        <div className="bg-gray-800 text-gray-400 text-[10px] px-2 py-0.5 rounded border border-gray-600">
                            20 Tools
                        </div>
                    </div>
                    <ChalkText size="base" className={`mt-2 font-bold text-${server.color}-300 bg-black/50 px-2 rounded`}>
                        {server.label}
                    </ChalkText>

                    {/* JSON Schema Bubbles popping out */}
                    {step >= 3 && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute -top-12 bg-gray-800 p-2 rounded border border-gray-600 shadow-xl z-20 w-32"
                        >
                            <div className="flex items-center gap-1 text-[10px] text-gray-400 mb-1 border-b border-gray-700 pb-1">
                                <FileJson size={10} />
                                <span>tools_schema.json</span>
                            </div>
                            <div className="space-y-1">
                                <div className="h-1 bg-gray-600 rounded w-full" />
                                <div className="h-1 bg-gray-600 rounded w-full" />
                                <div className="h-1 bg-gray-600 rounded w-3/4" />
                                <div className="h-1 bg-gray-600 rounded w-full" />
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            ))}

            {/* Step 2: The Illusion Text */}
            {step === 2 && (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute top-[40%] bg-blue-900/80 p-6 rounded-xl border border-blue-500/50 backdrop-blur-md max-w-lg text-center z-30"
                >
                    <ChalkText size="xl" className="text-white mb-2">
                        看起来是“按需加载”？
                    </ChalkText>
                    <ChalkText size="base" className="text-blue-200">
                        用户需要数据库时，才调用 Database MCP...
                    </ChalkText>
                </motion.div>
            )}

        </div>

        {/* Footer: The Explanation */}
        {step >= 3 && (
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mt-8 bg-black/40 px-6 py-4 rounded-xl border-l-4 border-red-500 backdrop-blur-sm max-w-3xl flex items-start gap-4"
            >
                <div className="mt-1">
                    <AlertTriangle size={24} className="text-red-400" />
                </div>
                <div>
                    <ChalkText size="lg" className="text-white font-bold mb-1">
                        必须一次性注入完整定义
                    </ChalkText>
                    <ChalkText size="base" className="text-gray-300">
                        为了让 AI 知道它“有什么能力”，每一个连接的 MCP Server 必须在对话开始前，
                        将<span className="text-red-300 font-bold mx-1">所有工具的完整 Schema</span> 塞入 Context。
                    </ChalkText>
                </div>
            </motion.div>
        )}

    </div>
  );
};