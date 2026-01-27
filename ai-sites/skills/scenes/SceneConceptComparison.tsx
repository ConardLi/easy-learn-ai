import React from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { 
  Bot, 
  Database, 
  MessageSquare, 
  UserMinus, 
  BrainCircuit, 
  Box, 
  BookOpen, 
  Plus, 
  ArrowRight
} from 'lucide-react';

export const SceneConceptComparison: React.FC<SceneProps> = ({ step }) => {
  // Steps:
  // 0: Traditional Title
  // 1: Traditional Limitations (Data + Context)
  // 2: Traditional Metaphor (Intern)
  // 3: Skills Title
  // 4: Skills Definition (Modular Plugins)
  // 5: Skills Metaphor (Super Brain + Toolbox)
  // 6: The "Manual" Concept

  return (
    <div className="flex w-full h-full items-center justify-center gap-8 px-4">
      
      {/* LEFT SIDE: Traditional AI */}
      <motion.div 
        className={`flex-1 flex flex-col items-center p-6 border-r-2 border-dashed border-white/10 ${step >= 3 ? 'opacity-50 grayscale' : 'opacity-100'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 3 ? 0.4 : 1, transition: { duration: 0.5 } }}
      >
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-8 text-center"
        >
          <div className="bg-white/10 p-4 rounded-full inline-block mb-4">
            <Bot size={48} className="text-gray-300" />
          </div>
          <ChalkText as="h2" size="xl" color="white">传统的 AI 聊天</ChalkText>
        </motion.div>

        {/* Limitations */}
        <div className="space-y-6 w-full max-w-md">
           {step >= 1 && (
             <motion.div 
               initial={{ x: -30, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               className="flex items-center gap-4 text-gray-400"
             >
               <Database size={32} />
               <ChalkText size="lg">原本学过什么 <span className="text-sm block opacity-70">(训练数据)</span></ChalkText>
             </motion.div>
           )}
           {step >= 1 && (
             <motion.div 
               initial={{ x: -30, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: 0.2 }}
               className="flex items-center gap-4 text-gray-400"
             >
               <MessageSquare size={32} />
               <ChalkText size="lg">临时告诉它什么 <span className="text-sm block opacity-70">(提示词/上下文)</span></ChalkText>
             </motion.div>
           )}
        </div>

        {/* Metaphor: Intern */}
        {step >= 2 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-12 bg-red-900/20 p-6 rounded-xl border border-red-500/30 text-center w-full"
          >
             <UserMinus size={40} className="text-red-300 mx-auto mb-2" />
             <ChalkText size="lg" color="red" className="font-bold">就像个懂一点的实习生</ChalkText>
             <ChalkText size="base" className="mt-2">每次干活都得重新教一遍</ChalkText>
          </motion.div>
        )}
      </motion.div>

      {/* RIGHT SIDE: Agent Skills */}
      {step >= 3 && (
        <motion.div 
          className="flex-1 flex flex-col items-center p-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <motion.div className="mb-8 text-center">
            <div className="bg-blue-500/20 p-4 rounded-full inline-block mb-4 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <BrainCircuit size={48} className="text-blue-300" />
            </div>
            <ChalkText as="h2" size="xl" color="blue">Agent Skills</ChalkText>
          </motion.div>

          {/* Definition */}
          {step >= 4 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-blue-900/20 px-6 py-3 rounded-lg border border-blue-400/30 mb-8"
            >
               <ChalkText size="xl" color="yellow">模块化的能力插件</ChalkText>
            </motion.div>
          )}

          {/* Metaphor: Brain + Toolbox */}
          <div className="relative w-full max-w-lg h-64 flex items-center justify-center">
             {step >= 5 && (
               <>
                 {/* Brain */}
                 <motion.div 
                   initial={{ scale: 0 }} 
                   animate={{ scale: 1 }}
                   className="absolute left-0 flex flex-col items-center z-10"
                 >
                    <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/50">
                        <img src="https://api.iconify.design/logos:claude-icon.svg" alt="Claude" className="w-14 h-14 opacity-90 invert" />
                    </div>
                    <ChalkText size="lg" className="mt-2">超级大脑</ChalkText>
                 </motion.div>

                 {/* Plus Sign */}
                 <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                 >
                    <Plus size={32} className="text-white/30" />
                 </motion.div>

                 {/* Toolbox */}
                 <motion.div 
                   initial={{ scale: 0, x: 20 }} 
                   animate={{ scale: 1, x: 0 }}
                   transition={{ delay: 0.5 }}
                   className="absolute right-0 flex flex-col items-center"
                 >
                    <div className="w-24 h-24 rounded-xl bg-yellow-500/20 flex items-center justify-center border-2 border-yellow-400/50">
                        <Box size={48} className="text-yellow-300" />
                    </div>
                    <ChalkText size="lg" color="yellow" className="mt-2">外接工具箱</ChalkText>
                 </motion.div>
               </>
             )}
             
             {/* Connection Line with Instruction Manual */}
             {step >= 6 && (
                <motion.div 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: '100%' }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="absolute top-1/2 left-0 w-full h-px bg-dashed border-t-2 border-dashed border-white/20 -z-10"
                />
             )}
          </div>

          {/* The Manual Explanation */}
          {step >= 6 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-4 flex items-start gap-4 bg-green-900/20 p-4 rounded-xl border border-green-500/30"
            >
              <BookOpen size={32} className="text-green-300 shrink-0 mt-1" />
              <div className="text-left">
                <ChalkText size="lg" color="green" className="font-bold mb-1">自带“官方说明书”</ChalkText>
                <ChalkText size="base">
                  大脑无需死记硬背，用的时候查阅<br/>
                  <span className="text-white underline decoration-wavy decoration-white/30">说明书</span>，即插即用
                </ChalkText>
              </div>
            </motion.div>
          )}

        </motion.div>
      )}
    </div>
  );
};