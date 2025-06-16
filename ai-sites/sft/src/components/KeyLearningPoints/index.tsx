/**
 * 核心学习要点组件
 * 提供SFT的深入学习内容和最佳实践
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  BookMarked,
  Lightbulb,
  Settings,
  BarChart3,
  Users
} from 'lucide-react';

export function KeyLearningPoints() {
  const [activeCategory, setActiveCategory] = useState('principles');

  const categories = [
    {
      id: 'principles',
      name: '核心原理',
      icon: Brain,
      color: 'bg-blue-500'
    },
    {
      id: 'data-quality',
      name: '数据质量',
      icon: Target,
      color: 'bg-green-500'
    },
    {
      id: 'best-practices',
      name: '最佳实践',
      icon: CheckCircle,
      color: 'bg-purple-500'
    },
    {
      id: 'evaluation',
      name: '评估方法',
      icon: BarChart3,
      color: 'bg-orange-500'
    },
    {
      id: 'challenges',
      name: '常见挑战',
      icon: AlertCircle,
      color: 'bg-red-500'
    },
    {
      id: 'applications',
      name: '实际应用',
      icon: Users,
      color: 'bg-indigo-500'
    }
  ];

  const learningContent = {
    principles: {
      title: 'SFT 核心原理深度解析',
      points: [
        {
          title: '从CLM到指令理解的转换',
          description: 'SFT本质上仍是CLM任务，但通过特定格式让模型学会指令理解',
          details: [
            '预训练阶段：模型学会预测下一个token，具备语言理解基础',
            'SFT阶段：通过instruction+input+output格式，引导模型理解任务意图',
            'Loss计算：只对output部分计算损失，input部分用于上下文理解'
          ]
        },
        {
          title: '多轮对话的技术实现',
          description: '通过巧妙的数据构造让模型具备上下文记忆能力',
          details: [
            '数据格式：<prompt1><completion1><prompt2><completion2>...',
            'Mask策略：只对assistant回复部分计算loss，保留对话历史',
            '注意力机制：单向注意力确保不会泄露未来信息'
          ]
        },
        {
          title: 'SFT vs 传统微调的区别',
          description: '从任务特定微调到通用指令遵循能力的转变',
          details: [
            '传统微调：每个任务单独训练，如BERT分类、NER等',
            'SFT：训练通用指令遵循能力，一个模型处理多种任务',
            '泛化能力：SFT模型能处理训练时未见过的新指令类型'
          ]
        }
      ]
    },
    'data-quality': {
      title: '数据质量与配比策略',
      points: [
        {
          title: '高质量数据的特征',
          description: '决定SFT效果的关键因素',
          details: [
            '指令清晰明确：避免歧义，确保任务目标清楚',
            '回复质量高：准确、有用、符合人类偏好',
            '格式规范：统一的数据格式和特殊token使用',
            '多样性丰富：覆盖不同领域、难度、风格的任务'
          ]
        },
        {
          title: '数据规模与效果关系',
          description: '找到数据量与性能的平衡点',
          details: [
            '单任务：500-1000样本可获得不错效果',
            '通用能力：需要数B token规模的多任务数据',
            '边际效应：数据量达到一定规模后收益递减',
            '质量优于数量：高质量小数据集 > 低质量大数据集'
          ]
        },
        {
          title: '任务配比策略',
          description: '不同类型任务的合理搭配',
          details: [
            '核心任务优先：文本生成、问答等占主要比例',
            '长尾任务覆盖：确保模型在边缘场景的表现',
            '动态调整：根据评估结果调整不同任务的权重',
            '领域平衡：避免某个领域数据过度集中'
          ]
        }
      ]
    },
    'best-practices': {
      title: 'SFT 最佳实践指南',
      points: [
        {
          title: '训练策略优化',
          description: '提升SFT效果的关键技巧',
          details: [
            '学习率调整：通常比预训练更小的学习率（1e-5到5e-5）',
            '训练轮次：避免过拟合，通常1-3个epoch',
            '梯度裁剪：防止训练不稳定，限制梯度范数',
            '权重衰减：适当的正则化防止过拟合'
          ]
        },
        {
          title: '数据构造技巧',
          description: '如何构造高效的训练数据',
          details: [
            'Prompt工程：使用清晰的指令模板',
            '负样本构造：包含一些错误示例帮助模型学习边界',
            '难度递进：从简单到复杂的训练样本排列',
            '格式统一：保持一致的输入输出格式'
          ]
        },
        {
          title: '模型评估与迭代',
          description: '持续改进模型性能的方法',
          details: [
            '多维度评估：准确性、有用性、安全性综合考虑',
            '人工评估：结合自动指标和人工标注',
            'A/B测试：在真实场景中对比不同版本效果',
            '持续迭代：根据用户反馈不断优化'
          ]
        }
      ]
    },
    evaluation: {
      title: 'SFT 评估方法与指标',
      points: [
        {
          title: '自动化评估指标',
          description: '客观量化模型性能的方法',
          details: [
            'BLEU/ROUGE：评估生成文本与参考答案的相似度',
            'Perplexity：衡量模型对测试数据的预测能力',
            '任务特定指标：准确率、F1分数等',
            'BERTScore：基于语义的文本质量评估'
          ]
        },
        {
          title: '人工评估维度',
          description: '从用户体验角度评估模型',
          details: [
            '有用性：回答是否解决了用户问题',
            '准确性：信息是否正确无误',
            '相关性：回复是否切题',
            '流畅性：语言表达是否自然',
            '安全性：是否包含有害内容'
          ]
        },
        {
          title: '综合评估框架',
          description: '全面评估SFT模型的方法论',
          details: [
            'Benchmark测试：在标准数据集上的表现',
            '用户研究：真实用户的使用体验评估',
            '对抗测试：在边缘case和攻击样本上的鲁棒性',
            '长期跟踪：模型在线部署后的性能监控'
          ]
        }
      ]
    },
    challenges: {
      title: '常见挑战与解决方案',
      points: [
        {
          title: '数据获取难题',
          description: '高质量指令数据的稀缺性',
          details: [
            '成本高昂：人工标注数据成本极高',
            '质量控制：确保标注质量的一致性困难',
            '解决方案：使用GPT-4等强模型生成合成数据',
            '数据增强：通过改写、翻译等方式扩充数据'
          ]
        },
        {
          title: '过拟合问题',
          description: '在有限数据上的泛化挑战',
          details: [
            '表现：在训练集表现好，测试集差',
            '原因：SFT数据通常规模较小',
            '解决：提前停止、正则化、数据增强',
            '验证：使用保留集验证泛化能力'
          ]
        },
        {
          title: '指令遵循的一致性',
          description: '确保模型始终按指令执行',
          details: [
            '挑战：模型有时会忽略指令或曲解意图',
            '原因：指令表达不够清晰或训练数据不平衡',
            '改进：强化指令格式、增加负样本训练',
            '测试：构造对抗性指令进行鲁棒性测试'
          ]
        }
      ]
    },
    applications: {
      title: '实际应用案例分析',
      points: [
        {
          title: 'ChatGPT 的成功要素',
          description: 'SFT在大规模商业应用中的典型案例',
          details: [
            '数据来源：基于用户API使用的真实对话数据',
            '标注质量：高质量的人工标注和反馈',
            '持续迭代：基于用户反馈不断改进',
            '多轮优化：SFT + RLHF 的组合策略'
          ]
        },
        {
          title: '垂直领域应用',
          description: '专业领域的SFT应用实践',
          details: [
            '医疗：基于医学文献和诊疗指南的问答系统',
            '法律：合同审查、法条解释等法律AI助手',
            '教育：个性化辅导、作业批改等教学工具',
            '编程：代码生成、调试、解释等开发助手'
          ]
        },
        {
          title: '企业级部署经验',
          description: 'SFT模型在企业环境中的实施',
          details: [
            '数据安全：保护企业敏感数据的训练方法',
            '性能优化：针对特定业务场景的模型优化',
            '集成部署：与现有系统的集成和API设计',
            '效果监控：线上模型效果的持续监控和优化'
          ]
        }
      ]
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            SFT 深度学习要点
          </h2>
          <p className="text-xl text-gray-600">
            掌握有监督微调的核心知识与实践技巧
          </p>
        </motion.div>

        {/* 分类导航 */}
        <div className="flex flex-wrap justify-center mb-12 gap-3">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? `${category.color} text-white shadow-lg`
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <category.icon className="w-4 h-4" />
              <span className="font-medium text-sm">{category.name}</span>
            </motion.button>
          ))}
        </div>

        {/* 内容展示区域 */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              {learningContent[activeCategory].title}
            </h3>
            
            <div className="space-y-8">
              {learningContent[activeCategory].points.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-l-4 border-blue-500 pl-6 hover:bg-gray-50 p-4 rounded-r-lg transition-colors"
                >
                  <h4 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                    <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
                    {point.title}
                  </h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {point.description}
                  </p>
                  <div className="space-y-2">
                    {point.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700 leading-relaxed">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 学习提示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6"
        >
          <div className="flex items-start space-x-3">
            <BookMarked className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                学习建议
              </h4>
              <p className="text-gray-600 leading-relaxed">
                建议按照"核心原理 → 数据质量 → 最佳实践 → 评估方法 → 常见挑战 → 实际应用"的顺序学习，
                每个部分都包含理论知识和实践经验。结合具体项目实践，可以更好地理解和掌握SFT技术。
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
