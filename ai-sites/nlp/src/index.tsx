/**
 * NLP学习平台主组件
 * 包含导航栏和各个学习模块的路由管理
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, Target, Layers, Brain, FileText, X } from 'lucide-react';
import Overview from './components/Overview';
import Timeline from './components/Timeline';
import Tasks from './components/Tasks';
import TextRepresentation from './components/TextRepresentation';
import NLPvsLLM from './components/NLPvsLLM';

const NLPLearningPlatform: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showKnowledgeCard, setShowKnowledgeCard] = useState(false);

  const tabs = [
    { id: 'overview', label: 'NLP 概述', icon: BookOpen },
    { id: 'timeline', label: '发展历程', icon: Clock },
    { id: 'tasks', label: 'NLP 任务', icon: Target },
    { id: 'representation', label: '文本表示', icon: Layers },
    { id: 'nlp-vs-llm', label: 'NLP vs LLM', icon: Brain },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'timeline':
        return <Timeline />;
      case 'tasks':
        return <Tasks />;
      case 'representation':
        return <TextRepresentation />;
      case 'nlp-vs-llm':
        return <NLPvsLLM />;
      default:
        return <Overview />;
    }
  };

  // NLP知识卡片内容 - 基于用户提供的专业内容
  const knowledgeCardContent = {
    title: "自然语言处理 (NLP) 知识卡片",
    subtitle: "核心概念速查手册",
    sections: [
      {
        title: "一、NLP定义",
        content: [
          "自然语言处理（Natural Language Processing, NLP）是人工智能领域的分支，旨在让计算机理解、生成和处理人类语言，实现人机自然交互。",
          "融合了计算机科学、语言学、心理学等多学科知识。",
          "核心目标是打破语言与机器的障碍，处理语义、语境等深层信息。"
        ]
      },
      {
        title: "二、发展历程",
        content: [
          "早期探索（1940s-1960s）：图灵测试（1950年）提出判断机器智能的标准。诺姆·乔姆斯基的生成语法理论影响机器翻译，早期系统依赖字典和规则，效果有限。",
          "符号主义与统计方法（1970s-1990s）：分为符号主义（规则驱动）和统计方法（概率模型）两大阵营。1980s后，统计模型取代手写规则，推动NLP从规则走向数据驱动。",
          "机器学习与深度学习（2000s至今）：2013年Word2Vec提出词向量，开启分布式表示时代。2018年BERT引领预训练语言模型浪潮，后续GPT系列、Transformer架构推动NLP接近人类水平。"
        ]
      },
      {
        title: "三、核心任务",
        content: [
          "中文分词（CWS）：将连续中文文本切分为有意义的词汇序列（如\"今天天气真好\"→\"今天|天气|真|好\"）。难点：解决分词歧义（如\"雍和宫\"不能拆分为\"雍|和|宫\"）。",
          "子词切分（Subword Segmentation）：将词汇分解为更小单位（如\"unhappiness\"→\"un|happi|ness\"），处理罕见词和合成词。方法：BPE、WordPiece等。",
          "词性标注（POS Tagging）：为单词分配词性标签（如\"She is playing\"→\"She（代词）|is（动词）|playing（动词分词）\"）。",
          "文本分类：将文本分配到预定义类别（如新闻分类为\"体育\"\"政治\"\"科技\"）。",
          "实体识别（NER）：提取文本中的命名实体（如\"北京\"\"微软\"\"2024年\"）并分类。",
          "关系抽取：识别实体间语义关系（如\"比尔·盖茨-创始人-微软\"）。",
          "文本摘要：抽取式（选关键句）和生成式（重构语义）。",
          "机器翻译：跨语言语义转换，如\"今天天气很好\"→\"The weather is nice today\"。",
          "自动问答（QA）：检索式、知识库式、社区式，需理解问题并推理答案。"
        ]
      },
      {
        title: "四、文本表示技术",
        content: [
          "向量空间模型（VSM）：将文本转为高维向量（如One-Hot编码），用TF-IDF计算权重。缺点：数据稀疏、维数灾难，忽略词序和语义。",
          "N-gram模型：基于马尔可夫假设，用前N-1个词预测当前词概率（如bigram计算P(\"fox\"|\"brown\"）。缺点：N较大时数据稀疏，无法捕捉长距离依赖。",
          "Word2Vec（2013）：CBOW（根据上下文预测词）和Skip-Gram（根据词预测上下文）。优势：生成低维密集向量，捕捉语义相似性（如\"国王-王后\"向量接近）。",
          "ELMo（2018）：双向LSTM预训练，动态生成上下文相关词向量，解决一词多义问题。"
        ]
      },
      {
        title: "五、应用场景",
        content: [
          "日常工具：语音助手（Siri）、智能输入法、机器翻译（Google翻译）。",
          "信息处理：垃圾邮件过滤、舆情分析、新闻分类。",
          "智能系统：问答机器人、知识图谱构建、推荐系统。"
        ]
      },
      {
        title: "六、挑战与未来",
        content: [
          "挑战：歧义性（如\"苹果\"指水果或公司）、隐喻理解、跨语言文化差异。",
          "未来方向：预训练模型优化（如GPT-4）、多模态融合（语言+图像/语音）、小样本学习、可解释性NLP。",
          "核心价值：NLP通过技术迭代，正从\"表层处理\"迈向\"深层语义理解\"，推动AI与人类语言交互的革新。"
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 头部导航 */}
      <nav className="bg-white/70 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.h1 
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              NLP 学习平台
            </motion.h1>
            
            <div className="flex items-center space-x-4">
              {/* 导航标签 */}
              <div className="flex space-x-1">
                {tabs.map((tab, index) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : 'text-gray-600 hover:bg-white/50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Icon size={16} />
                      <span className="hidden sm:block">{tab.label}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* 知识卡片按钮 */}
              <motion.button
                onClick={() => setShowKnowledgeCard(true)}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <FileText size={16} />
                <span className="hidden sm:block">知识卡片</span>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 知识卡片弹窗 */}
      <AnimatePresence>
        {showKnowledgeCard && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowKnowledgeCard(false)}
          >
            <motion.div
              className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 卡片头部 */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-t-3xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{knowledgeCardContent.title}</h2>
                    <p className="text-blue-100">📚 {knowledgeCardContent.subtitle}</p>
                  </div>
                  <motion.button
                    onClick={() => setShowKnowledgeCard(false)}
                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>
              </div>

              {/* 卡片内容 */}
              <div className="p-6 space-y-8">
                {knowledgeCardContent.sections.map((section, sectionIndex) => (
                  <motion.div
                    key={sectionIndex}
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: sectionIndex * 0.1 }}
                  >
                    <h3 className="text-xl font-bold text-gray-800 pb-2 border-b-2 border-blue-200 flex items-center">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{sectionIndex + 1}</span>
                      </div>
                      {section.title}
                    </h3>
                    <div className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          className="flex items-start space-x-3 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border border-gray-100 hover:border-blue-200"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: sectionIndex * 0.1 + itemIndex * 0.05 }}
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-3 flex-shrink-0"></div>
                          <p className="text-gray-700 leading-relaxed text-sm">{item}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}

                {/* 底部核心价值强调 */}
                <motion.div
                  className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-200 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">🎯</span>
                    </div>
                    <h4 className="text-xl font-bold text-green-800 mb-3">核心价值</h4>
                    <p className="text-green-700 font-medium text-lg leading-relaxed">
                      NLP通过技术迭代，正从"表层处理"迈向"深层语义理解"，<br />
                      推动AI与人类语言交互的革新
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-white/60 p-4 rounded-xl">
                      <div className="text-2xl mb-2">🧠</div>
                      <h5 className="font-semibold text-green-800">智能理解</h5>
                      <p className="text-xs text-green-600">深层语义分析</p>
                    </div>
                    <div className="bg-white/60 p-4 rounded-xl">
                      <div className="text-2xl mb-2">🔄</div>
                      <h5 className="font-semibold text-green-800">技术融合</h5>
                      <p className="text-xs text-green-600">多学科交叉</p>
                    </div>
                    <div className="bg-white/60 p-4 rounded-xl">
                      <div className="text-2xl mb-2">🚀</div>
                      <h5 className="font-semibold text-green-800">应用创新</h5>
                      <p className="text-xs text-green-600">人机交互革新</p>
                    </div>
                  </div>
                  
                  <p className="text-green-600 text-sm mt-4">
                    💡 点击导航栏的各个模块深入学习具体内容
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NLPLearningPlatform;