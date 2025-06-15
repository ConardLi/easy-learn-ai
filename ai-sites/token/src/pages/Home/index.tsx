/**
 * 首页组件
 * 提供Token学习平台的概览和导航入口
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Target, Cpu, GitBranch, BarChart3, Play } from 'lucide-react';

const Home: React.FC = () => {
  const learningPaths = [
    {
      title: '基础概念',
      description: '了解什么是Token和Tokenization',
      icon: BookOpen,
      path: '/basic-concepts',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: '重要性解析',
      description: '为什么Tokenization如此重要',
      icon: Target,
      path: '/importance',
      color: 'from-green-500 to-green-600',
    },
    {
      title: '核心流程',
      description: '分词的完整处理流程',
      icon: GitBranch,
      path: '/core-process',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'BPE算法',
      description: '深入理解现代分词算法',
      icon: Cpu,
      path: '/bpe-algorithm',
      color: 'from-orange-500 to-orange-600',
    },
    {
      title: '实践演示',
      description: '亲手体验分词过程',
      icon: Play,
      path: '/practical-demo',
      color: 'from-red-500 to-red-600',
    },
    {
      title: '概念对比',
      description: 'Tokenization vs Embeddings',
      icon: BarChart3,
      path: '/comparison',
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
          Token 概念学习平台
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          通过可视化动画和交互式演示，深入理解大语言模型中Token的核心概念、分词算法和实际应用
        </p>
        <motion.div
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium shadow-lg"
          whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)' }}
          whileTap={{ scale: 0.95 }}
        >
          <span>开始学习</span>
          <ArrowRight size={20} />
        </motion.div>
      </motion.div>

      {/* Learning Path Grid */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {learningPaths.map((path, index) => {
          const Icon = path.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Link to={path.path}>
                <motion.div
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${path.color} flex items-center justify-center mb-4`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {path.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {path.description}
                  </p>
                  <div className="flex items-center text-blue-600 font-medium">
                    <span>开始学习</span>
                    <ArrowRight size={16} className="ml-2" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Key Features */}
      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-8">学习特色</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play size={28} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">动态演示</h3>
            <p className="text-gray-600">通过动画和图表直观展示Token概念和分词过程</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Cpu size={28} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">交互体验</h3>
            <p className="text-gray-600">亲手操作文本分词，实时查看处理结果</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 size={28} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">深度解析</h3>
            <p className="text-gray-600">从基础概念到高级算法的完整知识体系</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
