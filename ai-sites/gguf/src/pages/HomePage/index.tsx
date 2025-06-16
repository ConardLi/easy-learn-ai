/**
 * 首页组件 - 网站的欢迎页面和概览
 * 包含GGUF介绍、学习路径导航和动画效果
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Zap, Settings, Rocket } from 'lucide-react';

const HomePage: React.FC = () => {
  const learningPaths = [
    {
      title: '基础概念',
      description: '了解GGUF的基本定义和发展历程',
      path: '/concept',
      icon: FileText,
      color: 'from-blue-400 to-blue-600',
      delay: 0.1
    },
    {
      title: '核心特点',
      description: '探索GGUF的独特优势和技术特性',
      path: '/features',
      icon: Zap,
      color: 'from-green-400 to-green-600',
      delay: 0.2
    },
    {
      title: '文件结构',
      description: '深入了解GGUF文件的内部组织方式',
      path: '/structure',
      icon: Settings,
      color: 'from-purple-400 to-purple-600',
      delay: 0.3
    },
    {
      title: '量化技术',
      description: '掌握模型量化的原理和应用',
      path: '/quantization',
      icon: Rocket,
      color: 'from-orange-400 to-orange-600',
      delay: 0.4
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen pt-20 pb-16 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6"
            animate={{ 
              backgroundPosition: ['0%', '100%', '0%'],
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            GGUF 学习之旅
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            探索大型语言模型的新一代文件格式，了解如何通过GGUF实现更高效的模型存储、加载和部署
          </motion.p>
          
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/concept">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
              >
                <span>开始学习</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
            
            <Link to="/comparison">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-indigo-500 text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-all duration-300"
              >
                格式对比
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Learning Path Cards */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">学习路径</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningPaths.map((path, index) => {
              const IconComponent = path.icon;
              return (
                <motion.div
                  key={path.path}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group"
                >
                  <Link to={path.path}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${path.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{path.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{path.description}</p>
                      <div className="mt-4 flex items-center text-indigo-600 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
                        <span>开始学习</span>
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Features Preview */}
        <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">为什么选择GGUF？</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-3xl text-white">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">高效存储</h3>
              <p className="text-gray-600">优化的数据结构，显著减少存储空间占用</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-3xl text-white">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">快速加载</h3>
              <p className="text-gray-600">支持mmap快速加载，提供即时响应体验</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-3xl text-white">🔧</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">跨平台兼容</h3>
              <p className="text-gray-600">支持多种编程语言和运行环境</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomePage;
