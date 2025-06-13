/**
 * 概念解释组件
 * 通过生动的类比和动画效果帮助理解 LoRA 秩的概念
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, BookOpen, Zap, Shield, AlertTriangle } from 'lucide-react';
import { ConceptExample } from '../../types';
import { conceptExamples } from '../../utils/loraCalculations';

interface ConceptExplainerProps {
  currentRank: number;
  className?: string;
}

const ConceptExplainer: React.FC<ConceptExplainerProps> = ({ currentRank, className = "" }) => {
  // 根据当前秩值找到对应的概念示例
  const getCurrentExample = (): ConceptExample => {
    if (currentRank <= 8) return conceptExamples[0];
    if (currentRank <= 32) return conceptExamples[1];
    return conceptExamples[2];
  };

  const currentExample = getCurrentExample();
  
  // 思维模板可视化组件
  const ThinkingTemplates = ({ count }: { count: number }) => {
    const templateCount = Math.min(12, Math.max(3, Math.floor(count / 5) + 2));
    
    return (
      <div className="flex flex-wrap gap-2 justify-center">
        {Array.from({ length: templateCount }, (_, index) => (
          <motion.div
            key={index}
            className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Brain className="w-4 h-4 text-white" />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className={`p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg border border-indigo-100 ${className}`}>
      <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
        通俗理解：秩值 = 思维模板数量
      </h3>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentExample.title}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* 类比可视化 */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              {currentRank <= 8 && <Shield className="w-6 h-6 text-green-500" />}
              {currentRank > 8 && currentRank <= 32 && <BookOpen className="w-6 h-6 text-blue-500" />}
              {currentRank > 32 && <Zap className="w-6 h-6 text-purple-500" />}
              <h4 className="text-lg font-semibold text-gray-800">{currentExample.title}</h4>
            </div>
            
            <p className="text-gray-700 mb-4">{currentExample.description}</p>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">你拥有的思维模板：</p>
              <ThinkingTemplates count={currentRank} />
            </div>
          </div>
          
          {/* 优缺点对比 */}
          <div className="grid md:grid-cols-2 gap-4">
            <motion.div 
              className="bg-green-50 border border-green-200 rounded-xl p-4"
              whileHover={{ scale: 1.02 }}
            >
              <h5 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                优点
              </h5>
              <ul className="space-y-2">
                {currentExample.advantages.map((advantage, index) => (
                  <motion.li 
                    key={index}
                    className="text-green-700 text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    • {advantage}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              className="bg-red-50 border border-red-200 rounded-xl p-4"
              whileHover={{ scale: 1.02 }}
            >
              <h5 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                缺点
              </h5>
              <ul className="space-y-2">
                {currentExample.disadvantages.map((disadvantage, index) => (
                  <motion.li 
                    key={index}
                    className="text-red-700 text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    • {disadvantage}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          {/* 应用场景 */}
          <motion.div 
            className="bg-blue-50 border border-blue-200 rounded-xl p-4"
            whileHover={{ scale: 1.01 }}
          >
            <h5 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              典型应用场景
            </h5>
            <p className="text-blue-700 text-sm">{currentExample.useCase}</p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ConceptExplainer;
