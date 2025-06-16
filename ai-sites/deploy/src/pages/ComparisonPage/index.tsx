/**
 * 对比分析页面
 * 详细对比 Ollama 和 VLLM 两种方案的各项指标
 * 提供直观的表格对比和图表展示
 */
import React from 'react';
import { Card, CardBody, Chip, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { 
  Cpu, Zap, Users, Server, Shield, Gauge, 
  TrendingUp, HardDrive, Monitor, Code, Building
} from 'lucide-react';

const ComparisonPage: React.FC = () => {
  const comparisonData = [
    {
      dimension: "核心定位",
      ollama: "轻量级本地工具（个人开发/实验）",
      vllm: "生产级推理框架（企业/高并发场景）",
      icon: <Code className="h-5 w-5" />
    },
    {
      dimension: "部署难度",
      ollama: "极简（一键安装）",
      vllm: "较复杂（需配置CUDA环境）",
      icon: <Server className="h-5 w-5" />
    },
    {
      dimension: "硬件要求",
      ollama: "低（CPU可用，可选GPU）",
      vllm: "高（必须NVIDIA GPU，显存≥16GB）",
      icon: <HardDrive className="h-5 w-5" />
    },
    {
      dimension: "性能表现",
      ollama: "中等（14B模型约25 token/s）",
      vllm: "极优（吞吐量比HF高24倍，支持千级并发）",
      icon: <Gauge className="h-5 w-5" />
    },
    {
      dimension: "多GPU支持",
      ollama: "需手动配置，效率低",
      vllm: "原生支持，显存利用率高",
      icon: <Cpu className="h-5 w-5" />
    },
    {
      dimension: "交互方式",
      ollama: "内置对话界面（类ChatGPT）",
      vllm: "仅提供OpenAI兼容API，需二次开发界面",
      icon: <Monitor className="h-5 w-5" />
    },
    {
      dimension: "典型场景",
      ollama: "个人学习、快速原型开发",
      vllm: "企业级服务、高并发推理、多模态任务",
      icon: <Building className="h-5 w-5" />
    }
  ];

  const performanceMetrics = [
    {
      metric: "推理速度",
      ollama: "25 tokens/s",
      vllm: "5000+ tokens/s",
      ollamaColor: "warning",
      vllmColor: "success"
    },
    {
      metric: "并发处理",
      ollama: "低",
      vllm: "1000+ 并发",
      ollamaColor: "danger",
      vllmColor: "success"
    },
    {
      metric: "显存利用率",
      ollama: "标准",
      vllm: "提升30%",
      ollamaColor: "warning",
      vllmColor: "success"
    },
    {
      metric: "部署复杂度",
      ollama: "极简",
      vllm: "复杂",
      ollamaColor: "success",
      vllmColor: "danger"
    },
    {
      metric: "硬件门槛",
      ollama: "极低",
      vllm: "高",
      ollamaColor: "success",
      vllmColor: "danger"
    },
    {
      metric: "企业级特性",
      ollama: "基础",
      vllm: "完整",
      ollamaColor: "warning",
      vllmColor: "success"
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
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Ollama vs VLLM 详细对比
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          从多个维度深入比较两种本地部署方案，帮助你做出最佳选择
        </p>
      </motion.div>

      {/* Quick Overview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid md:grid-cols-2 gap-8 mb-16"
      >
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0">
          <CardBody className="p-8 text-center">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white mb-6">
              <Cpu className="h-12 w-12" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ollama</h3>
            <div className="space-y-3">
              <Chip color="primary" variant="flat">轻量级</Chip>
              <Chip color="success" variant="flat">易部署</Chip>
              <Chip color="warning" variant="flat">个人开发</Chip>
            </div>
            <p className="text-gray-600 mt-4">
              适合快速原型开发和个人学习
            </p>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0">
          <CardBody className="p-8 text-center">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-6">
              <Zap className="h-12 w-12" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">VLLM</h3>
            <div className="space-y-3">
              <Chip color="secondary" variant="flat">企业级</Chip>
              <Chip color="success" variant="flat">高性能</Chip>
              <Chip color="warning" variant="flat">生产环境</Chip>
            </div>
            <p className="text-gray-600 mt-4">
              适合企业级部署和高并发场景
            </p>
          </CardBody>
        </Card>
      </motion.div>

      {/* Detailed Comparison Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-800">详细对比分析</h2>
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardBody className="p-0">
            <Table aria-label="对比表格" removeWrapper>
              <TableHeader>
                <TableColumn className="bg-gray-50 text-gray-700 font-semibold">对比维度</TableColumn>
                <TableColumn className="bg-blue-50 text-blue-700 font-semibold">Ollama</TableColumn>
                <TableColumn className="bg-purple-50 text-purple-700 font-semibold">VLLM</TableColumn>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="text-gray-600">{row.icon}</div>
                        <span className="font-medium text-gray-800">{row.dimension}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-700">{row.ollama}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-700">{row.vllm}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </motion.div>

      {/* Performance Metrics */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-800">性能指标对比</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {performanceMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardBody className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">
                    {metric.metric}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Ollama</span>
                      <Chip color={metric.ollamaColor as any} variant="flat" size="sm">
                        {metric.ollama}
                      </Chip>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">VLLM</span>
                      <Chip color={metric.vllmColor as any} variant="flat" size="sm">
                        {metric.vllm}
                      </Chip>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Pros and Cons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="grid md:grid-cols-2 gap-8"
      >
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0">
          <CardBody className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-blue-800 text-center">
              Ollama 优缺点
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-green-700 mb-3">✅ 优势</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 一键安装，部署极简</li>
                  <li>• 硬件要求低，CPU可用</li>
                  <li>• 内置1700+模型库</li>
                  <li>• 自动量化优化</li>
                  <li>• 用户界面友好</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-3">❌ 劣势</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 性能相对较低</li>
                  <li>• 并发处理能力有限</li>
                  <li>• 缺乏企业级特性</li>
                  <li>• 多GPU支持不完善</li>
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0">
          <CardBody className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-purple-800 text-center">
              VLLM 优缺点
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-green-700 mb-3">✅ 优势</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 极高的推理性能</li>
                  <li>• 支持大规模并发</li>
                  <li>• 企业级监控和恢复</li>
                  <li>• 原生多GPU支持</li>
                  <li>• PagedAttention技术</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-3">❌ 劣势</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 部署配置复杂</li>
                  <li>• 硬件要求高</li>
                  <li>• 学习成本较高</li>
                  <li>• 需要二次开发界面</li>
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default ComparisonPage;
