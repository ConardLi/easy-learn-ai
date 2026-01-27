import React from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { Folder, FileText, FileCode, Image, FileDigit, CornerDownRight } from 'lucide-react';

export const SceneSkillStructure: React.FC<SceneProps> = ({ step }) => {
  // Steps:
  // 0: Title & Comparison text
  // 1: The Root Folder (.claude/skills)
  // 2: SKILL.md (Core)
  // 3: reference (Docs)
  // 4: scripts (Code)
  // 5: assets (Resources)

  const items = [
    { id: 'md', label: '指令 (SOP)', file: 'SKILL.md', icon: FileText, color: 'red', desc: '告诉 AI 怎么干活', required: true },
    { id: 'ref', label: '参考 (Optional)', file: 'reference/', icon: FileDigit, color: 'blue', desc: '更详细的参考文档', required: false },
    { id: 'script', label: '脚本 (Optional)', file: 'scripts/', icon: FileCode, color: 'yellow', desc: 'Python/Bash 代码能力', required: false },
    { id: 'asset', label: '资源 (Optional)', file: 'assets/', icon: Image, color: 'green', desc: '图片、模版等', required: false },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center max-w-5xl px-4">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <ChalkText as="h2" size="2xl" color="white">Skill 的解剖学</ChalkText>
        <ChalkText size="lg" className="text-gray-400 mt-2">
           也是类似的逻辑，每个 Skill 都是一个<span className="text-yellow-300">文件夹</span>
        </ChalkText>
      </motion.div>

      <div className="flex w-full items-start justify-center gap-12">
        
        {/* The File Explorer Card */}
        <motion.div 
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="bg-[#1e1e1e] border border-gray-700 rounded-xl shadow-2xl p-6 min-w-[350px] md:min-w-[450px]"
        >
             {/* Path Bar */}
             <div className="bg-[#2d2d2d] px-3 py-2 rounded mb-4 flex items-center text-sm font-mono text-gray-400">
                <span className="text-blue-400">~/project</span>
                <span className="mx-1">/</span>
                <span className="text-white">.claude</span>
                <span className="mx-1">/</span>
                <span className="text-yellow-400">skills</span>
                <span className="mx-1">/</span>
                <span className="text-white font-bold">my-awesome-skill</span>
             </div>

             {/* Folder Contents */}
             <div className="space-y-4">
                {/* 1. Root Folder visual hint (already in path) */}
                {step >= 1 && (
                     <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-yellow-300 border-b border-gray-700 pb-2 mb-2"
                     >
                        <Folder size={24} fill="currentColor" className="text-yellow-500/20" />
                        <span className="font-bold">.</span>
                     </motion.div>
                )}

                {/* List Items */}
                {items.map((item, index) => {
                    const show = step >= 2 + index;
                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20, height: 0 }}
                            animate={show ? { opacity: 1, x: 0, height: 'auto' } : { opacity: 0, x: -20, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className={`flex items-start gap-4 p-3 rounded-lg border border-transparent hover:bg-white/5 transition-colors ${item.required ? 'bg-white/5' : ''}`}>
                                <div className={`p-2 rounded bg-${item.color}-500/10 text-${item.color}-400 mt-1`}>
                                    <item.icon size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className={`font-mono text-lg text-${item.color}-300`}>{item.file}</span>
                                        {!item.required && <span className="text-xs border border-gray-600 px-1 rounded text-gray-500">Optional</span>}
                                        {item.required && <span className="text-xs bg-red-900/50 text-red-300 border border-red-800 px-1 rounded">Core</span>}
                                    </div>
                                    <div className="text-gray-400 text-sm mt-1">
                                        {item.desc}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
             </div>
        </motion.div>

        {/* Right Side Annotation */}
        <div className="hidden md:flex flex-col gap-12 mt-20">
            {step >= 2 && (
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                >
                    <CornerDownRight size={32} className="text-red-400" />
                    <div>
                        <ChalkText size="lg" className="font-bold text-red-300">最重要的部分</ChalkText>
                        <ChalkText size="base">自然语言写的 SOP</ChalkText>
                    </div>
                </motion.div>
            )}
             {step >= 4 && (
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 pt-8"
                >
                    <CornerDownRight size={32} className="text-yellow-400" />
                    <div>
                        <ChalkText size="lg" className="font-bold text-yellow-300">能力扩展</ChalkText>
                        <ChalkText size="base">调用外部 API 或系统命令</ChalkText>
                    </div>
                </motion.div>
            )}
        </div>
      </div>
    </div>
  );
};