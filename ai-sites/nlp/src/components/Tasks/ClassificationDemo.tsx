/**
 * 文本分类演示组件
 * 展示文本分类的过程和结果
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { Target } from 'lucide-react';

const ClassificationDemo: React.FC = () => {
  const [inputText, setInputText] = useState('NBA季后赛将于下周开始，湖人和勇士将在首轮对决。');
  const [result, setResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const categories = [
    { name: '体育', color: '#3B82F6' },
    { name: '科技', color: '#10B981' },
    { name: '政治', color: '#F59E0B' },
    { name: '娱乐', color: '#EF4444' },
    { name: '财经', color: '#8B5CF6' }
  ];

  const examples = [
    { text: 'NBA季后赛将于下周开始，湖人和勇士将在首轮对决。', category: '体育' },
    { text: '苹果公司发布了新款MacBook，配备了最新的M3芯片。', category: '科技' },
    { text: '美国总统宣布将提高关税，引发国际贸易争端。', category: '政治' },
    { text: '著名演员获得奥斯卡最佳男主角奖，现场观众起立鼓掌。', category: '娱乐' },
    { text: '股市今日大涨，科技股领涨，投资者信心增强。', category: '财经' }
  ];

  const analyzeText = async () => {
    if (isAnalyzing) return;
    
    setIsAnalyzing(true);
    
    // 模拟分析过程
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 根据输入文本匹配示例
    const example = examples.find(ex => ex.text === inputText);
    const targetCategory = example?.category || '体育';
    
    // 生成概率分布
    const probabilities = categories.map(cat => ({
      category: cat.name,
      probability: cat.name === targetCategory ? 
        Math.random() * 20 + 75 : // 75-95%
        Math.random() * 25,       // 0-25%
      color: cat.color
    }));
    
    setResult({
      prediction: targetCategory,
      confidence: probabilities.find(p => p.category === targetCategory)?.probability.toFixed(1),
      distribution: probabilities.sort((a, b) => b.probability - a.probability)
    });
    
    setIsAnalyzing(false);
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">文本分类演示</h3>
          <p className="text-gray-600">自动识别文本属于哪个类别</p>
        </div>

        {/* 输入区域 */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">输入文本：</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              rows={3}
              placeholder="输入要分类的文本..."
              disabled={isAnalyzing}
            />
          </div>

          <motion.button
            onClick={analyzeText}
            disabled={isAnalyzing || !inputText.trim()}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Target size={16} />
            <span>{isAnalyzing ? '分析中...' : '开始分类'}</span>
          </motion.button>
        </div>

        {/* 分析结果 */}
        {(result || isAnalyzing) && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {isAnalyzing ? (
              <div className="text-center py-8">
                <motion.div
                  className="inline-block w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <p className="mt-4 text-gray-600">AI正在分析文本内容...</p>
              </div>
            ) : result && (
              <>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border border-green-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">分类结果</h4>
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl font-bold text-green-600">{result.prediction}</div>
                    <div className="text-gray-600">
                      <div className="text-sm">置信度</div>
                      <div className="text-xl font-semibold">{result.confidence}%</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">概率分布</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={result.distribution}>
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="probability" radius={[4, 4, 0, 0]}>
                          {result.distribution.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* 示例选择 */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">试试这些例子：</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {examples.map((example, index) => (
              <motion.button
                key={index}
                onClick={() => setInputText(example.text)}
                className="p-3 text-left text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-medium text-gray-800">{example.category}</div>
                <div className="text-gray-600 truncate">{example.text}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassificationDemo;
