/**
 * 实践演示页面组件
 * 提供交互式的文本分词体验和实时结果展示
 */
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, Copy, Download, RotateCcw, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const PracticalDemo: React.FC = () => {
  const [inputText, setInputText] = useState('Hello, world! This is a tokenization demo.');
  const [tokens, setTokens] = useState<string[]>([]);
  const [tokenIds, setTokenIds] = useState<number[]>([]);
  const [processingTime, setProcessingTime] = useState(0);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bpe');

  // 模拟不同的分词算法
  const algorithms = {
    bpe: {
      name: 'BPE (Byte Pair Encoding)',
      description: '基于字节对编码的现代分词算法',
      tokenize: (text: string): string[] => {
        // 简化的BPE模拟
        const words = text.split(/(\s+|[,.!?;])/);
        const result: string[] = [];
        
        words.forEach(word => {
          if (word.match(/^\s+$/)) {
            result.push(word);
          } else if (word.match(/[,.!?;]/)) {
            result.push(word);
          } else if (word.length > 0) {
            // 简化的子词分割
            if (word.length <= 4) {
              result.push(word);
            } else {
              const subwords = [];
              let i = 0;
              while (i < word.length) {
                if (i + 4 <= word.length) {
                  subwords.push(word.slice(i, i + 4));
                  i += 4;
                } else {
                  subwords.push(word.slice(i));
                  break;
                }
              }
              result.push(...subwords);
            }
          }
        });
        
        return result.filter(token => token.length > 0);
      }
    },
    wordpiece: {
      name: 'WordPiece',
      description: 'Google开发的子词分词算法',
      tokenize: (text: string): string[] => {
        const words = text.split(/(\s+|[,.!?;])/);
        const result: string[] = [];
        
        words.forEach(word => {
          if (word.match(/^\s+$/)) {
            result.push(word);
          } else if (word.match(/[,.!?;]/)) {
            result.push(word);
          } else if (word.length > 0) {
            // WordPiece风格的分割
            if (word.length <= 3) {
              result.push(word);
            } else {
              result.push(word.slice(0, -3));
              result.push('##' + word.slice(-3));
            }
          }
        });
        
        return result.filter(token => token.length > 0);
      }
    },
    character: {
      name: 'Character Level',
      description: '字符级分词（如莎士比亚示例）',
      tokenize: (text: string): string[] => {
        return text.split('');
      }
    }
  };

  const processText = useCallback(() => {
    const startTime = performance.now();
    
    const selectedTokenizer = algorithms[selectedAlgorithm as keyof typeof algorithms];
    const resultTokens = selectedTokenizer.tokenize(inputText);
    
    // 生成模拟的Token ID
    const ids = resultTokens.map((token, index) => {
      // 简单的哈希函数模拟Token ID
      let hash = 0;
      for (let i = 0; i < token.length; i++) {
        const char = token.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // 转为32位整数
      }
      return Math.abs(hash) % 10000 + index;
    });
    
    const endTime = performance.now();
    
    setTokens(resultTokens);
    setTokenIds(ids);
    setProcessingTime(endTime - startTime);
    
    toast.success('分词完成！');
  }, [inputText, selectedAlgorithm]);

  const handleCopy = () => {
    const result = {
      原文: inputText,
      算法: algorithms[selectedAlgorithm as keyof typeof algorithms].name,
      Token数量: tokens.length,
      Tokens: tokens,
      IDs: tokenIds,
      处理时间: `${processingTime.toFixed(2)}ms`
    };
    
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    toast.success('结果已复制到剪贴板！');
  };

  const handleDownload = () => {
    const result = {
      原文: inputText,
      算法: algorithms[selectedAlgorithm as keyof typeof algorithms].name,
      Token数量: tokens.length,
      Tokens: tokens,
      IDs: tokenIds,
      处理时间: `${processingTime.toFixed(2)}ms`,
      时间戳: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tokenization_result.json';
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('结果已下载！');
  };

  const resetDemo = () => {
    setInputText('Hello, world! This is a tokenization demo.');
    setTokens([]);
    setTokenIds([]);
    setProcessingTime(0);
    toast.success('已重置演示！');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
          实践演示
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          亲手体验不同分词算法的效果，实时查看Token分解结果和性能指标
        </p>
      </motion.div>

      {/* Algorithm Selector */}
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">选择分词算法</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(algorithms).map(([key, algorithm]) => (
            <motion.div
              key={key}
              onClick={() => setSelectedAlgorithm(key)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedAlgorithm === key
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className={`font-semibold mb-2 ${
                selectedAlgorithm === key ? 'text-blue-700' : 'text-gray-700'
              }`}>
                {algorithm.name}
              </h3>
              <p className={`text-sm ${
                selectedAlgorithm === key ? 'text-blue-600' : 'text-gray-600'
              }`}>
                {algorithm.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Input Section */}
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">输入文本</h2>
        <div className="space-y-4">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
            placeholder="在这里输入你想要分词的文本..."
          />
          <div className="flex space-x-4">
            <motion.button
              onClick={processText}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap size={20} />
              <span>开始分词</span>
            </motion.button>
            <motion.button
              onClick={resetDemo}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-xl font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw size={20} />
              <span>重置</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Results Section */}
      {tokens.length > 0 && (
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Statistics */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">分词统计</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{tokens.length}</div>
                <div className="text-sm text-gray-600">Token数量</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{inputText.length}</div>
                <div className="text-sm text-gray-600">字符数量</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{(inputText.length / tokens.length).toFixed(1)}</div>
                <div className="text-sm text-gray-600">压缩比</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{processingTime.toFixed(2)}ms</div>
                <div className="text-sm text-gray-600">处理时间</div>
              </div>
            </div>
          </div>

          {/* Tokens Display */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Token序列</h2>
              <div className="flex space-x-2">
                <motion.button
                  onClick={handleCopy}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Copy size={16} />
                  <span>复制</span>
                </motion.button>
                <motion.button
                  onClick={handleDownload}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={16} />
                  <span>下载</span>
                </motion.button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {tokens.map((token, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                >
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 text-blue-800 px-3 py-2 rounded-lg font-mono text-sm cursor-pointer">
                    "{token}"
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    ID: {tokenIds[index]}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Token IDs */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Token ID 序列</h2>
            <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm">
              [{tokenIds.join(', ')}]
            </div>
          </div>
        </motion.div>
      )}

      {/* Tips */}
      <motion.div
        className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">使用技巧</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-orange-600 mb-3">尝试不同文本</h3>
            <p className="text-gray-600">
              输入不同语言、代码片段或特殊字符，观察各算法的分词差异。
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-blue-600 mb-3">观察压缩比</h3>
            <p className="text-gray-600">
              注意不同算法的压缩效率，理解Token数量对模型性能的影响。
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PracticalDemo;
