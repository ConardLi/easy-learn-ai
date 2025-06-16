/**
 * VLLM 详情页面
 * 详细介绍 VLLM 的企业级特性、高性能技术和大规模部署能力
 * 突出其在生产环境中的优势和技术创新
 */
import React from 'react';
import { Card, CardBody, Chip, Button } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { 
  Zap, Server, BarChart3, Layers, Shield, 
  Gauge, Database, GitBranch, ArrowRight, CheckCircle,
  TrendingUp, Users, Building, Cpu
} from 'lucide-react';

const VLLMPage: React.FC = () => {
  const features = [
    {
      icon: <Layers className="h-6 w-6" />,
      title: "PagedAttention",
      description: "创新的 KV Cache 分块存储技术"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "动态批处理",
      description: "实现高吞吐量推理，5000+ tokens/s"
    },
    {
      icon: <Server className="h-6 w-6" />,
      title: "多 GPU 支持",
      description: "原生张量并行，支持 8 台 H100 部署"
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "显存优化",
      description: "显存利用率提升 30%，支持长文本"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "企业级监控",
      description: "Prometheus 监控，自动故障恢复"
    },
    {
      icon: <GitBranch className="h-6 w-6" />,
      title: "HuggingFace 兼容",
      description: "无缝接入现有模型生态"
    }
  ];

  const specs = [
    { label: "支持平台", value: "Linux (CUDA 必需)" },
    { label: "最低显存", value: "16GB NVIDIA GPU" },
    { label: "推荐配置", value: "H100 / A100 系列" },
    { label: "并发能力", value: "1000+ 并发请求" },
    { label: "响应延迟", value: "< 500ms" },
    { label: "日处理量", value: "1 亿次请求" }
  ];

  const useCases = [
    {
      icon: <Building className="h-8 w-8" />,
      title: "企业级服务",
      description: "大型企业的生产环境部署，支撑核心业务",
      color: "text-purple-600"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "高并发场景",
      description: "电商搜索、智能客服等需要处理大量并发的场景",
      color: "text-blue-600"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "科研计算",
      description: "大规模数据处理，科研机构的 AI 计算需求",
      color: "text-green-600"
    },
    {
      icon: <Gauge className="h-8 w-8" />,
      title: "性能要求极高",
      description: "对推理速度和吞吐量有严格要求的应用",
      color: "text-orange-600"
    }
  ];

  const innovations = [
    {
      title: "PagedAttention 技术",
      description: "将 KV Cache 分块存储，显存利用率提升 30%，支持 4K+ 长文本推理"
    },
    {
      title: "动态批处理",
      description: "实现高吞吐量推理，Llama-8B 在 H100 上可达 5000+ tokens/s，是 Ollama 的 5 倍"
    },
    {
      title: "张量并行",
      description: "原生支持多 GPU 张量并行，可在 8 台 H100 服务器上部署 70B 模型"
    },
    {
      title: "企业级可靠性",
      description: "提供 Prometheus 监控和自动故障恢复机制，保障生产环境稳定运行"
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
        <div className="inline-flex p-6 rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-6">
          <Zap className="h-16 w-16" />
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          VLLM - 企业级推理框架
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          专为高性能推理设计的企业级框架，基于 PyTorch 构建，引入创新的 PagedAttention 技术
        </p>
      </motion.div>

      {/* Performance Highlights */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
          <CardBody className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">性能亮点</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">5000+</div>
                <div className="text-purple-100">tokens/s</div>
                <div className="text-sm text-purple-200">推理速度</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">1亿</div>
                <div className="text-purple-100">次/日</div>
                <div className="text-sm text-purple-200">处理请求</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">30%</div>
                <div className="text-purple-100">提升</div>
                <div className="text-sm text-purple-200">显存利用率</div>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Key Features */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-800">核心特性</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardBody className="p-6">
                  <div className="text-purple-600 mb-4">
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
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-800">技术规格</h2>
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-0">
          <CardBody className="p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specs.map((spec, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                  <span className="font-medium text-gray-700">{spec.label}</span>
                  <Chip color="secondary" variant="flat" size="sm">
                    {spec.value}
                  </Chip>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Innovations */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-800">技术创新</h2>
        <div className="space-y-6">
          {innovations.map((innovation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardBody className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex-shrink-0">
                      <Cpu className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">
                        {innovation.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {innovation.description}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Use Cases */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-800">适用场景</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
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
        transition={{ duration: 0.6, delay: 1 }}
        className="mb-16"
      >
        <Card className="bg-gradient-to-r from-green-50 to-purple-50 border-0">
          <CardBody className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              VLLM 的企业级优势
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">极致性能</h4>
                    <p className="text-gray-600 text-sm">比传统方案快 24 倍，支持千级并发处理</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">大规模部署</h4>
                    <p className="text-gray-600 text-sm">支持多 GPU 集群，可部署 70B+ 大模型</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">生产就绪</h4>
                    <p className="text-gray-600 text-sm">企业级监控和自动故障恢复机制</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">资源优化</h4>
                    <p className="text-gray-600 text-sm">PagedAttention 技术，显存利用率提升 30%</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">生态兼容</h4>
                    <p className="text-gray-600 text-sm">完全兼容 HuggingFace 模型生态</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">多模态支持</h4>
                    <p className="text-gray-600 text-sm">原生支持文本、图像等多模态任务</p>
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
        transition={{ duration: 0.6, delay: 1.2 }}
        className="text-center"
      >
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
          <CardBody className="p-8">
            <h3 className="text-2xl font-bold mb-4">
              部署 VLLM 企业级方案
            </h3>
            <p className="text-purple-100 mb-6">
              构建高性能、高可用的 AI 推理服务
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg"
                className="bg-white text-purple-600 hover:bg-purple-50"
                endContent={<ArrowRight className="h-5 w-5" />}
              >
                查看部署指南
              </Button>
              <Button 
                size="lg"
                variant="bordered"
                className="border-white text-white hover:bg-white/10"
              >
                性能基准测试
              </Button>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default VLLMPage;
