/**
 * 重要性页面组件
 * 解释为什么Tokenization对大语言模型如此重要
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Globe, Code, FileText } from 'lucide-react';

const Importance: React.FC = () => {
  const [activeExample, setActiveExample] = useState(0);

  const examples = [
    {
      title: '拼写与基础任务缺陷',
      icon: AlertTriangle,
      description: 'LLM可能拼错单词或无法反转字符串',
      before: 'strawberry',
      tokens: ['str', 'aw', 'berry'],
      issue: '单词被拆分，模型难以理解完整含义',
      color: 'from-red-400 to-red-600'
    },
    {
      title: '非英语语言表现',
      icon: Globe,
      description: '日语、中文等语言的分词更复杂',
      before: '你好世界',
      tokens: ['你', '好', '世', '界'],
      issue: 'Token序列更长，消耗更多上下文窗口',
      color: 'from-orange-400 to-orange-600'
    },
    {
      title: '代码处理挑战',
      icon: Code,
      description: 'Python代码的缩进空格被分割',
      before: '    def hello():',
      tokens: [' ', ' ', ' ', ' ', 'def', ' ', 'hello', '(', ')', ':'],
      issue: '缩进空格成为独立Token，浪费计算资源',
      color: 'from-blue-400 to-blue-600'
    },
    {
      title: '结构化数据格式',
      icon: FileText,
      description: 'JSON比YAML消耗更多Token',
      before: '{"name": "John"}',
      tokens: ['{', '"', 'name', '"', ':', ' ', '"', 'John', '"', '}'],
      issue: 'JSON的符号更多，Token效率较低',
      color: 'from-green-400 to-green-600'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
          为什么 Tokenization 如此重要？
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Tokenization直接影响LLM的性能和行为，许多看似与模型架构相关的"奇怪现象"本质上源于分词逻辑
        </p>
      </motion.div>

      {/* Impact Overview */}
      <motion.div
        className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">影响概览</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={28} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">性能影响</h3>
            <p className="text-gray-600">分词策略直接影响模型的理解能力和处理效率</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe size={28} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">语言适配</h3>
            <p className="text-gray-600">不同语言的分词效果差异巨大，影响多语言能力</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code size={28} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">成本控制</h3>
            <p className="text-gray-600">Token数量直接影响API调用成本和计算资源</p>
          </div>
        </div>
      </motion.div>

      {/* Interactive Examples */}
      <motion.div
        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">问题示例</h2>
        
        {/* Example Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {examples.map((example, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveExample(index)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeExample === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <example.icon size={16} />
              <span className="text-sm">{example.title}</span>
            </motion.button>
          ))}
        </div>

        {/* Example Content */}
        <motion.div
          key={activeExample}
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`bg-gradient-to-r ${examples[activeExample].color} rounded-xl p-6 text-white`}>
            <h3 className="text-xl font-bold mb-2">{examples[activeExample].title}</h3>
            <p className="text-sm opacity-90">{examples[activeExample].description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-800 mb-3">原始文本</h4>
              <div className="bg-white rounded-lg p-3 font-mono text-lg border-2 border-gray-200">
                {examples[activeExample].before}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-800 mb-3">Token分解</h4>
              <div className="flex flex-wrap gap-2">
                {examples[activeExample].tokens.map((token, index) => (
                  <motion.span
                    key={index}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-mono"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    "{token}"
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">问题分析</h4>
            <p className="text-yellow-700">{examples[activeExample].issue}</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Token Count Comparison */}
      <motion.div
        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Token效率对比</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-600">YAML格式</h3>
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
              <div>name: John</div>
              <div>age: 30</div>
              <div>city: Shanghai</div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Token数量</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold">29</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-red-600">JSON格式</h3>
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
              <div>{'{'}</div>
              <div>  "name": "John",</div>
              <div>  "age": 30,</div>
              <div>  "city": "Shanghai"</div>
              <div>{'}'}</div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Token数量</span>
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-bold">46</span>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-800">
            <strong>影响：</strong>相同的配置信息，JSON格式比YAML多消耗59%的Token，
            直接影响API成本和模型的上下文窗口利用效率。
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Importance;
