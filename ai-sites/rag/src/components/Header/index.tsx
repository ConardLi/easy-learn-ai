/**
 * 网站头部导航组件
 * 提供各个学习模块的导航和进度指示器
 */
import React from 'react';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { currentStageAtom, learningProgressAtom } from '../../store/ragStore';
import { BookOpen, Brain, Settings, PlayCircle, Trophy } from 'lucide-react';

const Header: React.FC = () => {
  const [currentStage, setCurrentStage] = useAtom(currentStageAtom);
  const [progress] = useAtom(learningProgressAtom);

  const stages = [
    { id: 'overview', label: 'RAG概述', icon: BookOpen },
    { id: 'workflow', label: '工作流程', icon: PlayCircle },
    { id: 'architecture', label: '系统架构', icon: Settings },
    { id: 'simulation', label: '交互模拟', icon: Brain },
    { id: 'summary', label: '总结评估', icon: Trophy }
  ];

  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <motion.h1 
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            RAG 检索增强生成 - 交互式学习平台
          </motion.h1>
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              学习进度: {progress.completedStages.length}/5
            </div>
            <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-yellow-400"
                initial={{ width: '0%' }}
                animate={{ width: `${(progress.completedStages.length / 5) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
        
        <nav className="flex space-x-1">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isCompleted = progress.completedStages.includes(stage.id);
            const isCurrent = currentStage === stage.id;
            
            return (
              <motion.button
                key={stage.id}
                onClick={() => setCurrentStage(stage.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  isCurrent ? 'bg-white text-blue-600' : 
                  isCompleted ? 'bg-green-500/20 text-green-100' : 
                  'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{stage.label}</span>
                {isCompleted && (
                  <motion.div
                    className="w-2 h-2 bg-green-400 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
