/**
 * 首页组件
 * 展示网站概述和快速导航，介绍模型本地部署的重要性
 * 提供直观的卡片式导航到各个详细页面
 */
import React from 'react';
import { Card, CardBody, Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Zap, GitCompare, Lightbulb, ArrowRight, Server, Shield, Gauge } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Server className="h-8 w-8" />,
      title: "本地部署优势",
      description: "数据隐私保护，无需依赖外部API，完全自主控制"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "安全可靠",
      description: "企业级安全标准，敏感数据不出内网"
    },
    {
      icon: <Gauge className="h-8 w-8" />,
      title: "高性能推理",
      description: "针对本地硬件优化，提供极致推理性能"
    }
  ];

  const solutions = [
    {
      icon: <Cpu className="h-12 w-12" />,
      title: "Ollama",
      subtitle: "轻量级本地工具",
      description: "开箱即用，一键安装，适合个人开发和快速原型",
      color: "from-blue-500 to-cyan-500",
      path: "/ollama"
    },
    {
      icon: <Zap className="h-12 w-12" />,
      title: "VLLM", 
      subtitle: "企业级推理框架",
      description: "高性能、高并发，适合生产环境和大规模部署",
      color: "from-purple-500 to-pink-500",
      path: "/vllm"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          AI 模型本地部署指南
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          探索 Ollama 和 VLLM 两大主流本地部署方案，选择最适合你的 AI 模型部署策略
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8"
            onPress={() => navigate('/comparison')}
            endContent={<ArrowRight className="h-5 w-5" />}
          >
            方案对比
          </Button>
          <Button 
            size="lg"
            variant="bordered"
            className="border-purple-500 text-purple-600 hover:bg-purple-50 px-8"
            onPress={() => navigate('/recommendation')}
            endContent={<Lightbulb className="h-5 w-5" />}
          >
            选择建议
          </Button>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          为什么选择本地部署？
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm">
                <CardBody className="text-center p-8">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Solutions Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          主流部署方案
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            >
              <Card 
                className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm"
                isPressable
                onPress={() => navigate(solution.path)}
              >
                <CardBody className="p-8">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${solution.color} text-white mb-6`}>
                    {solution.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">
                    {solution.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">
                    {solution.subtitle}
                  </p>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {solution.description}
                  </p>
                  <Button 
                    className={`bg-gradient-to-r ${solution.color} text-white`}
                    endContent={<ArrowRight className="h-4 w-4" />}
                  >
                    了解详情
                  </Button>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-16 text-center"
      >
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
          <CardBody className="p-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              开始你的 AI 部署之旅
            </h3>
            <p className="text-gray-600 mb-6">
              通过详细的对比分析，找到最适合你需求的部署方案
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                onPress={() => navigate('/comparison')}
                startContent={<GitCompare className="h-5 w-5" />}
              >
                详细对比
              </Button>
              <Button 
                size="lg"
                variant="bordered"
                className="border-purple-500 text-purple-600 hover:bg-purple-50"
                onPress={() => navigate('/recommendation')}
                startContent={<Lightbulb className="h-5 w-5" />}
              >
                获取建议
              </Button>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default HomePage;
