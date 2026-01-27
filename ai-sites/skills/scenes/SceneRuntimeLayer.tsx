import React from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { 
  Play, 
  BookOpen, 
  FileCode, 
  Terminal, 
  ArrowRight, 
  Split, 
  ShieldCheck, 
  XCircle,
  Cpu
} from 'lucide-react';

export const SceneRuntimeLayer: React.FC<SceneProps> = ({ step }) => {
  // Steps:
  // 0: Title "Layer 3: Runtime"
  // 1: When? (Execution Time)
  // 2: Reference (Branching Logic)
  // 3: Scripts (Black Box Execution & Token Saving)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center max-w-7xl px-4">
        
        {/* Header */}
        <motion.div 
            initial={{ y: -30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            className="mb-8 text-center"
        >
            <div className="inline-block bg-white/10 px-4 py-1 rounded-full text-gray-400 text-sm font-mono mb-2 border border-white/10">
                Layer 03
            </div>
            <ChalkText as="h2" size="2xl" color="white">第三层：动手干活 (Runtime)</ChalkText>
        </motion.div>

        <div className="flex flex-col gap-8 w-full">
            
            {/* ROW 1: WHEN & REFERENCE */}
            <div className="flex flex-col md:flex-row gap-8 w-full min-h-[250px]">
                
                {/* 1. When: Execution Time */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={step >= 1 ? { opacity: 1, x: 0 } : { opacity: 0.1, x: -50 }}
                    className="flex-1 bg-[#1e1e24] p-6 rounded-2xl border border-blue-500/30 flex flex-col justify-center items-center text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Cpu size={100} />
                    </div>
                    <div className="p-4 bg-blue-500/20 rounded-full text-blue-300 mb-4 animate-pulse">
                        <Play size={32} />
                    </div>
                    <ChalkText size="xl" className="font-bold text-blue-200 mb-2">什么时候加载？</ChalkText>
                    <ChalkText size="base" className="text-gray-300">
                        真正执行具体步骤的时候<br/>
                        (Execution Time)
                    </ChalkText>
                </motion.div>

                {/* 2. What: Reference Branching */}
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={step >= 2 ? { opacity: 1, x: 0 } : { opacity: 0.1, x: 50 }}
                    className="flex-[2] bg-[#1e1e24] p-6 rounded-2xl border border-yellow-500/30 relative flex flex-col"
                >
                    <div className="flex items-center gap-3 mb-6">
                         <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-300">
                             <Split size={24} />
                         </div>
                         <ChalkText size="xl" className="font-bold text-yellow-200">参考资料 (Reference)</ChalkText>
                    </div>

                    <div className="flex-1 flex items-center justify-between px-4 md:px-12 relative">
                         {/* Intent Source */}
                         <div className="flex flex-col items-center z-10">
                             <div className="bg-gray-700 px-4 py-2 rounded-lg border border-gray-500 text-sm mb-2">Intent</div>
                             <div className="font-bold text-white bg-blue-600 px-4 py-1 rounded">"Analyze"</div>
                         </div>

                         {/* Branching Paths */}
                         <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                             {/* Path to Analyze (Active) */}
                             <motion.path 
                                d="M 120 70 C 200 70, 200 30, 300 30" 
                                fill="none" 
                                stroke="#facc15" 
                                strokeWidth="3"
                                strokeDasharray="10 5"
                                initial={{ pathLength: 0 }}
                                animate={step >= 2 ? { pathLength: 1 } : { pathLength: 0 }}
                                transition={{ duration: 1 }}
                             />
                             {/* Path to Create (Inactive) */}
                             <path 
                                d="M 120 70 C 200 70, 200 110, 300 110" 
                                fill="none" 
                                stroke="#4b5563" 
                                strokeWidth="2" 
                                strokeDasharray="5 5"
                             />
                         </svg>

                         {/* Targets */}
                         <div className="flex flex-col gap-6 z-10 pl-8">
                             <motion.div 
                                initial={{ scale: 0.9, opacity: 0.5 }}
                                animate={step >= 2 ? { scale: 1.1, opacity: 1, borderColor: '#facc15' } : {}}
                                className="bg-gray-800 p-3 rounded border border-gray-600 flex items-center gap-3 w-40"
                             >
                                 <BookOpen size={18} className="text-yellow-400" />
                                 <div className="text-xs">
                                     <div className="font-bold text-yellow-200">analyze.md</div>
                                     <div className="text-[10px] text-gray-400">Loading...</div>
                                 </div>
                             </motion.div>

                             <div className="bg-gray-800/50 p-3 rounded border border-gray-700/50 flex items-center gap-3 w-40 opacity-40 grayscale">
                                 <BookOpen size={18} />
                                 <div className="text-xs">
                                     <div className="font-bold">create.md</div>
                                     <div className="text-[10px]">Ignored</div>
                                 </div>
                             </div>
                         </div>
                    </div>
                </motion.div>
            </div>

            {/* ROW 2: SCRIPTS (THE BIG FEATURE) */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={step >= 3 ? { opacity: 1, y: 0 } : { opacity: 0.1, y: 50 }}
                className="w-full bg-[#1e1e24] p-6 md:p-8 rounded-2xl border border-green-500/30 shadow-2xl relative"
            >
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/20 rounded-lg text-green-300">
                             <Terminal size={24} />
                        </div>
                        <ChalkText size="xl" className="font-bold text-green-200">脚本 (Scripts)</ChalkText>
                    </div>
                    <div className="bg-green-900/30 px-3 py-1 rounded border border-green-500/30 text-green-300 text-xs font-bold uppercase flex items-center gap-2">
                        <ShieldCheck size={14} />
                        Token Safe
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4 md:gap-12 relative">
                    
                    {/* 1. The Heavy Code File */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="relative">
                            <FileCode size={64} className="text-gray-500" />
                            <div className="absolute -bottom-2 -right-2 bg-gray-700 text-white text-[10px] px-1 rounded border border-gray-500">
                                2MB
                            </div>
                        </div>
                        <div className="text-sm text-gray-400 text-center">
                            process_data.py<br/>
                            <span className="text-xs text-red-400">(Huge File)</span>
                        </div>
                    </div>

                    {/* The Barrier / Filter */}
                    <div className="flex flex-col items-center justify-center relative w-32">
                        {/* Allowed Path (Execution) */}
                        <motion.div 
                            className="absolute top-1/2 left-0 w-full h-1 bg-green-500/50"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        />
                        <div className="bg-[#1e1e24] border-2 border-red-500 rounded-full p-2 z-10 shadow-lg">
                            <XCircle size={24} className="text-red-500" />
                        </div>
                        <div className="text-[10px] text-red-400 mt-1 font-bold bg-[#1e1e24] px-2 relative z-10">
                            READ BLOCKED
                        </div>
                    </div>

                    {/* 2. The AI Executor */}
                    <div className="bg-gray-800 p-4 rounded-xl border border-gray-600 flex flex-col gap-2 min-w-[200px]">
                        <div className="flex items-center gap-2 border-b border-gray-700 pb-2 mb-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"/>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                            <span className="text-xs text-gray-400 font-mono">Terminal</span>
                        </div>
                        <div className="font-mono text-xs text-green-400">
                            $ python process_data.py
                        </div>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="font-mono text-xs text-gray-300 mt-1"
                        >
                            {">"} Processing... Done.<br/>
                            {">"} Output: result.csv generated.
                        </motion.div>
                    </div>

                    {/* Result Arrow */}
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.5 }}
                        className="text-gray-500"
                    >
                        <ArrowRight size={24} />
                    </motion.div>

                    {/* 3. The Context Window (Clean) */}
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <div className="w-16 h-16 rounded-full border-2 border-green-400 flex items-center justify-center bg-green-400/10 shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                            <span className="font-bold text-green-300 text-xs">Context</span>
                        </div>
                        <div className="text-xs text-green-400 font-bold text-center">
                            Received Result<br/>ONLY
                        </div>
                    </motion.div>

                </div>

            </motion.div>
            
        </div>
    </div>
  );
};