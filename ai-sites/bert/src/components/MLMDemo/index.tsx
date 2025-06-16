/**
 * 掩码语言模型(MLM)演示组件
 * 交互式展示MLM任务的工作原理，包括掩码策略和预测过程
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

const MLMDemo: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState(0);
  const [showStrategy, setShowStrategy] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const examples = [
    {
      original: "我喜欢在阳光明媚的日子里散步",
      masked: "我喜欢在 [MASK] 明媚的日子里散步",
      prediction: "阳光",
      tokens: ["我", "喜欢", "在", "[MASK]", "明媚", "的", "日子", "里", "散步"]
    },
    {
      original: "BERT是一个强大的自然语言处理模型",
      masked: "BERT是一个 [MASK] 的自然语言 [MASK] 模型",
      prediction: "强大, 处理",
      tokens: ["BERT", "是", "一个", "[MASK]", "的", "自然", "语言", "[MASK]", "模型"]
    },
    {
      original: "机器学习正在改变我们的生活方式",
      masked: "机器学习正在 [MASK] 我们的生活 [MASK]",
      prediction: "改变, 方式",
      tokens: ["机器", "学习", "正在", "[MASK]", "我们", "的", "生活", "[MASK]"]
    }
  ];

  const maskingStrategy = [
    { percentage: 80, action: "替换为[MASK]", color: "bg-red-500", description: "标准掩码处理" },
    { percentage: 10, action: "替换为随机词", color: "bg-yellow-500", description: "防止过拟合" },
    { percentage: 10, action: "保持原词", color: "bg-green-500", description: "消除预训练-微调差异" }
  ];

  const steps = [
    "输入原始文本",
    "随机选择15%的词进行掩码",
    "应用掩码策略",
    "BERT编码处理",
    "预测被掩码的词"
  ];

  const handlePrediction = () => {
    toast.success(`预测结果: ${examples[selectedExample].prediction}`, {
      duration: 3000,
      style: {
        background: '#10B981',
        color: 'white',
      },
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          掩码语言模型 (MLM)
        </h1>
        <p className="text-lg text-gray-600">
          通过"完形填空"任务学习双向语言表示
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 互动演示区 */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">MLM 演示</h2>
              <div className="flex gap-2">
                <select
                  value={selectedExample}
                  onChange={(e) => setSelectedExample(Number(e.target.value))}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {examples.map((_, index) => (
                    <option key={index} value={index}>示例 {index + 1}</option>
                  ))}
                </select>
                <button
                  onClick={() => setSelectedExample((prev) => (prev + 1) % examples.length)}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                >
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {/* 原始文本 */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">原始文本:</h3>
                <p className="text-gray-700">{examples[selectedExample].original}</p>
              </div>

              {/* 掩码文本 */}
              <div className="p-4 bg-red-50 rounded-lg">
                <h3 className="font-semibold mb-2">掩码文本:</h3>
                <div className="flex flex-wrap gap-2">
                  {examples[selectedExample].tokens.map((token, index) => (
                    <motion.span
                      key={index}
                      className={`px-3 py-1 rounded-lg ${
                        token === '[MASK]' 
                          ? 'bg-red-200 text-red-800 font-bold' 
                          : 'bg-gray-200 text-gray-700'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {token}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* 预测按钮 */}
              <motion.button
                onClick={handlePrediction}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                开始预测
              </motion.button>
            </div>
          </div>

          {/* 掩码策略 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">掩码策略 (15%词汇)</h3>
              <button
                onClick={() => setShowStrategy(!showStrategy)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                {showStrategy ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            
            <AnimatePresence>
              {showStrategy && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3"
                >
                  {maskingStrategy.map((strategy, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-4 h-4 ${strategy.color} rounded`} />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium">{strategy.action}</span>
                          <span className="text-gray-500">{strategy.percentage}%</span>
                        </div>
                        <p className="text-sm text-gray-600">{strategy.description}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 流程说明 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-6">MLM 训练流程</h3>
          
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                  currentStep === index 
                    ? 'bg-blue-50 border-l-4 border-blue-500' 
                    : 'bg-gray-50'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  currentStep >= index ? 'bg-blue-500' : 'bg-gray-400'
                }`}>
                  {index + 1}
                </div>
                <span className="flex-1">{step}</span>
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={() => setCurrentStep((prev) => (prev + 1) % steps.length)}
            className="w-full mt-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            下一步
          </motion.button>

          {/* MLM优势 */}
          <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <h4 className="font-semibold mb-3 text-blue-800">MLM 的优势</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <span>双向上下文：同时利用上文和下文信息</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                <span>无监督学习：无需人工标注数据</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <span>语言理解：深度学习词汇语义关系</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLMDemo;
