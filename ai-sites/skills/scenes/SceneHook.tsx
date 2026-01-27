import React from 'react';
import { motion } from 'framer-motion';
import { SceneProps } from '../types';
import { ChalkText } from '../components/ChalkText';
import { HelpCircle, AlertTriangle, Search, Cpu, Workflow } from 'lucide-react';

export const SceneHook: React.FC<SceneProps> = ({ step }) => {
  const questions = [
    { text: "Agent Skills 到底是什么？长什么样？怎么工作的？", icon: Cpu, color: 'blue' },
    { text: "Skills 和 MCP 的区别是什么，MCP 会被淘汰吗？", icon: Workflow, color: 'white' },
    { text: "去哪里找 Skill？怎么使用 Skill？怎么自己创建一个 Skill？", icon: Search, color: 'yellow' },
    { text: "如何用 Skills 实现外部知识检索？比传统 RAG 的优势在哪？", icon: HelpCircle, color: 'green' },
    { text: "为什么说 Skills 非常不安全？使用它有哪些风险呢？", icon: AlertTriangle, color: 'red' },
  ] as const;

  return (
    <div className="flex flex-col items-start space-y-8 w-full max-w-5xl px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full text-center mb-8 border-b-2 border-dashed border-white/20 pb-4"
      >
        <ChalkText as="h1" size="2xl" color="white">
          本期核心议题
        </ChalkText>
      </motion.div>

      <div className="space-y-6 w-full">
        {questions.map((q, index) => {
          // Show item if step is strictly greater than index
          // step 0 = title only
          // step 1 = title + q1
          const isVisible = step > index;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 shadow-sm"
            >
              <div className={`p-3 rounded-full bg-white/10 text-${q.color}-300`}>
                <q.icon size={32} color={q.color === 'white' ? '#fff' : undefined} className={`text-${q.color}-400`} />
              </div>
              <ChalkText size="lg" color={q.color as any} className="flex-1">
                {q.text}
              </ChalkText>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};