/**
 * 首页特性卡片组件
 * 展示网站的主要学习模块和特色功能
 * 包含动画效果和跳转链接
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardBody, Button } from '@nextui-org/react';
import { 
  FileText, 
  Search, 
  Shield, 
  HelpCircle,
  ArrowRight,
  PlayCircle,
  BarChart,
  Lightbulb,
  Target
} from 'lucide-react';

const FeatureCards: React.FC = () => {
  const features = [
    {
      title: "互动案例体验",
      description: "通过真实的AI对话案例，让你亲身体验各种幻觉现象",
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
      link: "/cases",
      highlights: ["真实对话", "互动体验", "即时反馈"]
    },
    {
      title: "深度成因分析",
      description: "用动态图表深入剖析AI幻觉产生的根本原因",
      icon: Search,
      color: "from-purple-500 to-pink-500",
      link: "/causes",
      highlights: ["可视化图表", "数据分析", "机制解读"]
    },
    {
      title: "实用解决策略",
      description: "学习经过验证的防范技巧和最佳实践方法",
      icon: Shield,
      color: "from-green-500 to-emerald-500",
      link: "/solutions",
      highlights: ["实用技巧", "案例对比", "实践指南"]
    },
    {
      title: "知识巩固测试",
      description: "通过趣味问答检验你的学习成果和理解程度",
      icon: HelpCircle,
      color: "from-orange-500 to-red-500",
      link: "/quiz",
      highlights: ["互动问答", "即时评分", "知识检验"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent to-white/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            全方位学习体验
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            通过四个精心设计的模块，从理论到实践全面掌握AI幻觉相关知识
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm shadow-xl border-0 overflow-hidden">
                  <CardBody className="p-0">
                    {/* Header with gradient */}
                    <div className={`bg-gradient-to-r ${feature.color} p-6 text-white`}>
                      <div className="flex items-center space-x-4">
                        <div className="bg-white/20 p-3 rounded-full">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{feature.title}</h3>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {feature.description}
                      </p>

                      {/* Highlights */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-800 mb-3">核心特色：</h4>
                        <div className="flex flex-wrap gap-2">
                          {feature.highlights.map((highlight, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Link to={feature.link} className="block">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            className={`w-full bg-gradient-to-r ${feature.color} text-white shadow-lg`}
                            endContent={<ArrowRight className="w-4 h-4" />}
                          >
                            开始学习
                          </Button>
                        </motion.div>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: PlayCircle, value: "20+", label: "互动案例" },
            { icon: BarChart, value: "5", label: "可视化图表" },
            { icon: Lightbulb, value: "15+", label: "实用技巧" },
            { icon: Target, value: "30+", label: "测试题目" }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20"
              >
                <Icon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureCards;
