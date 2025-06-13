/**
 * LoRA 秩学习网站主组件
 * 整合所有子组件，提供完整的学习体验
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Github, ExternalLink } from 'lucide-react';
import RankSlider from './components/RankSlider';
import MetricsChart from './components/MetricsChart';
import ConceptExplainer from './components/ConceptExplainer';
import RecommendationTool from './components/RecommendationTool';
import PerformanceComparison from './components/PerformanceComparison';
import { generateMetricsRange } from './utils/loraCalculations';
import { Toaster } from 'react-hot-toast';

const LoRALearningPlatform: React.FC = () => {
  const [currentRank, setCurrentRank] = useState(16);
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('line');
  const metricsData = generateMetricsRange(1, 64);

  // 页面滚动效果
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallax = document.querySelector('.parallax-bg') as HTMLElement;
      if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRecommendationApply = (rank: number) => {
    setCurrentRank(rank);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Toaster position="top-right" />
      
      {/* 背景装饰 */}
      <div className="parallax-bg fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* 头部 */}
      <motion.header 
        className="relative z-10 bg-white/80 backdrop-blur-md shadow-lg sticky top-0"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  LoRA 秩概念学习平台
                </h1>
                <p className="text-sm text-gray-600">交互式理解低秩适应中的关键参数</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <span>图表类型:</span>
                {(['line', 'area', 'bar'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setChartType(type)}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      chartType === type
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {type === 'line' ? '线图' : type === 'area' ? '面积图' : '柱状图'}
                  </button>
                ))}
              </div>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Github className="w-5 h-5 text-gray-700" />
              </a>
            </div>
          </div>
        </div>
      </motion.header>

      {/* 主要内容区域 */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* 介绍区域 */}
          <motion.section 
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              什么是 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">LoRA 秩</span>？
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              LoRA（低秩适应）中的秋（Rank）决定了模型微调时的"表达能力"。
              通过下面的交互式工具，你可以直观地理解秩值如何影响模型的各项性能指标。
            </p>
          </motion.section>

          {/* 核心交互区域 */}
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <RankSlider 
                value={currentRank} 
                onChange={setCurrentRank}
              />
              <ConceptExplainer currentRank={currentRank} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <MetricsChart 
                data={metricsData}
                currentRank={currentRank}
                chartType={chartType}
              />
            </motion.div>
          </div>

          {/* 工具和分析区域 */}
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <RecommendationTool onRecommendationApply={handleRecommendationApply} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <PerformanceComparison currentRank={currentRank} />
            </motion.div>
          </div>

          {/* 实用建议区域 */}
          <motion.section 
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">实用经验总结</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">8-16</span>
                </div>
                <h4 className="font-semibold text-gray-800">日常微调首选</h4>
                <p className="text-sm text-gray-600">平衡效果与效率，适合大多数应用场景，是入门和实践的最佳起点。</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">4-8</span>
                </div>
                <h4 className="font-semibold text-gray-800">小数据集专用</h4>
                <p className="text-sm text-gray-600">样本不足时的保险选择，降低过拟合风险，训练更稳定可靠。</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">32+</span>
                </div>
                <h4 className="font-semibold text-gray-800">复杂任务挑战</h4>
                <p className="text-sm text-gray-600">需要强表达能力的场景，但要有足够数据和调参经验支撑。</p>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      {/* 页脚 */}
      <motion.footer 
        className="relative z-10 bg-gray-900 text-white mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-300">
                © 2024 LoRA 秋学习平台 - 让复杂概念变得简单易懂
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                了解更多
              </a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default LoRALearningPlatform;
