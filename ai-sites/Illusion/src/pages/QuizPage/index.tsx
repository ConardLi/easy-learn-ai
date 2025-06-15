/**
 * 知识测试页面
 * 通过互动问答检验用户对AI幻觉相关知识的掌握程度
 * 包含多种题型和即时反馈机制
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardBody, Button, Progress, Chip } from '@nextui-org/react';
import { 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  Trophy,
  RotateCcw,
  ArrowRight,
  Target,
  Brain,
  Star
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Question {
  id: number;
  type: 'multiple' | 'scenario' | 'judgment';
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

const QuizPage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      type: 'multiple',
      question: 'AI幻觉最主要的成因是什么？',
      options: [
        '计算机硬件性能不足',
        '训练数据中的错误和偏见',
        '用户操作不当',
        '网络连接问题'
      ],
      correct: 1,
      explanation: '训练数据的质量直接影响AI模型的输出质量，数据中的错误、偏见和噪声是产生幻觉的主要原因。',
      difficulty: 'easy',
      category: '基础概念'
    },
    {
      id: 2,
      type: 'scenario',
      question: '当AI声称"瓦坎达位于非洲东部，首都是比拉基亚"时，这属于哪种类型的幻觉？',
      options: [
        '逻辑推理错误',
        '虚构事实生成',
        '时间信息错误',
        '数字计算错误'
      ],
      correct: 1,
      explanation: '这是典型的虚构事实生成，AI将虚构的漫威电影内容当作现实世界的地理信息。',
      difficulty: 'medium',
      category: '案例分析'
    },
    {
      id: 3,
      type: 'judgment',
      question: '以下哪个提示词设计更有助于减少AI幻觉？',
      options: [
        '"告诉我一些有趣的历史故事"',
        '"请列举3个有确切历史记录的古代发明，包括发明时间、地点和发明者"',
        '"历史上有什么神奇的事情吗？"',
        '"给我讲讲古代的奇闻异事"'
      ],
      correct: 1,
      explanation: '具体、明确的提示词要求AI提供可验证的信息，有助于减少虚构内容的产生。',
      difficulty: 'medium',
      category: '防范策略'
    },
    {
      id: 4,
      type: 'multiple',
      question: '当发现AI引用了不存在的论文时，最好的应对方式是什么？',
      options: [
        '直接使用该引用',
        '忽略这个回答',
        '要求AI提供可验证的链接或通过学术数据库核实',
        '相信AI的判断'
      ],
      correct: 2,
      explanation: '对于学术引用，应该要求提供可验证的来源，并通过权威数据库进行交叉验证。',
      difficulty: 'hard',
      category: '验证方法'
    },
    {
      id: 5,
      type: 'scenario',
      question: '在长时间的对话中，AI逐渐偏离了最初的话题并开始提供错误信息。这主要反映了什么问题？',
      options: [
        '模型参数设置错误',
        '上下文管理不当导致的信息累积错误',
        'AI故意误导用户',
        '网络传输错误'
      ],
      correct: 1,
      explanation: '长对话中的上下文混乱是导致错误累积的重要原因，需要适时重置对话或澄清关键信息。',
      difficulty: 'hard',
      category: '高级应用'
    },
    {
      id: 6,
      type: 'judgment',
      question: '以下哪种情况下AI幻觉的风险最高？',
      options: [
        '询问天气预报',
        '请求医疗诊断建议',
        '翻译简单句子',
        '进行数学计算'
      ],
      correct: 1,
      explanation: '医疗诊断涉及专业知识和生命安全，AI幻觉在此领域的风险极高，需要专业医生确认。',
      difficulty: 'easy',
      category: '风险评估'
    },
    {
      id: 7,
      type: 'multiple',
      question: '哪种技术方法最有可能从根本上减少AI幻觉？',
      options: [
        '增加计算资源',
        '引入外部知识库和实时事实核查',
        '缩短回答长度',
        '限制用户提问类型'
      ],
      correct: 1,
      explanation: '引入外部知识库和实时事实核查系统能够为AI提供可靠的信息来源，从技术层面减少幻觉。',
      difficulty: 'hard',
      category: '技术方案'
    },
    {
      id: 8,
      type: 'scenario',
      question: '如果AI在回答时说"根据最新研究..."但没有提供具体来源，你应该怎么办？',
      options: [
        '完全相信这个信息',
        '要求AI提供具体的研究名称、作者和发表时间',
        '忽略这个回答',
        '转而询问其他问题'
      ],
      correct: 1,
      explanation: '当AI声称引用研究时，应该要求提供具体、可验证的信息，包括研究详情和来源。',
      difficulty: 'medium',
      category: '实践技巧'
    },
    {
      id: 9,
      type: 'judgment',
      question: '在以下哪种人机协作模式中，AI幻觉的影响最小？',
      options: [
        'AI完全独立决策',
        'AI提供信息，人类验证和决策',
        '人类完全依赖AI建议',
        'AI直接执行重要操作'
      ],
      correct: 1,
      explanation: '分工合作模式中，AI负责信息收集，人类负责验证和决策，能最大化准确性和安全性。',
      difficulty: 'medium',
      category: '协作模式'
    },
    {
      id: 10,
      type: 'multiple',
      question: '当前大语言模型中，幻觉现象是否可能完全消除？',
      options: [
        '可以，通过技术升级完全消除',
        '不可能，这是统计推断模型的固有特性',
        '只有小模型有幻觉问题',
        '幻觉只在特定任务中出现'
      ],
      correct: 1,
      explanation: '由于AI基于统计推断的本质特性，幻觉无法完全消除，但可以通过各种技术手段显著减少。',
      difficulty: 'hard',
      category: '深度理解'
    }
  ];

  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isTimerActive) {
      handleTimeUp();
    }
  }, [timeLeft, isTimerActive]);

  const handleTimeUp = () => {
    setIsTimerActive(false);
    if (selectedAnswer === null) {
      toast.error('时间到！自动提交空答案');
      handleAnswer(-1); // -1 表示超时
    }
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setIsTimerActive(false);
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
      toast.success('回答正确！');
    } else if (answerIndex === -1) {
      toast.error('超时未答！');
    } else {
      toast.error('回答错误！');
    }

    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
      setIsTimerActive(true);
    } else {
      setQuizCompleted(true);
      setIsTimerActive(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setQuizCompleted(false);
    setTimeLeft(30);
    setIsTimerActive(true);
  };

  const startQuiz = () => {
    setIsTimerActive(true);
  };

  const getScoreLevel = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return { level: '优秀', color: 'success', icon: Trophy };
    if (percentage >= 80) return { level: '良好', color: 'primary', icon: Star };
    if (percentage >= 60) return { level: '及格', color: 'warning', icon: Target };
    return { level: '需要提高', color: 'danger', icon: Brain };
  };

  if (quizCompleted) {
    const { level, color, icon: LevelIcon } = getScoreLevel();
    
    return (
      <div className="min-h-screen pt-8 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Card className="bg-white/80 backdrop-blur-sm shadow-2xl">
              <CardBody className="p-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="mb-6"
                >
                  <LevelIcon className="w-24 h-24 mx-auto text-yellow-500" />
                </motion.div>
                
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  测试完成！
                </h1>
                
                <div className="text-6xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                    {score}/{questions.length}
                  </span>
                </div>
                
                <Chip size="lg" className={`bg-${color}-500 text-white mb-6`}>
                  {level}
                </Chip>
                
                <p className="text-lg text-gray-600 mb-8">
                  您的正确率：{Math.round((score / questions.length) * 100)}%
                </p>

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {[
                    { label: '总题目', value: questions.length },
                    { label: '正确答案', value: score },
                    { label: '错误答案', value: questions.length - score }
                  ].map((stat, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                    onPress={resetQuiz}
                    startContent={<RotateCcw className="w-5 h-5" />}
                  >
                    重新测试
                  </Button>
                  <Button
                    size="lg"
                    variant="bordered"
                    className="border-purple-500 text-purple-600"
                    onPress={() => window.location.href = '#/'}
                  >
                    返回首页
                  </Button>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen pt-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <HelpCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI幻觉知识测试
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            通过这个测试检验您对AI幻觉的理解程度，巩固所学知识
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              题目 {currentQuestion + 1} / {questions.length}
            </span>
            <span className="text-sm text-gray-600">
              得分: {score}
            </span>
          </div>
          <Progress value={progress} className="mb-4" />
          
          {!showResult && isTimerActive && (
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm text-gray-600">剩余时间:</span>
              <span className={`text-lg font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-blue-500'}`}>
                {timeLeft}s
              </span>
            </div>
          )}
        </motion.div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl mb-8">
            <CardBody className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-4">
                    <Chip size="sm" className="bg-blue-100 text-blue-600">
                      {question.category}
                    </Chip>
                    <Chip 
                      size="sm" 
                      className={
                        question.difficulty === 'easy' ? 'bg-green-100 text-green-600' :
                        question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }
                    >
                      {question.difficulty === 'easy' ? '简单' : 
                       question.difficulty === 'medium' ? '中等' : '困难'}
                    </Chip>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">
                    {question.question}
                  </h2>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {question.options.map((option, index) => (
                  <motion.div
                    key={index}
                    whileHover={!showResult ? { scale: 1.01 } : {}}
                    whileTap={!showResult ? { scale: 0.99 } : {}}
                  >
                    <Button
                      variant={selectedAnswer === index ? "solid" : "bordered"}
                      className={`w-full p-4 h-auto text-left justify-start ${
                        showResult
                          ? index === question.correct
                            ? 'bg-green-500 text-white border-green-500'
                            : selectedAnswer === index
                              ? 'bg-red-500 text-white border-red-500'
                              : 'border-gray-200'
                          : selectedAnswer === index
                            ? 'bg-blue-500 text-white'
                            : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onPress={() => !showResult && !isTimerActive ? null : !showResult ? handleAnswer(index) : null}
                      disabled={showResult}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                          showResult && index === question.correct
                            ? 'border-white bg-white text-green-500'
                            : showResult && selectedAnswer === index && index !== question.correct
                              ? 'border-white bg-white text-red-500'
                              : selectedAnswer === index
                                ? 'border-white bg-white text-blue-500'
                                : 'border-gray-400'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="flex-1">{option}</span>
                        {showResult && index === question.correct && (
                          <CheckCircle className="w-5 h-5" />
                        )}
                        {showResult && selectedAnswer === index && index !== question.correct && (
                          <XCircle className="w-5 h-5" />
                        )}
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>

              {!isTimerActive && !showResult && currentQuestion === 0 && (
                <div className="text-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    onPress={startQuiz}
                  >
                    开始答题
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
        </motion.div>

        {/* Result and Explanation */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl mb-8">
                <CardBody className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-full ${
                      selectedAnswer === question.correct ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {selectedAnswer === question.correct ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 text-gray-800">
                        {selectedAnswer === question.correct ? '回答正确！' : '回答错误'}
                      </h3>
                      <p className="text-gray-600 mb-4">{question.explanation}</p>
                      
                      <Button
                        className="bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                        onPress={nextQuestion}
                        endContent={<ArrowRight className="w-4 h-4" />}
                      >
                        {currentQuestion < questions.length - 1 ? '下一题' : '查看结果'}
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizPage;
