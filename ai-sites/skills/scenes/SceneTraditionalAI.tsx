import React from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { 
  Database, 
  MessageSquare, 
  User, 
  HelpCircle,
  Puzzle
} from 'lucide-react';

export const SceneTraditionalAI: React.FC<SceneProps> = ({ step }) => {
  // Steps:
  // 0: Title
  // 1: Training Data
  // 2: Context
  // 3: Intern Metaphor
  // 4: The Pivot (Agent Skills definition)

  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-w-5xl px-4 text-center">
      
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <ChalkText as="h2" size="2xl" color="white" className="mb-2">
          传统的 AI 聊天模式
        </ChalkText>
        <div className="h-1 w-32 bg-white/20 mx-auto rounded-full" />
      </motion.div>

      {/* The Two Pillars of Limitation */}
      <div className="flex justify-center gap-12 w-full mb-16">
        {/* Pillar 1: Training Data */}
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={step >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            className="flex flex-col items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 flex-1 max-w-sm"
        >
            <div className="p-4 bg-blue-500/20 rounded-full text-blue-300">
                <Database size={48} />
            </div>
            <ChalkText size="xl" className="font-bold">原本学过什么</ChalkText>
            <ChalkText size="base" className="text-gray-400">(训练数据)</ChalkText>
        </motion.div>

        {/* Pillar 2: Context */}
        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={step >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            className="flex flex-col items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 flex-1 max-w-sm"
        >
            <div className="p-4 bg-green-500/20 rounded-full text-green-300">
                <MessageSquare size={48} />
            </div>
            <ChalkText size="xl" className="font-bold">临时告诉它什么</ChalkText>
            <ChalkText size="base" className="text-gray-400">(提示词、工具、记忆)</ChalkText>
        </motion.div>
      </div>

      {/* The Metaphor: The Intern */}
      {step >= 3 && step < 4 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative bg-red-500/10 p-8 rounded-3xl border-2 border-dashed border-red-400/40 max-w-2xl"
          >
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#1e1e24] px-4">
                <ChalkText size="lg" color="red">痛点</ChalkText>
             </div>
             
             <div className="flex items-center gap-6">
                <div className="relative">
                    <User size={80} className="text-gray-300" />
                    <HelpCircle size={32} className="absolute -top-1 -right-1 text-red-400 animate-bounce" />
                </div>
                <div className="text-left">
                    <ChalkText size="xl" className="font-bold mb-2">就像个懂一点的实习生</ChalkText>
                    <ChalkText size="lg" className="text-gray-300">每次干活都得<span className="text-red-300 underline decoration-wavy">重新教一遍</span></ChalkText>
                </div>
             </div>
          </motion.div>
      )}

      {/* The Solution Transition */}
      {step >= 4 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-yellow-500/10 p-10 rounded-3xl border border-yellow-400/50 shadow-[0_0_50px_rgba(234,179,8,0.2)]"
          >
             <div className="flex items-center gap-6 justify-center">
                 <Puzzle size={64} className="text-yellow-300 animate-pulse" />
                 <div className="text-left">
                     <ChalkText size="lg" className="text-yellow-200 mb-1">Agent Skills 带来全新玩法</ChalkText>
                     <ChalkText size="2xl" color="white" className="font-bold">模块化的能力插件</ChalkText>
                 </div>
             </div>
          </motion.div>
      )}

    </div>
  );
};