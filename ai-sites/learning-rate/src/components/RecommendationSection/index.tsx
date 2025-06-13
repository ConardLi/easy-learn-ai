/**
 * 学习率推荐值组件
 * 展示实际应用中的推荐学习率值
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Star, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const RecommendationSection: React.FC = () => {
  const recommendations = [
    {
      scenario: '一般微调任务',
      rate: '5e-5 (0.00005)',
      description: '最常用的学习率，适合大多数预训练模型的微调',
      icon: Star,
      color: 'from-green-500 to-blue-500'
    },
    {
      scenario: '保守微调',
      rate: '4e-5 (0.00004)',
      description: '更保守的选择，适合重要任务或需要稳定性的场景',
      icon: CheckCircle,
      color: 'from-blue-500 to-purple-500'
    },
    {
      scenario: '全参数微调',
      rate: '5e-6 (0.000005)',
      description: '全参数微调时使用更小的学习率，防止破坏原始知识',
      icon: Info,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const warnings = [
    {
      text: '小数据集不要使用大学习率',
      icon: AlertTriangle,
      color: 'text-orange-600'
    },
    {
      text: '不要担心训练速度慢，稳定性更重要',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      text: '全参数微调的学习率要比 LoRA 小一个数量级',
      icon: Info,
      color: 'text-blue-600'
    }
  ];

  return (
    <motion.section 
      className="bg-white rounded-3xl shadow-2xl p-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4"
          whileHover={{ scale: 1.1, rotate: 10 }}
        >
          <Star className="h-8 w-8 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">实用推荐值</h2>
        <p className="text-gray-600 text-lg">
          实际应用中推荐的学习率设置
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {recommendations.map((rec, index) => (
          <motion.div
            key={index}
            className={`bg-gradient-to-br ${rec.color} rounded-2xl p-6 text-white`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center mb-4">
              <rec.icon className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-bold">{rec.scenario}</h3>
            </div>
            <div className="text-2xl font-bold mb-2">{rec.rate}</div>
            <p className="text-white/90 text-sm">{rec.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">重要提示</h3>
        <div className="space-y-3">
          {warnings.map((warning, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <warning.icon className={`h-5 w-5 ${warning.color}`} />
              <span className="text-gray-700">{warning.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default RecommendationSection;
