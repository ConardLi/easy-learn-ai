import React from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { FileCode, Package, Folder, ArrowRight, Download, Play } from 'lucide-react';

export const SceneProgrammingAnalogy: React.FC<SceneProps> = ({ step }) => {
  // Steps:
  // 0: Intro text (If you code...)
  // 1: Main logic (We don't write everything)
  // 2: The Import (import xxx)
  // 3: The Source (node_modules)
  // 4: Execution Flow (Fetch & Run)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center max-w-6xl px-4">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="bg-white/10 p-3 rounded-full inline-block mb-4">
            <FileCode size={40} className="text-blue-300" />
        </div>
        <ChalkText as="h2" size="2xl" color="white">程序员视角的理解</ChalkText>
      </motion.div>

      <div className="flex w-full items-start justify-center gap-8 md:gap-16">
        
        {/* Left: The Code Editor */}
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={step >= 0 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            className="flex-1 max-w-xl"
        >
            <div className="bg-[#1e1e1e] rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
                {/* Editor Header */}
                <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-gray-700">
                    <div className="w-3 h-3 rounded-full bg-red-500"/>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                    <div className="w-3 h-3 rounded-full bg-green-500"/>
                    <span className="ml-2 text-xs text-gray-400 font-mono">index.ts</span>
                </div>

                {/* Editor Body */}
                <div className="p-6 font-mono text-sm md:text-lg leading-relaxed text-gray-300 relative min-h-[300px]">
                    
                    {/* Step 2: Import Statement */}
                    {step >= 2 && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="text-purple-400 mb-6 bg-purple-500/10 -mx-6 px-6 py-2 border-l-4 border-purple-500"
                        >
                            import <span className="text-yellow-300">{`{ WeatherSkill }`}</span> from <span className="text-green-300">'node_modules'</span>;
                        </motion.div>
                    )}

                    <div className="opacity-50">
                        <span className="text-blue-400">const</span> app = <span className="text-blue-400">new</span> Application();
                    </div>
                    
                    {/* Step 1: Core Logic Text */}
                    {step >= 1 && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="my-4 p-2 border border-dashed border-gray-600 rounded bg-gray-800/50"
                        >
                            <span className="text-gray-500">// 我们只写核心业务逻辑</span><br/>
                            <span className="text-gray-500">// We write core logic here</span>
                            <br/>
                            app.init();
                        </motion.div>
                    )}

                    {/* Step 4: Invocation */}
                    {step >= 4 && (
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mt-4"
                        >
                             <span className="text-gray-500">// 调用外部能力 Call external skill</span><br/>
                             <span className="text-purple-300">await</span> WeatherSkill.<span className="text-yellow-300">execute</span>();
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Step 1 Annotation */}
            {step === 1 && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-center"
                >
                    <ChalkText size="lg" className="text-gray-400">并不一定所有代码都是我们自己写的</ChalkText>
                </motion.div>
            )}
        </motion.div>

        {/* Right: The Node Modules / Package */}
        <div className="flex-1 max-w-sm flex flex-col justify-center h-full pt-12">
             
             {/* Step 3: node_modules visualization */}
             {step >= 3 && (
                 <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative bg-[#252526] p-6 rounded-xl border border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.1)]"
                 >
                    <div className="absolute -top-4 -left-4 bg-yellow-600 text-white px-3 py-1 rounded text-sm font-bold flex items-center gap-2">
                        <Folder size={16} />
                        node_modules
                    </div>

                    <div className="space-y-3 mt-2">
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded border border-white/5">
                            <Package size={24} className="text-blue-400" />
                            <div className="flex-1">
                                <div className="h-2 w-16 bg-white/20 rounded mb-1"/>
                                <div className="h-2 w-24 bg-white/10 rounded"/>
                            </div>
                        </div>
                        <motion.div 
                            className="flex items-center gap-3 p-3 bg-yellow-500/10 rounded border border-yellow-500/50"
                            animate={step >= 4 ? { scale: 1.05, borderColor: '#facc15' } : {}}
                        >
                            <Package size={24} className="text-yellow-400" />
                            <div className="flex-1">
                                <div className="font-mono text-yellow-200 text-sm">weather-skill</div>
                                <div className="text-xs text-white/30">External Capability</div>
                            </div>
                        </motion.div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded border border-white/5">
                            <Package size={24} className="text-green-400" />
                            <div className="flex-1">
                                <div className="h-2 w-20 bg-white/20 rounded mb-1"/>
                                <div className="h-2 w-12 bg-white/10 rounded"/>
                            </div>
                        </div>
                    </div>
                 </motion.div>
             )}

             {/* Step 4: The Execution Flow Arrow */}
             {step >= 4 && (
                 <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 flex items-center gap-4 text-green-300 bg-green-900/20 p-4 rounded-lg border border-green-500/30"
                 >
                    <div className="p-2 bg-green-500/20 rounded-full">
                        <Play size={24} className="ml-1" />
                    </div>
                    <div>
                        <ChalkText size="lg" className="font-bold">按需调用</ChalkText>
                        <ChalkText size="base">从文件夹取出对应代码执行</ChalkText>
                    </div>
                 </motion.div>
             )}

        </div>
      </div>

      {/* Connecting Arrow Overlay */}
      {step >= 2 && step < 3 && (
         <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed bottom-24 bg-blue-600/20 px-6 py-2 rounded-full border border-blue-400/50 backdrop-blur-md"
         >
            <div className="flex items-center gap-2 text-blue-200">
                <Download size={20} />
                <ChalkText size="lg">引入外部包 (Import)</ChalkText>
            </div>
         </motion.div>
      )}

    </div>
  );
};