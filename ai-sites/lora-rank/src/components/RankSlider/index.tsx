/**
 * 秩值调节器组件
 * 提供交互式的秩值选择界面，实时显示当前值和预设推荐值
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Shield } from 'lucide-react';

interface RankSliderProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

const RankSlider: React.FC<RankSliderProps> = ({ value, onChange, className = "" }) => {
  const presetValues = [4, 8, 16, 32, 64];
  const recommendedValues = [8, 16]; // 常用推荐值
  
  const getSliderColor = (rank: number) => {
    if (rank <= 8) return 'from-green-400 to-green-600';
    if (rank <= 32) return 'from-blue-400 to-blue-600';
    return 'from-purple-400 to-purple-600';
  };
  
  const getIcon = (rank: number) => {
    if (rank <= 8) return <Shield className="w-4 h-4" />;
    if (rank <= 32) return <Target className="w-4 h-4" />;
    return <Zap className="w-4 h-4" />;
  };

  return (
    <div className={`p-6 bg-white rounded-2xl shadow-lg border border-gray-100 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">调整 LoRA 秩值</h3>
        <motion.div 
          className={`flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${getSliderColor(value)} text-white font-medium`}
          key={value}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {getIcon(value)}
          <span>{value}</span>
        </motion.div>
      </div>
      
      {/* 滑块容器 */}
      <div className="relative mb-6">
        <input
          type="range"
          min="1"
          max="64"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, 
              rgb(34, 197, 94) 0%, 
              rgb(34, 197, 94) ${(8/64)*100}%, 
              rgb(59, 130, 246) ${(8/64)*100}%, 
              rgb(59, 130, 246) ${(32/64)*100}%, 
              rgb(147, 51, 234) ${(32/64)*100}%, 
              rgb(147, 51, 234) 100%)`
          }}
        />
        
        {/* 预设值标记 */}
        <div className="absolute top-3 left-0 right-0">
          {presetValues.map((preset) => (
            <motion.button
              key={preset}
              className={`absolute transform -translate-x-1/2 ${
                recommendedValues.includes(preset) 
                  ? 'w-3 h-3 bg-yellow-400 border-2 border-yellow-600' 
                  : 'w-2 h-2 bg-gray-400 border border-gray-600'
              } rounded-full cursor-pointer hover:scale-110 transition-transform`}
              style={{ left: `${(preset / 64) * 100}%` }}
              onClick={() => onChange(preset)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
      
      {/* 预设值快捷按钮 */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-gray-600 mr-2">快速选择:</span>
        {presetValues.map((preset) => (
          <motion.button
            key={preset}
            onClick={() => onChange(preset)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
              value === preset
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } ${recommendedValues.includes(preset) ? 'ring-2 ring-yellow-300' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {preset}
            {recommendedValues.includes(preset) && (
              <span className="ml-1 text-xs">⭐</span>
            )}
          </motion.button>
        ))}
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        ⭐ 标记的是日常微调推荐值
      </div>
    </div>
  );
};

export default RankSlider;
