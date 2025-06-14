/**
 * 模型规模动画组件
 * 可视化展示不同规模模型的参数量对比
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

const ModelSizeAnimation: React.FC = () => {
  const [currentModel, setCurrentModel] = useState(0);

  const models = [
    { name: 'BERT', params: '0.3B', size: 20, color: 'from-green-400 to-green-600' },
    { name: 'GPT-2', params: '1.5B', size: 40, color: 'from-blue-400 to-blue-600' },
    { name: 'GPT-3', params: '175B', size: 80, color: 'from-purple-400 to-purple-600' },
    { name: 'GPT-4', params: '1.7T', size: 120, color: 'from-pink-400 to-pink-600' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentModel((prev) => (prev + 1) % models.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [models.length]);

  return (
    <div className="flex flex-col items-center space-y-8 p-8">
      <h3 className="text-2xl font-bold text-gray-800 text-center">
        模型规模演进
      </h3>
      
      <div className="relative flex items-end justify-center space-x-4 h-40">
        {models.map((model, index) => (
          <motion.div
            key={model.name}
            className="flex flex-col items-center"
            initial={{ opacity: 0.3 }}
            animate={{ 
              opacity: index <= currentModel ? 1 : 0.3,
              scale: index === currentModel ? 1.1 : 1
            }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className={`bg-gradient-to-t ${model.color} rounded-lg flex items-end justify-center relative overflow-hidden shadow-lg`}
              initial={{ height: 0 }}
              animate={{ 
                height: index <= currentModel ? model.size : 0,
                width: 32
              }}
              transition={{ 
                duration: 0.8,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
            >
              {index <= currentModel && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.2 }}
                  className="text-white text-xs font-bold mb-1"
                >
                  <Brain className="w-4 h-4" />
                </motion.div>
              )}
            </motion.div>
            
            <motion.div
              className="mt-2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: index <= currentModel ? 1 : 0.5 }}
              transition={{ delay: 0.5 + index * 0.2 }}
            >
              <div className="text-sm font-semibold text-gray-800">
                {model.name}
              </div>
              <div className="text-xs text-gray-600">
                {model.params}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        key={currentModel}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center bg-white rounded-xl p-4 shadow-lg"
      >
        <div className="text-lg font-bold text-gray-800">
          当前展示: {models[currentModel].name}
        </div>
        <div className="text-sm text-gray-600">
          参数量: {models[currentModel].params}
        </div>
      </motion.div>
    </div>
  );
};

export default ModelSizeAnimation;
