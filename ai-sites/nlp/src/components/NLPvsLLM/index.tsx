/**
 * NLP与LLM对比分析组件
 * 详细展示传统NLP技术与大型语言模型的区别、联系和发展趋势
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { Brain, Zap, Target, Layers, TrendingUp, Users, DollarSign, Clock, CheckCircle, XCircle, ArrowRight, Lightbulb } from 'lucide-react';

const NLPvsLLM: React.FC = () => {
  const [activeComparison, setActiveComparison] = useState('overview');

  const comparisonSections = [
    { id: 'overview', label: '概述对比', icon: Target },
    { id: 'technical', label: '技术基础', icon: Brain },
    { id: 'applications', label: '应用场景', icon: Layers },
    { id: 'performance', label: '性能分析', icon: TrendingUp }
  ];

  // 技术特性对比数据
  const technicalComparison = [
    {
      aspect: '准确性',
      NLP: 85,
      LLM: 92
    },
    {
      aspect: '效率',
      NLP: 95,
      LLM: 60
    },
    {
      aspect: '可解释性',
      NLP: 90,
      LLM: 40
    },
    {
      aspect: '泛化能力',
      NLP: 65,
      LLM: 95
    },
    {
      aspect: '资源消耗',
      NLP: 90,
      LLM: 25
    }
  ];

  // 发展历程对比
  const evolutionData = [
    { year: '2010', NLP: 65, LLM: 20 },
    { year: '2013', NLP: 70, LLM: 35 },
    { year: '2017', NLP: 75, LLM: 60 },
    { year: '2018', NLP: 78, LLM: 75 },
    { year: '2020', NLP: 80, LLM: 88 },
    { year: '2022', NLP: 82, LLM: 95 },
    { year: '2024', NLP: 85, LLM: 98 }
  ];

  // 应用场景数据
  const applicationScenarios = [
    {
      category: '传统NLP优势',
      scenarios: [
        { name: '词性标注', accuracy: '98%', cost: '低', description: '精确的语法分析' },
        { name: '命名实体识别', accuracy: '95%', cost: '低', description: '结构化信息提取' },
        { name: '机器翻译', accuracy: '92%', cost: '中', description: '特定语言对翻译' },
        { name: '情感分析', accuracy: '88%', cost: '低', description: '精准的情感分类' }
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      category: 'LLM优势',
      scenarios: [
        { name: '文本生成', accuracy: '95%', cost: '高', description: '创意和流畅的内容生成' },
        { name: '对话系统', accuracy: '90%', cost: '高', description: '自然的多轮对话' },
        { name: '代码生成', accuracy: '85%', cost: '高', description: '多语言编程辅助' },
        { name: '创意写作', accuracy: '88%', cost: '高', description: '文学创作和故事生成' }
      ],
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* 定义对比 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* NLP卡片 */}
        <motion.div
          className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-3xl border border-blue-200 shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4">
              <Brain className="text-white" size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">传统 NLP</h3>
              <p className="text-blue-600 font-medium">1950年代 - 至今</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white/70 p-4 rounded-xl">
              <h4 className="font-semibold text-gray-800 mb-2">核心特点</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  基于规则、统计和机器学习
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  针对特定任务优化
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  资源消耗低，可解释性强
                </li>
                <li className="flex items-center">
                  <XCircle className="text-red-500 mr-2" size={16} />
                  处理复杂语境能力有限
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-100 p-4 rounded-xl">
              <h4 className="font-semibold text-blue-800 mb-2">典型应用</h4>
              <div className="flex flex-wrap gap-2">
                {['词性标注', '实体识别', '情感分析', '机器翻译'].map((app, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-500 text-white text-xs rounded-full">
                    {app}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* LLM卡片 */}
        <motion.div
          className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl border border-purple-200 shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4">
              <Zap className="text-white" size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">大型语言模型</h3>
              <p className="text-purple-600 font-medium">2017年 - 至今</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white/70 p-4 rounded-xl">
              <h4 className="font-semibold text-gray-800 mb-2">核心特点</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  基于Transformer深度学习
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  强大的泛化能力
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  出色的文本生成能力
                </li>
                <li className="flex items-center">
                  <XCircle className="text-red-500 mr-2" size={16} />
                  资源消耗高，训练成本昂贵
                </li>
              </ul>
            </div>
            
            <div className="bg-purple-100 p-4 rounded-xl">
              <h4 className="font-semibold text-purple-800 mb-2">典型应用</h4>
              <div className="flex flex-wrap gap-2">
                {['文本生成', '对话系统', '代码编写', '创意写作'].map((app, index) => (
                  <span key={index} className="px-3 py-1 bg-purple-500 text-white text-xs rounded-full">
                    {app}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 关系演示 */}
      <motion.div
        className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-gray-200 shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">NLP与LLM的关系</h3>
        
        <div className="flex items-center justify-center space-x-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-white font-bold text-lg">NLP</span>
            </div>
            <p className="text-sm text-gray-600">传统方法</p>
            <p className="text-xs text-gray-500">规则+统计+浅层学习</p>
          </div>
          
          <div className="flex items-center">
            <ArrowRight className="text-gray-400" size={32} />
            <span className="mx-4 text-gray-600 font-medium">演进</span>
            <ArrowRight className="text-gray-400" size={32} />
          </div>
          
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-white font-bold text-lg">LLM</span>
            </div>
            <p className="text-sm text-gray-600">深度学习方法</p>
            <p className="text-xs text-gray-500">Transformer+大规模预训练</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
            <h4 className="font-semibold text-green-800 mb-3">💡 关键关系</h4>
            <p className="text-green-700 leading-relaxed">
              LLM是NLP领域发展的产物，两者并非对立关系。LLM继承了NLP的核心目标（理解和生成人类语言），
              但通过深度学习技术实现了质的飞跃。未来的趋势是两者融合互补，发挥各自优势。
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderTechnical = () => (
    <div className="space-y-8">
      {/* 技术架构对比 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 传统NLP技术栈 */}
        <motion.div
          className="bg-blue-50 p-6 rounded-3xl border border-blue-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-bold text-blue-800 mb-6 text-center">传统NLP技术栈</h3>
          <div className="space-y-4">
            {[
              { layer: '应用层', techs: ['机器翻译', '情感分析', '问答系统'], color: 'bg-blue-200' },
              { layer: '算法层', techs: ['SVM', 'CRF', 'HMM', '浅层神经网络'], color: 'bg-blue-300' },
              { layer: '特征层', techs: ['TF-IDF', 'N-gram', '词袋模型'], color: 'bg-blue-400' },
              { layer: '预处理层', techs: ['分词', '词性标注', '去停用词'], color: 'bg-blue-500' }
            ].map((layer, index) => (
              <motion.div
                key={index}
                className={`${layer.color} p-4 rounded-xl text-white`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className="font-semibold mb-2">{layer.layer}</h4>
                <div className="flex flex-wrap gap-2">
                  {layer.techs.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-white/20 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* LLM技术栈 */}
        <motion.div
          className="bg-purple-50 p-6 rounded-3xl border border-purple-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-bold text-purple-800 mb-6 text-center">LLM技术栈</h3>
          <div className="space-y-4">
            {[
              { layer: '应用层', techs: ['ChatGPT', 'GPT-4', 'Claude', 'Gemini'], color: 'bg-purple-200' },
              { layer: '微调层', techs: ['RLHF', 'Instruction Tuning', 'LoRA'], color: 'bg-purple-300' },
              { layer: '预训练层', techs: ['Transformer', 'Self-Attention', 'Large Scale'], color: 'bg-purple-400' },
              { layer: '数据层', techs: ['Web文本', '书籍', '代码', '多模态数据'], color: 'bg-purple-500' }
            ].map((layer, index) => (
              <motion.div
                key={index}
                className={`${layer.color} p-4 rounded-xl text-white`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <h4 className="font-semibold mb-2">{layer.layer}</h4>
                <div className="flex flex-wrap gap-2">
                  {layer.techs.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-white/20 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 技术特性雷达图 */}
      <motion.div
        className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-gray-200 shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">技术特性对比分析</h3>
        
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={technicalComparison}>
              <PolarGrid />
              <PolarAngleAxis dataKey="aspect" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar
                name="传统NLP"
                dataKey="NLP"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Radar
                name="LLM"
                dataKey="LLM"
                stroke="#8B5CF6"
                fill="#8B5CF6"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            {
              title: '传统NLP优势',
              points: ['资源消耗低', '可解释性强', '特定任务精确'],
              color: 'blue'
            },
            {
              title: 'LLM优势',
              points: ['泛化能力强', '生成能力出色', '理解复杂语境'],
              color: 'purple'
            },
            {
              title: '互补关系',
              points: ['精确性+灵活性', '效率+能力', '专用+通用'],
              color: 'green'
            }
          ].map((section, index) => (
            <div key={index} className={`bg-${section.color}-50 p-6 rounded-xl border border-${section.color}-200`}>
              <h4 className={`font-semibold text-${section.color}-800 mb-4`}>{section.title}</h4>
              <ul className="space-y-2">
                {section.points.map((point, i) => (
                  <li key={i} className={`flex items-center text-${section.color}-700 text-sm`}>
                    <CheckCircle className={`text-${section.color}-500 mr-2`} size={16} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderApplications = () => (
    <div className="space-y-8">
      {/* 应用场景对比 */}
      {applicationScenarios.map((category, categoryIndex) => (
        <motion.div
          key={categoryIndex}
          className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-gray-200 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.2 }}
        >
          <h3 className={`text-2xl font-bold mb-8 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
            {category.category}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {category.scenarios.map((scenario, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.2 + index * 0.1 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Target className="text-white" size={24} />
                </div>
                
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{scenario.name}</h4>
                <p className="text-sm text-gray-600 mb-4">{scenario.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">准确率</span>
                    <span className="text-sm font-semibold text-green-600">{scenario.accuracy}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">成本</span>
                    <span className={`text-sm font-semibold ${
                      scenario.cost === '低' ? 'text-green-600' : 
                      scenario.cost === '中' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {scenario.cost}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* 实际案例展示 */}
      <motion.div
        className="bg-gradient-to-r from-gray-50 to-blue-50 p-8 rounded-3xl border border-gray-200 shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">实际应用案例对比</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 传统NLP案例 */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-blue-800 mb-4">传统NLP成功案例</h4>
            {[
              {
                company: 'Google Translate',
                task: '机器翻译',
                approach: '统计+神经机器翻译',
                result: '支持100+语言，日处理10亿次翻译'
              },
              {
                company: '银行风控系统',
                task: '文本风险识别',
                approach: '规则+机器学习',
                result: '99.5%准确率，误报率<0.1%'
              },
              {
                company: '医疗信息系统',
                task: '医疗实体识别',
                approach: 'CRF+领域词典',
                result: '医疗术语识别准确率98%'
              }
            ].map((case_item, index) => (
              <div key={index} className="bg-white p-4 rounded-xl border border-blue-200">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-semibold text-gray-800">{case_item.company}</h5>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{case_item.task}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">方案: {case_item.approach}</p>
                <p className="text-sm text-green-700 font-medium">成果: {case_item.result}</p>
              </div>
            ))}
          </div>

          {/* LLM案例 */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-purple-800 mb-4">LLM突破性应用</h4>
            {[
              {
                company: 'OpenAI ChatGPT',
                task: '对话式AI助手',
                approach: 'GPT+RLHF',
                result: '2个月破1亿用户，改变AI应用格局'
              },
              {
                company: 'GitHub Copilot',
                task: '代码生成辅助',
                approach: 'Codex模型',
                result: '40%代码由AI生成，开发效率提升55%'
              },
              {
                company: 'DeepL Write',
                task: '写作辅助',
                approach: '大规模语言模型',
                result: '支持多语言写作优化，用户满意度90%+'
              }
            ].map((case_item, index) => (
              <div key={index} className="bg-white p-4 rounded-xl border border-purple-200">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-semibold text-gray-800">{case_item.company}</h5>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">{case_item.task}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">方案: {case_item.approach}</p>
                <p className="text-sm text-green-700 font-medium">成果: {case_item.result}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-8">
      {/* 发展趋势图 */}
      <motion.div
        className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-gray-200 shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">性能演进趋势</h3>
        
        <div className="h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={evolutionData}>
              <XAxis dataKey="year" />
              <YAxis domain={[0, 100]} />
              <Line 
                type="monotone" 
                dataKey="NLP" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                name="传统NLP"
              />
              <Line 
                type="monotone" 
                dataKey="LLM" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                name="大型语言模型"
              />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              period: '2010-2015',
              title: '传统NLP主导期',
              description: '基于规则和浅层机器学习方法占主流，LLM技术萌芽',
              nlp: '稳步发展',
              llm: '起步阶段'
            },
            {
              period: '2016-2020',
              title: '深度学习转型期',
              description: 'Transformer出现，BERT等预训练模型兴起，LLM快速发展',
              nlp: '技术成熟',
              llm: '快速追赶'
            },
            {
              period: '2021-现在',
              title: 'LLM引领期',
              description: 'GPT-3/4等大模型展现强大能力，传统NLP与LLM开始融合',
              nlp: '精细优化',
              llm: '领先优势'
            }
          ].map((period, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <h4 className="font-semibold text-gray-800 mb-2">{period.period}</h4>
              <h5 className="text-lg font-bold text-blue-600 mb-3">{period.title}</h5>
              <p className="text-sm text-gray-600 mb-4">{period.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-blue-600">传统NLP:</span>
                  <span className="text-xs font-medium">{period.nlp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-purple-600">LLM:</span>
                  <span className="text-xs font-medium">{period.llm}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 成本效益分析 */}
      <motion.div
        className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-gray-200 shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">成本效益对比分析</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 成本对比 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-6">开发与部署成本</h4>
            <div className="space-y-4">
              {[
                { aspect: '研发成本', nlp: '中等', llm: '极高', nlp_detail: '几万到几十万', llm_detail: '数百万到数千万' },
                { aspect: '硬件需求', nlp: '低', llm: '极高', nlp_detail: '普通服务器', llm_detail: '大量GPU集群' },
                { aspect: '训练时间', nlp: '短', llm: '长', nlp_detail: '几小时到几天', llm_detail: '几周到几个月' },
                { aspect: '部署成本', nlp: '低', llm: '高', nlp_detail: '单机部署', llm_detail: '分布式部署' }
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-800">{item.aspect}</span>
                    <div className="flex space-x-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.nlp === '低' ? 'bg-green-100 text-green-800' :
                        item.nlp === '中等' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        NLP: {item.nlp}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.llm === '高' ? 'bg-red-100 text-red-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        LLM: {item.llm}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{item.nlp_detail}</span>
                    <span>{item.llm_detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 效益对比 */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-6">应用效益</h4>
            <div className="space-y-4">
              {[
                { aspect: '任务适应性', nlp: '单一', llm: '通用', nlp_score: 60, llm_score: 95 },
                { aspect: '用户体验', nlp: '功能性', llm: '智能化', nlp_score: 70, llm_score: 90 },
                { aspect: '市场接受度', nlp: '专业', llm: '大众', nlp_score: 75, llm_score: 95 },
                { aspect: '商业价值', nlp: '稳定', llm: '颠覆性', nlp_score: 80, llm_score: 98 }
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-gray-800">{item.aspect}</span>
                    <div className="flex space-x-4 text-xs">
                      <span className="text-blue-600">NLP: {item.nlp}</span>
                      <span className="text-purple-600">LLM: {item.llm}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="text-xs text-blue-600 w-12">NLP</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${item.nlp_score}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 w-8">{item.nlp_score}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-purple-600 w-12">LLM</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${item.llm_score}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 w-8">{item.llm_score}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderContent = () => {
    switch (activeComparison) {
      case 'overview':
        return renderOverview();
      case 'technical':
        return renderTechnical();
      case 'applications':
        return renderApplications();
      case 'performance':
        return renderPerformance();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="space-y-8">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          NLP vs LLM 深度对比
        </h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          理解传统自然语言处理与大型语言模型的本质区别、技术特点和发展趋势
        </p>
      </motion.div>

      {/* 对比维度选择器 */}
      <div className="flex flex-wrap justify-center gap-4">
        {comparisonSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.button
              key={section.id}
              onClick={() => setActiveComparison(section.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                activeComparison === section.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                  : 'bg-white/70 text-gray-600 hover:bg-white shadow-md'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Icon size={18} />
              <span>{section.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* 内容展示区域 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeComparison}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default NLPvsLLM;