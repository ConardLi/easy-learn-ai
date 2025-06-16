/**
 * 大一统思想展示组件
 * 演示T5如何将不同NLP任务统一为文本到文本的格式
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MessageSquare, Globe, FileText, HelpCircle, Star } from 'lucide-react';

const UnifiedThought: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState(0);

  const tasks = [
    {
      id: 'classification',
      icon: MessageSquare,
      title: '文本分类',
      color: 'from-blue-500 to-blue-600',
      input: 'classify sentiment: 这个产品真的很棒！',
      output: '正面',
      description: '将情感分析任务转换为文本生成'
    },
    {
      id: 'translation',
      icon: Globe,
      title: '机器翻译',
      color: 'from-green-500 to-green-600',
      input: 'translate English to Chinese: How are you?',
      output: '你好吗？',
      description: '语言翻译任务的统一表示'
    },
    {
      id: 'summarization',
      icon: FileText,
      title: '文本摘要',
      color: 'from-purple-500 to-purple-600',
      input: 'summarize: 人工智能是一门综合性的前沿学科，涉及计算机科学、认知科学、语言学等多个领域...',
      output: '人工智能是跨学科的前沿技术',
      description: '将长文本压缩为简洁摘要'
    },
    {
      id: 'qa',
      icon: HelpCircle,
      title: '问答系统',
      color: 'from-orange-500 to-orange-600',
      input: 'question: T5的全称是什么？ context: T5(Text-To-Text Transfer Transformer)是...',
      output: 'Text-To-Text Transfer Transformer',
      description: '基于上下文回答问题'
    },
    {
      id: 'generation',
      icon: Star,
      title: '文本生成',
      color: 'from-pink-500 to-pink-600',
      input: 'generate: 写一首关于春天的诗',
      output: '春风轻拂绿柳梢，花开满园香气飘',
      description: '创造性文本内容生成'
    }
  ];

  const currentTask = tasks[selectedTask];
  const IconComponent = currentTask.icon;

  return (
    <section id="unified" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-cyan-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            大一统思想
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            T5的核心创新：将所有NLP任务统一为"文本输入 → 文本输出"的形式
          </p>
        </motion.div>

        {/* 任务选择器 */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tasks.map((task, index) => {
            const TaskIcon = task.icon;
            return (
              <motion.button
                key={task.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTask(index)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedTask === index
                    ? 'bg-gradient-to-r ' + task.color + ' text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                <TaskIcon className="w-5 h-5" />
                <span>{task.title}</span>
              </motion.button>
            );
          })}
        </div>

        {/* 任务演示区 */}
        <motion.div
          key={selectedTask}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-2xl mb-12"
        >
          <div className="text-center mb-8">
            <div className={`w-16 h-16 bg-gradient-to-br ${currentTask.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentTask.title}</h3>
            <p className="text-gray-600">{currentTask.description}</p>
          </div>

          {/* 输入输出展示 */}
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* 输入 */}
            <div className="text-center">
              <h4 className="text-lg font-medium text-gray-700 mb-4">输入文本</h4>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 font-mono text-sm"
              >
                {currentTask.input}
              </motion.div>
            </div>

            {/* 箭头 */}
            <div className="text-center">
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block"
              >
                <ArrowRight className="w-8 h-8 text-gray-400" />
              </motion.div>
              <div className="mt-2 text-sm text-gray-500">T5处理</div>
            </div>

            {/* 输出 */}
            <div className="text-center">
              <h4 className="text-lg font-medium text-gray-700 mb-4">输出文本</h4>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-green-50 border-2 border-green-200 rounded-xl p-4 font-mono text-sm"
              >
                {currentTask.output}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* 大一统思想的优势 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg text-center"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">统一接口</h3>
            <p className="text-gray-600 text-sm">
              所有任务使用相同的输入输出格式，简化模型设计
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg text-center"
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">参数共享</h3>
            <p className="text-gray-600 text-sm">
              不同任务共享模型参数，提高训练效率
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg text-center"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">迁移学习</h3>
            <p className="text-gray-600 text-sm">
              预训练知识可以轻松迁移到各种下游任务
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-lg text-center"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">多任务学习</h3>
            <p className="text-gray-600 text-sm">
              同时训练多个任务，提升模型泛化能力
            </p>
          </motion.div>
        </div>

        {/* 前缀示例 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-12 bg-white rounded-3xl p-8 shadow-xl"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">任务前缀系统</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { prefix: 'translate English to French:', task: '英法翻译' },
              { prefix: 'summarize:', task: '文本摘要' },
              { prefix: 'cola sentence:', task: '语法判断' },
              { prefix: 'stsb sentence1:', task: '语义相似度' },
              { prefix: 'mnli premise:', task: '自然语言推理' },
              { prefix: 'question:', task: '问答系统' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-4"
              >
                <div className="font-mono text-sm text-blue-600 mb-1">{item.prefix}</div>
                <div className="text-xs text-gray-500">{item.task}</div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-gray-600 mt-6">
            通过统一的前缀标识，T5可以理解并执行各种不同的NLP任务
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default UnifiedThought;