import React from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { FileText, Fingerprint, MousePointer2, Target, ListChecks, AlertCircle } from 'lucide-react';

export const SceneSkillExample: React.FC<SceneProps> = ({ step }) => {
  // Steps:
  // 0: Intro (Show file)
  // 1: Frontmatter (The "ID card")
  // 2: Frontmatter Details (Name/Desc logic)
  // 3: Body (Goals, Steps, Notes)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center max-w-6xl px-4">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <ChalkText as="h2" size="2xl" color="white">文章润色 Skill</ChalkText>
      </motion.div>

      <div className="flex w-full items-start justify-center gap-8 relative">
        
        {/* Editor Window */}
        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-3xl bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden border border-gray-700 relative z-10"
        >
            {/* Window Controls */}
            <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"/>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                    <div className="w-3 h-3 rounded-full bg-green-500"/>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm font-mono">
                    <FileText size={14} />
                    <span>SKILL.md</span>
                </div>
                <div className="w-12" /> {/* Spacer */}
            </div>

            {/* Code Content */}
            <div className="p-6 md:p-8 font-mono text-sm md:text-base leading-relaxed text-gray-300 overflow-y-auto max-h-[60vh]">
                
                {/* SECTION 1: Frontmatter */}
                <motion.div 
                    className={`relative p-2 -mx-2 rounded transition-colors duration-500 ${step >= 1 && step < 3 ? 'bg-blue-500/10 ring-1 ring-blue-500/50' : ''}`}
                    animate={step >= 1 && step < 3 ? { scale: 1.02 } : { scale: 1 }}
                >
                    <div className="text-gray-500">---</div>
                    <div>
                        <span className="text-red-400">name:</span> <span className="text-yellow-300">text-polisher</span>
                    </div>
                    <div>
                        <span className="text-red-400">description:</span> <span className="text-green-300">
                            用来把用户的一段话改写得更礼貌、更通顺。遇到这类需求时使用本 Skill，例如用户说"帮我把下面这段话润色一下、改得礼貌一点、写成正式邮件/通知"等。
                        </span>
                    </div>
                    <div className="text-gray-500">---</div>

                    {/* Annotation: ID Card */}
                    {step === 1 && (
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="absolute top-0 right-0 translate-x-[110%] md:translate-x-[120%] w-48 bg-blue-900/80 p-3 rounded border border-blue-500/50 backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-2 text-blue-300 font-bold mb-1">
                                <Fingerprint size={20} />
                                <span>Skill 身份证</span>
                            </div>
                            <div className="text-xs text-white/80">
                                就像 HTTP Header，定义了它是谁。
                            </div>
                        </motion.div>
                    )}

                    {/* Annotation: Details */}
                    {step === 2 && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -bottom-4 right-10 translate-y-full bg-gray-800 p-3 rounded border border-gray-600 z-20 shadow-xl"
                        >
                            <div className="flex flex-col gap-2 text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="text-red-400 font-bold">name</span>
                                    <span className="text-gray-400">→</span>
                                    <span>唯一标识 (ID)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-red-400 font-bold">desc</span>
                                    <span className="text-gray-400">→</span>
                                    <span className="text-green-300">决定何时触发 Skill</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>

                <div className="h-6" />

                {/* SECTION 2: Goals */}
                <motion.div 
                    className={`relative p-2 -mx-2 rounded transition-colors duration-500 ${step === 3 ? 'bg-red-500/10 ring-1 ring-red-500/50' : 'opacity-80'}`}
                >
                    <div className="flex items-center gap-2 font-bold text-purple-400 text-lg">
                        <span>##</span> 目标
                    </div>
                    <div className="mt-1 pl-4 border-l-2 border-gray-700">
                        把用户给的一段话，改写成：
                        <ul className="list-disc pl-4 mt-1 space-y-1 text-gray-400">
                            <li>语气更礼貌</li>
                            <li>表达更通顺</li>
                            <li>保留原本意思不变</li>
                        </ul>
                    </div>

                    {step === 3 && (
                        <div className="absolute top-2 right-4 text-red-400 opacity-50">
                            <Target size={24} />
                        </div>
                    )}
                </motion.div>

                <div className="h-6" />

                {/* SECTION 3: Steps */}
                <motion.div 
                     className={`relative p-2 -mx-2 rounded transition-colors duration-500 ${step === 3 ? 'bg-yellow-500/10 ring-1 ring-yellow-500/50' : 'opacity-80'}`}
                >
                    <div className="flex items-center gap-2 font-bold text-purple-400 text-lg">
                        <span>##</span> 使用步骤
                    </div>
                    <div className="mt-1 pl-4 text-gray-400 space-y-2">
                        <div>1. 先确定用户的目标 (更礼貌? 更口语?)</div>
                        <div>2. 仔细阅读原文</div>
                        <div>3. 进行改写
                           <span className="text-gray-500 text-xs ml-2">// 调整语序、替换生硬表达</span>
                        </div>
                        <div>4. 输出格式 (固定格式，方便阅读)</div>
                    </div>

                    {step === 3 && (
                         <div className="absolute top-2 right-4 text-yellow-400 opacity-50">
                            <ListChecks size={24} />
                        </div>
                    )}
                </motion.div>

                <div className="h-6" />

                {/* SECTION 4: Notes/Format */}
                <motion.div 
                     className={`relative p-2 -mx-2 rounded transition-colors duration-500 ${step === 3 ? 'bg-green-500/10 ring-1 ring-green-500/50' : 'opacity-60'}`}
                >
                     <div className="flex items-center gap-2 font-bold text-purple-400 text-lg">
                        <span>##</span> 注意事项
                    </div>
                    <div className="mt-1 pl-4 text-gray-500 text-sm">
                        - 不改变用户的真实立场和结论<br/>
                        - 避免替用户做实质性决定
                    </div>
                </motion.div>

            </div>
        </motion.div>

        {/* Global Annotation Layer for Step 3 (Summary of Body) */}
        {step === 3 && (
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-1/3 -right-4 translate-x-full hidden md:block"
            >
                <div className="flex flex-col gap-8">
                     <div className="flex items-center gap-3">
                         <div className="p-2 bg-red-500/20 rounded-full text-red-400">
                             <Target size={24} />
                         </div>
                         <ChalkText size="lg" className="text-red-300">核心目标</ChalkText>
                     </div>
                     <div className="flex items-center gap-3">
                         <div className="p-2 bg-yellow-500/20 rounded-full text-yellow-400">
                             <ListChecks size={24} />
                         </div>
                         <ChalkText size="lg" className="text-yellow-300">执行流程</ChalkText>
                     </div>
                     <div className="flex items-center gap-3">
                         <div className="p-2 bg-green-500/20 rounded-full text-green-400">
                             <AlertCircle size={24} />
                         </div>
                         <ChalkText size="lg" className="text-green-300">注意事项</ChalkText>
                     </div>
                </div>
            </motion.div>
        )}

      </div>
    </div>
  );
};