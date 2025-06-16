/**
 * 选择建议页面
 * 根据不同的使用场景和需求，为用户推荐最适合的部署方案
 * 提供决策树和场景匹配功能
 */
import React, { useState } from 'react';
import { Card, CardBody, Button, RadioGroup, Radio, Chip } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, Users, Building, Code, Cpu, 
  Zap, ArrowRight, CheckCircle, AlertCircle,
  Server, Shield, Gauge, HardDrive
} from 'lucide-react';

const RecommendationPage: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<string>('');
  const [recommendation, setRecommendation] = useState<any>(null);

  const scenarios = [
    {
      id: 'personal',
      title: '个人开发者',
      description: '学习AI、快速原型开发、个人项目',
      icon: <Code className="h-6 w-6" />
    },
    {
      id: 'startup',
      title: '初创团队',
      description: '小规模团队，预算有限，快速迭代',
      icon: <Users className="h-6 w-6" />
    },
    {
      id: 'enterprise',
      title: '企业级应用',
      description: '生产环境，高并发，稳定性要求高',
      icon: <Building className="h-6 w-6" />
    },
    {
      id: 'research',
      title: '科研机构',
      description: '大规模计算，实验性部署，性能优先',
      icon: <Server className="h-6 w-6" />
    }
  ];

  const recommendations = {
    personal: {
      choice: 'Ollama',
      confidence: 95,
      color: 'from-blue-500 to-cyan-500',
      icon: <Cpu className="h-8 w-8" />,
      reasons: [
        '一键安装，上手简单',
        '硬件要求低，成本友好',
        '内置丰富模型库',
        '交互界面友好'
      ],
      concerns: [
        '性能相对有限',
        '并发处理能力较弱'
      ],
      nextSteps: [
        '下载安装 Ollama',
        '选择合适的预训练模型',
        '开始实验和学习'
      ]
    },
    startup: {
      choice: 'Ollama',
      confidence: 80,
      color: 'from-blue-500 to-cyan-500',
      icon: <Cpu className="h-8 w-8" />,
      reasons: [
        '快速部署，节约时间',
        '运维成本低',
        '适合快速验证想法',
        '团队学习成本低'
      ],
      concerns: [
        '后期可能需要迁移到VLLM',
        '扩展性有限'
      ],
      nextSteps: [
        '先用Ollama验证产品概念',
        '准备后续的VLLM迁移方案',
        '监控性能指标'
      ]
    },
    enterprise: {
      choice: 'VLLM',
      confidence: 90,
      color: 'from-purple-500 to-pink-500',
      icon: <Zap className="h-8 w-8" />,
      reasons: [
        '企业级性能和稳定性',
        '支持大规模并发',
        '完善的监控和恢复机制',
        '可扩展架构'
      ],
      concerns: [
        '部署和运维复杂度高',
        '硬件成本较高'
      ],
      nextSteps: [
        '评估硬件资源需求',
        '搭建测试环境',
        '制定运维方案'
      ]
    },
    research: {
      choice: 'VLLM',
      confidence: 95,
      color: 'from-purple-500 to-pink-500',
      icon: <Zap className="h-8 w-8" />,
      reasons: [
        '极致的推理性能',
        '支持大模型部署',
        '多GPU集群支持',
        'PagedAttention技术优势'
      ],
      concerns: [
        '需要专业的技术团队',
        '硬件投入较大'
      ],
      nextSteps: [
        '规划GPU集群架构',
        '准备技术团队培训',
        '建立性能基准测试'
      ]
    }
  };

  const handleScenarioChange = (value: string) => {
    setSelectedScenario(value);
    setRecommendation(recommendations[value as keyof typeof recommendations]);
  };

  const quickDecisionFactors = [
    {
      factor: '预算有限',
      ollama: '✅ 推荐',
      vllm: '❌ 不推荐',
      reason: 'Ollama硬件要求低，总体成本更低'
    },
    {
      factor: '快速上手',
      ollama: '✅ 推荐',
      vllm: '❌ 不推荐',
      reason: 'Ollama一键安装，部署简单'
    },
    {
      factor: '高并发需求',
      ollama: '❌ 不推荐',
      vllm: '✅ 推荐',
      reason: 'VLLM支持千级并发处理'
    },
    {
      factor: '生产环境',
      ollama: '⚠️ 谨慎',
      vllm: '✅ 推荐',
      reason: 'VLLM提供企业级稳定性'
    },
    {
      factor: '大模型部署',
      ollama: '⚠️ 有限',
      vllm: '✅ 推荐',
      reason: 'VLLM支持70B+大模型部署'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex p-6 rounded-3xl bg-gradient-to-r from-amber-500 to-orange-500 text-white mb-6">
          <Lightbulb className="h-16 w-16" />
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          选择建议与决策指南
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          根据你的具体需求和使用场景，获得个性化的部署方案推荐
        </p>
      </motion.div>

      {/* Scenario Selection */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-800">选择你的使用场景</h2>
        <RadioGroup
          value={selectedScenario}
          onValueChange={handleScenarioChange}
          className="grid md:grid-cols-2 gap-4"
        >
          {scenarios.map((scenario) => (
            <Radio
              key={scenario.id}
              value={scenario.id}
              className="hidden"
            >
              <Card 
                className={`cursor-pointer transition-all duration-300 ${
                  selectedScenario === scenario.id 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:shadow-lg bg-white/80'
                } backdrop-blur-sm`}
                isPressable
                onPress={() => handleScenarioChange(scenario.id)}
              >
                <CardBody className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-blue-600 mt-1">
                      {scenario.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-gray-800">
                        {scenario.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {scenario.description}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Radio>
          ))}
        </RadioGroup>
      </motion.div>

      {/* Recommendation Result */}
      {recommendation && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Card className={`bg-gradient-to-r ${recommendation.color} text-white border-0`}>
            <CardBody className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex p-4 bg-white/20 rounded-2xl mb-4">
                  {recommendation.icon}
                </div>
                <h2 className="text-3xl font-bold mb-2">
                  推荐使用：{recommendation.choice}
                </h2>
                <div className="flex items-center justify-center gap-2">
                  <span>推荐指数：</span>
                  <Chip color="success" variant="flat">
                    {recommendation.confidence}%
                  </Chip>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    推荐理由
                  </h3>
                  <ul className="space-y-2">
                    {recommendation.reasons.map((reason: string, index: number) => (
                      <li key={index} className="text-sm">
                        • {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    注意事项
                  </h3>
                  <ul className="space-y-2">
                    {recommendation.concerns.map((concern: string, index: number) => (
                      <li key={index} className="text-sm">
                        • {concern}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <ArrowRight className="h-5 w-5" />
                    下一步行动
                  </h3>
                  <ul className="space-y-2">
                    {recommendation.nextSteps.map((step: string, index: number) => (
                      <li key={index} className="text-sm">
                        {index + 1}. {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      )}

      {/* Quick Decision Factors */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-800">快速决策因子</h2>
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardBody className="p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickDecisionFactors.map((factor, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    {factor.factor}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Ollama:</span>
                      <span>{factor.ollama}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>VLLM:</span>
                      <span>{factor.vllm}</span>
                    </div>
                    <p className="text-gray-600 text-xs mt-2">
                      {factor.reason}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Final Recommendations */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="grid md:grid-cols-2 gap-8"
      >
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0">
          <CardBody className="p-8">
            <div className="text-center mb-6">
              <div className="inline-flex p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl mb-4">
                <Cpu className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">选择 Ollama 如果</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>你是个人开发者或小团队</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>需要快速部署和验证想法</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>硬件资源有限</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>不需要处理高并发</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>追求简单易用</span>
              </li>
            </ul>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0">
          <CardBody className="p-8">
            <div className="text-center mb-6">
              <div className="inline-flex p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl mb-4">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">选择 VLLM 如果</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>部署生产环境应用</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>需要处理高并发请求</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>有充足的GPU资源</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>对性能要求极高</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>有专业技术团队</span>
              </li>
            </ul>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default RecommendationPage;
