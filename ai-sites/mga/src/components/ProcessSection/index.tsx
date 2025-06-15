/**
 * 技术实现流程展示组件
 * 可视化展示MGA的三个技术实现阶段
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Play, Pause } from 'lucide-react';

const ProcessSection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      id: 'generation',
      title: 'Genre-Audience对生成',
      description: '利用3.3B参数MoE模型自适应提取体裁-受众组合',
      details: [
        '使用混合专家模型分析原始文档',
        '自动生成5组不同的体裁-受众组合',
        '每个组合定义表达框架和受众特征',
        '例如："学术论文-科研人员"、"对话体-老年人"'
      ],
      color: 'from-blue-500 to-cyan-500',
      example: {
        input: '气候变化科普文章',
        outputs: [
          '学术论文 - 科研人员',
          '对话体 - 老年人',
          '教科书 - 中学生',
          '新闻报道 - 普通民众',
          '技术文档 - 政策制定者'
        ]
      }
    },
    {
      id: 'reformulation',
      title: '文本重构',
      description: '使用轻量级工具模型根据Genre-Audience要求重构文本',
      details: [
        '量化后的轻量级模型执行重构',
        '根据体裁要求调整结构和语言风格',
        '根据受众特征调整知识深度和表达方式',
        '保持核心信息的完整性和准确性'
      ],
      color: 'from-purple-500 to-pink-500',
      example: {
        input: '面向小学生的对话体故事',
        transformation: '简化术语 + 增加具象案例 + 对话形式',
        output: '小明: "爷爷，为什么天气越来越热？" 爷爷: "这是因为..."'
      }
    },
    {
      id: 'quality',
      title: '质量控制',
      description: '使用LLM裁判模型进行有限一致性评估',
      details: [
        '引入专门的裁判模型评估重构质量',
        '允许风格和表达顺序的合理差异',
        '要求核心信息可追溯至原始文本',
        '过滤掉评分低于3分的无效重构'
      ],
      color: 'from-green-500 to-emerald-500',
      example: {
        criteria: '有限一致性准则',
        valid: '✓ 保留核心信息点',
        invalid: '✗ 语义偏差过大',
        threshold: '评分 ≥ 3分'
      }
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            MGA 技术实现流程
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            三个关键步骤实现高质量的数据增强
          </p>
          
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{isPlaying ? '暂停演示' : '开始演示'}</span>
          </button>
        </motion.div>

        {/* 流程步骤指示器 */}
        <div className="flex justify-center mb-16">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <motion.button
                  onClick={() => setCurrentStep(index)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all ${
                    currentStep === index
                      ? 'bg-white shadow-lg scale-105'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  whileHover={{ scale: currentStep === index ? 1.05 : 1.02 }}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep === index
                      ? `bg-gradient-to-br ${step.color} text-white`
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > index ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-bold">{index + 1}</span>
                    )}
                  </div>
                  <span className={`font-medium ${
                    currentStep === index ? 'text-gray-900' : 'text-gray-600'
                  }`}>
                    {step.title}
                  </span>
                </motion.button>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 详细内容展示 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 shadow-lg"
          >
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${steps[currentStep].color} rounded-2xl flex items-center justify-center`}>
                    <span className="text-white font-bold text-xl">{currentStep + 1}</span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {steps[currentStep].title}
                    </h2>
                    <p className="text-lg text-gray-600">
                      {steps[currentStep].description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {steps[currentStep].details.map((detail, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{detail}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">实例演示</h3>
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                      <p className="text-sm text-blue-600 font-medium mb-2">输入文档</p>
                      <p className="text-gray-800">{steps[currentStep].example.input}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 font-medium">生成的Genre-Audience对:</p>
                      {steps[currentStep].example.outputs?.map((output, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-3 bg-white rounded-lg border border-gray-200"
                        >
                          <span className="text-gray-700">{output}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                      <p className="text-sm text-purple-600 font-medium mb-2">重构目标</p>
                      <p className="text-gray-800">{steps[currentStep].example.input}</p>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-gray-200">
                      <p className="text-sm text-gray-600 font-medium mb-2">转换过程</p>
                      <p className="text-gray-700">{steps[currentStep].example.transformation}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
                      <p className="text-sm text-green-600 font-medium mb-2">重构结果</p>
                      <p className="text-gray-800">{steps[currentStep].example.output}</p>
                    </div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
                      <p className="text-sm text-green-600 font-medium mb-2">评估标准</p>
                      <p className="text-gray-800">{steps[currentStep].example.criteria}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <p className="text-green-700 font-medium">{steps[currentStep].example.valid}</p>
                      </div>
                      <div className="p-3 bg-red-100 rounded-lg">
                        <p className="text-red-700 font-medium">{steps[currentStep].example.invalid}</p>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <p className="text-blue-700 font-medium">{steps[currentStep].example.threshold}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProcessSection;
