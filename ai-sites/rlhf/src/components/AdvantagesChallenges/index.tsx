/**
 * RLHF优势与挑战组件
 * 展示RLHF技术的优势、面临的挑战以及未来发展方向
 * 包含对比图表和详细分析
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, AlertTriangle, TrendingUp, Zap, DollarSign, Users, Shield, Lightbulb } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const AdvantagesChallenges: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'advantages' | 'challenges' | 'future'>('advantages');

  const advantages = [
    {
      icon: Shield,
      title: "人类价值观对齐",
      description: "遵循3H原则：Helpful, Harmless, Honest",
      details: "确保AI输出符合人类伦理道德，避免有害内容生成",
      impact: "高",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "用户体验提升",
      description: "生成更贴合用户需求的自然回复",
      details: "提高对话质量，增强用户满意度和交互舒适度",
      impact: "极高",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "数据利用效率",
      description: "少量高质量反馈实现大幅性能提升",
      details: "1.3B参数的InstructGPT优于175B参数的GPT-3",
      impact: "高",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const challenges = [
    {
      icon: Users,
      title: "人类反馈不一致性",
      description: "不同标注者的主观判断存在差异",
      details: "需要建立标注指南和校准机制，减少标注差异",
      severity: "中等",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: AlertTriangle,
      title: "奖励模型偏差",
      description: "RM可能无法完全反映人类真实偏好",
      details: "受训练数据局限，可能存在系统性偏见",
      severity: "高",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: DollarSign,
      title: "计算资源消耗",
      description: "需要大量GPU资源和长时间训练",
      details: "四个模型同时训练，显存需求巨大",
      severity: "极高",
      color: "from-gray-500 to-gray-700"
    }
  ];

  const comparisonData = [
    { name: 'GPT-3', performance: 65, alignment: 40, safety: 35 },
    { name: 'GPT-3 + SFT', performance: 75, alignment: 60, safety: 55 },
    { name: 'ChatGPT (RLHF)', performance: 85, alignment: 90, safety: 88 }
  ];

  const resourceData = [
    { stage: 'SFT', memory: 80, time: 100, complexity: 30 },
    { stage: 'RM Training', memory: 120, time: 150, complexity: 60 },
    { stage: 'PPO Training', memory: 240, time: 300, complexity: 100 }
  ];

  const futureDirections = [
    {
      icon: Lightbulb,
      title: "DPO简化方案",
      description: "Direct Preference Optimization",
      details: "直接学习人类偏好，无需训练RM和强化学习",
      progress: 85
    },
    {
      icon: Zap,
      title: "高效训练算法",
      description: "降低计算成本的新方法",
      details: "轻量级架构、分布式训练、模型压缩技术",
      progress: 60
    },
    {
      icon: Shield,
      title: "安全性增强",
      description: "更好的价值观对齐机制",
      details: "多层安全检查、对抗训练、红队测试",
      progress: 70
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          RLHF 优势与挑战
        </h2>
        <p className="text-gray-600 mb-6">
          全面了解RLHF技术的优点、局限性和未来发展
        </p>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 mb-8">
          {[
            { id: 'advantages', label: '技术优势', icon: ThumbsUp },
            { id: 'challenges', label: '面临挑战', icon: AlertTriangle },
            { id: 'future', label: '未来方向', icon: TrendingUp }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white/70 text-gray-600 hover:bg-white border border-gray-200'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {activeTab === 'advantages' && (
          <motion.div
            key="advantages"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-8"
          >
            {/* Advantages Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-blue-100 shadow-xl hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${advantage.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                    <advantage.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{advantage.title}</h3>
                  <p className="text-blue-600 font-medium mb-3">{advantage.description}</p>
                  <p className="text-gray-600 text-sm mb-4">{advantage.details}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">影响程度</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      advantage.impact === '极高' ? 'bg-green-100 text-green-800' :
                      advantage.impact === '高' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {advantage.impact}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Performance Comparison Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-blue-100 shadow-xl"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">模型性能对比</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="performance" fill="url(#gradient1)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="alignment" fill="url(#gradient2)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="safety" fill="url(#gradient3)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#1e40af" />
                      </linearGradient>
                      <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#7c3aed" />
                      </linearGradient>
                      <linearGradient id="gradient3" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-700 rounded"></div>
                  <span>性能指标</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-purple-700 rounded"></div>
                  <span>对齐程度</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-700 rounded"></div>
                  <span>安全性</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'challenges' && (
          <motion.div
            key="challenges"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-8"
          >
            {/* Challenges Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {challenges.map((challenge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-red-100 shadow-xl hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${challenge.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                    <challenge.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{challenge.title}</h3>
                  <p className="text-red-600 font-medium mb-3">{challenge.description}</p>
                  <p className="text-gray-600 text-sm mb-4">{challenge.details}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">严重程度</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      challenge.severity === '极高' ? 'bg-red-100 text-red-800' :
                      challenge.severity === '高' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {challenge.severity}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Resource Usage Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-red-100 shadow-xl"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">各阶段资源消耗对比</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={resourceData}>
                    <PolarGrid stroke="#e0e7ff" />
                    <PolarAngleAxis dataKey="stage" tick={{ fontSize: 12, fill: '#6b7280' }} />
                    <PolarRadiusAxis angle={90} domain={[0, 300]} tick={{ fontSize: 10, fill: '#6b7280' }} />
                    <Radar name="显存(GB)" dataKey="memory" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                    <Radar name="时间(小时)" dataKey="time" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                    <Radar name="复杂度" dataKey="complexity" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'future' && (
          <motion.div
            key="future"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-8"
          >
            {/* Future Directions */}
            <div className="space-y-6">
              {futureDirections.map((direction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-blue-100 shadow-xl"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <direction.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-800">{direction.title}</h3>
                        <span className="text-sm text-purple-600 font-medium">{direction.progress}% 成熟度</span>
                      </div>
                      
                      <p className="text-purple-600 font-medium mb-3">{direction.description}</p>
                      <p className="text-gray-600 mb-4">{direction.details}</p>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${direction.progress}%` }}
                          transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl"
            >
              <h3 className="text-2xl font-bold mb-4 text-center">RLHF发展趋势</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-3">短期目标 (1-2年)</h4>
                  <ul className="space-y-2 text-indigo-100">
                    <li>• 降低训练成本和资源需求</li>
                    <li>• 提高奖励模型准确性</li>
                    <li>• 简化训练流程</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-3">长期愿景 (3-5年)</h4>
                  <ul className="space-y-2 text-indigo-100">
                    <li>• 完全自动化的价值对齐</li>
                    <li>• 多模态RLHF技术</li>
                    <li>• 个性化偏好学习</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvantagesChallenges;
