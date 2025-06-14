/**
 * 涌现能力动画组件
 * 可视化展示模型规模增大时能力的突然涌现
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp } from 'lucide-react';

const EmergentAbilitiesAnimation: React.FC = () => {
  const [currentScale, setCurrentScale] = useState(0);
  const [showEmergence, setShowEmergence] = useState(false);

  const scales = [
    { name: '小型模型', size: 30, params: '1B', abilities: 1 },
    { name: '中型模型', size: 50, params: '10B', abilities: 2 },
    { name: '大型模型', size: 70, params: '100B', abilities: 3 },
    { name: '超大模型', size: 100, params: '1T+', abilities: 5 },
  ];

  const abilities = [
    '基础文本生成',
    '逻辑推理',
    '代码生成',
    '创意写作',
    '复杂问题解决'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScale(prev => {
        const next = (prev + 1) % scales.length;
        setShowEmergence(next >= 2); // 大型模型开始显示涌现
        return next;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [scales.length]);

  return (
    <div className="flex flex-col items-center space-y-8 p-6">
      <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
        涌现能力演示
      </h3>
      
      {/* Model Scale Visualization */}
      <div className="relative">
        <motion.div
          className="bg-gradient-to-t from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg"
          animate={{
            width: scales[currentScale].size * 2,
            height: scales[currentScale].size * 2,
          }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-white font-bold text-lg"
          >
            {scales[currentScale].params}
          </motion.div>
        </motion.div>

        {/* Emergence Effect */}
        {showEmergence && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-4 -right-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Model Info */}
      <motion.div
        key={currentScale}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center bg-white rounded-xl p-4 shadow-lg"
      >
        <div className="text-lg font-bold text-gray-800">
          {scales[currentScale].name}
        </div>
        <div className="text-sm text-gray-600">
          参数量: {scales[currentScale].params}
        </div>
      </motion.div>

      {/* Abilities List */}
      <div className="w-full max-w-md">
        <div className="flex items-center mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
          <h4 className="text-lg font-semibold text-gray-800">
            能力表现
          </h4>
        </div>
        <div className="space-y-2">
          {abilities.map((ability, index) => (
            <motion.div
              key={ability}
              initial={{ opacity: 0.3, scale: 0.95 }}
              animate={{
                opacity: index < scales[currentScale].abilities ? 1 : 0.3,
                scale: index < scales[currentScale].abilities ? 1 : 0.95,
                backgroundColor: index < scales[currentScale].abilities 
                  ? (showEmergence && index >= 2 ? '#fef3c7' : '#f3f4f6')
                  : '#f9fafb'
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-3 rounded-lg border"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-800">
                  {ability}
                </span>
                {index < scales[currentScale].abilities && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`w-2 h-2 rounded-full ${
                      showEmergence && index >= 2 
                        ? 'bg-yellow-400' 
                        : 'bg-green-400'
                    }`}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {showEmergence && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-yellow-50 border border-yellow-200 rounded-xl p-4"
        >
          <div className="flex items-center justify-center space-x-2 text-yellow-800 mb-2">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">涌现能力出现！</span>
          </div>
          <p className="text-sm text-yellow-700">
            模型规模达到临界点时，新能力突然涌现
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default EmergentAbilitiesAnimation;
