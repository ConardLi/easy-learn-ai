/**
 * 学习总结和评估组件
 * 提供RAG学习要点总结和自我评估功能
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { learningProgressAtom } from '../../store/ragStore';
import { CheckCircle, Circle, Trophy, Star, BookOpen, Brain } from 'lucide-react';
import toast from 'react-hot-toast';

const Summary: React.FC = () => {
  const [progress, setProgress] = useAtom(learningProgressAtom);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const keyPoints = [
    {
      category: "核心概念",
      items: [
        "RAG是检索增强生成技术的缩写",
        "结合外部知识库与大语言模型",
        "解决知识截止和事实幻觉问题",
        "提供可追溯的信息来源"
      ]
    },
    {
      category: "工作流程", 
      items: [
        "用户输入问题或查询",
        "从知识库检索相关文档",
        "构建增强的上下文提示",
        "生成基于事实的准确回答"
      ]
    },
    {
      category: "技术架构",
      items: [
        "知识库：存储外部信息源",
        "检索模块：语义搜索和相似度计算", 
        "编排器：协调各模块协作",
        "生成模块：大语言模型推理"
      ]
    },
    {
      category: "优势与挑战",
      items: [
        "优势：准确性高、知识实时、可解释",
        "挑战：检索质量、延迟增加、维护成本",
        "应用：问答系统、知识助手、内容生成",
        "发展：多模态、实时更新、个性化"
      ]
    }
  ];

  const quizQuestions = [
    {
      id: 'q1',
      question: 'RAG技术的主要目的是什么？',
      options: [
        '提高模型训练速度',
        '解决知识截止和事实幻觉问题', 
        '减少模型参数量',
        '提高用户界面美观度'
      ],
      correct: 1
    },
    {
      id: 'q2', 
      question: 'RAG工作流程的正确顺序是什么？',
      options: [
        '生成→检索→增强',
        '增强→检索→生成',
        '检索→增强→生成',
        '检索→生成→增强'
      ],
      correct: 2
    },
    {
      id: 'q3',
      question: '以下哪项不是RAG系统的核心模块？',
      options: [
        '知识库',
        '检索模块', 
        '用户界面设计工具',
        '大语言模型'
      ],
      correct: 2
    },
    {
      id: 'q4',
      question: 'RAG相比传统LLM的主要优势是什么？',
      options: [
        '模型体积更小',
        '训练速度更快',
        '能够动态获取最新信息',
        '不需要GPU计算'
      ],
      correct: 2
    }
  ];

  const handleQuizSubmit = () => {
    if (Object.keys(quizAnswers).length < quizQuestions.length) {
      toast.error('请完成所有题目');
      return;
    }

    const score = quizQuestions.reduce((acc, q) => {
      return acc + (parseInt(quizAnswers[q.id]) === q.correct ? 1 : 0);
    }, 0);

    setProgress(prev => ({
      ...prev,
      currentScore: score,
      completedStages: [...new Set([...prev.completedStages, 'summary'])]
    }));

    setShowResults(true);
    toast.success(`评估完成！您的得分：${score}/${quizQuestions.length}`);
  };

  const getScoreLevel = (score: number) => {
    const percentage = score / quizQuestions.length;
    if (percentage >= 0.8) return { level: '优秀', color: 'text-green-600', stars: 3 };
    if (percentage >= 0.6) return { level: '良好', color: 'text-blue-600', stars: 2 };
    return { level: '需要加强', color: 'text-orange-600', stars: 1 };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">学习总结与评估</h2>
        <p className="text-lg text-gray-600">回顾RAG核心知识点并完成自我评估</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 知识点总结 */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-6">
              <BookOpen className="text-blue-600 mr-3" size={28} />
              <h3 className="text-2xl font-bold text-gray-800">核心知识点回顾</h3>
            </div>

            {keyPoints.map((section, index) => (
              <motion.div
                key={section.category}
                className="mb-6 last:mb-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  {section.category}
                </h4>
                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      className="flex items-start space-x-2 text-gray-700"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 + itemIndex * 0.1 }}
                    >
                      <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                      <span className="text-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 自我评估测试 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-6">
              <Brain className="text-purple-600 mr-3" size={28} />
              <h3 className="text-2xl font-bold text-gray-800">知识掌握评估</h3>
            </div>

            {!showResults ? (
              <div className="space-y-6">
                {quizQuestions.map((question, index) => (
                  <motion.div
                    key={question.id}
                    className="border-b border-gray-200 pb-4 last:border-b-0"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h4 className="font-semibold text-gray-800 mb-3">
                      {index + 1}. {question.question}
                    </h4>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <label
                          key={optionIndex}
                          className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                        >
                          <input
                            type="radio"
                            name={question.id}
                            value={optionIndex}
                            onChange={(e) => setQuizAnswers(prev => ({
                              ...prev,
                              [question.id]: e.target.value
                            }))}
                            className="text-blue-600"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                ))}

                <motion.button
                  onClick={handleQuizSubmit}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  提交评估
                </motion.button>
              </div>
            ) : (
              <motion.div
                className="text-center space-y-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                  <Trophy className="text-yellow-500 mx-auto mb-4" size={48} />
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">评估完成！</h4>
                  
                  <div className="text-6xl font-bold text-purple-600 mb-2">
                    {progress.currentScore}/{quizQuestions.length}
                  </div>
                  
                  <div className={`text-xl font-semibold ${getScoreLevel(progress.currentScore).color} mb-4`}>
                    {getScoreLevel(progress.currentScore).level}
                  </div>
                  
                  <div className="flex justify-center space-x-1 mb-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`${
                          i < getScoreLevel(progress.currentScore).stars
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                        size={24}
                      />
                    ))}
                  </div>

                  <div className="text-gray-600 space-y-2">
                    <p>学习进度: {progress.completedStages.length}/5 个模块</p>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(progress.completedStages.length / 5) * 100}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                </div>

                {progress.currentScore === quizQuestions.length && (
                  <motion.div
                    className="bg-green-50 border border-green-200 rounded-lg p-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-green-800 font-semibold">🎉 恭喜！您已完全掌握RAG的核心概念！</p>
                    <p className="text-green-700 text-sm mt-1">
                      建议继续深入学习RAG的高级技术和实际应用场景。
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* 下一步建议 */}
      <motion.section
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">继续学习建议</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-indigo-800">技术深入方向</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• 学习向量数据库（Pinecone, Weaviate）</li>
                <li>• 掌握Embedding模型选择与优化</li>
                <li>• 了解RAG评估指标和方法</li>
                <li>• 实践多模态RAG应用</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-purple-800">实践应用方向</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• 构建领域专用知识库</li>
                <li>• 实现RAG系统性能优化</li>
                <li>• 探索RAG与Agent结合</li>
                <li>• 开发RAG评估框架</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Summary;
