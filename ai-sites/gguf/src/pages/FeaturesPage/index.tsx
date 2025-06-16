/**
 * 特点优势页面 - 通过动画和交互展示GGUF的核心优势
 * 包含存储效率动画、加载速度对比和兼容性展示
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HardDrive, 
  Zap, 
  Globe, 
  Settings, 
  FileText, 
  Cpu,
  CheckCircle,
  TrendingUp,
  Clock
} from 'lucide-react';

const FeaturesPage: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [storageAnimation, setStorageAnimation] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState({ gguf: 0, traditional: 0 });

  const features = [
    {
      id: 'storage',
      title: '高效存储',
      icon: HardDrive,
      color: 'from-blue-400 to-blue-600',
      description: '通过优化的数据结构和编码方式，显著减少存储空间占用',
      details: [
        '紧凑的二进制编码格式',
        '智能数据压缩算法',
        '平均节省 30-50% 存储空间',
        '支持模型参数高效打包'
      ]
    },
    {
      id: 'loading',
      title: '快速加载',
      icon: Zap,
      color: 'from-green-400 to-green-600',
      description: '支持mmap内存映射，实现模型的即时加载和响应',
      details: [
        '内存映射（mmap）技术',
        '按需加载模型数据',
        '启动时间减少 70% 以上',
        '支持大模型流式加载'
      ]
    },
    {
      id: 'compatibility',
      title: '跨平台兼容',
      icon: Globe,
      color: 'from-purple-400 to-purple-600',
      description: '支持多种编程语言和运行环境，实现无缝跨平台部署',
      details: [
        '支持 Python、C++、JavaScript 等',
        '兼容 CPU 和 GPU 推理',
        '适配移动端和服务器端',
        '统一的 API 接口标准'
      ]
    },
    {
      id: 'extensibility',
      title: '强大扩展性',
      icon: Settings,
      color: 'from-orange-400 to-orange-600',
      description: '灵活的架构设计，支持未来技术发展和功能扩展',
      details: [
        '模块化文件结构设计',
        '支持自定义元数据',
        '向后兼容保证',
        '可扩展的量化方案'
      ]
    }
  ];

  // 存储效率动画
  useEffect(() => {
    const interval = setInterval(() => {
      setStorageAnimation(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 加载速度对比动画
  useEffect(() => {
    if (activeFeature === 1) {
      const timer = setTimeout(() => {
        // GGUF 快速加载
        let ggufProgress = 0;
        const ggufInterval = setInterval(() => {
          ggufProgress += 20;
          setLoadingProgress(prev => ({ ...prev, gguf: ggufProgress }));
          if (ggufProgress >= 100) clearInterval(ggufInterval);
        }, 100);

        // 传统格式较慢加载
        setTimeout(() => {
          let traditionalProgress = 0;
          const traditionalInterval = setInterval(() => {
            traditionalProgress += 10;
            setLoadingProgress(prev => ({ ...prev, traditional: traditionalProgress }));
            if (traditionalProgress >= 100) clearInterval(traditionalInterval);
          }, 150);
        }, 500);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [activeFeature]);

  const renderStorageAnimation = () => (
    <div className="relative h-64 flex items-center justify-center">
      <div className="flex space-x-8">
        {/* 传统格式 */}
        <motion.div
          animate={{
            scale: storageAnimation ? 0.8 : 1,
            opacity: storageAnimation ? 0.5 : 1
          }}
          className="text-center"
        >
          <div className="w-24 h-32 bg-gradient-to-b from-red-400 to-red-600 rounded-lg flex items-center justify-center mb-2">
            <FileText className="h-12 w-12 text-white" />
          </div>
          <p className="text-sm text-gray-600">传统格式</p>
          <p className="text-xs text-red-600 font-semibold">15.2 GB</p>
        </motion.div>

        {/* 箭头 */}
        <motion.div
          animate={{ x: storageAnimation ? 10 : 0 }}
          className="flex items-center"
        >
          <motion.div
            animate={{ scale: storageAnimation ? 1.2 : 1 }}
            className="text-4xl"
          >
            ➡️
          </motion.div>
        </motion.div>

        {/* GGUF格式 */}
        <motion.div
          animate={{
            scale: storageAnimation ? 1.1 : 1,
            opacity: storageAnimation ? 1 : 0.8
          }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-gradient-to-b from-green-400 to-green-600 rounded-lg flex items-center justify-center mb-2">
            <Cpu className="h-12 w-12 text-white" />
          </div>
          <p className="text-sm text-gray-600">GGUF格式</p>
          <p className="text-xs text-green-600 font-semibold">8.7 GB</p>
        </motion.div>
      </div>

      {/* 节省空间指示 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: storageAnimation ? 1 : 0,
          y: storageAnimation ? 0 : 20
        }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
      >
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
          节省 42.8% 存储空间 💾
        </div>
      </motion.div>
    </div>
  );

  const renderLoadingAnimation = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">加载速度对比</h4>
        <p className="text-sm text-gray-600">相同7B模型的加载时间对比</p>
      </div>

      {/* GGUF 加载 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-green-700">GGUF 格式</span>
          <span className="text-sm text-green-600">{loadingProgress.gguf}%</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-green-600"
            initial={{ width: 0 }}
            animate={{ width: `${loadingProgress.gguf}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="h-3 w-3 mr-1" />
          <span>~2.1秒</span>
        </div>
      </div>

      {/* 传统格式加载 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-red-700">传统格式</span>
          <span className="text-sm text-red-600">{loadingProgress.traditional}%</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-red-400 to-red-600"
            initial={{ width: 0 }}
            animate={{ width: `${loadingProgress.traditional}%` }}
            transition={{ duration: 0.15 }}
          />
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="h-3 w-3 mr-1" />
          <span>~7.8秒</span>
        </div>
      </div>

      {loadingProgress.gguf === 100 && loadingProgress.traditional === 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-4 bg-green-50 rounded-lg border border-green-200"
        >
          <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <p className="text-sm font-semibold text-green-800">
            GGUF 加载速度提升 73% ⚡
          </p>
        </motion.div>
      )}
    </div>
  );

  const renderCompatibilityAnimation = () => {
    const platforms = [
      { name: 'Python', icon: '🐍', color: 'bg-green-500' },
      { name: 'C++', icon: '⚡', color: 'bg-blue-500' },
      { name: 'JavaScript', icon: '🟨', color: 'bg-yellow-500' },
      { name: 'Rust', icon: '🦀', color: 'bg-orange-500' },
      { name: 'GPU', icon: '🎮', color: 'bg-purple-500' },
      { name: 'CPU', icon: '💻', color: 'bg-gray-500' }
    ];

    return (
      <div className="text-center">
        <h4 className="text-lg font-semibold text-gray-800 mb-6">支持的平台和语言</h4>
        <div className="grid grid-cols-3 gap-4">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 ${platform.color} rounded-full flex items-center justify-center text-white text-xl mb-2`}>
                {platform.icon}
              </div>
              <span className="text-sm font-medium text-gray-700">{platform.name}</span>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200"
        >
          <p className="text-sm text-purple-800 font-medium">
            🌟 一次编写，处处运行 - 真正的跨平台兼容性
          </p>
        </motion.div>
      </div>
    );
  };

  const renderFeatureAnimation = () => {
    switch (activeFeature) {
      case 0:
        return renderStorageAnimation();
      case 1:
        return renderLoadingAnimation();
      case 2:
        return renderCompatibilityAnimation();
      default:
        return (
          <div className="text-center py-12">
            <Settings className="h-16 w-16 text-orange-500 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-800 mb-2">模块化设计</h4>
            <p className="text-gray-600">支持灵活扩展和自定义配置</p>
          </div>
        );
    }
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
            GGUF 特点优势
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            探索 GGUF 如何通过创新技术解决大型语言模型的核心挑战
          </p>
        </motion.div>

        {/* Feature Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.button
                key={feature.id}
                onClick={() => setActiveFeature(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeFeature === index
                    ? `bg-gradient-to-r ${feature.color} text-white shadow-lg`
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                }`}
              >
                <IconComponent className="h-5 w-5" />
                <span>{feature.title}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Feature Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Animation Panel */}
          <motion.div
            key={activeFeature}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          >
            {renderFeatureAnimation()}
          </motion.div>

          {/* Details Panel */}
          <motion.div
            key={`details-${activeFeature}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${features[activeFeature].color} flex items-center justify-center mb-6`}>
              {React.createElement(features[activeFeature].icon, { className: "h-8 w-8 text-white" })}
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800">
              {features[activeFeature].title}
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              {features[activeFeature].description}
            </p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">核心特性</h3>
              <ul className="space-y-3">
                {features[activeFeature].details.map((detail, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`p-4 rounded-xl bg-gradient-to-r ${features[activeFeature].color} bg-opacity-10 border border-opacity-20`}
            >
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                <span className="font-semibold text-indigo-800">性能提升</span>
              </div>
              <p className="text-sm text-indigo-700 mt-1">
                相比传统格式，{features[activeFeature].title.toLowerCase()}性能提升显著
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
            为什么 GGUF 是未来趋势？
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: '🚀', title: '性能优越', desc: '全方位性能提升' },
              { emoji: '🔄', title: '标准统一', desc: '行业标准格式' },
              { emoji: '🛠️', title: '易于集成', desc: '简化开发流程' },
              { emoji: '🌍', title: '生态支持', desc: '广泛社区支持' }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-white rounded-xl shadow-md"
              >
                <div className="text-3xl mb-2">{item.emoji}</div>
                <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesPage;
