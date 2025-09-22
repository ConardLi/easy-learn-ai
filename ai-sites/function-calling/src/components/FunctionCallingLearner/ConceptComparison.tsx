/**
 * RAG vs Function Calling 概念对比组件
 * 通过视觉对比帮助用户理解两者的区别
 */
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Wrench, Database, Activity } from 'lucide-react';

const ConceptComparison: React.FC = () => {
  const ragFeatures = [
    "补充知识储备",
    "检索相关信息",
    "增强回答准确性",
    "静态信息获取"
  ];

  const functionCallingFeatures = [
    "赋予行动能力",
    "调用外部工具",
    "执行实际操作",
    "动态系统交互"
  ];

  return (
    <section className="py-16">
      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-gray-900 mb-12"
      >
        概念对比：知识 vs 行动
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* RAG 部分 */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-3 bg-purple-600 rounded-full"
            >
              <BookOpen className="w-6 h-6 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900">RAG</h3>
          </div>
          
          <p className="text-gray-600 mb-6">
            检索增强生成 - 为模型补充知识储备
          </p>
          
          <div className="space-y-3">
            {ragFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <Database className="w-4 h-4 text-purple-600" />
                <span className="text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Function Calling 部分 */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="p-3 bg-green-600 rounded-full"
            >
              <Wrench className="w-6 h-6 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900">Function Calling</h3>
          </div>
          
          <p className="text-gray-600 mb-6">
            函数调用 - 为模型赋予行动能力
          </p>
          
          <div className="space-y-3">
            {functionCallingFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <Activity className="w-4 h-4 text-green-600" />
                <span className="text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConceptComparison;
