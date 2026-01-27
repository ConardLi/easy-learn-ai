import React from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { Library, Search, MousePointerClick, BookOpen, ArrowRight } from 'lucide-react';

export const SceneLibraryAnalogy: React.FC<SceneProps> = ({ step }) => {
  // Steps:
  // 0: Intro Title "Library Metaphor"
  // 1: Step 1 - Search Index (Light)
  // 2: Step 2 - Select (Decision)
  // 3: Step 3 - Read Book (Heavy)

  const steps = [
    { 
      id: 1, 
      title: "查阅目录", 
      desc: "只看索引卡片 (Name + Desc)", 
      detail: "轻量级 / Low Cost",
      icon: Search, 
      color: "blue" 
    },
    { 
      id: 2, 
      title: "决定借阅", 
      desc: "大脑判断需要哪本书", 
      detail: "决策 / Reasoning",
      icon: MousePointerClick, 
      color: "yellow" 
    },
    { 
      id: 3, 
      title: "读取内容", 
      desc: "翻开书本阅读详情", 
      detail: "加载 / Loading",
      icon: BookOpen, 
      color: "green" 
    },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center max-w-6xl px-4">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex items-center gap-4"
      >
        <div className="bg-white/10 p-3 rounded-full">
            <Library size={32} className="text-white" />
        </div>
        <ChalkText as="h2" size="2xl" color="white">直观理解：图书馆查资料</ChalkText>
      </motion.div>

      {/* The 3 Steps Container */}
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 md:gap-8 w-full">
         
         {steps.map((s, index) => {
             const isVisible = step >= index + 1;
             const isCurrent = step === index + 1;
             
             return (
                 <React.Fragment key={s.id}>
                    {/* Arrow between steps */}
                    {index > 0 && (
                        <div className="hidden md:flex flex-col justify-center">
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={step >= index + 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                            >
                                <ArrowRight size={32} className="text-gray-600" />
                            </motion.div>
                        </div>
                    )}

                    {/* Step Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex-1 bg-[#1e1e24] border-2 ${isCurrent ? `border-${s.color}-400 shadow-[0_0_20px_rgba(255,255,255,0.1)]` : 'border-gray-700'} rounded-xl p-6 flex flex-col items-center text-center relative overflow-hidden`}
                    >
                        {/* Background Number */}
                        <div className="absolute -right-4 -bottom-8 text-9xl font-bold text-white/5 select-none font-sans">
                            {s.id}
                        </div>

                        {/* Icon */}
                        <div className={`w-16 h-16 rounded-full bg-${s.color}-500/20 flex items-center justify-center mb-6`}>
                            <s.icon size={32} className={`text-${s.color}-400`} />
                        </div>

                        {/* Content */}
                        <ChalkText size="xl" className={`font-bold text-${s.color}-300 mb-2`}>
                            {s.title}
                        </ChalkText>
                        <ChalkText size="base" className="text-gray-300 mb-4">
                            {s.desc}
                        </ChalkText>
                        
                        {/* Tag */}
                        <div className="mt-auto pt-4 border-t border-white/10 w-full">
                             <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                                 {s.detail}
                             </span>
                        </div>
                    </motion.div>
                 </React.Fragment>
             );
         })}

      </div>

      {/* Summary / Takeaway */}
      {step >= 3 && (
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="mt-12 bg-gray-800/50 px-8 py-4 rounded-full border border-gray-600 backdrop-blur-sm"
          >
              <ChalkText size="lg" className="text-gray-300">
                  绝大多数时间，大脑只需要阅读<span className="text-yellow-300 font-bold mx-2">目录 (Index)</span>
              </ChalkText>
          </motion.div>
      )}

    </div>
  );
};