/**
 * 传统AI与Agent对比演示组件
 * 通过动画展示两者在处理任务时的不同流程和特点
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardBody, Button } from '@nextui-org/react';
import { MessageSquare, Cog, Search, FileText, CheckCircle, RotateCcw } from 'lucide-react';

export default function Comparison() {
  const [activeDemo, setActiveDemo] = useState<'traditional' | 'agent'>('traditional');
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const traditionalSteps = [
    { icon: <MessageSquare size={24} />, text: "接收用户提示", color: "text-blue-500" },
    { icon: <Cog size={24} />, text: "一次性生成结果", color: "text-green-500" },
    { icon: <CheckCircle size={24} />, text: "输出完成", color: "text-purple-500" }
  ];

  const agentSteps = [
    { icon: <MessageSquare size={24} />, text: "接收任务", color: "text-blue-500" },
    { icon: <FileText size={24} />, text: "规划：制定大纲", color: "text-orange-500" },
    { icon: <Search size={24} />, text: "行动：联网搜索资料", color: "text-green-500" },
    { icon: <FileText size={24} />, text: "执行：撰写初稿", color: "text-purple-500" },
    { icon: <RotateCcw size={24} />, text: "反思：自我检查修改", color: "text-red-500" },
    { icon: <CheckCircle size={24} />, text: "优化：反复完善", color: "text-teal-500" }
  ];

  const currentSteps = activeDemo === 'traditional' ? traditionalSteps : agentSteps;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setStep(prev => {
          if (prev >= currentSteps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentSteps.length]);

  const startDemo = (type: 'traditional' | 'agent') => {
    setActiveDemo(type);
    setStep(0);
    setIsPlaying(true);
  };

  const resetDemo = () => {
    setStep(0);
    setIsPlaying(false);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            传统AI vs Agent
          </h2>
          <p className="text-xl text-gray-600">
            看看它们处理"写一篇文章"任务的不同方式
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* 传统AI演示 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className={`h-full transition-all duration-300 ${
              activeDemo === 'traditional' ? 'ring-2 ring-blue-500 shadow-lg' : 'shadow-md'
            }`}>
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <div className="w-full">
                  <h3 className="text-2xl font-bold">传统AI</h3>
                  <p className="text-blue-100">直接输出模式</p>
                </div>
              </CardHeader>
              <CardBody className="p-6">
                <div className="space-y-4 mb-6">
                  {traditionalSteps.map((stepItem, index) => (
                    <motion.div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                        activeDemo === 'traditional' && step >= index
                          ? 'bg-blue-50 border-l-4 border-blue-500'
                          : 'bg-gray-50'
                      }`}
                      initial={{ opacity: 0.5 }}
                      animate={{ 
                        opacity: activeDemo === 'traditional' && step >= index ? 1 : 0.5,
                        scale: activeDemo === 'traditional' && step === index ? 1.05 : 1
                      }}
                    >
                      <div className={stepItem.color}>
                        {stepItem.icon}
                      </div>
                      <span className="font-medium">{stepItem.text}</span>
                    </motion.div>
                  ))}
                </div>
                <Button
                  color="primary"
                  variant="solid"
                  onPress={() => startDemo('traditional')}
                  isDisabled={isPlaying}
                  className="w-full"
                >
                  演示传统AI流程
                </Button>
              </CardBody>
            </Card>
          </motion.div>

          {/* Agent演示 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className={`h-full transition-all duration-300 ${
              activeDemo === 'agent' ? 'ring-2 ring-purple-500 shadow-lg' : 'shadow-md'
            }`}>
              <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <div className="w-full">
                  <h3 className="text-2xl font-bold">AI Agent</h3>
                  <p className="text-purple-100">规划-执行-反思</p>
                </div>
              </CardHeader>
              <CardBody className="p-6">
                <div className="space-y-4 mb-6">
                  {agentSteps.map((stepItem, index) => (
                    <motion.div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                        activeDemo === 'agent' && step >= index
                          ? 'bg-purple-50 border-l-4 border-purple-500'
                          : 'bg-gray-50'
                      }`}
                      initial={{ opacity: 0.5 }}
                      animate={{ 
                        opacity: activeDemo === 'agent' && step >= index ? 1 : 0.5,
                        scale: activeDemo === 'agent' && step === index ? 1.05 : 1
                      }}
                    >
                      <div className={stepItem.color}>
                        {stepItem.icon}
                      </div>
                      <span className="font-medium">{stepItem.text}</span>
                    </motion.div>
                  ))}
                </div>
                <Button
                  color="secondary"
                  variant="solid"
                  onPress={() => startDemo('agent')}
                  isDisabled={isPlaying}
                  className="w-full"
                >
                  演示Agent流程
                </Button>
              </CardBody>
            </Card>
          </motion.div>
        </div>

        <div className="text-center">
          <Button
            variant="light"
            onPress={resetDemo}
            className="text-gray-600"
          >
            重置演示
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 bg-white rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">
            关键区别
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-blue-600 mb-2">传统AI</h4>
              <p className="text-gray-600">
                像"一次性写手"，接收提示后直接生成最终结果，
                过程中无法调整思路或获取外部信息
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-semibold text-purple-600 mb-2">AI Agent</h4>
              <p className="text-gray-600">
                具备人类思维模式，能够规划任务、调用工具、
                自我反思，通过闭环循环不断优化结果
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
