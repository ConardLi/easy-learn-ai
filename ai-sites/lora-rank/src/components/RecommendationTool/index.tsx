/**
 * 秩值推荐工具组件
 * 根据用户的具体需求提供个性化的秩值建议
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Lightbulb, Database, Cpu, MemoryStick } from 'lucide-react';
import { RecommendationInput, Recommendation } from '../../types';
import { getRecommendation } from '../../utils/loraCalculations';
import toast from 'react-hot-toast';

interface RecommendationToolProps {
  onRecommendationApply: (rank: number) => void;
  className?: string;
}

const RecommendationTool: React.FC<RecommendationToolProps> = ({ onRecommendationApply, className = "" }) => {
  const [input, setInput] = useState<RecommendationInput>({
    datasetSize: 'medium',
    taskComplexity: 'medium',
    memoryConstraint: 'medium'
  });
  
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleGetRecommendation = () => {
    const result = getRecommendation(input);
    setRecommendation(result);
    setShowResult(true);
    toast.success('已生成专属推荐！');
  };

  const handleApplyRecommendation = (rank: number) => {
    onRecommendationApply(rank);
    toast.success(`已应用秩值 ${rank}`);
  };

  const optionConfigs = {
    datasetSize: {
      icon: <Database className="w-4 h-4" />,
      title: '数据集规模',
      options: [
        { value: 'small', label: '小型', desc: '< 1000 样本' },
        { value: 'medium', label: '中型', desc: '1000-10000 样本' },
        { value: 'large', label: '大型', desc: '> 10000 样本' }
      ]
    },
    taskComplexity: {
      icon: <Cpu className="w-4 h-4" />,
      title: '任务复杂度',
      options: [
        { value: 'simple', label: '简单', desc: '基础风格迁移' },
        { value: 'medium', label: '中等', desc: '多样化生成' },
        { value: 'complex', label: '复杂', desc: '多模态任务' }
      ]
    },
    memoryConstraint: {
      icon: <MemoryStick className="w-4 h-4" />,
      title: '显存限制',
      options: [
        { value: 'low', label: '有限', desc: '< 8GB' },
        { value: 'medium', label: '中等', desc: '8-16GB' },
        { value: 'high', label: '充足', desc: '> 16GB' }
      ]
    }
  };

  return (
    <div className={`p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg border border-yellow-200 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-orange-600" />
        <h3 className="text-xl font-bold text-gray-800">智能推荐工具</h3>
      </div>
      
      <div className="space-y-6">
        {Object.entries(optionConfigs).map(([key, config]) => (
          <motion.div 
            key={key}
            className="space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Object.keys(optionConfigs).indexOf(key) * 0.1 }}
          >
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              {config.icon}
              <span>{config.title}</span>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {config.options.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => setInput(prev => ({ ...prev, [key]: option.value }))}
                  className={`p-3 rounded-xl border-2 transition-all text-left ${
                    input[key as keyof RecommendationInput] === option.value
                      ? 'border-orange-400 bg-orange-100 shadow-md'
                      : 'border-gray-200 bg-white hover:border-orange-200 hover:bg-orange-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="font-medium text-gray-800">{option.label}</div>
                  <div className="text-xs text-gray-600 mt-1">{option.desc}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
        
        <motion.button
          onClick={handleGetRecommendation}
          className="w-full bg-gradient-to-r from-orange-400 to-red-400 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Lightbulb className="w-5 h-5" />
          获取专属推荐
        </motion.button>
      </div>
      
      <AnimatePresence>
        {showResult && recommendation && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="bg-white rounded-xl p-6 shadow-md border border-orange-200"
          >
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              推荐结果
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-800">建议秩值</div>
                  <div className="text-2xl font-bold text-blue-600">{recommendation.suggestedRank}</div>
                </div>
                <motion.button
                  onClick={() => handleApplyRecommendation(recommendation.suggestedRank)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  应用此值
                </motion.button>
              </div>
              
              <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                <strong>推荐理由：</strong> {recommendation.reasoning}
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">其他可选值：</div>
                <div className="flex gap-2">
                  {recommendation.alternatives
                    .filter(alt => alt !== recommendation.suggestedRank)
                    .map((alt) => (
                    <motion.button
                      key={alt}
                      onClick={() => handleApplyRecommendation(alt)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {alt}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecommendationTool;
