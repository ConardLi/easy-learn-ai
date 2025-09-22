/**
 * 扩散模型过程图解组件
 * 展示扩散模型的去噪生成过程
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface DiffusionProcessProps {
  inView: boolean;
}

const DiffusionProcess: React.FC<DiffusionProcessProps> = ({ inView }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const diffusionSteps = [
    { label: '纯噪声', noise: 100, clarity: 0 },
    { label: '第1步', noise: 80, clarity: 20 },
    { label: '第2步', noise: 60, clarity: 40 },
    { label: '第3步', noise: 40, clarity: 60 },
    { label: '第4步', noise: 20, clarity: 80 },
    { label: '清晰图像', noise: 0, clarity: 100 }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= diffusionSteps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, diffusionSteps.length]);

  const handlePlay = () => {
    if (currentStep >= diffusionSteps.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold text-gray-900 mb-8 text-center"
      >
        扩散模型去噪过程
      </motion.h3>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* 可视化演示 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          {/* 图像演示区域 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
            <motion.div
              key={currentStep}
              className="w-48 h-48 mx-auto rounded-lg relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* 噪声层 */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600"
                style={{
                  opacity: diffusionSteps[currentStep].noise / 100,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`
                }}
              />
              
              {/* 清晰图像层 */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center"
                style={{ opacity: diffusionSteps[currentStep].clarity / 100 }}
              >
                <span className="text-white font-bold text-2xl">🎨</span>
              </div>
            </motion.div>

            <p className="mt-4 text-lg font-semibold text-gray-700">
              {diffusionSteps[currentStep].label}
            </p>
            <p className="text-sm text-gray-500">
              噪声: {diffusionSteps[currentStep].noise}% | 
              清晰度: {diffusionSteps[currentStep].clarity}%
            </p>
          </div>

          {/* 控制按钮 */}
          <div className="flex justify-center space-x-4">
            <motion.button
              onClick={handlePlay}
              className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{isPlaying ? '暂停' : '播放'}</span>
            </motion.button>

            <motion.button
              onClick={handleReset}
              className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-5 h-5" />
              <span>重置</span>
            </motion.button>
          </div>
        </motion.div>

        {/* 步骤进度 */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h4 className="text-lg font-bold text-gray-900 mb-4">生成步骤</h4>
            <div className="space-y-3">
              {diffusionSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                    currentStep === index
                      ? 'bg-purple-100 border-2 border-purple-500'
                      : 'bg-gray-50 border-2 border-transparent'
                  }`}
                  animate={currentStep === index ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= index ? 'bg-purple-500 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="font-medium text-gray-700">{step.label}</span>
                  <div className="ml-auto">
                    <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${step.clarity}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="bg-purple-50 p-4 rounded-xl border border-purple-200"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h4 className="font-semibold text-purple-900 mb-2">工作原理</h4>
            <p className="text-sm text-purple-700">
              扩散模型通过逐步去除噪声的方式生成图像。它先学会如何在图像中添加噪声，
              然后反向这个过程，从纯噪声开始逐步去噪，最终生成清晰的图像。
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DiffusionProcess;
