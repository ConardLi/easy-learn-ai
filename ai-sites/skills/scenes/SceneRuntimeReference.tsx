import React from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { 
  GitBranch, 
  Search, 
  FileText, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  XCircle 
} from 'lucide-react';

export const SceneRuntimeReference: React.FC<SceneProps> = ({ step }) => {
  // Steps:
  // 0: Title & Concept "Dynamic Loading"
  // 1: The Trigger (User Intent)
  // 2: The Branching (Visualizing the split)
  // 3: The Selection (Loading one, ignoring other)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center max-w-7xl px-4 relative overflow-hidden">
        
        {/* Background Grid for Blueprint feel */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        </div>

        {/* Header */}
        <motion.div 
            initial={{ y: -50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            className="mb-12 text-center z-10"
        >
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 px-4 py-1 rounded-full border border-yellow-500/30 text-yellow-300 text-sm font-mono mb-4">
                <Clock size={14} />
                <span>Runtime / Execution Time</span>
            </div>
            <ChalkText as="h2" size="2xl" color="white">第三层：动态加载 (Reference)</ChalkText>
            <ChalkText size="lg" className="text-gray-400 mt-2">只有在“真正干活”时，才查阅对应手册</ChalkText>
        </motion.div>

        {/* Main Diagram */}
        <div className="relative w-full max-w-5xl flex items-center justify-between min-h-[400px] z-10">
            
            {/* LEFT: User Input */}
            <motion.div 
                className="w-1/4 flex flex-col items-center z-20"
                initial={{ x: -50, opacity: 0 }}
                animate={step >= 1 ? { x: 0, opacity: 1 } : { opacity: 0.3, filter: 'blur(5px)' }}
            >
                <div className="bg-blue-600 text-white p-6 rounded-2xl rounded-tr-none shadow-lg border-2 border-blue-400 mb-4 relative">
                    <ChalkText size="lg" className="font-bold">"分析 Excel"</ChalkText>
                    <div className="absolute -bottom-3 -left-3 bg-blue-800 text-xs px-2 py-1 rounded border border-blue-500">
                        User Intent
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2 text-gray-400">
                     <ArrowRight size={24} className="rotate-90 md:rotate-0" />
                </div>
            </motion.div>

            {/* CENTER: The Router / Brain Decision */}
            <motion.div 
                className="w-1/4 flex flex-col items-center z-20"
                initial={{ scale: 0 }}
                animate={step >= 2 ? { scale: 1 } : { scale: 0 }}
            >
                <div className="w-24 h-24 bg-[#1e1e24] border-4 border-white/20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] relative">
                    <GitBranch size={40} className="text-purple-400" />
                    {step >= 2 && (
                        <motion.div 
                            className="absolute -inset-2 border-2 border-dashed border-purple-500/50 rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        />
                    )}
                </div>
                <ChalkText size="base" className="mt-4 text-purple-300 font-mono">Route Dispatcher</ChalkText>
            </motion.div>

            {/* RIGHT: The Documents (Branching) */}
            <div className="w-1/3 flex flex-col gap-8 relative z-20">
                
                {/* SVG Connections (Drawn dynamically) */}
                <svg className="absolute top-0 -left-full w-full h-full pointer-events-none overflow-visible">
                    {/* Top Path (Correct) */}
                    <motion.path 
                        d="M 100% 50% C 150% 50%, 150% 20%, 200% 20%" 
                        fill="none" 
                        stroke={step >= 3 ? "#facc15" : "#555"} 
                        strokeWidth={step >= 3 ? 4 : 2}
                        strokeDasharray={step >= 3 ? "0" : "10 5"}
                        initial={{ pathLength: 0 }}
                        animate={step >= 2 ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: 1 }}
                    />
                    {/* Bottom Path (Ignored) */}
                    <motion.path 
                        d="M 100% 50% C 150% 50%, 150% 80%, 200% 80%" 
                        fill="none" 
                        stroke={step >= 2 ? "#555" : "transparent"} 
                        strokeWidth="2"
                        strokeDasharray="10 5"
                        initial={{ pathLength: 0 }}
                        animate={step >= 2 ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: 1 }}
                    />
                </svg>

                {/* Doc 1: Analysis (Active) */}
                <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    animate={step >= 2 ? { x: 0, opacity: 1 } : {}}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-500 ${step >= 3 ? 'bg-yellow-900/20 border-yellow-400 scale-105 shadow-[0_0_30px_rgba(250,204,21,0.2)]' : 'bg-[#1e1e24] border-gray-700 opacity-50'}`}
                >
                    <div className="flex items-center gap-4">
                        <FileText size={32} className={step >= 3 ? "text-yellow-400" : "text-gray-500"} />
                        <div>
                            <div className={`font-mono font-bold ${step >= 3 ? "text-yellow-200" : "text-gray-400"}`}>analyze.md</div>
                            <div className="text-xs text-gray-500">Reference Doc</div>
                        </div>
                        {step >= 3 && <CheckCircle2 size={24} className="ml-auto text-green-400" />}
                    </div>
                </motion.div>

                {/* Doc 2: Create (Inactive) */}
                <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    animate={step >= 2 ? { x: 0, opacity: 1 } : {}}
                    className={`relative p-4 rounded-xl border-2 border-gray-800 bg-[#1e1e24] transition-all duration-500 ${step >= 3 ? 'opacity-30 grayscale' : 'opacity-50'}`}
                >
                    <div className="flex items-center gap-4">
                        <FileText size={32} className="text-gray-600" />
                        <div>
                            <div className="font-mono font-bold text-gray-500">create.md</div>
                            <div className="text-xs text-gray-600">Reference Doc</div>
                        </div>
                        {step >= 3 && <XCircle size={24} className="ml-auto text-gray-600" />}
                    </div>
                </motion.div>

            </div>

        </div>

        {/* Footer Summary */}
        {step >= 3 && (
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mt-8 bg-black/40 px-8 py-4 rounded-lg border-l-4 border-yellow-500 backdrop-blur-sm max-w-2xl"
            >
                 <ChalkText size="lg" className="text-gray-300">
                    Claude 识别意图后，<span className="text-yellow-300 font-bold mx-1">只会查阅</span> 
                    相关的 Reference，其他无关文档 
                    <span className="text-red-400 font-bold mx-1">完全不会加载</span>。
                 </ChalkText>
            </motion.div>
        )}
    </div>
  );
};