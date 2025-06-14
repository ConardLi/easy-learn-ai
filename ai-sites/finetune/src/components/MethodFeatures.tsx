/**
 * 方法特性组件，以卡片形式展示三种微调方法的主要特点
 * 每个卡片包含方法名称、简要描述和主要特点列表
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const MethodFeatures: React.FC = () => {
  const methods = [
    {
      id: 'full-parameter',
      title: 'Full Parameter Fine-tuning',
      description: '更新预训练模型的所有参数',
      features: [
        '适应能力最强',
        '需要较大的计算资源',
        '可能导致过拟合',
        '存储成本高',
        '训练时间长'
      ],
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'freeze',
      title: 'Freeze',
      description: '冻结部分层，只更新部分参数',
      features: [
        '减少计算资源需求',
        '保留底层特征提取能力',
        '只训练任务相关参数',
        '训练更快',
        '平衡性能与资源消耗'
      ],
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 'lora',
      title: 'LoRA',
      description: '通过低秩适配矩阵更新参数',
      features: [
        '参数量极大减少',
        '存储高效',
        '训练速度快',
        '适合资源受限场景',
        '可组合多个适配器'
      ],
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="grid md:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {methods.map((method) => (
        <motion.div 
          key={method.id}
          variants={item}
          className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white border border-gray-200`}
        >
          <div className={`px-6 py-4 bg-gradient-to-r ${method.color} text-white`}>
            <h3 className="text-xl font-bold mb-1">{method.title}</h3>
            <p className="opacity-90">{method.description}</p>
          </div>
          <div className="px-6 py-4">
            <ul className="space-y-2">
              {method.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2 text-sm bg-gray-100 rounded-full h-5 w-5 flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="px-6 py-3 bg-gray-50">
            <Link 
              to={`/${method.id}`}
              className="inline-block w-full text-center py-2 px-4 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
            >
              了解更多
            </Link>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
