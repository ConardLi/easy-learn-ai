/**
 * 关键学习要点总结组件
 * 提供重要概念的总结和记忆要点
 */
import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  ArrowRight, 
  Lightbulb, 
  Target, 
  Zap,
  Users,
  TrendingUp,
  Shield
} from 'lucide-react';

interface KeyPoint {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  insights: string[];
}

const KeyPoints: React.FC = () => {
  const keyPoints: KeyPoint[] = [
    {
      id: 1,
      title: "核心理念",
      description: "Function Calling 的本质是为 AI 赋予行动能力",
      icon: <Lightbulb className="w-6 h-6" />,
      insights: [
        "不仅是对话，更是执行",
        "从被动回答到主动操作",
        "连接 AI 与现实世界的桥梁"
      ]
    },
    {
      id: 2,
      title: "技术优势",
      description: "相比传统方案的突出优势",
      icon: <Target className="w-6 h-6" />,
      insights: [
        "实时性：即时调用外部API",
        "准确性：结构化的函数调用",
        "扩展性：支持无限工具集成"
      ]
    },
    {
      id: 3,
      title: "实施要点",
      description: "成功实现 Function Calling 的关键因素",
      icon: <Zap className="w-6 h-6" />,
      insights: [
        "函数定义要清晰明确",
        "参数规范要标准统一", 
        "错误处理要完善可靠"
      ]
    },
    {
      id: 4,
      title: "应用价值",
      description: "为业务和用户带来的实际价值",
      icon: <TrendingUp className="w-6 h-6" />,
      insights: [
        "提升用户体验和效率",
        "降低开发和维护成本",
        "创造新的商业模式"
      ]
    }
  ];

  const principles = [
    "明确定义函数的输入输出规范",
    "保证函数调用的安全性和可靠性", 
    "设计良好的错误处理和回退机制",
    "优化函数执行的性能和响应速度",
    "建立完善的监控和日志体系"
  ];

  return (
    <section className="py-16">
      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-gray-900 mb-12"
      >
        核心要点总结
      </motion.h2>

      {/* 关键概念卡片 */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {keyPoints.map((point, index) => (
          <motion.div
            key={point.id}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-3 bg-blue-600 rounded-full"
              >
                {React.cloneElement(point.icon as React.ReactElement, {
                  className: "w-6 h-6 text-white"
                })}
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900">
                {point.title}
              </h3>
            </div>

            <p className="text-gray-600 mb-6">
              {point.description}
            </p>

            <div className="space-y-3">
              {point.insights.map((insight, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{insight}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 实施原则 */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 mb-16"
      >
        <div className="flex items-center gap-4 mb-6">
          <Shield className="w-8 h-8 text-blue-600" />
          <h3 className="text-2xl font-bold text-gray-900">
            实施原则
          </h3>
        </div>

        <div className="grid gap-4">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm"
            >
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <p className="text-gray-700 font-medium">
                {principle}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 总结要点 */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
          >
            <Users className="w-8 h-8 text-white" />
          </motion.div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          学习总结
        </h3>

        <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
          Function Calling 是 AI 技术发展的重要里程碑，它让大语言模型从"只会说话"进化为"能够行动"。
          掌握这项技术，就是掌握了 AI 与现实世界交互的钥匙。
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg"
        >
          <span>开始你的 Function Calling 之旅</span>
          <ArrowRight className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default KeyPoints;
