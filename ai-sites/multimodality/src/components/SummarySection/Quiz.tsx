/**
 * 学习测验组件
 * 通过互动问答巩固学习成果
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface QuizProps {
  inView: boolean;
}

const Quiz: React.FC<QuizProps> = ({ inView }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: '什么是多模态AI的核心特征？',
      options: [
        '只能处理文本数据',
        '能同时处理多种类型的数据',
        '只能处理图像数据',
        '只能处理音频数据'
      ],
      correct: 1,
      explanation: '多模态AI的核心特征是能够同时理解、处理和融合来自多种不同类型数据的信息。'
    },
    {
      question: 'CLIP模型的主要创新是什么？',
      options: [
        '图像分类准确率提升',
        '文本生成质量改善',
        '图文对比学习',
        '音频处理能力'
      ],
      correct: 2,
      explanation: 'CLIP通过大规模图文对比学习，建立了图像和文本之间的语义关联，实现了跨模态理解。'
    },
    {
      question: '扩散模型在多模态AI中的作用是？',
      options: [
        '文本理解',
        '图像生成',
        '音频识别',
        '视频压缩'
      ],
      correct: 1,
      explanation: '扩散模型通过逐步去噪的方式生成高质量图像，是文生图应用的核心技术。'
    },
    {
      question: '多模态AI的未来发展趋势是？',
      options: [
        '回归单模态处理',
        '更好的跨模态融合和实时交互',
        '只关注图像处理',
        '减少应用场景'
      ],
      correct: 1,
      explanation: '未来多模态AI将朝着更好的跨模态融合、实时交互和个性化定制方向发展。'
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const getScore = () => {
    return selectedAnswers.filter((answer, index) => answer === questions[index].correct).length;
  };

  if (showResults) {
    const score = getScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-4xl font-bold text-white ${
            percentage >= 80 ? 'bg-green-500' : percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
          }`}>
            {percentage}%
          </div>
        </motion.div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">测验完成！</h3>
        <p className="text-lg text-gray-600 mb-6">
          你答对了 {score} / {questions.length} 题
        </p>

        <div className="space-y-4 mb-8">
          {questions.map((question, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg p-4 text-left"
            >
              <div className="flex items-start space-x-3">
                {selectedAnswers[index] === question.correct ? (
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                )}
                <div className="flex-1">
                  <p className="font-medium text-gray-900 mb-2">{question.question}</p>
                  <p className="text-sm text-gray-600">{question.explanation}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={handleRestart}
          className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-5 h-5" />
          <span>重新开始</span>
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
    >
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-900">学习测验</h3>
          <span className="text-sm text-gray-500">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-purple-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.5 }}
      >
        <h4 className="text-xl font-semibold text-gray-900 mb-6">
          {questions[currentQuestion].question}
        </h4>

        <div className="space-y-3 mb-6">
          {questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedAnswers[currentQuestion] === index
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 bg-gray-50 hover:border-gray-300'
              }`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-purple-500 bg-purple-500'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswers[currentQuestion] === index && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span className="text-gray-700">{option}</span>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.button
          onClick={handleNext}
          disabled={selectedAnswers[currentQuestion] === undefined}
          className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
          whileHover={selectedAnswers[currentQuestion] !== undefined ? { scale: 1.05 } : {}}
          whileTap={selectedAnswers[currentQuestion] !== undefined ? { scale: 0.95 } : {}}
        >
          <span>{currentQuestion === questions.length - 1 ? '查看结果' : '下一题'}</span>
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Quiz;
