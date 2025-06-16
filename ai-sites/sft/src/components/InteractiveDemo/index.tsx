/**
 * 交互式演示组件
 * 提供实时体验不同SFT效果的功能
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, RefreshCw } from 'lucide-react';

export function InteractiveDemo() {
  const [userInput, setUserInput] = useState('');
  const [currentMode, setCurrentMode] = useState('instruction');
  const [responses, setResponses] = useState<Array<{type: string, content: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const modes = [
    {
      id: 'instruction',
      name: '指令微调',
      placeholder: '请输入指令，如：将"Hello"翻译成中文',
      color: 'bg-blue-500'
    },
    {
      id: 'dialogue',
      name: '对话微调',
      placeholder: '开始对话，如：你好，今天天气怎么样？',
      color: 'bg-green-500'
    },
    {
      id: 'classification',
      name: '文本分类',
      placeholder: '输入文本进行分类，如：这个产品很棒！',
      color: 'bg-orange-500'
    }
  ];

  const simulateResponse = (input: string, mode: string) => {
    const responses = {
      instruction: {
        '将"Hello"翻译成中文': '你好',
        '总结这段文字': '我可以帮您总结文本内容，请提供具体的文字。',
        default: `根据指令"${input}"，我会执行相应的任务。`
      },
      dialogue: {
        '你好': '你好！很高兴与您对话，有什么可以帮助您的吗？',
        '今天天气怎么样': '今天天气不错，阳光明媚，温度适宜，很适合外出活动。',
        default: `我理解您说的"${input}"，让我们继续聊天吧！`
      },
      classification: {
        '这个产品很棒': '分类结果：正面情感（置信度：95%）',
        '服务太差了': '分类结果：负面情感（置信度：92%）',
        default: `对文本"${input}"进行分类分析...`
      }
    };

    return responses[mode][input] || responses[mode].default;
  };

  const handleSubmit = async () => {
    if (!userInput.trim()) return;
    
    setIsLoading(true);
    setResponses(prev => [...prev, { type: 'user', content: userInput }]);
    
    // 模拟API延迟
    setTimeout(() => {
      const response = simulateResponse(userInput, currentMode);
      setResponses(prev => [...prev, { type: 'assistant', content: response }]);
      setIsLoading(false);
      setUserInput('');
    }, 1000);
  };

  const clearChat = () => {
    setResponses([]);
  };

  return (
    <section id="demo" className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            交互式演示
          </h2>
          <p className="text-xl text-gray-600">
            亲身体验不同SFT模式的效果
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* 模式选择 */}
          <div className="flex flex-wrap justify-center mb-8 gap-4">
            {modes.map((mode) => (
              <motion.button
                key={mode.id}
                onClick={() => setCurrentMode(mode.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  currentMode === mode.id
                    ? `${mode.color} text-white shadow-lg`
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {mode.name}
              </motion.button>
            ))}
          </div>

          {/* 聊天界面 */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 flex justify-between items-center">
              <h3 className="font-semibold text-gray-700">
                {modes.find(m => m.id === currentMode)?.name} 演示
              </h3>
              <button
                onClick={clearChat}
                className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
              >
                <RefreshCw className="w-4 h-4" />
                <span>清空</span>
              </button>
            </div>

            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {responses.length === 0 && (
                <div className="text-center text-gray-500 mt-20">
                  开始对话，体验 SFT 的魅力！
                </div>
              )}
              
              {responses.map((response, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${response.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${
                    response.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {response.content}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="border-t p-4">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={modes.find(m => m.id === currentMode)?.placeholder}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                />
                <motion.button
                  onClick={handleSubmit}
                  disabled={!userInput.trim() || isLoading}
                  className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 disabled:opacity-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
