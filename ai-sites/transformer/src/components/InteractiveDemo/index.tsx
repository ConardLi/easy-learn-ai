/**
 * 交互式演示组件
 * 提供可视化的 Transformer 工作过程演示
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardBody, Button, Input, Textarea } from '@nextui-org/react';
import { 
  Play, 
  RotateCcw, 
  Brain,
  Target,
  Zap,
  ArrowRight,
  Eye,
  Lightbulb
} from 'lucide-react';
import { Link } from 'react-router-dom';

const InteractiveDemo: React.FC = () => {
  const [inputText, setInputText] = useState('今天天气');
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDemo, setSelectedDemo] = useState(0);

  const demos = [
    {
      title: '文本预测演示',
      description: '体验 Transformer 如何预测下一个词',
      icon: Target,
      color: 'from-blue-500 to-purple-600'
    },
    {
      title: '注意力可视化',
      description: '观察词语之间的注意力权重',
      icon: Eye,
      color: 'from-green-500 to-teal-600'
    },
    {
      title: '概念理解测试',
      description: '测试你对 Transformer 的理解',
      icon: Lightbulb,
      color: 'from-orange-500 to-red-600'
    }
  ];

  const predictionSteps = [
    '分析输入文本',
    '计算词语关联',
    '生成概率分布',
    '选择最佳预测'
  ];

  const mockPredictions = [
    { word: '晴朗', probability: 0.45 },
    { word: '寒冷', probability: 0.28 },
    { word: '不错', probability: 0.15 },
    { word: '炎热', probability: 0.08 },
    { word: '潮湿', probability: 0.04 }
  ];

  const attentionData = [
    { source: '今天', target: '天气', weight: 0.8 },
    { source: '今天', target: '今天', weight: 0.2 },
    { source: '天气', target: '今天', weight: 0.6 },
    { source: '天气', target: '天气', weight: 0.4 }
  ];

  const quizQuestions = [
    {
      question: 'Transformer 的核心创新是什么？',
      options: ['循环神经网络', '注意力机制', '卷积神经网络', '感知机'],
      correct: 1
    },
    {
      question: 'Transformer 相比 RNN 的主要优势是？',
      options: ['计算量小', '参数少', '可并行处理', '结构简单'],
      correct: 2
    },
    {
      question: 'Softmax 函数的作用是？',
      options: ['激活函数', '损失函数', '概率归一化', '特征提取'],
      correct: 2
    }
  ];

  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [showResult, setShowResult] = useState(false);

  const runPredictionDemo = async () => {
    setIsAnimating(true);
    setCurrentStep(0);

    for (let i = 0; i < predictionSteps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    setIsAnimating(false);
  };

  const resetDemo = () => {
    setIsAnimating(false);
    setCurrentStep(0);
    setSelectedAnswer(-1);
    setShowResult(false);
  };

  const checkAnswer = () => {
    setShowResult(true);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          交互式演示
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          通过实际操作深入理解 Transformer 的工作原理
        </p>
      </motion.div>

      {/* Demo Selection */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          选择演示类型
        </h2>
        
        <div className="grid gap-6 md:grid-cols-3">
          {demos.map((demo, index) => {
            const Icon = demo.icon;
            return (
              <motion.div
                key={demo.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card 
                  className={`h-full shadow-lg hover:shadow-xl transition-all border-2 cursor-pointer ${
                    selectedDemo === index ? 'border-purple-400' : 'border-transparent'
                  }`}
                  isPressable
                  onPress={() => setSelectedDemo(index)}
                >
                  <CardBody className="p-6 text-center space-y-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${demo.color} rounded-2xl flex items-center justify-center mx-auto`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {demo.title}
                    </h3>
                    <p className="text-gray-600">
                      {demo.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Demo Content */}
      <AnimatePresence mode="wait">
        {selectedDemo === 0 && (
          <motion.section
            key="prediction"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Card className="shadow-lg border-0">
              <CardBody className="p-8 space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 text-center">
                  文本预测演示
                </h3>
                
                <div className="space-y-4">
                  <Input
                    label="输入文本"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="请输入要预测的文本..."
                    disabled={isAnimating}
                  />
                  
                  <div className="flex justify-center space-x-4">
                    <Button
                      color="primary"
                      startContent={<Play className="w-4 h-4" />}
                      onPress={runPredictionDemo}
                      isDisabled={isAnimating || !inputText.trim()}
                      className="bg-gradient-to-r from-blue-500 to-purple-600"
                    >
                      开始预测
                    </Button>
                    <Button
                      variant="bordered"
                      startContent={<RotateCcw className="w-4 h-4" />}
                      onPress={resetDemo}
                    >
                      重置
                    </Button>
                  </div>
                </div>

                {isAnimating && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="text-center">
                      <div className="text-lg font-medium text-gray-700 mb-2">
                        当前步骤：{predictionSteps[currentStep]}
                      </div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full mx-auto"
                      />
                    </div>
                  </motion.div>
                )}

                {!isAnimating && currentStep > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="text-lg font-semibold text-gray-800">
                      预测结果：
                    </h4>
                    <div className="space-y-2">
                      {mockPredictions.map((pred, index) => (
                        <motion.div
                          key={pred.word}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                        >
                          <span className="font-medium text-gray-800 w-16">
                            {pred.word}
                          </span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <motion.div
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${pred.probability * 100}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-12">
                            {(pred.probability * 100).toFixed(0)}%
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </CardBody>
            </Card>
          </motion.section>
        )}

        {selectedDemo === 1 && (
          <motion.section
            key="attention"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Card className="shadow-lg border-0">
              <CardBody className="p-8 space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 text-center">
                  注意力权重可视化
                </h3>
                
                <div className="text-center">
                  <p className="text-gray-600 mb-6">
                    下图显示句子"今天天气"中词语之间的注意力权重
                  </p>
                  
                  <div className="max-w-md mx-auto">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div></div>
                      <div className="font-medium text-gray-700">今天</div>
                      <div className="font-medium text-gray-700">天气</div>
                      
                      <div className="font-medium text-gray-700">今天</div>
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-200 to-blue-400 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-800">0.2</span>
                      </div>
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-white">0.8</span>
                      </div>
                      
                      <div className="font-medium text-gray-700">天气</div>
                      <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-white">0.6</span>
                      </div>
                      <div className="w-16 h-16 bg-gradient-to-r from-green-200 to-green-400 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-green-800">0.4</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 space-y-2">
                      <p>• 颜色越深，注意力权重越高</p>
                      <p>• "今天"对"天气"的注意力为 0.8</p>
                      <p>• "天气"对"今天"的注意力为 0.6</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.section>
        )}

        {selectedDemo === 2 && (
          <motion.section
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Card className="shadow-lg border-0">
              <CardBody className="p-8 space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 text-center">
                  概念理解测试
                </h3>
                
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="text-center">
                    <span className="text-sm text-gray-500">
                      问题 {currentQuiz + 1} / {quizQuestions.length}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-gray-800">
                      {quizQuestions[currentQuiz].question}
                    </h4>
                    
                    <div className="space-y-2">
                      {quizQuestions[currentQuiz].options.map((option, index) => (
                        <Button
                          key={index}
                          variant={selectedAnswer === index ? "solid" : "bordered"}
                          color={
                            showResult
                              ? index === quizQuestions[currentQuiz].correct
                                ? "success"
                                : selectedAnswer === index
                                ? "danger"
                                : "default"
                              : selectedAnswer === index
                              ? "primary"
                              : "default"
                          }
                          className="w-full justify-start"
                          onPress={() => !showResult && setSelectedAnswer(index)}
                          disabled={showResult}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="flex justify-center space-x-4">
                      {!showResult && selectedAnswer !== -1 && (
                        <Button
                          color="primary"
                          onPress={checkAnswer}
                        >
                          提交答案
                        </Button>
                      )}
                      
                      {showResult && currentQuiz < quizQuestions.length - 1 && (
                        <Button
                          color="secondary"
                          onPress={() => {
                            setCurrentQuiz(currentQuiz + 1);
                            setSelectedAnswer(-1);
                            setShowResult(false);
                          }}
                        >
                          下一题
                        </Button>
                      )}
                      
                      <Button
                        variant="bordered"
                        onPress={() => {
                          setCurrentQuiz(0);
                          setSelectedAnswer(-1);
                          setShowResult(false);
                        }}
                      >
                        重新开始
                      </Button>
                    </div>
                    
                    {showResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-lg text-center ${
                          selectedAnswer === quizQuestions[currentQuiz].correct
                            ? 'bg-green-50 text-green-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {selectedAnswer === quizQuestions[currentQuiz].correct
                          ? '✅ 回答正确！'
                          : `❌ 回答错误。正确答案是：${quizQuestions[currentQuiz].options[quizQuestions[currentQuiz].correct]}`
                        }
                      </motion.div>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Back to Home */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center"
      >
        <Link to="/">
          <Button
            size="lg"
            color="primary"
            endContent={<ArrowRight className="w-5 h-5" />}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          >
            返回首页
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default InteractiveDemo;
