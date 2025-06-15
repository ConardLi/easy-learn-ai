/**
 * 首页组件
 * 展示大模型幻觉的基本概念介绍
 * 包含动画效果和交互式演示
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardBody, Button } from '@nextui-org/react';
import { 
  ArrowRight, 
  Brain, 
  Zap, 
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import AnimatedConcept from './AnimatedConcept';
import FeatureCards from './FeatureCards';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-16 pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6"
            >
              <Brain className="w-20 h-20 text-purple-600 mx-auto" />
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              探索大模型幻觉
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              了解AI生成内容时产生的"幻觉"现象，掌握识别与防范策略，
              <br />成为AI时代的智慧用户
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/cases">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  endContent={<ArrowRight className="w-5 h-5" />}
                >
                  开始学习之旅
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Animated Concept Demo */}
          <AnimatedConcept />
        </div>
      </section>

      {/* What is AI Hallucination */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              什么是AI幻觉？
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              AI幻觉是指大语言模型生成与事实不符、缺乏数据支撑的内容
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                <CardBody className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-red-100 p-3 rounded-full">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        幻觉的表现形式
                      </h3>
                      <p className="text-gray-600">
                        AI可能会生成看似合理但实际错误的信息
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-gray-700">虚构事实和数据</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-gray-700">编造不存在的引用</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-gray-700">逻辑推理错误</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-gray-700">过度自信的错误回答</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                <CardBody className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Lightbulb className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        为什么会产生幻觉？
                      </h3>
                      <p className="text-gray-600">
                        理解根本原因有助于更好地应对
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-700">训练数据中的错误信息</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-700">模型的统计推断本质</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-700">缺乏现实世界验证</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-700">模糊或误导性的提示</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <FeatureCards />

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-r from-purple-500 to-blue-500 shadow-2xl border-0">
              <CardBody className="p-12">
                <h2 className="text-3xl font-bold text-white mb-4">
                  准备好深入了解AI幻觉了吗？
                </h2>
                <p className="text-purple-100 text-lg mb-8">
                  通过我们的互动课程，掌握识别和防范AI幻觉的实用技能
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/cases">
                    <Button 
                      size="lg" 
                      className="bg-white text-purple-600 hover:bg-gray-50"
                      endContent={<Zap className="w-5 h-5" />}
                    >
                      体验真实案例
                    </Button>
                  </Link>
                  <Link to="/causes">
                    <Button 
                      size="lg" 
                      variant="bordered" 
                      className="border-white text-white hover:bg-white/10"
                      endContent={<ArrowRight className="w-5 h-5" />}
                    >
                      深入成因分析
                    </Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
