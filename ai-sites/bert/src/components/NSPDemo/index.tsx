/**
 * 下一句预测(NSP)任务演示组件
 * 可视化展示NSP任务的工作原理和训练目标
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Shuffle, Target } from 'lucide-react';
import toast from 'react-hot-toast';

const NSPDemo: React.FC = () => {
  const [currentExample, setCurrentExample] = useState(0);
  const [userPrediction, setUserPrediction] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);

  const examples = [
    {
      sentenceA: "我今天很开心，因为天气很好。",
      sentenceB: "所以我决定去公园散步。",
      isNext: true,
      explanation: "句子B是句子A的自然延续，表达了因果关系。"
    },
    {
      sentenceA: "小明正在准备期末考试。",
      sentenceB: "今天是星期三，天气晴朗。",
      isNext: false,
      explanation: "句子B与句子A没有逻辑关联，是随机组合的句子。"
    },
    {
      sentenceA: "这部电影的剧情非常精彩。",
      sentenceB: "我强烈推荐大家去观看。",
      isNext: true,
      explanation: "句子B是对句子A的进一步阐述和建议。"
    },
    {
      sentenceA: "我需要买一些食材做晚饭。",
      sentenceB: "量子物理学是一门深奥的科学。",
      isNext: false,
      explanation: "句子B的主题与句子A完全无关。"
    }
  ];

  const handlePrediction = (prediction: boolean) => {
    setUserPrediction(prediction);
    setShowResult(true);
    
    const isCorrect = prediction === examples[currentExample].isNext;
    if (isCorrect) {
      toast.success('回答正确！', {
        icon: '✅',
        duration: 2000,
      });
    } else {
      toast.error('回答错误，再试试看！', {
        icon: '❌',
        duration: 2000,
      });
    }
  };

  const nextExample = () => {
    setCurrentExample((prev) => (prev + 1) % examples.length);
    setUserPrediction(null);
    setShowResult(false);
  };

  const shuffleExamples = () => {
    const randomIndex = Math.floor(Math.random() * examples.length);
    setCurrentExample(randomIndex);
    setUserPrediction(null);
    setShowResult(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
          下一句预测 (NSP)
        </h1>
        <p className="text-lg text-gray-600">
          判断两个句子是否为连续的上下文关系
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 交互演示区 */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">NSP 挑战</h2>
              <div className="flex gap-2">
                <button
                  onClick={shuffleExamples}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all"
                >
                  <Shuffle size={16} />
                  随机
                </button>
                <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg">
                  {currentExample + 1}/{examples.length}
                </span>
              </div>
            </div>

            {/* 句子展示 */}
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-blue-800 mb-2">句子 A:</h3>
                <p className="text-gray-700">{examples[currentExample].sentenceA}</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-green-800 mb-2">句子 B:</h3>
                <p className="text-gray-700">{examples[currentExample].sentenceB}</p>
              </div>
            </div>

            {/* 预测按钮 */}
            {!showResult && (
              <div className="flex gap-4">
                <motion.button
                  onClick={() => handlePrediction(true)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CheckCircle size={20} />
                  是连续的
                </motion.button>
                <motion.button
                  onClick={() => handlePrediction(false)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <XCircle size={20} />
                  不是连续的
                </motion.button>
              </div>
            )}

            {/* 结果展示 */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg ${
                  userPrediction === examples[currentExample].isNext
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {userPrediction === examples[currentExample].isNext ? (
                    <CheckCircle className="text-green-600" size={20} />
                  ) : (
                    <XCircle className="text-red-600" size={20} />
                  )}
                  <span className="font-semibold">
                    {userPrediction === examples[currentExample].isNext ? '回答正确！' : '回答错误！'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  正确答案：{examples[currentExample].isNext ? '是连续的' : '不是连续的'}
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  {examples[currentExample].explanation}
                </p>
                <button
                  onClick={nextExample}
                  className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                >
                  下一题
                </button>
              </motion.div>
            )}
          </div>

          {/* 任务统计 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">任务目标</h3>
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <Target className="text-blue-600" size={24} />
              <div>
                <p className="font-medium">学习句子级语义关系</p>
                <p className="text-sm text-gray-600">为问答、自然语言推理等任务提供基础</p>
              </div>
            </div>
          </div>
        </div>

        {/* 说明文档 */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">NSP 任务详解</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">正样本生成</h4>
                <p className="text-sm text-green-700">
                  从语料库中选取连续的两个句子作为正样本，
                  标签为 IsNext (1)
                </p>
              </div>
              
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">负样本生成</h4>
                <p className="text-sm text-red-700">
                  随机从不同文档中选取两个句子作为负样本，
                  标签为 NotNext (0)
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">模型训练</h4>
                <p className="text-sm text-blue-700">
                  使用 [CLS] token 的表示进行二分类，
                  学习句子间的逻辑关系
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">应用场景</h3>
            <div className="space-y-3">
              {[
                { task: "问答匹配", desc: "判断问题和答案是否匹配" },
                { task: "自然语言推理", desc: "判断前提和假设的逻辑关系" },
                { task: "文档理解", desc: "理解段落间的连贯性" },
                { task: "对话系统", desc: "维持对话的上下文一致性" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">{item.task}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">注意事项</h3>
            <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <p className="text-sm text-yellow-800">
                <strong>争议性任务：</strong> 
                后续研究表明NSP任务可能过于简单，
                RoBERTa等模型选择移除此任务，
                ALBERT则提出了改进版本SOP任务。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NSPDemo;
