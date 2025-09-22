/**
 * 成果展示页面组件 - 展示 DeepSeek R1 的性能表现和影响
 * 包含性能对比图表、应用场景和技术影响分析
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Trophy, Globe, DollarSign, Users, Lightbulb, TrendingUp } from 'lucide-react';

const ResultsPage: React.FC = () => {
  const [activeChart, setActiveChart] = useState<'performance' | 'radar'>('performance');

  const performanceData = [
    { name: 'AIME 2024', GPT4: 83.3, 'OpenAI o1': 93.0, 'DeepSeek R1': 94.2 },
    { name: 'Codeforces', GPT4: 11, 'OpenAI o1': 213, 'DeepSeek R1': 251 },
    { name: 'SWE-bench', GPT4: 43.7, 'OpenAI o1': 48.9, 'DeepSeek R1': 47.2 },
    { name: 'GPQA Diamond', GPT4: 41.4, 'OpenAI o1': 60.3, 'DeepSeek R1': 58.5 },
    { name: 'MATH-500', GPT4: 42.5, 'OpenAI o1': 85.5, 'DeepSeek R1': 90.8 }
  ];

  const radarData = [
    { subject: '数学推理', R1: 95, o1: 90, GPT4: 70 },
    { subject: '代码编程', R1: 92, o1: 88, GPT4: 75 },
    { subject: '科学问题', R1: 88, o1: 85, GPT4: 68 },
    { subject: '逻辑推理', R1: 90, o1: 87, GPT4: 72 },
    { subject: '中文理解', R1: 96, o1: 82, GPT4: 78 },
    { subject: '创意写作', R1: 85, o1: 80, GPT4: 85 }
  ];

  const achievements = [
    {
      icon: Trophy,
      title: '性能突破',
      value: '≈ o1 水平',
      description: '在多项推理任务上达到或超越 OpenAI o1',
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      icon: DollarSign,
      title: '成本优势',
      value: '完全免费',
      description: '相比 o1 的 $200/月，R1 完全免费开放',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: Globe,
      title: '开源贡献',
      value: '全球可用',
      description: '公开技术路线，推动全球 AI 发展',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Users,
      title: '中文优势',
      value: '超越 o1',
      description: '在中文语境下表现显著优于 o1',
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  const impacts = [
    {
      category: '技术影响',
      items: [
        '证明了纯强化学习的可行性',
        'GRPO 算法的创新应用',
        '低成本后训练范式建立',
        '开源模型与闭源模型的性能对等'
      ]
    },
    {
      category: '产业影响',
      items: [
        '降低 AI 应用门槛',
        '推动智能应用普及',
        '促进算法研究竞争',
        '加速模型迭代速度'
      ]
    },
    {
      category: '社会影响',
      items: [
        '让强推理 AI 触达更多人群',
        '促进教育和科研发展',
        '推动技术民主化进程',
        '增强国产 AI 竞争力'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          DeepSeek R1 成果展示
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          从性能表现到技术影响，全面展示 R1 的突破性成就
        </p>
      </motion.div>

      {/* 核心成就 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={`inline-flex p-3 rounded-lg ${achievement.color} mb-4`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {achievement.value}
              </div>
              <div className="text-lg font-semibold text-gray-800 mb-2">
                {achievement.title}
              </div>
              <div className="text-gray-600 text-sm">
                {achievement.description}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 性能对比图表 */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">性能对比分析</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveChart('performance')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeChart === 'performance'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              基准测试
            </button>
            <button
              onClick={() => setActiveChart('radar')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeChart === 'radar'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              能力雷达图
            </button>
          </div>
        </div>

        <div className="h-80">
          {activeChart === 'performance' ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="GPT4" fill="#9CA3AF" name="GPT-4" />
                <Bar dataKey="OpenAI o1" fill="#F59E0B" name="OpenAI o1" />
                <Bar dataKey="DeepSeek R1" fill="#2563EB" name="DeepSeek R1" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="GPT-4" dataKey="GPT4" stroke="#9CA3AF" fill="#9CA3AF" fillOpacity={0.1} />
                <Radar name="OpenAI o1" dataKey="o1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.2} />
                <Radar name="DeepSeek R1" dataKey="R1" stroke="#2563EB" fill="#2563EB" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* 技术影响分析 */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {impacts.map((impact, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Lightbulb className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900">{impact.category}</h3>
            </div>
            <div className="space-y-3">
              {impact.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-start space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 未来展望 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white text-center"
      >
        <h2 className="text-3xl font-bold mb-4">技术发展前景</h2>
        <p className="text-lg text-purple-100 mb-6 max-w-3xl mx-auto">
          DeepSeek R1 的成功证明了开源模型在推理能力上可以与顶级闭源模型媲美，
          这标志着人工智能技术发展进入了一个新的阶段
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold mb-2">持续优化</div>
            <div className="text-purple-100 text-sm">算法和训练策略的不断改进</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold mb-2">应用扩展</div>
            <div className="text-purple-100 text-sm">更多领域和场景的应用探索</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold mb-2">生态建设</div>
            <div className="text-purple-100 text-sm">开源社区的共同发展</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultsPage;
