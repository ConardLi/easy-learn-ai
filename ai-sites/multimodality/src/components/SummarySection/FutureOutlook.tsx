/**
 * 未来展望组件
 * 展示多模态AI的发展趋势和未来可能性
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Globe, Users, Zap, Brain, Star } from 'lucide-react';

interface FutureOutlookProps {
  inView: boolean;
}

const FutureOutlook: React.FC<FutureOutlookProps> = ({ inView }) => {
  const trends = [
    {
      icon: Rocket,
      title: '技术突破',
      description: '更强大的模型架构和算法创新',
      details: ['统一多模态架构', '零样本学习能力增强', '实时处理性能提升'],
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Globe,
      title: '应用普及',
      description: '多模态AI走进千家万户',
      details: ['个人AI助手普及', '创作工具大众化', '教育场景深度融合'],
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Users,
      title: '交互革命',
      description: '人机交互方式的根本性变革',
      details: ['多感官自然交互', '情感理解能力', '个性化适应'],
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50'
    }
  ];

  const challenges = [
    '计算资源需求与效率平衡',
    '数据隐私与安全保护',
    '算法偏见与公平性',
    '技术伦理与社会责任'
  ];

  return (
    <div className="space-y-12">
      {/* 发展趋势 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">未来发展趋势</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          {trends.map((trend, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 + index * 0.2 }}
              className={`${trend.bgColor} rounded-2xl p-6 border border-gray-200`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-xl ${trend.color} text-white`}>
                  <trend.icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">{trend.title}</h4>
              </div>
              
              <p className="text-gray-600 mb-4">{trend.description}</p>
              
              <div className="space-y-2">
                {trend.details.map((detail, detailIndex) => (
                  <motion.div
                    key={detailIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1.4 + index * 0.2 + detailIndex * 0.1 }}
                    className="flex items-center space-x-2"
                  >
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-700">{detail}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 挑战与机遇 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="grid lg:grid-cols-2 gap-8"
      >
        {/* 挑战 */}
        <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-xl bg-red-500 text-white">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-red-900">面临挑战</h4>
          </div>
          
          <div className="space-y-3">
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 2.0 + index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-red-800">{challenge}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 机遇 */}
        <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-xl bg-green-500 text-white">
              <Brain className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-green-900">发展机遇</h4>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="text-green-800 leading-relaxed"
          >
            多模态AI将成为下一代人工智能的核心驱动力，它将重新定义人机交互方式，
            创造全新的商业模式，推动社会生产力的跃升。从个人助手到创意伙伴，
            从教育工具到医疗助手，多模态AI正在开启一个充满无限可能的智能时代。
          </motion.div>
        </div>
      </motion.div>

      {/* 结语 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 2.4 }}
        className="text-center bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200"
      >
        <h4 className="text-2xl font-bold gradient-text mb-4">学习永不止步</h4>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          多模态AI的发展日新月异，保持学习热情，紧跟技术前沿，
          在这个充满变革的时代中抓住属于自己的机遇。
          让我们一起见证并参与这个伟大的技术变革！
        </p>
      </motion.div>
    </div>
  );
};

export default FutureOutlook;
