/**
 * 预测动画组件
 * 展示 Transformer 预测过程的动画
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardBody, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { X, Play, Pause, RotateCcw, ArrowRight } from 'lucide-react';

interface PredictionAnimationProps {
  onClose: () => void;
}

const PredictionAnimation: React.FC<PredictionAnimationProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const steps = [
    {
      title: '输入处理',
      description: '将输入文本"今天天气"转换为向量表示',
      visual: (
        <div className="flex items-center justify-center space-x-4">
          <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-mono">
            今天
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-mono">
            天气
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <div className="w-16 h-8 bg-purple-200 rounded flex items-center justify-center text-xs">
            向量
          </div>
        </div>
      )
    },
    {
      title: '注意力计算',
      description: '计算词语之间的关联强度',
      visual: (
        <div className="space-y-4">
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mb-2">
                今天
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mb-2">
                天气
              </div>
            </div>
          </div>
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center"
          >
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full" />
          </motion.div>
          <div className="text-center text-sm text-gray-600">
            关联强度: 0.8
          </div>
        </div>
      )
    },
    {
      title: '概率生成',
      description: '为可能的下一个词生成概率分布',
      visual: (
        <div className="space-y-3">
          {[
            { word: '晴朗', prob: 0.45, color: 'bg-green-500' },
            { word: '寒冷', prob: 0.28, color: 'bg-blue-500' },
            { word: '不错', prob: 0.15, color: 'bg-purple-500' },
            { word: '炎热', prob: 0.08, color: 'bg-red-500' },
            { word: '潮湿', prob: 0.04, color: 'bg-gray-500' }
          ].map((item, index) => (
            <motion.div
              key={item.word}
              initial={{ width: 0 }}
              animate={{ width: `${item.prob * 100}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="flex items-center space-x-2"
            >
              <span className="w-12 text-sm font-medium">{item.word}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
                <motion.div
                  className={`h-full ${item.color} rounded-full`}
                  style={{ width: `${item.prob * 100}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-12">
                {(item.prob * 100).toFixed(0)}%
              </span>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      title: '结果输出',
      description: '选择概率最高的词作为预测结果',
      visual: (
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-bold text-lg"
          >
            <span>今天天气</span>
            <ArrowRight className="w-5 h-5" />
            <span className="text-yellow-300">晴朗</span>
          </motion.div>
          <div className="text-sm text-gray-600">
            预测概率: 45%
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, steps.length]);

  const handlePlay = () => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      size="2xl"
      className="mx-4"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h3 className="text-xl font-bold">Transformer 预测过程动画</h3>
          <p className="text-sm text-gray-600">观察模型如何一步步预测下一个词</p>
        </ModalHeader>
        
        <ModalBody className="py-6">
          <div className="space-y-6">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between">
              {steps.map((_, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index <= currentStep
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 h-1 mx-2 ${
                        index < currentStep ? 'bg-purple-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Current Step */}
            <Card className="shadow-md">
              <CardBody className="p-6 space-y-4">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    步骤 {currentStep + 1}: {steps[currentStep].title}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {steps[currentStep].description}
                  </p>
                </div>
                
                <div className="min-h-40 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="w-full"
                    >
                      {steps[currentStep].visual}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </CardBody>
            </Card>

            {/* Controls */}
            <div className="flex justify-center space-x-4">
              <Button
                color="primary"
                startContent={isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                onPress={handlePlay}
                className="bg-gradient-to-r from-purple-500 to-pink-500"
              >
                {isPlaying ? '暂停' : '播放'}
              </Button>
              
              <Button
                variant="bordered"
                startContent={<RotateCcw className="w-4 h-4" />}
                onPress={handleReset}
              >
                重置
              </Button>
            </div>
          </div>
        </ModalBody>
        
        <ModalFooter>
          <Button 
            color="danger" 
            variant="light" 
            onPress={handleClose}
          >
            关闭
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PredictionAnimation;
