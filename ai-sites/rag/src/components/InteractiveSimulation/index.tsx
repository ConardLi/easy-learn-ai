/**
 * RAG交互式模拟器组件
 * 允许用户输入自定义问题，体验完整的RAG流程
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader, BookOpen, Lightbulb, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const InteractiveSimulation: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [simulationResults, setSimulationResults] = useState<{
    query: string;
    retrievedDocs: Array<{ title: string; content: string; relevance: number }>;
    generatedAnswer: string;
    processingTime: number;
  } | null>(null);

  // 模拟知识库
  const knowledgeBase = [
    {
      title: "机器学习基础",
      content: "机器学习是人工智能的一个分支，它使用算法和统计模型来使计算机系统能够在没有明确编程的情况下提高特定任务的性能。",
      keywords: ["机器学习", "算法", "统计", "人工智能", "模型"]
    },
    {
      title: "深度学习原理",
      content: "深度学习是机器学习的一个子集，它模仿人脑神经网络的工作方式。深度学习网络由多个层次组成，每一层都会学习数据的不同特征。",
      keywords: ["深度学习", "神经网络", "多层", "特征", "人脑"]
    },
    {
      title: "自然语言处理",
      content: "自然语言处理（NLP）是计算机科学、人工智能和语言学的交叉领域，专注于使计算机能够理解、解释和生成人类语言。",
      keywords: ["自然语言处理", "NLP", "语言学", "理解", "生成"]
    },
    {
      title: "大语言模型",
      content: "大语言模型是基于Transformer架构的深度学习模型，通过在大量文本数据上进行预训练，具备强大的语言理解和生成能力。",
      keywords: ["大语言模型", "Transformer", "预训练", "文本", "生成"]
    },
    {
      title: "检索增强生成",
      content: "RAG通过结合检索系统和生成模型来提高AI系统的准确性。它首先检索相关信息，然后基于这些信息生成更准确的回答。",
      keywords: ["RAG", "检索", "生成", "准确性", "信息"]
    },
    {
      title: "向量数据库",
      content: "向量数据库是专门用于存储和检索高维向量的数据库系统，在语义搜索和相似性匹配中发挥重要作用。",
      keywords: ["向量数据库", "高维", "语义搜索", "相似性", "检索"]
    }
  ];

  const simulateRetrieval = (query: string) => {
    const words = query.toLowerCase().split(/\s+/);
    return knowledgeBase
      .map(doc => {
        const matchCount = words.filter(word => 
          doc.keywords.some(keyword => keyword.toLowerCase().includes(word)) ||
          doc.content.toLowerCase().includes(word)
        ).length;
        const relevance = Math.min(0.95, Math.max(0.1, matchCount / words.length * 0.8 + Math.random() * 0.2));
        
        return {
          title: doc.title,
          content: doc.content,
          relevance: relevance
        };
      })
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 3);
  };

  const generateAnswer = (query: string, docs: Array<{ title: string; content: string; relevance: number }>) => {
    const templates = [
      `基于检索到的信息，${query.replace('什么是', '').replace('？', '')}是指`,
      `根据相关文档，关于${query.replace('什么是', '').replace('？', '')}的解释如下：`,
      `通过分析检索结果，我们可以了解到${query.replace('什么是', '').replace('？', '')}的概念：`
    ];
    
    const template = templates[Math.floor(Math.random() * templates.length)];
    const contextInfo = docs.slice(0, 2).map(doc => doc.content).join(' ');
    
    return `${template}${contextInfo.slice(0, 200)}...这一技术在现代AI系统中具有重要意义。`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) {
      toast.error('请输入您的问题');
      return;
    }

    setIsProcessing(true);
    const startTime = Date.now();

    try {
      // 模拟检索延迟
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const retrievedDocs = simulateRetrieval(userInput);
      
      // 模拟生成延迟
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedAnswer = generateAnswer(userInput, retrievedDocs);
      const processingTime = Date.now() - startTime;

      setSimulationResults({
        query: userInput,
        retrievedDocs,
        generatedAnswer,
        processingTime
      });

      toast.success('RAG模拟完成！');
    } catch (error) {
      toast.error('模拟过程出现错误');
    } finally {
      setIsProcessing(false);
    }
  };

  const sampleQuestions = [
    "什么是机器学习？",
    "深度学习的工作原理是什么？",
    "RAG技术有什么优势？",
    "向量数据库在AI中的作用是什么？"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">RAG 交互式模拟器</h2>
        <p className="text-lg text-gray-600">输入您的问题，体验完整的RAG检索增强生成过程</p>
      </motion.div>

      {/* 输入区域 */}
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-lg mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              输入您的问题：
            </label>
            <div className="flex space-x-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="例如：什么是机器学习？"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                disabled={isProcessing}
              />
              <motion.button
                type="submit"
                disabled={isProcessing}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isProcessing ? (
                  <Loader className="animate-spin" size={20} />
                ) : (
                  <Send size={20} />
                )}
                <span>{isProcessing ? '处理中...' : '提交问题'}</span>
              </motion.button>
            </div>
          </div>
          
          {/* 示例问题 */}
          <div>
            <p className="text-sm text-gray-600 mb-2">试试这些示例问题：</p>
            <div className="flex flex-wrap gap-2">
              {sampleQuestions.map((question, index) => (
                <motion.button
                  key={index}
                  type="button"
                  onClick={() => setUserInput(question)}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  disabled={isProcessing}
                >
                  {question}
                </motion.button>
              ))}
            </div>
          </div>
        </form>
      </motion.div>

      {/* 处理进度指示 */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex items-center justify-center space-x-4">
              <Loader className="animate-spin text-blue-600" size={24} />
              <div className="text-blue-800">
                <p className="font-semibold">正在模拟RAG处理流程...</p>
                <p className="text-sm text-blue-600">检索相关文档 → 构建增强上下文 → 生成回答</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 模拟结果 */}
      <AnimatePresence>
        {simulationResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* 处理统计 */}
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="text-green-600" size={20} />
                  <span className="font-medium text-gray-800">处理完成</span>
                </div>
                <div className="text-sm text-gray-600">
                  总耗时: {simulationResults.processingTime}ms
                </div>
              </div>
            </div>

            {/* 检索结果 */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <BookOpen className="text-blue-600 mr-3" size={24} />
                <h3 className="text-xl font-semibold text-gray-800">检索到的相关文档</h3>
              </div>
              <div className="space-y-4">
                {simulationResults.retrievedDocs.map((doc, index) => (
                  <motion.div
                    key={index}
                    className="border-l-4 border-blue-400 bg-blue-50 p-4 rounded-r-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-blue-800">{doc.title}</h4>
                      <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                        相关度: {Math.round(doc.relevance * 100)}%
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">{doc.content}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 生成答案 */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <Lightbulb className="text-yellow-600 mr-3" size={24} />
                <h3 className="text-xl font-semibold text-gray-800">RAG生成的答案</h3>
              </div>
              <motion.div
                className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg border-l-4 border-yellow-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-gray-800 leading-relaxed text-lg">
                  {simulationResults.generatedAnswer}
                </p>
              </motion.div>
              
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>原始问题：</strong> {simulationResults.query}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveSimulation;
