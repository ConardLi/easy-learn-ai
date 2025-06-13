/**
 * 交互式学习率演示组件
 * 包含学习率调节器和实时图表展示
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LearningRateChart from './LearningRateChart';
import LearningRateSlider from './LearningRateSlider';
import TrainingAnimation from './TrainingAnimation';

const InteractiveLearningRate: React.FC = () => {
  const [learningRate, setLearningRate] = useState(0.01);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingData, setTrainingData] = useState<Array<{epoch: number, loss: number, accuracy: number}>>([]);

  // 模拟训练过程
  useEffect(() => {
    if (!isTraining) return;

    const interval = setInterval(() => {
      setTrainingData(prev => {
        const epoch = prev.length + 1;
        
        // 根据学习率模拟不同的训练效果
        let loss, accuracy;
        
        if (learningRate > 0.1) {
          // 学习率过大：震荡或发散
          loss = Math.max(0.1, 2 - epoch * 0.05 + Math.sin(epoch * 0.5) * 0.3);
          accuracy = Math.min(95, 20 + epoch * 2 + Math.sin(epoch * 0.5) * 10);
        } else if (learningRate < 0.001) {
          // 学习率过小：收敛很慢
          loss = Math.max(0.1, 2 - epoch * 0.01);
          accuracy = Math.min(95, 20 + epoch * 0.5);
        } else {
          // 合适的学习率：平滑收敛
          loss = Math.max(0.1, 2 * Math.exp(-epoch * learningRate * 10));
          accuracy = Math.min(95, 95 * (1 - Math.exp(-epoch * learningRate * 8)));
        }

        const newData = [...prev, { epoch, loss, accuracy }];
        
        // 限制数据点数量
        if (newData.length > 50) {
          setIsTraining(false);
        }
        
        return newData;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isTraining, learningRate]);

  const handleStartTraining = () => {
    setTrainingData([]);
    setIsTraining(true);
  };

  const handleStopTraining = () => {
    setIsTraining(false);
  };

  const handleReset = () => {
    setIsTraining(false);
    setTrainingData([]);
  };

  return (
    <motion.section 
      className="bg-white rounded-3xl shadow-2xl p-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">交互式学习率演示</h2>
        <p className="text-gray-600 text-lg">
          调节学习率参数，观察不同学习率对模型训练过程的影响
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <LearningRateSlider 
            value={learningRate}
            onChange={setLearningRate}
            disabled={isTraining}
          />
          
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartTraining}
              disabled={isTraining}
            >
              {isTraining ? '训练中...' : '开始训练'}
            </motion.button>
            
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStopTraining}
              disabled={!isTraining}
            >
              停止训练
            </motion.button>
            
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-semibold shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
            >
              重置
            </motion.button>
          </div>

          <TrainingAnimation 
            learningRate={learningRate}
            isTraining={isTraining}
          />
        </div>

        <div>
          <LearningRateChart data={trainingData} />
        </div>
      </div>
    </motion.section>
  );
};

export default InteractiveLearningRate;
