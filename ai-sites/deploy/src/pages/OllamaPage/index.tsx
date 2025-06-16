/**
 * Ollama 详情页面
 * 详细介绍 Ollama 的特点、优势、使用场景和技术规格
 * 提供直观的特性展示和使用指南
 */
import React from 'react';
import { Card, CardBody, Chip, Button } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { 
  Cpu, Download, Zap, Shield, Monitor, 
  Server, Users, Code, ArrowRight, CheckCircle,
  HardDrive, Eye, Smartphone
} from 'lucide-react';

const OllamaPage: React.FC = () => {
  const features = [
    {
      icon: <Download className="h-6 w-6" />,
      title: "一键安装",
      description: "开箱即用，无需复杂配置"
    },
    {
      icon: <HardDrive className="h-6 w-6" />,
      title: "低硬件要求",
      description: "CPU 可用，可选 GPU 加速"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "1700+ 模型库",
      description: "内置主流模型，自动优化"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "智能量化",
      description: "自动 int4 量化，显存占用减半"
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "多模态支持",
      description: "支持视觉模型，处理图像任务"
    },
    {
      icon: <Monitor className="h-6 w-6" />,
      title: "交互界面",
      description: "类 ChatGPT 对话体验"
    }
  ];

  const specs = [
    { label: "支持平台", value: "Windows / macOS / Linux" },
    { label: "最低内存", value: "16GB (CPU 模式)" },
    { label: "推荐显存", value: "11GB (14B 模型)" },
    { label: "模型数量", value: "1700+ 预训练模型" },
    { label: "量化支持", value: "int4 / int8 / fp16" },
    { label: "API 兼容", value: "OpenAI 格式" }
  ];

  const useCases = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "个人开发",
      description: "快速原型开发，模型能力验证",
      color: "text-blue-600"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "小团队协作",
      description: "搭建内部 AI 工具，提升工作效率",
      color: "text-green-600"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "隐私敏感场景",
      description: "医疗、法务等对数据安全要求极高的领域",
      color: "text-purple-600"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "离线环境",
      description: "无网络环境下的 AI 推理需求",
      color: "text-orange-600"
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
        <div className="inline-flex p-6 rounded-3xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white mb-6">
          <Cpu className="h-16 w-16" />
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Ollama - 轻量级本地部署
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          专注于本地部署的轻量级大模型工具，以"开箱即用"为核心理念，支持全平台一键安装
        </p>
      </motion.div>

      {/* Key Features */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-800">核心特性</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardBody className="p-6">
                  <div className="text-blue-600 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Technical Specs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-800">技术规格</h2>
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-0">
          <CardBody className="p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specs.map((spec, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                  <span className="font-medium text-gray-700">{spec.label}</span>
                  <Chip color="primary" variant="flat" size="sm">
                    {spec.value}
                  </Chip>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Use Cases */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-800">适用场景</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardBody className="p-6">
                  <div className={`${useCase.color} mb-4`}>
                    {useCase.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {useCase.description}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Advantages */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mb-16"
      >
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0">
          <CardBody className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Ollama 的独特优势
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">极简部署</h4>
                    <p className="text-gray-600 text-sm">一键安装后即可通过命令行快速启动模型</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">智能优化</h4>
                    <p className="text-gray-600 text-sm">自动下载优化后的量化版本，显存占用降低 50%</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">丰富模型库</h4>
                    <p className="text-gray-600 text-sm">内置 1700+ 主流模型，包括 Llama、Qwen、Mistral</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">硬件友好</h4>
                    <p className="text-gray-600 text-sm">支持 CPU 推理，兼容 GPU 加速，硬件门槛极低</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">多模态能力</h4>
                    <p className="text-gray-600 text-sm">最新版本支持视觉模型，可处理多模态任务</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">用户友好</h4>
                    <p className="text-gray-600 text-sm">提供类 ChatGPT 交互界面，支持流式输出</p>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="text-center"
      >
        <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
          <CardBody className="p-8">
            <h3 className="text-2xl font-bold mb-4">
              开始使用 Ollama
            </h3>
            <p className="text-blue-100 mb-6">
              立即体验轻量级本地部署的便利性
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
                endContent={<ArrowRight className="h-5 w-5" />}
              >
                查看安装指南
              </Button>
              <Button 
                size="lg"
                variant="bordered"
                className="border-white text-white hover:bg-white/10"
              >
                观看演示视频
              </Button>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default OllamaPage;
