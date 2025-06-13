/**
 * 训练过程动画组件
 * 可视化展示不同学习率下的训练行为
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Target } from 'lucide-react';

interface TrainingAnimationProps {
  learningRate: number;
  isTraining: boolean;
}

const TrainingAnimation: React.FC<TrainingAnimationProps> = ({ 
  learningRate, 
  isTraining 
}) => {
  const getAnimationSpeed = () => {
    if (learningRate > 0.01) return 0.3; // 过大：快速但不稳定
    if (learningRate >= 0.00004) return 1.0; // 推荐范围：最佳速度
    if (learningRate >= 0.00001) return 1.5; // 偏小：较慢但稳定
    return 2.0; // 过小：非常慢
  };

  const getStepSize = () => {
    if (learningRate > 0.01) return 40; // 过大：大步长，容易超调
    if (learningRate >= 0.00004) return 15; // 推荐范围：适中步长
    if (learningRate >= 0.00001) return 8; // 偏小：小步长
    return 5; // 过小：非常小步长
  };

  const getBehaviorDescription = () => {
    if (learningRate > 0.01) return '学习率过大：震荡不稳定，可能发散';
    if (learningRate >= 0.00005) return '推荐范围：平滑收敛，效果最佳 ✨';
    if (learningRate >= 0.00004) return '推荐范围：稳定收敛，效果良好 ✅';
    if (learningRate >= 0.00001) return '学习率偏小：收敛较慢但稳定';
    return '学习率过小：收敛非常缓慢';
  };

  const getEntityColor = () => {
    if (learningRate > 0.01) return 'text-red-500'; // 过大：红色警告
    if (learningRate >= 0.00004) return 'text-green-500'; // 推荐范围：绿色最佳
    if (learningRate >= 0.00001) return 'text-blue-500'; // 偏小：蓝色稳定
    return 'text-gray-500'; // 过小：灰色缓慢
  };

  const getTrajectoryPath = () => {
    if (learningRate > 0.01) {
      // 过大：震荡路径
      return "M 20 64 Q 60 40 100 80 Q 140 30 180 70 Q 220 90 260 50";
    }
    if (learningRate >= 0.00004) {
      // 推荐范围：平滑最优路径
      return "M 20 64 Q 150 60 280 64";
    }
    // 偏小或过小：直线但缓慢
    return "M 20 64 L 280 64";
  };

  return (
    <motion.div 
      className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="flex items-center mb-4">
        <Brain className="h-6 w-6 text-purple-600 mr-2" />
        <h3 className="text-xl font-semibold text-gray-800">训练行为可视化</h3>
      </div>

      <div className="relative h-32 bg-white rounded-xl overflow-hidden mb-4">
        {/* 目标点 */}
        <motion.div 
          className="absolute right-4 top-1/2 transform -translate-y-1/2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Target className="h-8 w-8 text-green-500" />
          <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-green-600 font-medium">
            最优解
          </span>
        </motion.div>

        {/* 推荐范围标识 */}
        {learningRate >= 0.00004 && learningRate <= 0.00005 && (
          <motion.div
            className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            推荐范围 🎯
          </motion.div>
        )}

        {/* 训练实体 */}
        <motion.div
          className="absolute left-4 top-1/2 transform -translate-y-1/2"
          animate={isTraining ? {
            x: learningRate > 0.01 
              ? [0, getStepSize(), -getStepSize()/2, getStepSize()*1.5, -getStepSize()/3, getStepSize()*0.8] 
              : [0, getStepSize(), getStepSize()*2, getStepSize()*3, getStepSize()*4, getStepSize()*5]
          } : {}}
          transition={{
            duration: getAnimationSpeed(),
            repeat: isTraining ? Infinity : 0,
            ease: learningRate > 0.01 ? "easeInOut" : learningRate >= 0.00004 ? "easeOut" : "linear"
          }}
        >
          <div className="relative">
            <Zap className={`h-6 w-6 ${getEntityColor()}`} />
            {isTraining && (
              <motion.div
                className="absolute -inset-2 border-2 border-current rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </div>
        </motion.div>

        {/* 路径轨迹 */}
        {isTraining && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.path
              d={getTrajectoryPath()}
              stroke={learningRate > 0.01 ? '#ef4444' : learningRate >= 0.00004 ? '#10b981' : '#6b7280'}
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: getAnimationSpeed() * 2 }}
            />
          </svg>
        )}
      </div>

      <div className="text-center p-3 bg-white rounded-xl">
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">学习率: {learningRate.toExponential(0)}</span>
        </p>
        <p className="text-sm text-gray-700 font-medium">
          {getBehaviorDescription()}
        </p>
      </div>
    </motion.div>
  );
};

export default TrainingAnimation;