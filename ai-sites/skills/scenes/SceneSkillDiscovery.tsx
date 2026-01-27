import React from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { FolderOpen, MessageSquare, Search, Zap, CheckCircle2 } from 'lucide-react';

export const SceneSkillDiscovery: React.FC<SceneProps> = ({ step }) => {
  // Steps:
  // 0: Intro Text (Placement)
  // 1: Show Directory Structure
  // 2: Chat Interface appears
  // 3: User Typing / Request
  // 4: Auto Match Scanning effect
  // 5: Success & Zero Config Badge

  return (
    <div className="w-full h-full flex flex-col items-center justify-center max-w-6xl px-4">

       {/* Step 5: Zero Config Badge (Floating Overlay) */}
       {step >= 5 && (
            <motion.div 
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: -10 }}
                className="absolute top-20 right-20 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-full shadow-[0_0_50px_rgba(251,191,36,0.5)] border-4 border-white transform"
            >
                <div className="text-center font-bold text-black leading-tight">
                    <div className="text-xl">Zero</div>
                    <div className="text-3xl">Config</div>
                    <div className="text-sm mt-1">无需配置</div>
                </div>
            </motion.div>
        )}
      
      <div className="flex w-full h-[500px] items-stretch gap-2 md:gap-8">
          
          {/* Left: Project Directory */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`flex-1 bg-[#1e1e1e] rounded-xl border border-gray-700 p-4 flex flex-col relative overflow-hidden transition-all duration-500 ${step >= 4 ? 'ring-2 ring-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.2)]' : ''}`}
          >
             <div className="text-sm text-gray-400 border-b border-gray-700 pb-2 mb-2 flex items-center gap-2">
                <FolderOpen size={16} /> Project Explorer
             </div>
             
             <div className="font-mono text-sm space-y-2 text-gray-300">
                <div className="flex items-center gap-2">
                    <span className="opacity-50">▸</span> src
                </div>
                <div className="flex items-center gap-2">
                    <span className="opacity-50">▸</span> public
                </div>
                
                {/* The Magic Folder */}
                <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-yellow-500/10 -mx-2 px-2 py-1 rounded border border-yellow-500/30 text-yellow-200"
                >
                    <div className="flex items-center gap-2">
                        <span>▾</span> .claude
                    </div>
                    <div className="pl-4 flex items-center gap-2 mt-1">
                        <span>▾</span> <span className="font-bold">skills</span>
                    </div>
                    <div className="pl-8 flex items-center gap-2 mt-1 text-green-300">
                         <FolderOpen size={14} /> data-analysis
                    </div>
                    <div className="pl-8 flex items-center gap-2 mt-1 text-blue-300">
                         <FolderOpen size={14} /> git-helper
                    </div>
                </motion.div>

                <div className="flex items-center gap-2">
                    <span className="opacity-50">▸</span> node_modules
                </div>
             </div>

             {/* Description Text */}
             {step < 3 && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute bottom-4 left-4 right-4 text-center bg-black/50 p-2 rounded backdrop-blur-sm"
                >
                    <ChalkText size="base">只要把文件夹放在这里...</ChalkText>
                </motion.div>
             )}
          </motion.div>


          {/* Right: Chat Interface */}
          {step >= 2 && (
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex-[1.5] bg-white text-gray-800 rounded-xl flex flex-col shadow-2xl overflow-hidden"
              >
                 {/* Chat Header */}
                 <div className="bg-gray-100 p-3 border-b border-gray-200 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">C</div>
                    <span className="font-bold text-gray-700">Claude Code</span>
                 </div>

                 {/* Chat Area */}
                 <div className="flex-1 p-4 space-y-4 bg-gray-50 overflow-y-auto">
                     <div className="flex gap-3">
                         <div className="w-8 h-8 rounded-full bg-purple-600 shrink-0 mt-1" />
                         <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm border border-gray-200 text-sm max-w-[80%]">
                             Hello! I'm ready to help you with your project.
                         </div>
                     </div>

                     {/* User Message */}
                     {step >= 3 && (
                         <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex gap-3 flex-row-reverse"
                         >
                            <div className="w-8 h-8 rounded-full bg-gray-400 shrink-0 mt-1" />
                            <div className="bg-blue-600 text-white p-3 rounded-lg rounded-tr-none shadow-sm text-sm max-w-[80%]">
                                帮我分析一下这个项目的 Git 提交记录
                            </div>
                         </motion.div>
                     )}

                     {/* Processing / Match State */}
                     {step >= 4 && (
                         <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex gap-3"
                         >
                             <div className="w-8 h-8 rounded-full bg-purple-600 shrink-0 mt-1" />
                             <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm border border-gray-200 text-sm max-w-[90%]">
                                 <div className="flex items-center gap-2 text-gray-500 mb-2">
                                     <Search size={14} className="animate-spin" />
                                     <span>Scanning local skills...</span>
                                 </div>
                                 
                                 {/* The Match Result */}
                                 {step >= 5 && (
                                     <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        className="bg-blue-50 border border-blue-100 rounded p-2 flex items-center gap-3 text-blue-800"
                                     >
                                         <Zap size={18} className="text-yellow-500 fill-yellow-500" />
                                         <div>
                                            <div className="font-bold text-xs uppercase">Auto-Matched</div>
                                            <div className="font-mono font-bold">git-helper</div>
                                         </div>
                                         <CheckCircle2 size={18} className="ml-auto text-green-500" />
                                     </motion.div>
                                 )}
                             </div>
                         </motion.div>
                     )}
                 </div>
              </motion.div>
          )}

          {/* Connection / Scanning Beam */}
          {step === 4 && (
             <motion.div 
                className="absolute top-1/2 left-[30%] right-[30%] h-1 bg-gradient-to-r from-yellow-400 to-transparent z-10"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: [0, 1, 0], scaleX: [0, 1, 0], left: ['40%', '10%', '40%'] }}
                transition={{ duration: 1.5, repeat: Infinity }}
             />
          )}

      </div>
    </div>
  );
};