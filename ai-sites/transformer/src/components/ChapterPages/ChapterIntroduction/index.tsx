/**
 * Transformer 诞生章节
 * 介绍 Transformer 的历史背景和重要性
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Button } from '@nextui-org/react';
import { 
  Calendar, 
  Users, 
  Zap, 
  ArrowRight, 
  Brain,
  Clock,
  Target,
  Lightbulb
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ChapterIntroduction: React.FC = () => {
  const timeline = [
    {
      year: '2014-2016',
      title: 'RNN/LSTM 时代',
      description: '序列模型主导，但存在长序列处理困难',
      icon: Clock,
      color: 'from-gray-400 to-gray-600'
    },
    {
      year: '2017',
      title: 'Transformer 诞生',
      description: 'Vaswani 团队发表《Attention Is All You Need》',
      icon: Lightbulb,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      year: '2018-2019',
      title: 'BERT & GPT 兴起',
      description: '基于 Transformer 的预训练模型大获成功',
      icon: Brain,
      color: 'from-green-400 to-blue-500'
    },
    {
      year: '2020-现在',
      title: '大语言模型时代',
      description: 'GPT-3, GPT-4, ChatGPT 等改变世界',
      icon: Zap,
      color: 'from-purple-400 to-pink-500'
    }
  ];

  const breakthroughs = [
    {
      title: '注意力机制替代循环计算',
      description: '彻底摆脱了 RNN 的串行处理限制',
      icon: Target,
      benefit: '并行处理，速度提升数百倍'
    },
    {
      title: '全局记忆能力',
      description: '能够关联文本中任意距离的词语',
      icon: Brain,
      benefit: '更好地理解长文本上下文'
    },
    {
      title: '可扩展的架构',
      description: '为后续大模型提供了坚实基础',
      icon: Zap,
      benefit: '支持千亿、万亿参数模型'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Transformer 的诞生
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          2017 年，一篇名为《Attention Is All You Need》的论文彻底改变了自然语言处理领域
        </p>
      </motion.div>

      {/* Key Innovation */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardBody className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Users className="w-6 h-6 mr-2 text-blue-600" />
                  核心创新
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  此前的 RNN/LSTM 就像<span className="font-semibold text-orange-600">"健忘的人"</span>
                  ——读到句尾会忘记句首内容，而 Transformer 通过自注意力机制实现
                  <span className="font-semibold text-blue-600">"全局记忆"</span>，
                  就像人阅读时能随时关联前后文。
                </p>
              </div>
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, 0, -1, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex justify-center"
              >
                <div className="w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Brain className="w-20 h-20 text-white" />
                </div>
              </motion.div>
            </div>
          </CardBody>
        </Card>
      </motion.section>

      {/* Timeline */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          发展时间线
        </h2>
        <div className="space-y-4">
          {timeline.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="shadow-md hover:shadow-lg transition-shadow border-0">
                  <CardBody className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-500">
                            {item.year}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Breakthroughs */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          三大突破点
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {breakthroughs.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-full shadow-lg hover:shadow-xl transition-all border-0">
                  <CardBody className="p-6 text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {item.description}
                    </p>
                    <div className="bg-green-50 px-3 py-2 rounded-lg">
                      <p className="text-green-700 text-sm font-medium">
                        ✓ {item.benefit}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Next Chapter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-center"
      >
        <Link to="/prediction">
          <Button
            size="lg"
            color="primary"
            endContent={<ArrowRight className="w-5 h-5" />}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
          >
            下一章：预测下一个词
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ChapterIntroduction;
