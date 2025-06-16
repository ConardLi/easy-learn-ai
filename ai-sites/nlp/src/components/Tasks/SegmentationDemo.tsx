/**
 * 中文分词演示组件
 * 展示中文分词的过程和结果
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';

const SegmentationDemo: React.FC = () => {
  const [inputText, setInputText] = useState('雍和宫的荷花开的很好。');
  const [isAnimating, setIsAnimating] = useState(false);
  const [segments, setSegments] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const examples = [
    { text: '雍和宫的荷花开的很好。', result: ['雍和宫', '的', '荷花', '开', '的', '很', '好', '。'] },
    { text: '今天天气真好，适合出去游玩。', result: ['今天', '天气', '真', '好', '，', '适合', '出去', '游玩', '。'] },
    { text: '人工智能在医疗领域有广泛应用。', result: ['人工智能', '在', '医疗', '领域', '有', '广泛', '应用', '。'] }
  ];

  const performSegmentation = async () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSegments([]);
    setCurrentStep(0);

    const example = examples.find(ex => ex.text === inputText) || examples[0];
    const result = example.result;

    for (let i = 0; i < result.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setSegments(prev => [...prev, result[i]]);
      setCurrentStep(i + 1);
    }

    setIsAnimating(false);
  };

  const reset = () => {
    setSegments([]);
    setCurrentStep(0);
    setIsAnimating(false);
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">中文分词演示</h3>
          <p className="text-gray-600">将连续的中文文本切分成有意义的词汇</p>
        </div>

        {/* 输入区域 */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">输入文本：</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={2}
              placeholder="输入要分词的中文文本..."
              disabled={isAnimating}
            />
          </div>

          <div className="flex gap-3">
            <motion.button
              onClick={performSegmentation}
              disabled={isAnimating || !inputText.trim()}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play size={16} />
              <span>{isAnimating ? '分词中...' : '开始分词'}</span>
            </motion.button>

            <motion.button
              onClick={reset}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-xl font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw size={16} />
              <span>重置</span>
            </motion.button>
          </div>
        </div>

        {/* 分词结果展示 */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800">分词结果：</h4>
          
          <div className="min-h-[100px] p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <AnimatePresence>
              <div className="flex flex-wrap gap-2">
                {segments.map((segment, index) => (
                  <motion.span
                    key={index}
                    className="px-3 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-lg text-gray-800 font-medium"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {segment}
                  </motion.span>
                ))}
              </div>
            </AnimatePresence>
          </div>

          {segments.length > 0 && (
            <motion.div
              className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ✅ 分词完成！共识别出 <strong>{segments.length}</strong> 个词汇单元
            </motion.div>
          )}
        </div>

        {/* 示例选择 */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">试试这些例子：</h4>
          <div className="flex flex-wrap gap-2">
            {examples.map((example, index) => (
              <motion.button
                key={index}
                onClick={() => setInputText(example.text)}
                className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {example.text}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SegmentationDemo;
