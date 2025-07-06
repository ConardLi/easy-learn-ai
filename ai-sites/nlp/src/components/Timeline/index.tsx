/**
 * NLP发展历程时间线组件 - 增强版
 * 展示NLP技术从1940年代至今的详细发展过程，包含关键技术突破和代表性成果
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronRight, Star, Zap, Brain, Database, Globe, Bot } from 'lucide-react';

const Timeline: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const timelineEvents = [
    {
      year: '1950',
      title: '图灵测试提出',
      category: '理论基础',
      description: '艾伦·图灵提出判断机器智能的标准',
      icon: Brain,
      color: 'from-red-400 to-pink-500',
      impact: '奠定了人工智能的哲学基础',
      details: [
        '提出了"机器能思考吗？"的根本问题',
        '设计了通过对话来判断机器智能的测试方法',
        '影响了后续几十年的AI研究方向',
        '为现代自然语言处理设定了终极目标'
      ]
    },
    {
      year: '1957',
      title: '生成语法理论',
      category: '语言学基础',
      description: '乔姆斯基提出生成语法，影响机器翻译发展',
      icon: Database,
      color: 'from-orange-400 to-red-500',
      impact: '为计算语言学提供了理论框架',
      details: [
        '提出了语言的递归性质和有限规则生成无限语句',
        '区分了表层结构和深层结构',
        '为机器翻译提供了语法分析的理论基础',
        '影响了后续的句法分析和解析技术'
      ]
    },
    {
      year: '1966',
      title: 'ELIZA聊天机器人',
      category: '早期应用',
      description: '第一个能进行简单对话的计算机程序',
      icon: Bot,
      color: 'from-yellow-400 to-orange-500',
      impact: '展示了简单模式匹配的对话能力',
      details: [
        '使用简单的模式匹配和替换规则',
        '模拟心理治疗师进行对话',
        '让人们首次体验到与机器对话的可能性',
        '暴露了早期NLP技术的局限性'
      ]
    },
    {
      year: '1980s',
      title: '统计方法兴起',
      category: '方法革命',
      description: '从规则驱动转向统计和概率方法',
      icon: Database,
      color: 'from-blue-400 to-cyan-500',
      impact: '开启了数据驱动的NLP时代',
      details: [
        '计算能力提升使大规模数据处理成为可能',
        'Hidden Markov Model在语音识别中的成功应用',
        '统计机器翻译模型的发展',
        '为后续机器学习方法奠定基础'
      ]
    },
    {
      year: '1990s',
      title: '互联网与语料库',
      category: '数据革命',
      description: '大规模文本数据的出现改变了NLP研究',
      icon: Globe,
      color: 'from-green-400 to-blue-500',
      impact: '提供了前所未有的训练数据',
      details: [
        '万维网提供了海量的多语言文本数据',
        '标准化语料库如Penn Treebank的建立',
        '数据驱动方法开始显示优势',
        '评估标准和基准测试集的确立'
      ]
    },
    {
      year: '2001',
      title: '条件随机场(CRF)',
      category: '算法突破',
      description: 'CRF在序列标注任务中取得突破性进展',
      icon: Zap,
      color: 'from-purple-400 to-blue-500',
      impact: '显著提升了序列标注任务的性能',
      details: [
        '解决了序列标注中的标签偏置问题',
        '在词性标注、命名实体识别中取得优异表现',
        '成为监督学习在NLP中的重要里程碑',
        '为后续深度学习序列模型提供了对比基础'
      ]
    },
    {
      year: '2013',
      title: 'Word2Vec革命',
      category: '表示学习',
      description: 'Mikolov等人提出Word2Vec，开创词向量时代',
      icon: Brain,
      color: 'from-green-500 to-emerald-500',
      impact: '彻底改变了文本表示方式',
      details: [
        '首次实现了高质量的词语义表示',
        '"king - man + woman = queen"展示了惊人的类比能力',
        'Skip-gram和CBOW两种训练方式',
        '为所有后续的深度学习NLP模型奠定基础'
      ]
    },
    {
      year: '2014',
      title: 'Seq2Seq模型',
      category: '架构创新',
      description: '编码器-解码器架构在机器翻译中的突破',
      icon: Zap,
      color: 'from-cyan-500 to-blue-500',
      impact: '开启了端到端学习的新范式',
      details: [
        '不再需要复杂的特征工程和流水线',
        '在机器翻译中接近人类翻译质量',
        '为文本摘要、对话系统等任务提供统一框架',
        '展示了深度学习在NLP中的巨大潜力'
      ]
    },
    {
      year: '2015',
      title: '注意力机制',
      category: '技术突破',
      description: 'Attention机制解决长序列信息瓶颈问题',
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      impact: '显著提升了长文本处理能力',
      details: [
        '解决了RNN在长序列上的信息丢失问题',
        '让模型能够"关注"输入的重要部分',
        '在机器翻译中实现了质的飞跃',
        '为Transformer架构的出现铺平道路'
      ]
    },
    {
      year: '2017',
      title: 'Transformer问世',
      category: '架构革命',
      description: '"Attention is All You Need"论文发布',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      impact: '彻底改变了NLP技术架构',
      details: [
        '完全基于注意力机制，摒弃了RNN和CNN',
        '并行化训练大大提升了效率',
        '在机器翻译上创造了新的性能记录',
        '成为后续所有大型语言模型的基础架构'
      ]
    },
    {
      year: '2018',
      title: 'BERT横空出世',
      category: '预训练时代',
      description: '双向编码器表示开启预训练语言模型时代',
      icon: Brain,
      color: 'from-indigo-500 to-purple-500',
      impact: '开启了预训练+微调的新范式',
      details: [
        '首次实现真正的双向上下文理解',
        '在11个NLP任务上刷新了性能记录',
        '掩码语言建模预训练策略的成功',
        '让预训练模型成为NLP的标准做法'
      ]
    },
    {
      year: '2019',
      title: 'GPT-2发布',
      category: '生成能力',
      description: '展示了大规模语言模型的文本生成能力',
      icon: Bot,
      color: 'from-green-500 to-cyan-500',
      impact: '证明了语言模型的强大生成能力',
      details: [
        '15亿参数的大规模模型',
        '生成的文本质量接近人类写作',
        '展示了零样本学习的可能性',
        '因过于强大而延迟发布引发伦理讨论'
      ]
    },
    {
      year: '2020',
      title: 'GPT-3震撼登场',
      category: '规模突破',
      description: '1750亿参数模型展现惊人的语言理解能力',
      icon: Star,
      color: 'from-red-500 to-purple-500',
      impact: '让通用人工智能触手可及',
      details: [
        '1750亿参数，史无前例的模型规模',
        '在多种任务上展现出类人的表现',
        '少样本学习能力令人震惊',
        '引发了新一轮的AI军备竞赛'
      ]
    },
    {
      year: '2022',
      title: 'ChatGPT现象',
      category: '应用爆发',
      description: '对话式AI走向大众，引发全球AI热潮',
      icon: Globe,
      color: 'from-orange-500 to-red-500',
      impact: '将AI能力普及到普通用户',
      details: [
        '基于人类反馈的强化学习(RLHF)',
        '2个月内用户数突破1亿',
        '让普通人体验到AI的强大能力',
        '引发各行各业对AI应用的重新思考'
      ]
    },
    {
      year: '2023',
      title: 'GPT-4与多模态',
      category: '能力扩展',
      description: '多模态大模型开启AI新纪元',
      icon: Brain,
      color: 'from-purple-500 to-indigo-500',
      impact: '从语言智能向通用智能迈进',
      details: [
        '同时处理文本、图像等多种模态',
        '在专业考试中接近人类专家水平',
        '推理能力的显著提升',
        '向通用人工智能(AGI)又迈进一大步'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          NLP 技术发展历程
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          从1950年图灵测试到2023年多模态大模型，见证自然语言处理70多年的技术演进
        </p>
      </motion.div>

      {/* 增强的时间轴可视化 */}
      <div className="relative max-w-6xl mx-auto">
        {/* 主时间轴 */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-400 via-blue-400 via-green-400 to-purple-400 rounded-full shadow-lg"></div>
        
        <div className="space-y-8">
          {timelineEvents.map((event, index) => {
            const Icon = event.icon;
            const isLeft = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* 内容卡片 */}
                <div className="w-5/12">
                  <motion.div
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 cursor-pointer group hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.03, y: -5 }}
                    onClick={() => setSelectedEvent(index)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${event.color} text-white`}>
                        {event.category}
                      </span>
                      <span className="text-2xl font-bold text-gray-800">{event.year}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{event.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-green-600 text-sm">
                        <Star size={14} className="mr-1" />
                        <span className="font-medium">重大影响</span>
                      </div>
                      <motion.div 
                        className="flex items-center text-blue-600 text-sm"
                        whileHover={{ x: 5 }}
                      >
                        <span>查看详情</span>
                        <ChevronRight size={16} className="ml-1" />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* 时间轴节点 */}
                <div className="w-2/12 flex justify-center">
                  <motion.div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${event.color} shadow-2xl z-10 flex items-center justify-center border-4 border-white`}
                    whileHover={{ scale: 1.2, rotate: 180 }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1 + 0.3,
                      type: "spring",
                      stiffness: 200 
                    }}
                  >
                    <Icon size={24} className="text-white" />
                  </motion.div>
                </div>

                {/* 占位空间 */}
                <div className="w-5/12"></div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 技术影响力统计 */}
      <motion.div
        className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">技术演进的关键指标</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: '模型参数量', value: '从百万到千亿级', trend: '增长 100,000倍' },
            { label: '训练数据量', value: '从MB到TB级', trend: '增长 1,000,000倍' },
            { label: '任务覆盖度', value: '从单一到通用', trend: '覆盖所有NLP任务' },
            { label: '应用普及度', value: '从实验室到大众', trend: '用户数破10亿' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
            >
              <h4 className="font-semibold text-gray-800 mb-2">{stat.label}</h4>
              <p className="text-lg font-bold text-blue-600 mb-1">{stat.value}</p>
              <p className="text-sm text-green-600">{stat.trend}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 详情展示模态 */}
      <AnimatePresence>
        {selectedEvent !== null && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const event = timelineEvents[selectedEvent];
                const Icon = event.icon;
                
                return (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${event.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                        <Icon size={32} className="text-white" />
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${event.color} text-white`}>
                        {event.category}
                      </span>
                      <h3 className="text-3xl font-bold text-gray-800 mt-4 mb-2">{event.title}</h3>
                      <p className="text-xl text-gray-500 mb-4">{event.year}</p>
                      <p className="text-lg text-gray-600">{event.description}</p>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                      <h4 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                        <Star className="mr-2" size={20} />
                        历史影响
                      </h4>
                      <p className="text-green-700 font-medium">{event.impact}</p>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold text-gray-800">技术详情</h4>
                      <div className="grid gap-3">
                        {event.details.map((detail, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${event.color} mt-2 flex-shrink-0`}></div>
                            <p className="text-gray-700 leading-relaxed">{detail}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-center pt-4">
                      <motion.button
                        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedEvent(null)}
                      >
                        关闭详情
                      </motion.button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Timeline;