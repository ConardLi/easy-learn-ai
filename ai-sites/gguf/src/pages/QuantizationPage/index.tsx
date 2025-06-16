/**
 * 量化概念页面 - 通过动画展示模型量化的原理和过程
 * 包含量化类型对比和性能影响分析
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  BarChart3, 
  Zap, 
  HardDrive,
  TrendingDown,
  TrendingUp,
  Gauge,
  ChevronRight
} from 'lucide-react';

const QuantizationPage: React.FC = () => {
  const [selectedQuantization, setSelectedQuantization] = useState('q4_k_m');
  const [animationStep, setAnimationStep] = useState(0);

  const quantizationTypes = [
    {
      id: 'f16',
      name: 'FP16',
      bits: 16,
      description: '16位浮点数，保持高精度',
      size: '14.2 GB',
      quality: 100,
      speed: 60,
      color: 'from-red-400 to-red-600',
      recommended: false
    },
    {
      id: 'q8_0',
      name: 'Q8_0',
      bits: 8,
      description: '8位量化，平衡精度和大小',
      size: '7.6 GB',
      quality: 95,
      speed: 75,
      color: 'from-orange-400 to-orange-600',
      recommended: false
    },
    {
      id: 'q6_k',
      name: 'Q6_K',
      bits: 6,
      description: '6位量化，优秀的质量保持',
      size: '5.9 GB',
      quality: 92,
      speed: 85,
      color: 'from-yellow-400 to-yellow-600',
      recommended: false
    },
    {
      id: 'q4_k_m',
      name: 'Q4_K_M',
      bits: 4,
      description: '4位量化，最佳平衡点',
      size: '4.1 GB',
      quality: 88,
      speed: 100,
      color: 'from-green-400 to-green-600',
      recommended: true
    },
    {
      id: 'q3_k_l',
      name: 'Q3_K_L',
      bits: 3,
      description: '3位量化，极致压缩',
      size: '3.3 GB',
      quality: 82,
      speed: 120,
      color: 'from-blue-400 to-blue-600',
      recommended: false
    },
    {
      id: 'q2_k',
      name: 'Q2_K',
      bits: 2,
      description: '2位量化，最小存储',
      size: '2.8 GB',
      quality: 75,
      speed: 140,
      color: 'from-purple-400 to-purple-600',
      recommended: false
    }
  ];

  // 动画步骤控制
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const selectedQuant = quantizationTypes.find(q => q.id === selectedQuantization) || quantizationTypes[3];

  const renderQuantizationAnimation = () => {
    const originalBits = [1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0]; // 16位示例
    const quantizedBits = originalBits.slice(0, selectedQuant.bits);

    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-6 text-center">
          量化过程可视化
        </h3>
        
        {/* 原始精度 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">原始精度 (FP16)</span>
            <span className="text-xs text-gray-500">16 bits</span>
          </div>
          <div className="flex space-x-1 flex-wrap">
            {originalBits.map((bit, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`w-6 h-6 rounded flex items-center justify-center text-xs font-mono ${
                  bit ? 'bg-red-500 text-white' : 'bg-red-200 text-red-800'
                }`}
              >
                {bit}
              </motion.div>
            ))}
          </div>
        </div>

        {/* 量化箭头 */}
        <div className="flex justify-center mb-8">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-4xl"
          >
            ⬇️
          </motion.div>
        </div>

        {/* 量化后精度 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">
              量化后 ({selectedQuant.name})
            </span>
            <span className="text-xs text-gray-500">{selectedQuant.bits} bits</span>
          </div>
          <div className="flex space-x-1">
            {quantizedBits.map((bit, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                className={`w-6 h-6 rounded flex items-center justify-center text-xs font-mono ${
                  bit ? 'bg-green-500 text-white' : 'bg-green-200 text-green-800'
                }`}
              >
                {bit}
              </motion.div>
            ))}
          </div>
        </div>

        {/* 压缩比例显示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className={`mt-6 p-4 rounded-lg bg-gradient-to-r ${selectedQuant.color} bg-opacity-10`}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {((16 - selectedQuant.bits) / 16 * 100).toFixed(0)}%
            </div>
            <div className="text-sm text-gray-600">存储空间节省</div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            模型量化技术
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            了解如何通过量化技术在保持模型性能的同时显著减少存储空间和内存使用
          </p>
        </motion.div>

        {/* Quantization Types Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">量化类型对比</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {quantizationTypes.map((quant) => (
                <motion.div
                  key={quant.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedQuantization(quant.id)}
                  className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 ${
                    selectedQuantization === quant.id
                      ? `bg-gradient-to-r ${quant.color} text-white shadow-lg`
                      : 'bg-white text-gray-800 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Cpu className="h-6 w-6" />
                      <h3 className="text-lg font-bold">{quant.name}</h3>
                    </div>
                    {quant.recommended && (
                      <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        selectedQuantization === quant.id 
                          ? 'bg-white/20 text-white' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        推荐
                      </div>
                    )}
                  </div>
                  
                  <p className={`text-sm mb-4 ${
                    selectedQuantization === quant.id ? 'text-white/90' : 'text-gray-600'
                  }`}>
                    {quant.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">文件大小</span>
                      <span className="font-semibold">{quant.size}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>质量</span>
                        <span>{quant.quality}%</span>
                      </div>
                      <div className={`h-2 rounded-full ${
                        selectedQuantization === quant.id ? 'bg-white/20' : 'bg-gray-200'
                      }`}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${quant.quality}%` }}
                          className={`h-full rounded-full ${
                            selectedQuantization === quant.id ? 'bg-white' : 'bg-blue-500'
                          }`}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>速度</span>
                        <span>{quant.speed}%</span>
                      </div>
                      <div className={`h-2 rounded-full ${
                        selectedQuantization === quant.id ? 'bg-white/20' : 'bg-gray-200'
                      }`}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(quant.speed, 100)}%` }}
                          className={`h-full rounded-full ${
                            selectedQuantization === quant.id ? 'bg-white' : 'bg-green-500'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Animation Panel */}
          <div className="lg:col-span-1">
            {renderQuantizationAnimation()}
          </div>
        </div>

        {/* Performance Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <BarChart3 className="h-6 w-6 mr-2 text-indigo-600" />
            性能影响分析
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <HardDrive className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">存储空间</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>原始大小</span>
                  <span className="font-semibold">14.2 GB</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>{selectedQuant.name}</span>
                  <span className="font-semibold text-green-600">{selectedQuant.size}</span>
                </div>
                <div className="flex items-center text-green-600 text-sm">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  <span>节省 {(100 - (parseFloat(selectedQuant.size) / 14.2) * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-xl">
              <Zap className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">推理速度</h3>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600">
                  {selectedQuant.speed}%
                </div>
                <div className="text-sm text-gray-600">相对提升</div>
                <div className="flex items-center text-green-600 text-sm justify-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>更快推理</span>
                </div>
              </div>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <Gauge className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">模型质量</h3>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-purple-600">
                  {selectedQuant.quality}%
                </div>
                <div className="text-sm text-gray-600">质量保持</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${selectedQuant.quality}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            选择建议
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                scenario: '生产环境',
                recommendation: 'Q4_K_M',
                reason: '最佳性能平衡',
                icon: '🏭'
              },
              {
                scenario: '研究实验',
                recommendation: 'Q6_K',
                reason: '保持高精度',
                icon: '🔬'
              },
              {
                scenario: '移动端部署',
                recommendation: 'Q3_K_L',
                reason: '极致压缩',
                icon: '📱'
              },
              {
                scenario: '边缘计算',
                recommendation: 'Q2_K',
                reason: '最小资源占用',
                icon: '⚡'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-6 shadow-md text-center"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h4 className="font-bold text-gray-800 mb-2">{item.scenario}</h4>
                <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                  {item.recommendation}
                </div>
                <p className="text-xs text-gray-600">{item.reason}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuantizationPage;
