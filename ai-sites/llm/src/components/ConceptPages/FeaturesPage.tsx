/**
 * LLM 特点分析页面
 * 介绍多语言支持、长文本处理、多模态拓展和幻觉问题等特点
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, FileText, Camera, AlertTriangle, ChevronRight } from 'lucide-react';

const FeaturesPage: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: '多语言支持',
      subtitle: 'Multilingual Support',
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
      description: 'LLM 天生具有多语言、跨语言能力，可以处理多种语言的文本',
      details: [
        '训练语料本身就是多语言的',
        '英文能力通常最强，中文等其他语言次之',
        '国内模型在中文环境上表现更优越',
        '支持语言间的翻译和理解'
      ],
      benefits: ['降低语言壁垒', '全球化应用', '跨文化交流'],
    },
    {
      title: '长文本处理',
      subtitle: 'Long Context Handling',
      icon: FileText,
      color: 'from-green-500 to-emerald-500',
      description: '相比传统模型的 512 token，LLM 支持处理更长的上下文',
      details: [
        '支持 4k、8k 甚至 32k 的上下文长度',
        '采用旋转位置编码（RoPE）实现长度外推',
        '可以处理完整的文档和书籍',
        '具备更强的信息阅读和总结能力'
      ],
      benefits: ['文档理解', '长篇写作', '信息总结'],
    },
    {
      title: '多模态拓展',
      subtitle: 'Multimodal Extension',
      icon: Camera,
      color: 'from-purple-500 to-pink-500',
      description: '通过增加额外参数来处理图像，实现文字、图像双模态理解',
      details: [
        '引入 Adapter 层和图像编码器',
        '在图文数据上进行有监督微调',
        '具备图文问答和生成能力',
        '未来将扩展到更多模态'
      ],
      benefits: ['视觉理解', '多媒体交互', '创意生成'],
    },
    {
      title: '幻觉问题',
      subtitle: 'Hallucination Issues',
      icon: AlertTriangle,
      color: 'from-orange-500 to-red-500',
      description: 'LLM 可能生成虚假、错误信息，这是当前的主要挑战',
      details: [
        '根据 Prompt 杜撰生成虚假信息',
        '在医学、金融等精准领域风险较大',
        '可通过 Prompt 限制和 RAG 等方法减弱',
        '目前无法彻底根除，需要持续研究'
      ],
      benefits: ['认识局限', '谨慎应用', '持续改进'],
      isChallenge: true,
    },
  ];

  const currentFeature = features[activeFeature];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              LLM 特点分析
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            深入了解大语言模型的独特特点，包括优势能力和面临的挑战
          </p>
        </motion.div>

        {/* Feature Selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.button
                key={feature.title}
                onClick={() => setActiveFeature(index)}
                className={`p-6 rounded-2xl text-left transition-all duration-300 ${
                  activeFeature === index
                    ? 'bg-white shadow-xl scale-105'
                    : 'bg-white/50 hover:bg-white/80 shadow-lg'
                }`}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {feature.subtitle}
                </p>
                {feature.isChallenge && (
                  <div className="mt-2 text-xs text-orange-600 font-medium">
                    需要关注的挑战
                  </div>
                )}
                {activeFeature === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 flex items-center text-blue-600 text-sm font-medium"
                  >
                    查看详情
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Feature Detail */}
        <motion.div
          key={activeFeature}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
        >
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${currentFeature.color} flex items-center justify-center mr-4`}>
                  <currentFeature.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    {currentFeature.title}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {currentFeature.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {currentFeature.description}
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  详细特点
                </h3>
                {currentFeature.details.map((detail, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentFeature.color} mt-2 flex-shrink-0`} />
                    <span className="text-gray-700 leading-relaxed">
                      {detail}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Benefits/Applications */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                {currentFeature.isChallenge ? '应对措施' : '应用场景'}
              </h3>
              <div className="space-y-4">
                {currentFeature.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`p-4 rounded-xl ${
                      currentFeature.isChallenge 
                        ? 'bg-orange-50 border border-orange-200' 
                        : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <span className={`font-medium ${
                      currentFeature.isChallenge ? 'text-orange-800' : 'text-gray-800'
                    }`}>
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
              
              {currentFeature.isChallenge && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl"
                >
                  <div className="flex items-center space-x-2 text-yellow-800">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-medium">注意事项</span>
                  </div>
                  <p className="text-sm text-yellow-700 mt-2">
                    在关键应用中使用 LLM 时，需要特别注意幻觉问题，
                    建议结合人工审核和事实验证机制。
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesPage;
