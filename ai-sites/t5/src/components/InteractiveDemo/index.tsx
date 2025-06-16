/**
 * 交互式演示组件
 * 让用户亲手体验T5的各种功能
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, RefreshCw, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

const InteractiveDemo: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState('translation');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const demos = [
    {
      id: 'translation',
      title: '机器翻译',
      placeholder: '输入英文文本，如: Hello, how are you?',
      prefix: 'translate English to Chinese: ',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'summarization',
      title: '文本摘要',
      placeholder: '输入较长的文本，系统将为您生成摘要',
      prefix: 'summarize: ',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'sentiment',
      title: '情感分析',
      placeholder: '输入一段文本，如: 这个产品真的很棒！',
      prefix: 'classify sentiment: ',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'question',
      title: '问答系统',
      placeholder: '提出一个问题，如: T5模型有什么特点？',
      prefix: 'question: ',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const mockResponses: Record<string, Record<string, string>> = {
    translation: {
      'Hello, how are you?': '你好，你好吗？',
      'Good morning': '早上好',
      'Thank you very much': '非常感谢',
      'default': '这是一个模拟的翻译结果'
    },
    summarization: {
      'default': '这是一个模拟的摘要结果，展示了输入文本的核心内容'
    },
    sentiment: {
      '这个产品真的很棒！': '正面',
      '服务态度很差': '负面',
      '产品质量一般': '中性',
      'default': '正面'
    },
    question: {
      'T5模型有什么特点？': 'T5采用Encoder-Decoder架构，统一所有NLP任务为文本到文本的格式',
      'default': '这是一个关于T5的回答示例'
    }
  };

  const handleProcess = async () => {
    if (!inputText.trim()) {
      toast.error('请输入一些文本');
      return;
    }

    setIsProcessing(true);
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const currentDemo = demos.find(d => d.id === selectedDemo)!;
    const responses = mockResponses[selectedDemo];
    const response = responses[inputText] || responses.default;
    
    setOutputText(response);
    setIsProcessing(false);
    toast.success('处理完成！');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('已复制到剪贴板');
  };

  const clearInputs = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-700 to-blue-600 bg-clip-text text-transparent">
            交互式演示
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            亲自体验T5的强大功能，感受文本到文本的统一处理方式
          </p>
        </motion.div>

        {/* 演示类型选择 */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {demos.map((demo) => (
            <motion.button
              key={demo.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedDemo(demo.id);
                clearInputs();
              }}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                selectedDemo === demo.id
                  ? `bg-gradient-to-r ${demo.color} text-white shadow-lg`
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
              }`}
            >
              {demo.title}
            </motion.button>
          ))}
        </div>

        {/* 主演示区域 */}
        <motion.div
          key={selectedDemo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-2xl"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* 输入区域 */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">输入文本</h3>
              <div className="space-y-4">
                {/* 前缀显示 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <span className="text-blue-600 font-mono text-sm">
                    {demos.find(d => d.id === selectedDemo)?.prefix}
                  </span>
                </div>
                
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={demos.find(d => d.id === selectedDemo)?.placeholder}
                  className="w-full h-32 p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleProcess}
                    disabled={isProcessing}
                    className={`flex-1 inline-flex items-center justify-center space-x-2 py-3 rounded-xl font-medium transition-all ${
                      isProcessing
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : `bg-gradient-to-r ${demos.find(d => d.id === selectedDemo)?.color} text-white hover:shadow-lg`
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>处理中...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>开始处理</span>
                      </>
                    )}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearInputs}
                    className="px-6 py-3 bg-gray-500 text-white rounded-xl font-medium hover:bg-gray-600 transition-colors"
                  >
                    清空
                  </motion.button>
                </div>
              </div>
            </div>

            {/* 输出区域 */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">输出结果</h3>
                {outputText && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => copyToClipboard(outputText)}
                    className="inline-flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    <span>复制</span>
                  </motion.button>
                )}
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 min-h-32 flex items-center justify-center">
                {isProcessing ? (
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 border-4 border-green-200 border-t-green-500 rounded-full mx-auto mb-2"
                    />
                    <span className="text-green-600">T5正在处理您的文本...</span>
                  </div>
                ) : outputText ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full"
                  >
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-gray-800 text-lg">{outputText}</p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-gray-400 text-center">
                    <Sparkles className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>输入文本并点击"开始处理"查看结果</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 使用提示 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6"
        >
          <h4 className="text-lg font-bold text-gray-800 mb-3">💡 使用提示</h4>
          <ul className="text-gray-600 space-y-2">
            <li>• 每个任务都有特定的前缀，这是T5统一处理的关键</li>
            <li>• 尝试不同类型的输入文本，体验T5的多样化能力</li>
            <li>• 这是一个演示版本，实际T5模型具有更强大的理解和生成能力</li>
            <li>• T5可以同时处理多种语言和复杂的推理任务</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
