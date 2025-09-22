/**
 * 多模态信息流图解组件
 * 展示多模态AI的信息处理流程
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Image, Volume2, Video, Brain, ArrowRight } from 'lucide-react';

interface MultimodalFlowProps {
  inView: boolean;
}

const MultimodalFlow: React.FC<MultimodalFlowProps> = ({ inView }) => {
  const [activeModal, setActiveModal] = useState(0);

  const modalities = [
    { icon: FileText, name: '文本', color: 'text-blue-600', bgColor: 'bg-blue-100', borderColor: 'border-blue-500' },
    { icon: Image, name: '图像', color: 'text-green-600', bgColor: 'bg-green-100', borderColor: 'border-green-500' },
    { icon: Volume2, name: '音频', color: 'text-yellow-600', bgColor: 'bg-yellow-100', borderColor: 'border-yellow-500' },
    { icon: Video, name: '视频', color: 'text-red-600', bgColor: 'bg-red-100', borderColor: 'border-red-500' }
  ];

  const processingSteps = [
    '特征提取',
    '向量编码',
    '多模态融合',
    '语义理解',
    '智能输出'
  ];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold text-gray-900 mb-8 text-center"
      >
        多模态信息处理流程
      </motion.h3>

      <div className="space-y-12">
        {/* 输入层 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">输入层</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {modalities.map((modality, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  activeModal === index
                    ? `${modality.borderColor} ${modality.bgColor}`
                    : 'border-gray-200 bg-gray-50'
                }`}
                onClick={() => setActiveModal(index)}
                whileHover={{ scale: 1.05 }}
                animate={activeModal === index ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <modality.icon className={`w-8 h-8 mx-auto mb-2 ${
                    activeModal === index ? modality.color : 'text-gray-400'
                  }`} />
                  <span className={`text-sm font-medium ${
                    activeModal === index ? modality.color : 'text-gray-600'
                  }`}>
                    {modality.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 流程箭头 */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowRight className="w-8 h-8 text-gray-400 transform rotate-90" />
          </motion.div>
        </motion.div>

        {/* 处理层 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">处理层</h4>
          <div className="flex justify-center">
            <div className="flex items-center space-x-6 bg-gray-50 rounded-xl p-6">
              {processingSteps.map((step, index) => (
                <React.Fragment key={index}>
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                      <span className="text-purple-600 font-bold text-sm">{index + 1}</span>
                    </div>
                    <span className="text-xs text-gray-600 font-medium">{step}</span>
                  </motion.div>
                  {index < processingSteps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 流程箭头 */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowRight className="w-8 h-8 text-gray-400 transform rotate-90" />
          </motion.div>
        </motion.div>

        {/* 输出层 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">输出层</h4>
          <div className="flex justify-center">
            <motion.div
              className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6 text-center"
              whileHover={{ scale: 1.02 }}
            >
              <Brain className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h5 className="font-semibold text-purple-900 mb-2">智能理解与生成</h5>
              <p className="text-sm text-purple-700 max-w-xs">
                基于多模态融合的深度理解，生成符合用户需求的智能响应
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* 示例展示 */}
        <motion.div
          className="bg-blue-50 rounded-xl p-6 border border-blue-200"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <h4 className="font-semibold text-blue-900 mb-3">实际应用示例</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2">输入：</h5>
              <p className="text-gray-600">
                用户上传一张风景照片 + 语音描述："把这张图片改成梵高风格"
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2">输出：</h5>
              <p className="text-gray-600">
                AI理解图片内容和用户意图，生成梵高风格的艺术化图片
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MultimodalFlow;
