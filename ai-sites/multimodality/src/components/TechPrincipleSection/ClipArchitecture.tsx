/**
 * CLIP架构图解组件
 * 展示CLIP模型的工作原理和架构
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image, FileText, ArrowRight, Zap } from 'lucide-react';

interface ClipArchitectureProps {
  inView: boolean;
}

const ClipArchitecture: React.FC<ClipArchitectureProps> = ({ inView }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: '图像编码', description: '将图像转换为向量表示' },
    { title: '文本编码', description: '将文本转换为向量表示' },
    { title: '对比学习', description: '计算图文向量相似度' },
    { title: '匹配结果', description: '找到最佳图文配对' }
  ];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold text-gray-900 mb-8 text-center"
      >
        CLIP 对比学习原理
      </motion.h3>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* 架构图 */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {/* 输入层 */}
          <div className="flex justify-between items-center">
            <motion.div
              className="bg-blue-100 p-4 rounded-xl text-center"
              whileHover={{ scale: 1.05 }}
            >
              <Image className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-blue-800">输入图像</span>
            </motion.div>

            <motion.div
              className="bg-green-100 p-4 rounded-xl text-center"
              whileHover={{ scale: 1.05 }}
            >
              <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-green-800">输入文本</span>
            </motion.div>
          </div>

          {/* 编码器 */}
          <div className="flex justify-between items-center">
            <motion.div
              className="bg-blue-200 p-4 rounded-xl text-center"
              animate={activeStep >= 0 ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="text-sm font-medium text-blue-800">图像编码器</span>
            </motion.div>

            <motion.div
              className="bg-green-200 p-4 rounded-xl text-center"
              animate={activeStep >= 1 ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="text-sm font-medium text-green-800">文本编码器</span>
            </motion.div>
          </div>

          {/* 特征向量 */}
          <div className="flex justify-center items-center space-x-8">
            <motion.div
              className="bg-purple-100 p-4 rounded-xl text-center"
              animate={activeStep >= 2 ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-purple-800">相似度计算</span>
            </motion.div>
          </div>

          {/* 输出 */}
          <motion.div
            className="bg-orange-100 p-4 rounded-xl text-center"
            animate={activeStep >= 3 ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-medium text-orange-800">匹配分数</span>
          </motion.div>
        </motion.div>

        {/* 步骤说明 */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-4"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                activeStep === index
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
              onClick={() => setActiveStep(index)}
              whileHover={{ scale: 1.02 }}
              animate={activeStep === index ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeStep === index ? 'bg-purple-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            className="mt-6 p-4 bg-blue-50 rounded-xl"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h4 className="font-semibold text-blue-900 mb-2">核心创新</h4>
            <p className="text-sm text-blue-700">
              CLIP通过4亿图文对的对比学习，让AI真正理解图像和文本之间的语义关联，
              实现了跨模态的零样本学习能力。
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClipArchitecture;
