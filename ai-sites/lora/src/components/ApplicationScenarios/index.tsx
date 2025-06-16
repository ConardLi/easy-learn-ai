/**
 * LoRA 应用场景组件
 * 展示 LoRA 在不同领域的实际应用案例和场景
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Eye, 
  Mic, 
  Code, 
  FileText, 
  PenTool,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';

const ApplicationScenarios: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState(0);

  const scenarios = [
    {
      id: 'nlp',
      title: '自然语言处理',
      icon: MessageSquare,
      color: 'from-blue-500 to-cyan-500',
      description: '对话系统、文本生成、情感分析等 NLP 任务',
      applications: [
        { name: '智能客服', desc: '个性化对话风格适配', difficulty: 'easy' },
        { name: '内容创作', desc: '特定领域文本生成', difficulty: 'medium' },
        { name: '代码生成', desc: '编程语言和风格适配', difficulty: 'medium' },
        { name: '多语言翻译', desc: '特定语言对微调', difficulty: 'hard' }
      ],
      benefits: [
        '快速适配特定领域词汇',
        '保持预训练模型的通用能力',
        '支持多任务并行微调',
        '降低微调成本'
      ],
      example: {
        task: '医疗对话系统',
        before: '通用回答: "请咨询专业医生"',
        after: 'LoRA适配后: "根据您的症状描述，建议进行相关检查..."'
      }
    },
    {
      id: 'cv',
      title: '计算机视觉',
      icon: Eye,
      color: 'from-green-500 to-emerald-500',
      description: '图像分类、目标检测、图像生成等视觉任务',
      applications: [
        { name: '图像分类', desc: '特定类别识别优化', difficulty: 'easy' },
        { name: '目标检测', desc: '特定场景检测适配', difficulty: 'medium' },
        { name: '图像生成', desc: '特定风格图像生成', difficulty: 'medium' },
        { name: '医学影像', desc: '医疗图像分析', difficulty: 'hard' }
      ],
      benefits: [
        '保留预训练的视觉特征',
        '快速适配新的视觉任务',
        '支持风格迁移',
        '降低标注数据需求'
      ],
      example: {
        task: '工业缺陷检测',
        before: '通用模型: 60% 准确率',
        after: 'LoRA适配后: 95% 准确率'
      }
    },
    {
      id: 'speech',
      title: '语音识别',
      icon: Mic,
      color: 'from-purple-500 to-pink-500',
      description: '语音转文字、语音合成、说话人识别等',
      applications: [
        { name: '方言识别', desc: '特定方言语音适配', difficulty: 'medium' },
        { name: '专业术语', desc: '行业专业词汇识别', difficulty: 'medium' },
        { name: '语音合成', desc: '个性化语音风格', difficulty: 'hard' },
        { name: '情感识别', desc: '语音情感分析', difficulty: 'hard' }
      ],
      benefits: [
        '适配特定口音和方言',
        '提升专业领域识别率',
        '支持个性化语音合成',
        '降低训练数据需求'
      ],
      example: {
        task: '医疗语音转录',
        before: '通用识别: 医学术语错误率 30%',
        after: 'LoRA适配后: 医学术语错误率 5%'
      }
    }
  ];

  const useCases = [
    {
      industry: '金融科技',
      icon: FileText,
      cases: ['智能投顾对话', '风险评估报告生成', '金融文档分析'],
      impact: '提升客户服务效率 40%'
    },
    {
      industry: '教育培训',
      icon: Code,
      cases: ['个性化学习助手', '自动作业批改', '知识点推荐'],
      impact: '学习效果提升 35%'
    },
    {
      industry: '内容创作',
      icon: PenTool,
      cases: ['文章写作助手', '营销文案生成', '多语言翻译'],
      impact: '内容创作效率提升 60%'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return CheckCircle;
      case 'medium': return AlertCircle;
      case 'hard': return XCircle;
      default: return AlertCircle;
    }
  };

  return (
    <div className="space-y-8">
      {/* 标题 */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-3xl font-bold text-gray-800 mb-2">
          LoRA 应用场景
        </h3>
        <p className="text-gray-600">
          探索 LoRA 在不同领域的实际应用和成功案例
        </p>
      </motion.div>

      {/* 场景选择器 */}
      <div className="flex flex-wrap justify-center gap-4">
        {scenarios.map((scenario, index) => {
          const Icon = scenario.icon;
          return (
            <motion.button
              key={scenario.id}
              onClick={() => setSelectedScenario(index)}
              className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedScenario === index
                  ? `bg-gradient-to-r ${scenario.color} text-white shadow-lg`
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-5 h-5" />
              <span>{scenario.title}</span>
            </motion.button>
          );
        })}
      </div>

      {/* 场景详情 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedScenario}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`bg-gradient-to-r ${scenarios[selectedScenario].color} text-white p-6`}>
            <div className="flex items-center space-x-4">
              {React.createElement(scenarios[selectedScenario].icon, {
                className: "w-8 h-8"
              })}
              <div>
                <h4 className="text-2xl font-bold">{scenarios[selectedScenario].title}</h4>
                <p className="text-blue-100 mt-1">{scenarios[selectedScenario].description}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* 应用案例 */}
            <div>
              <h5 className="text-lg font-semibold text-gray-800 mb-4">典型应用</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scenarios[selectedScenario].applications.map((app, index) => {
                  const DifficultyIcon = getDifficultyIcon(app.difficulty);
                  return (
                    <motion.div
                      key={index}
                      className="bg-gray-50 rounded-lg p-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h6 className="font-medium text-gray-800">{app.name}</h6>
                          <p className="text-sm text-gray-600 mt-1">{app.desc}</p>
                        </div>
                        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getDifficultyColor(app.difficulty)}`}>
                          <DifficultyIcon className="w-3 h-3" />
                          <span className="capitalize">{app.difficulty}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* 核心优势 */}
            <div>
              <h5 className="text-lg font-semibold text-gray-800 mb-4">核心优势</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {scenarios[selectedScenario].benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 实际案例 */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
              <h5 className="text-lg font-semibold text-gray-800 mb-4">实际案例</h5>
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-blue-600">任务：</span>
                  <span className="text-gray-700 ml-2">{scenarios[selectedScenario].example.task}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border-l-4 border-red-400">
                    <div className="text-sm font-medium text-red-600 mb-2">微调前</div>
                    <div className="text-gray-700">{scenarios[selectedScenario].example.before}</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-l-4 border-green-400">
                    <div className="text-sm font-medium text-green-600 mb-2">LoRA 微调后</div>
                    <div className="text-gray-700">{scenarios[selectedScenario].example.after}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 行业用例 */}
      <motion.div
        className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h4 className="text-xl font-semibold text-gray-800 mb-6">跨行业应用</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={useCase.industry}
                className="bg-white rounded-xl p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h5 className="text-lg font-semibold text-gray-800">{useCase.industry}</h5>
                </div>
                
                <div className="space-y-2 mb-4">
                  {useCase.cases.map((case_, caseIndex) => (
                    <div key={caseIndex} className="flex items-center space-x-2">
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{case_}</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-sm font-medium text-green-700">业务影响</div>
                  <div className="text-sm text-green-600">{useCase.impact}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* 实施建议 */}
      <motion.div
        className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0 }}
      >
        <h4 className="text-xl font-semibold mb-4">LoRA 实施建议</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h5 className="font-semibold">选择场景</h5>
            <ul className="space-y-1 text-sm text-blue-100">
              <li>• 有明确的微调目标</li>
              <li>• 计算资源相对有限</li>
              <li>• 需要快速迭代和部署</li>
              <li>• 多任务并行训练需求</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="font-semibold">避免场景</h5>
            <ul className="space-y-1 text-sm text-blue-100">
              <li>• 需要大量新知识注入</li>
              <li>• 模型架构需要大幅改动</li>
              <li>• 对模型精度要求极高</li>
              <li>• 预训练模型差异过大</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ApplicationScenarios;