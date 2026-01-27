import React from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { 
  Cpu, 
  Terminal, 
  FileText, 
  Edit, 
  Database, 
  Cloud, 
  Globe,
  Box, 
  GitBranch,
  ArrowDown,
  Zap
} from 'lucide-react';

export const SceneFutureLandscape: React.FC<SceneProps> = ({ step }) => {
  // Steps:
  // 0: Title
  // 1: Agent Core (Foundation)
  // 2: MCP Servers (Infrastructure/Remote)
  // 3: Skills (The Massive Workflow Layer)
  // 4: Orchestration (Skills controlling everything)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center max-w-7xl px-4 relative overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        {/* Header */}
        <motion.div 
            initial={{ y: -30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            className="mb-8 z-20 text-center"
        >
            <ChalkText as="h2" size="2xl" color="white">未来的格局</ChalkText>
        </motion.div>

        {/* Main Diagram Container */}
        <div className="relative w-full max-w-5xl h-[500px] flex flex-col justify-end items-center">
            
            {/* LAYER 1: AGENT CORE (Foundation / Center) */}
            <motion.div 
                className="z-20 mb-8 bg-[#1e1e24] border-2 border-blue-500 rounded-2xl p-6 w-full max-w-2xl shadow-[0_0_40px_rgba(59,130,246,0.2)] flex items-center gap-8 relative"
                initial={{ y: 100, opacity: 0 }}
                animate={step >= 1 ? { y: 0, opacity: 1 } : {}}
            >
                <div className="flex flex-col items-center gap-2 border-r border-gray-700 pr-8">
                    <Cpu size={48} className="text-blue-400" />
                    <ChalkText size="lg" className="font-bold text-blue-300">Agent Core</ChalkText>
                </div>
                
                <div className="flex-1 grid grid-cols-4 gap-4">
                    <CoreCapability icon={Terminal} label="bash" />
                    <CoreCapability icon={FileText} label="read" />
                    <CoreCapability icon={Edit} label="edit" />
                    <CoreCapability icon={FileText} label="write" />
                </div>

                {/* Annotation */}
                <div className="absolute -bottom-8 left-0 right-0 text-center text-gray-500 text-sm">
                    内置核心能力 (Native Capabilities)
                </div>
            </motion.div>


            {/* LAYER 2: MCP SERVERS (Infrastructure / Sides) */}
            <div className="absolute inset-x-0 bottom-20 flex justify-between px-4 md:px-12 pointer-events-none">
                {/* Left Pillar */}
                <motion.div 
                    className="flex flex-col items-center gap-2"
                    initial={{ x: -50, opacity: 0 }}
                    animate={step >= 2 ? { x: 0, opacity: 1 } : {}}
                >
                    <div className="bg-[#1e1e24] border border-gray-600 p-4 rounded-xl flex flex-col gap-4 opacity-70">
                        <div className="flex items-center gap-2 text-gray-400">
                            <Database size={20} /> <span className="text-sm">Database</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                            <Cloud size={20} /> <span className="text-sm">Cloud API</span>
                        </div>
                    </div>
                    <div className="text-center">
                        <ChalkText size="base" className="font-bold text-purple-400">通用 MCP</ChalkText>
                        <div className="text-xs text-gray-500">Infrastructure</div>
                    </div>
                </motion.div>

                {/* Right Pillar */}
                <motion.div 
                    className="flex flex-col items-center gap-2"
                    initial={{ x: 50, opacity: 0 }}
                    animate={step >= 2 ? { x: 0, opacity: 1 } : {}}
                >
                    <div className="bg-[#1e1e24] border border-gray-600 p-4 rounded-xl flex flex-col gap-4 opacity-70">
                         <div className="flex items-center gap-2 text-gray-400">
                            <Globe size={20} /> <span className="text-sm">SaaS</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                            <Zap size={20} /> <span className="text-sm">Remote</span>
                        </div>
                    </div>
                    <div className="text-center">
                        <ChalkText size="base" className="font-bold text-purple-400">远程连接</ChalkText>
                        <div className="text-xs text-gray-500">Connections</div>
                    </div>
                </motion.div>
            </div>


            {/* LAYER 3: SKILLS (Orchestration / Top) */}
            <motion.div 
                className="absolute top-10 w-full flex flex-col items-center z-30"
                initial={{ y: -50, opacity: 0 }}
                animate={step >= 3 ? { y: 0, opacity: 1 } : {}}
            >
                <div className="flex flex-wrap justify-center gap-3 max-w-3xl">
                    {/* A grid of "Skill Cards" */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className={`
                                flex items-center gap-2 px-4 py-3 rounded-lg border-2 shadow-lg bg-[#1e1e24]
                                ${i === 2 && step >= 4 ? 'border-yellow-400 ring-4 ring-yellow-400/20 scale-110 z-40' : 'border-yellow-600/30'}
                            `}
                        >
                            <Box size={18} className="text-yellow-400" />
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-gray-200">Workflow {i+1}</span>
                                <span className="text-[10px] text-gray-500">Standard SOP</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                <ChalkText size="lg" className="mt-4 text-yellow-300 font-bold bg-black/40 px-4 rounded">
                     大量 Skills (业务逻辑 & 流程)
                </ChalkText>
            </motion.div>


            {/* LAYER 4: ORCHESTRATION LINES */}
            {step >= 4 && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
                    <defs>
                        <marker id="arrow-yellow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#facc15" />
                        </marker>
                    </defs>

                    {/* Line from Skill to Core */}
                    <motion.path
                        d="M 50% 20% L 50% 70%" 
                        stroke="#facc15" 
                        strokeWidth="3" 
                        fill="none"
                        strokeDasharray="8 4"
                        markerEnd="url(#arrow-yellow)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8 }}
                    />
                    {/* Text on line */}
                    <foreignObject x="45%" y="40%" width="120" height="40">
                         <div className="bg-black/60 text-yellow-300 text-xs px-2 py-1 rounded text-center backdrop-blur-md border border-yellow-500/30">
                             调用核心能力
                         </div>
                    </foreignObject>


                    {/* Line from Skill to Left MCP */}
                    <motion.path
                        d="M 40% 20% C 20% 30%, 10% 60%, 15% 75%" 
                        stroke="#facc15" 
                        strokeWidth="2" 
                        fill="none"
                        strokeDasharray="4 4"
                        markerEnd="url(#arrow-yellow)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />
                     <foreignObject x="15%" y="45%" width="120" height="40">
                         <div className="bg-black/60 text-yellow-300 text-xs px-2 py-1 rounded text-center backdrop-blur-md border border-yellow-500/30">
                             连接 DB
                         </div>
                    </foreignObject>


                    {/* Line from Skill to Right MCP */}
                    <motion.path
                        d="M 60% 20% C 80% 30%, 90% 60%, 85% 75%" 
                        stroke="#facc15" 
                        strokeWidth="2" 
                        fill="none"
                        strokeDasharray="4 4"
                        markerEnd="url(#arrow-yellow)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />
                </svg>
            )}
            
            {/* Step 4: Big Teaching Label */}
            {step >= 4 && (
                <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute top-[40%] bg-yellow-900/80 text-white p-6 rounded-xl border border-yellow-500 shadow-[0_0_50px_rgba(234,179,8,0.4)] z-50 backdrop-blur-lg"
                >
                    <div className="flex items-center gap-3">
                        <GitBranch size={32} className="text-yellow-300" />
                        <div>
                            <ChalkText size="xl" className="font-bold">Skills 教 AI 怎么做事</ChalkText>
                            <div className="text-sm text-yellow-200 mt-1">
                                编排 MCP + 调度 Core + 连接知识
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

        </div>
    </div>
  );
};

// Helper for Core Capability
const CoreCapability = ({ icon: Icon, label }: { icon: any, label: string }) => (
    <div className="flex flex-col items-center gap-2 p-2 bg-gray-800 rounded border border-gray-700">
        <Icon size={20} className="text-gray-400" />
        <span className="text-xs font-mono text-gray-300">{label}</span>
    </div>
);
