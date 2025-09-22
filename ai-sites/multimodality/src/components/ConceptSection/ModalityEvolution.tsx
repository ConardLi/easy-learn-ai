/**
 * 模态演进动画组件
 * 展示从单模态到多模态的转变过程
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Image, Volume2, Video, Brain } from 'lucide-react';

interface ModalityEvolutionProps {
  inView: boolean;
}

const ModalityEvolution: React.FC<ModalityEvolutionProps> = ({ inView }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const modalities = [
    { icon: FileText, name: '文本', color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { icon: Image, name: '图像', color: 'text-green-600', bgColor: 'bg-green-100' },
    { icon: Volume2, name: '音频', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { icon: Video, name: '视频', color: 'text-red-600', bgColor: 'bg-red-100' }
  ];

  useEffect(() => {
    if (!inView) return;
    
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div className="mb-20">
      <div className="grid md:grid-cols-3 gap-8 items-center">
        {/* 单模态阶段 */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">单模态时代</h3>
          <div className="space-y-4">
            {modalities.map((modality, index) => (
              <motion.div
                key={index}
                className={`flex items-center justify-center w-16 h-16 mx-auto rounded-xl ${modality.bgColor} ${modality.color}`}
                animate={{
                  scale: currentStep === 0 && index === 0 ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <modality.icon className="w-8 h-8" />
              </motion.div>
            ))}
          </div>
          <p className="text-gray-600 mt-4">各自独立，无法融合</p>
        </motion.div>

        {/* 连接箭头 */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl"
          >
            →
          </motion.div>
        </motion.div>

        {/* 多模态阶段 */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6">多模态时代</h3>
          <div className="relative">
            {/* 中心大脑 */}
            <motion.div
              className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-purple-100 text-purple-600"
              animate={{
                scale: currentStep === 1 ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 0.8 }}
            >
              <Brain className="w-10 h-10" />
            </motion.div>

            {/* 围绕的模态 */}
            {modalities.map((modality, index) => {
              const angle = (index * 90) - 45;
              const radius = 60;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              return (
                <motion.div
                  key={index}
                  className={`absolute w-12 h-12 rounded-lg ${modality.bgColor} ${modality.color} flex items-center justify-center`}
                  style={{
                    left: `calc(50% + ${x}px - 24px)`,
                    top: `calc(50% + ${y}px - 24px)`,
                  }}
                  animate={{
                    scale: currentStep === 2 ? [1, 1.3, 1] : 1,
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <modality.icon className="w-6 h-6" />
                </motion.div>
              );
            })}

            {/* 连接线 */}
            {modalities.map((_, index) => {
              const angle = (index * 90) - 45;
              const length = 40;

              return (
                <motion.div
                  key={`line-${index}`}
                  className="absolute w-0.5 bg-purple-300"
                  style={{
                    height: `${length}px`,
                    left: '50%',
                    top: '50%',
                    transformOrigin: 'bottom',
                    transform: `rotate(${angle}deg)`,
                  }}
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
                />
              );
            })}
          </div>
          <p className="text-gray-600 mt-4">统一理解，协同工作</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ModalityEvolution;
