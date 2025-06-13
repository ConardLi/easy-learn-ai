/**
 * 学习率调节滑块组件
 * 允许用户调节学习率参数并显示当前值
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';

interface LearningRateSliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const LearningRateSlider: React.FC<LearningRateSliderProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  // 更新预设值，包含推荐的学习率范围
  const presetValues = [0.00001, 0.00004, 0.00005, 0.0001, 0.001, 0.01, 0.1];

  const getLearningRateDescription = (lr: number) => {
    if (lr > 0.01) return { text: '过大 - 可能震荡或发散', color: 'text-red-600' };
    if (lr >= 0.00005) return { text: '推荐范围 - 最佳选择 ✨', color: 'text-green-600' };
    if (lr >= 0.00004) return { text: '推荐范围 - 稳定可靠 ✅', color: 'text-green-600' };
    if (lr >= 0.00001) return { text: '偏小 - 稳定但收敛慢', color: 'text-blue-600' };
    return { text: '过小 - 收敛非常慢', color: 'text-orange-600' };
  };

  const description = getLearningRateDescription(value);

  return (
    <motion.div 
      className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center mb-4">
        <Settings className="h-6 w-6 text-blue-600 mr-2" />
        <h3 className="text-xl font-semibold text-gray-800">学习率设置</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700 font-medium">当前学习率:</span>
          <span className="text-2xl font-bold text-blue-600">{value.toExponential(0)}</span>
        </div>

        <div className="space-y-2">
          <input
            type="range"
            min="0.00001"
            max="0.1"
            step="0.00001"
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            disabled={disabled}
            className="w-full h-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1e-5</span>
            <span className="text-green-600 font-bold">推荐: 4e-5 ~ 5e-5</span>
            <span>1e-1</span>
          </div>
        </div>

        <div className={`text-center p-3 rounded-xl bg-white shadow-sm ${description.color}`}>
          <span className="font-semibold">{description.text}</span>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-600 font-medium">快速选择常用值:</p>
          <div className="flex flex-wrap gap-2">
            {presetValues.map((preset) => {
              const isRecommended = preset >= 0.00004 && preset <= 0.00005;
              const isSelected = Math.abs(value - preset) < 0.000001;
              
              return (
                <motion.button
                  key={preset}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-lg'
                      : isRecommended
                      ? 'bg-green-100 text-green-700 hover:bg-green-200 border-2 border-green-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onChange(preset)}
                  disabled={disabled}
                >
                  {preset.toExponential(0)}
                  {isRecommended && ' ⭐'}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LearningRateSlider;