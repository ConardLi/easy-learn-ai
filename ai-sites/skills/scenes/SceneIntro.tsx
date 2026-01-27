import React from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { Flower } from 'lucide-react';

export const SceneIntro: React.FC<SceneProps> = ({ step }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-12">
      {/* Step 0: Logo / Show Title */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="relative"
      >
        <div className="absolute -top-12 -left-12 opacity-30 animate-pulse">
           <Flower size={120} className="text-pink-300" />
        </div>
        
        <div className="border-4 border-white/80 p-12 rounded-lg rotate-1 shadow-[0_0_20px_rgba(255,255,255,0.2)] bg-[#1e1e24]">
          <ChalkText as="h1" size="4xl" color="yellow">
            Code 秘密花园
          </ChalkText>
        </div>

        <div className="absolute -bottom-8 -right-8 opacity-30">
           <Flower size={80} className="text-purple-300" />
        </div>
      </motion.div>

      {/* Step 1: The Greeting Text */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={step >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        className="bg-black/30 p-8 rounded-xl backdrop-blur-sm max-w-3xl border border-white/10"
      >
        <ChalkText size="xl">
          大家好，欢迎来到 Code 秘密花园，我是<span className="text-yellow-300 font-bold mx-2">花园老师</span>。
        </ChalkText>
        <motion.div 
            initial={{ opacity: 0 }}
            animate={step >= 1 ? { opacity: 1, transition: { delay: 1 } } : { opacity: 0 }}
            className="mt-6"
        >
             <ChalkText size="lg" color="blue">
                今天这一期，我们来聊透关于 <span className="underline decoration-wavy decoration-blue-400 underline-offset-4">Agent Skill</span> 的一切。
             </ChalkText>
        </motion.div>
      </motion.div>
    </div>
  );
};