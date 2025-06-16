/**
 * 格式对比页面 - 对比GGUF与其他模型格式的差异
 * 包含详细的功能对比表格和性能分析
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Scale, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  FileText,
  Zap,
  HardDrive,
  Globe,
  Settings,
  TrendingUp,
  BarChart3,
  Cpu,
  Clock
} from 'lucide-react';

const ComparisonPage: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('storage');

  const formats = [
    {
      name: 'GGUF',
      description: '新一代统一格式',
      color: 'from-green-400 to-green-600',
      icon: '🚀',
      storage: 95,
      loading: 95,
      compatibility: 90,
      extensibility: 95,
      maintenance: 90,
      overall: 93
    },
    {
      name: 'PyTorch (.pth)',
      description: 'PyTorch原生格式',
      color: 'from-orange-400 to-orange-600',
      icon: '🔥',
      storage: 60,
      loading: 70,
      compatibility: 85,
      extensibility: 75,
      maintenance: 80,
      overall: 74
    },
    {
      name: 'TensorFlow (.pb)',
      description: 'TensorFlow格式',
      color: 'from-blue-400 to-blue-600',
      icon: '🧠',
      storage: 65,
      loading: 75,
      compatibility: 80,
      extensibility: 70,
      maintenance: 75,
      overall: 73
    },
    {
      name: 'ONNX',
      description: '开放神经网络交换格式',
      color: 'from-purple-400 to-purple-600',
      icon: '🔄',
      storage: 70,
      loading: 80,
      compatibility: 95,
      extensibility: 80,
      maintenance: 85,
      overall: 82
    },
    {
      name: 'SafeTensors',
      description: 'Hugging Face安全格式',
      color: 'from-indigo-400 to-indigo-600',
      icon: '🛡️',
      storage: 75,
      loading: 85,
      compatibility: 75,
      extensibility: 70,
      maintenance: 85,
      overall: 78
    }
  ];

  const comparisonFeatures = [
    {
      category: '存储特性',
      features: [
        {
          name: '文件大小优化',
          gguf: 'excellent',
          pytorch: 'poor',
          tensorflow: 'fair',
          onnx: 'good',
          safetensors: 'good'
        },
        {
          name: '压缩支持',
          gguf: 'excellent',
          pytorch: 'none',
          tensorflow: 'fair',
          onnx: 'fair',
          safetensors: 'none'
        },
        {
          name: '量化支持',
          gguf: 'excellent',
          pytorch: 'limited',
          tensorflow: 'good',
          onnx: 'good',
          safetensors: 'limited'
        }
      ]
    },
    {
      category: '性能特性',
      features: [
        {
          name: '加载速度',
          gguf: 'excellent',
          pytorch: 'fair',
          tensorflow: 'good',
          onnx: 'good',
          safetensors: 'excellent'
        },
        {
          name: '内存效率',
          gguf: 'excellent',
          pytorch: 'poor',
          tensorflow: 'fair',
          onnx: 'good',
          safetensors: 'good'
        },
        {
          name: 'mmap支持',
          gguf: 'excellent',
          pytorch: 'none',
          tensorflow: 'none',
          onnx: 'none',
          safetensors: 'good'
        }
      ]
    },
    {
      category: '兼容性',
      features: [
        {
          name: '跨平台支持',
          gguf: 'excellent',
          pytorch: 'good',
          tensorflow: 'good',
          onnx: 'excellent',
          safetensors: 'good'
        },
        {
          name: '语言支持',
          gguf: 'excellent',
          pytorch: 'good',
          tensorflow: 'good',
          onnx: 'excellent',
          safetensors: 'fair'
        },
        {
          name: '工具生态',
          gguf: 'good',
          pytorch: 'excellent',
          tensorflow: 'excellent',
          onnx: 'excellent',
          safetensors: 'good'
        }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'good':
        return <CheckCircle className="h-5 w-5 text-blue-600" />;
      case 'fair':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'poor':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'limited':
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      case 'none':
        return <XCircle className="h-5 w-5 text-gray-400" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'excellent': return '优秀';
      case 'good': return '良好';
      case 'fair': return '一般';
      case 'poor': return '较差';
      case 'limited': return '有限';
      case 'none': return '无';
      default: return '未知';
    }
  };

  const metrics = [
    { id: 'storage', name: '存储效率', icon: HardDrive },
    { id: 'loading', name: '加载速度', icon: Zap },
    { id: 'compatibility', name: '兼容性', icon: Globe },
    { id: 'extensibility', name: '扩展性', icon: Settings },
    { id: 'maintenance', name: '维护性', icon: FileText }
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            格式对比分析
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            全面对比 GGUF 与其他主流模型格式的优势和特点
          </p>
        </motion.div>

        {/* Performance Radar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center">
            <BarChart3 className="h-6 w-6 mr-2 text-indigo-600" />
            综合性能对比
          </h2>

          {/* Metric Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {metrics.map((metric) => {
              const IconComponent = metric.icon;
              return (
                <button
                  key={metric.id}
                  onClick={() => setSelectedMetric(metric.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedMetric === metric.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{metric.name}</span>
                </button>
              );
            })}
          </div>

          {/* Performance Bars */}
          <div className="space-y-4">
            {formats.map((format, index) => {
              const score = format[selectedMetric as keyof typeof format] as number;
              return (
                <motion.div
                  key={format.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{format.icon}</span>
                      <span className="font-semibold text-gray-800">{format.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-600">{score}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-full bg-gradient-to-r ${format.color} rounded-full`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Feature Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center">
            <Scale className="h-6 w-6 mr-2 text-indigo-600" />
            详细功能对比
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-800">特性</th>
                  <th className="text-center py-3 px-4 font-semibold text-green-700">GGUF</th>
                  <th className="text-center py-3 px-4 font-semibold text-orange-700">PyTorch</th>
                  <th className="text-center py-3 px-4 font-semibold text-blue-700">TensorFlow</th>
                  <th className="text-center py-3 px-4 font-semibold text-purple-700">ONNX</th>
                  <th className="text-center py-3 px-4 font-semibold text-indigo-700">SafeTensors</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((category, categoryIndex) => (
                  <React.Fragment key={category.category}>
                    <tr>
                      <td colSpan={6} className="py-4">
                        <h3 className="text-lg font-bold text-gray-800 bg-gray-50 px-4 py-2 rounded-lg">
                          {category.category}
                        </h3>
                      </td>
                    </tr>
                    {category.features.map((feature, featureIndex) => (
                      <motion.tr
                        key={feature.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: (categoryIndex * 3 + featureIndex) * 0.1 }}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 font-medium text-gray-800">{feature.name}</td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            {getStatusIcon(feature.gguf)}
                            <span className="text-sm">{getStatusText(feature.gguf)}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            {getStatusIcon(feature.pytorch)}
                            <span className="text-sm">{getStatusText(feature.pytorch)}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            {getStatusIcon(feature.tensorflow)}
                            <span className="text-sm">{getStatusText(feature.tensorflow)}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            {getStatusIcon(feature.onnx)}
                            <span className="text-sm">{getStatusText(feature.onnx)}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            {getStatusIcon(feature.safetensors)}
                            <span className="text-sm">{getStatusText(feature.safetensors)}</span>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {[
            {
              title: '存储效率',
              value: '42%',
              subtitle: '平均空间节省',
              icon: HardDrive,
              color: 'from-green-400 to-green-600'
            },
            {
              title: '加载速度',
              value: '73%',
              subtitle: '性能提升',
              icon: Zap,
              color: 'from-blue-400 to-blue-600'
            },
            {
              title: '兼容性',
              value: '90%',
              subtitle: '平台支持率',
              icon: Globe,
              color: 'from-purple-400 to-purple-600'
            },
            {
              title: '采用率',
              value: '68%',
              subtitle: '开发者使用',
              icon: TrendingUp,
              color: 'from-orange-400 to-orange-600'
            }
          ].map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${metric.color} flex items-center justify-center`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{metric.title}</h3>
                <div className="text-3xl font-bold text-indigo-600 mb-1">{metric.value}</div>
                <p className="text-sm text-gray-600">{metric.subtitle}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
            为什么选择 GGUF？
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: '技术领先',
                description: '在存储效率和加载速度方面显著优于传统格式',
                icon: '🚀'
              },
              {
                title: '生态友好',
                description: '快速增长的社区支持和工具生态系统',
                icon: '🌍'
              },
              {
                title: '未来趋势',
                description: '代表大模型部署的发展方向和最佳实践',
                icon: '📈'
              }
            ].map((reason, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-white rounded-xl shadow-md"
              >
                <div className="text-4xl mb-4">{reason.icon}</div>
                <h4 className="font-bold text-gray-800 mb-2">{reason.title}</h4>
                <p className="text-gray-600 text-sm">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComparisonPage;
