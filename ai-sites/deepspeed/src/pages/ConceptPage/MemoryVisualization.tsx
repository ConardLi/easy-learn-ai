/**
 * 显存可视化组件 - 展示传统多卡训练 vs DeepSpeed 的显存使用对比
 * 通过动画演示显存分配差异
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface GPUCardProps {
  label: string;
  memoryUsage: number;
  totalMemory: number;
  isDeepSpeed: boolean;
  animationDelay?: number;
}

const GPUCard: React.FC<GPUCardProps> = ({ 
  label, 
  memoryUsage, 
  totalMemory, 
  isDeepSpeed,
  animationDelay = 0 
}) => {
  const usagePercentage = (memoryUsage / totalMemory) * 100;
  const isOverload = memoryUsage > totalMemory;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: animationDelay, duration: 0.5 }}
      className={`bg-white rounded-xl p-4 shadow-lg border-2 ${
        isOverload ? 'border-red-300' : isDeepSpeed ? 'border-green-300' : 'border-blue-300'
      }`}
    >
      <div className="text-center mb-3">
        <h4 className="font-semibold text-gray-800">{label}</h4>
        <p className="text-sm text-gray-600">
          {memoryUsage.toFixed(1)}G / {totalMemory}G
        </p>
      </div>
      
      <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${Math.min(usagePercentage, 100)}%` }}
          transition={{ delay: animationDelay + 0.3, duration: 1, ease: "easeOut" }}
          className={`absolute bottom-0 left-0 right-0 ${
            isOverload 
              ? 'bg-gradient-to-t from-red-500 to-red-400' 
              : isDeepSpeed 
                ? 'bg-gradient-to-t from-green-500 to-green-400'
                : 'bg-gradient-to-t from-blue-500 to-blue-400'
          } flex items-end justify-center`}
        >
          {isOverload && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: animationDelay + 1, duration: 0.5 }}
              className="text-white text-xs font-bold mb-2"
            >
              溢出!
            </motion.div>
          )}
        </motion.div>
        
        {isOverload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ 
              delay: animationDelay + 1.2, 
              duration: 0.5, 
              repeat: Infinity,
              repeatDelay: 0.5 
            }}
            className="absolute top-0 left-0 right-0 h-full bg-red-500/20"
          />
        )}
      </div>
      
      <div className="mt-2 text-xs text-center">
        <span className={`font-medium ${
          isOverload ? 'text-red-600' : isDeepSpeed ? 'text-green-600' : 'text-blue-600'
        }`}>
          {usagePercentage.toFixed(1)}%
        </span>
      </div>
    </motion.div>
  );
};

export const MemoryVisualization: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDeepSpeed, setShowDeepSpeed] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    setShowDeepSpeed(false);
    
    setTimeout(() => {
      setShowDeepSpeed(true);
    }, 3000);
    
    setTimeout(() => {
      setIsPlaying(false);
    }, 6000);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setShowDeepSpeed(false);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">显存使用对比演示</h2>
        <p className="text-gray-600 mb-6">
          场景：使用 2 张 RTX 4090D (24GB) 训练需要 30.5GB 显存的模型
        </p>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={handlePlay}
            disabled={isPlaying}
            className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                演示中...
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                开始演示
              </>
            )}
          </button>
          
          <button
            onClick={handleReset}
            className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            重置
          </button>
        </div>
      </div>

      {/* Traditional Multi-GPU */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          传统多卡训练（会爆显存）
        </h3>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <GPUCard
            label="GPU 1"
            memoryUsage={isPlaying ? 30.5 : 0}
            totalMemory={24}
            isDeepSpeed={false}
            animationDelay={0}
          />
          <GPUCard
            label="GPU 2"
            memoryUsage={isPlaying ? 30.5 : 0}
            totalMemory={24}
            isDeepSpeed={false}
            animationDelay={0.2}
          />
        </div>
        <p className="text-center text-red-600 font-medium mt-4">
          ❌ 每张卡都需要 30.5GB，但只有 24GB 容量
        </p>
      </div>

      {/* DeepSpeed Stage 3 */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          DeepSpeed Stage 3（成功运行）
        </h3>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <GPUCard
            label="GPU 1"
            memoryUsage={showDeepSpeed ? 16.3 : 0}
            totalMemory={24}
            isDeepSpeed={true}
            animationDelay={showDeepSpeed ? 0 : 999}
          />
          <GPUCard
            label="GPU 2"
            memoryUsage={showDeepSpeed ? 16.3 : 0}
            totalMemory={24}
            isDeepSpeed={true}
            animationDelay={showDeepSpeed ? 0.2 : 999}
          />
        </div>
        <p className="text-center text-green-600 font-medium mt-4">
          ✅ 通过分片技术，每张卡只需要 16.3GB（含通信开销）
        </p>
      </div>
    </div>
  );
};
