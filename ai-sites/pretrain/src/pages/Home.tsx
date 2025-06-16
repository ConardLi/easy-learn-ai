/**
 * 首页组件
 * 展示预训练概念的简介和核心要点
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Layers, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: '解决数据稀缺',
      description: '利用大规模未标记数据训练，提高模型泛化能力',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: '学习先验知识',
      description: '在无监督数据上学习语言结构和规则',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: '提升训练效率',
      description: '为下游任务提供良好的初始化参数',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: '增强小样本学习',
      description: '在少量标注数据上也能获得优秀性能',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const quickLinks = [
    { path: '/evolution', title: '模型演进历程', description: '从Word2Vec到GPT的发展轨迹' },
    { path: '/principles', title: '核心技术原理', description: '注意力机制与Transformer架构' },
    { path: '/scale', title: '规模与性能', description: '参数量与模型能力的关系' },
    { path: '/process', title: '训练过程', description: '预训练的具体实施步骤' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            模型预训练
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            探索大语言模型的基石技术，理解AI如何从海量数据中学习知识
          </p>
        </motion.div>

        {/* Animated Brain Icon */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl"
        >
          <span className="text-6xl">🧠</span>
        </motion.div>
      </motion.section>

      {/* What is Pretraining */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/20"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">什么是预训练？</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              预训练是大语言模型训练的<span className="font-semibold text-indigo-600">第一阶段</span>，
              模型在大规模未标记文本数据上学习语言的基本规律和知识。
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              就像人类在阅读大量书籍后掌握语言规律一样，模型通过预训练获得了理解和生成文本的基础能力。
            </p>
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
              <span className="text-2xl">💡</span>
              <span className="text-gray-700 font-medium">
                预训练 + 微调 = 强大的AI应用
              </span>
            </div>
          </div>
          <div className="relative">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 text-center"
            >
              <div className="text-6xl mb-4">📚</div>
              <p className="text-gray-700 font-medium">大规模文本数据</p>
              <div className="mt-4 flex justify-center">
                <ArrowRight className="w-6 h-6 text-indigo-500" />
              </div>
              <div className="text-4xl mt-4">🤖</div>
              <p className="text-gray-700 font-medium mt-2">智能语言模型</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Key Features */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="space-y-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">预训练的核心优势</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-white shadow-lg`}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Quick Navigation */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="space-y-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">深入学习</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {quickLinks.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Link
                to={link.path}
                className="block bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-gray-600">{link.description}</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
