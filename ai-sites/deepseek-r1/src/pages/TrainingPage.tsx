/**
 * 训练流程页面组件 - 展示 R1 模型的完整训练过程
 * 包含两阶段训练的详细步骤和数据流向
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Database, Cog, Target, CheckCircle } from 'lucide-react';

const TrainingPage: React.FC = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);

  const trainingPhases = [
    {
      id: 1,
      title: '第一阶段：推理能力训练',
      description: '专注于培养模型的核心推理能力',
      color: 'bg-blue-100 border-blue-300',
      steps: [
        {
          title: '少量精品数据 SFT',
          description: '使用几千个包含思维链推理的高质量数据进行监督微调',
          data: '数千个思维链数据',
          icon: Database,
          details: [
            '选择高质量的推理案例',
            '包含完整的思考过程',
            '为后续强化学习做准备',
            '提升冷启动效率'
          ]
        },
        {
          title: '推理密集任务 RL',
          description: '在编程、数学、科学、逻辑等推理密集领域进行强化学习',
          data: '推理密集任务集',
          icon: Cog,
          details: [
            '覆盖多个推理领域',
            '使用规则奖励模型',
            '添加语言一致性奖励',
            '显著提升推理能力'
          ]
        }
      ]
    },
    {
      id: 2,
      title: '第二阶段：综合能力优化',
      description: '平衡推理能力与通用能力，提升用户体验',
      color: 'bg-green-100 border-green-300',
      steps: [
        {
          title: '多领域数据 SFT',
          description: '使用60万推理数据 + 20万通用数据进行监督微调',
          data: '80万高质量数据',
          icon: Database,
          details: [
            '60万推理相关数据',
            '20万写作、翻译等通用数据',
            '数据质量精心筛选',
            '特别优化中文表现'
          ]
        },
        {
          title: '安全性 & 通用能力 RL',
          description: '最终的强化学习优化，确保输出安全且用户友好',
          data: '综合评估体系',
          icon: Target,
          details: [
            '安全输出控制',
            '有害内容过滤',
            '通用内容奖励',
            '用户体验优化'
          ]
        }
      ]
    }
  ];

  const dataFlow = [
    { from: 'DeepSeek V3', to: '第一阶段 SFT', type: '基础模型' },
    { from: '第一阶段 SFT', to: '第一阶段 RL', type: '初始推理能力' },
    { from: '第一阶段 RL', to: '数据生成', type: '强推理模型' },
    { from: '数据生成', to: '第二阶段 SFT', type: '高质量数据' },
    { from: '第二阶段 SFT', to: '第二阶段 RL', type: '综合能力模型' },
    { from: '第二阶段 RL', to: 'DeepSeek R1', type: '最终模型' }
  ];

  const currentPhase = trainingPhases.find(p => p.id === activePhase)!;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          R1 模型训练流程
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          两阶段训练策略：从推理能力培养到综合能力优化
        </p>
      </motion.div>

      {/* 阶段选择器 */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-4">
          {trainingPhases.map((phase) => (
            <motion.button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all border-2 ${
                activePhase === phase.id
                  ? phase.color + ' shadow-lg'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {phase.title}
            </motion.button>
          ))}
        </div>
      </div>

      {/* 训练阶段详情 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePhase}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        >
          <div className={`${currentPhase.color} p-6 border-2`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {currentPhase.title}
            </h2>
            <p className="text-gray-700 text-lg">
              {currentPhase.description}
            </p>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {currentPhase.steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`p-3 rounded-lg ${activePhase === 1 ? 'bg-blue-100' : 'bg-green-100'}`}>
                        <Icon className={`h-6 w-6 ${activePhase === 1 ? 'text-blue-600' : 'text-green-600'}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-500">{step.data}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">
                      {step.description}
                    </p>

                    <div className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 数据流向图 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          完整训练数据流向
        </h2>
        
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
            {dataFlow.map((flow, index) => (
              <React.Fragment key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="bg-blue-600 text-white p-3 rounded-lg font-medium text-sm mb-2">
                    {flow.from}
                  </div>
                  {index < dataFlow.length - 1 && (
                    <div className="hidden md:block">
                      <ArrowRight className="h-5 w-5 text-gray-400 mx-auto" />
                      <div className="text-xs text-gray-500 mt-1">{flow.type}</div>
                    </div>
                  )}
                </motion.div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 移动端箭头 */}
        <div className="md:hidden space-y-4 mt-4">
          {dataFlow.slice(0, -1).map((flow, index) => (
            <div key={index} className="flex items-center justify-center space-x-2">
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <span className="text-xs text-gray-500">{flow.type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 关键成果 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center"
      >
        <h2 className="text-2xl font-bold mb-4">训练成果</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-3xl font-bold mb-2">低成本</div>
            <div className="text-blue-100">相比预训练，后训练成本极低</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">可扩展</div>
            <div className="text-blue-100">训练流程可持续迭代优化</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">高效果</div>
            <div className="text-blue-100">推理能力显著超越基础模型</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TrainingPage;
