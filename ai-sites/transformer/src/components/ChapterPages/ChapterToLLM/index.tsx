/**
 * 从 Transformer 到大语言模型章节
 * 展示 Transformer 如何演进为现代大语言模型
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Button, Progress } from '@nextui-org/react';
import { 
  ArrowRight, 
  TrendingUp, 
  Layers,
  Users,
  Sparkles,
  Zap,
  Brain,
  Target,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ChapterToLLM: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState(0);

  const evolutionSteps = [
    {
      year: '2017',
      model: 'Original Transformer',
      parameters: '65M',
      capabilities: ['机器翻译', '基础文本生成'],
      description: '奠定基础架构',
      color: 'from-blue-400 to-blue-600'
    },
    {
      year: '2018',
      model: 'BERT',
      parameters: '340M', 
      capabilities: ['文本理解', '情感分析', '问答系统'],
      description: '双向编码器革命',
      color: 'from-green-400 to-green-600'
    },
    {
      year: '2019',
      model: 'GPT-2',
      parameters: '1.5B',
      capabilities: ['流畅文本生成', '零样本学习'],
      description: '生成能力突破',
      color: 'from-purple-400 to-purple-600'
    },
    {
      year: '2020',
      model: 'GPT-3',
      parameters: '175B',
      capabilities: ['代码生成', '创意写作', '复杂推理'],
      description: '涌现能力显现',
      color: 'from-orange-400 to-orange-600'
    },
    {
      year: '2023',
      model: 'GPT-4',
      parameters: '1.8T',
      capabilities: ['多模态理解', '专业级问答', '复杂任务'],
      description: '接近人类智能',
      color: 'from-red-400 to-red-600'
    }
  ];

  const improvements = [
    {
      title: '规模升级',
      icon: Layers,
      description: '从基础 Transformer 的 1 亿参数，扩展到 GPT-4 的 1.8 万亿参数',
      analogy: '相当于从"小型图书馆"升级为"国家图书馆"',
      details: [
        '参数规模呈指数级增长',
        '模型层数和宽度大幅增加',
        '计算能力需求急剧上升'
      ]
    },
    {
      title: '训练优化',
      icon: Target,
      description: '采用自监督学习和人类反馈优化训练过程',
      analogy: '让模型既能自学，又能从人类老师那里学习',
      details: [
        '自监督学习：遮住句子中的词让模型猜测',
        '人类反馈微调(RLHF)：让模型更懂人话',
        '指令微调：提升任务执行能力'
      ]
    },
    {
      title: '能力拓展',
      icon: Globe,
      description: '从单一文本处理，进化到图文音多模态理解',
      analogy: '从"只会看书"到"能看懂图片、听懂声音"',
      details: [
        'GPT-4 能解释图片中的梗',
        '支持文本、图像、音频输入',
        '跨模态推理和生成能力'
      ]
    }
  ];

  const applications = [
    {
      name: 'ChatGPT',
      icon: '💬',
      description: '对话式AI助手',
      impact: '改变了人机交互方式'
    },
    {
      name: 'GitHub Copilot',
      icon: '💻',
      description: 'AI代码助手',
      impact: '提升程序员开发效率'
    },
    {
      name: 'DALL-E',
      icon: '🎨',
      description: '文本生成图像',
      impact: '革新创意产业'
    },
    {
      name: 'Claude',
      icon: '🤖',
      description: '安全可控的AI助手',
      impact: '探索AI安全边界'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          从 Transformer 到大语言模型
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          见证 Transformer 如何演进为改变世界的大语言模型
        </p>
      </motion.div>

      {/* Evolution Timeline */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          演进时间线
        </h2>
        
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-400 to-red-400"></div>
          
          <div className="space-y-8">
            {evolutionSteps.map((step, index) => (
              <motion.div
                key={step.model}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}>
                  <Card className="shadow-lg hover:shadow-xl transition-all border-0">
                    <CardBody className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold`}>
                            {step.year.slice(-2)}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">
                              {step.model}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {step.parameters} 参数
                            </p>
                          </div>
                        </div>
                        
                        <p className="text-gray-600">
                          {step.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {step.capabilities.map((capability) => (
                            <span
                              key={capability}
                              className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                            >
                              {capability}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
                
                <div className="relative z-10">
                  <div className={`w-4 h-4 bg-gradient-to-r ${step.color} rounded-full border-4 border-white shadow-lg`}></div>
                </div>
                
                <div className="flex-1 md:block hidden"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Key Improvements */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          三大改进方向
        </h2>
        
        <div className="grid gap-8 md:grid-cols-3">
          {improvements.map((improvement, index) => {
            const Icon = improvement.icon;
            return (
              <motion.div
                key={improvement.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-full shadow-lg hover:shadow-xl transition-all border-0">
                  <CardBody className="p-6 space-y-4">
                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {improvement.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                      {improvement.description}
                    </p>

                    <div className="bg-purple-50 p-3 rounded-lg">
                      <div className="text-sm font-medium text-purple-700 mb-1">
                        类比理解：
                      </div>
                      <div className="text-sm text-purple-600">
                        {improvement.analogy}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">
                        具体表现：
                      </div>
                      <ul className="space-y-1">
                        {improvement.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Real-world Applications */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          现实世界的应用
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {applications.map((app, index) => (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="h-full shadow-lg hover:shadow-xl transition-all border-0 text-center">
                <CardBody className="p-6 space-y-4">
                  <div className="text-4xl">{app.icon}</div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {app.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {app.description}
                  </p>
                  <div className="bg-green-50 px-3 py-2 rounded-lg">
                    <p className="text-green-700 text-xs font-medium">
                      {app.impact}
                    </p>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Future Outlook */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <Card className="shadow-lg border-0 bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardBody className="p-8 text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="w-6 h-6 text-indigo-600" />
              <h3 className="text-2xl font-bold text-gray-800">
                未来展望
              </h3>
              <Sparkles className="w-6 h-6 text-indigo-600" />
            </div>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              从 2017 年的 Transformer 到今天的 GPT-4，我们见证了 AI 的飞速发展。
              随着模型规模继续扩大、训练方法不断优化、多模态能力持续增强，
              大语言模型将在更多领域发挥作用，推动人工智能向通用人工智能(AGI)迈进。
            </p>
            <div className="flex justify-center pt-4">
              <div className="text-6xl">🚀</div>
            </div>
          </CardBody>
        </Card>
      </motion.section>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="flex justify-between items-center"
      >
        <Link to="/advantages">
          <Button
            variant="bordered"
            startContent={<ArrowRight className="w-5 h-5 rotate-180" />}
          >
            上一章：优缺点
          </Button>
        </Link>
        <Link to="/demo">
          <Button
            size="lg"
            color="primary"
            endContent={<ArrowRight className="w-5 h-5" />}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
          >
            体验交互演示
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ChapterToLLM;
