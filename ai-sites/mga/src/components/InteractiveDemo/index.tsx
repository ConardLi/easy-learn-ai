/**
 * 交互式演示组件
 * 提供MGA方法的实时演示和用户交互体验
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Users, ArrowRight, RotateCcw, Sparkles, Eye, Play } from 'lucide-react';

const InteractiveDemo: React.FC = () => {
  const [selectedText, setSelectedText] = useState('');
  const [generatedPairs, setGeneratedPairs] = useState<Array<{genre: string, audience: string}>>([]);
  const [reformulatedTexts, setReformulatedTexts] = useState<Array<{genre: string, audience: string, text: string}>>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const sampleTexts = [
    {
      title: '气候变化科普文章',
      content: '气候变化是指地球气候系统长期的变化趋势。主要原因包括温室气体排放增加，导致全球平均气温上升。这会引起极地冰川融化、海平面上升、极端天气频发等现象。科学家们通过各种观测数据和气候模型来研究这一现象，并提出相应的应对策略。'
    },
    {
      title: '机器学习基础介绍',
      content: '机器学习是人工智能的一个分支，它使计算机能够在没有明确编程的情况下学习和改进。主要类型包括监督学习、无监督学习和强化学习。算法通过分析大量数据来识别模式，然后使用这些模式对新数据进行预测或决策。'
    },
    {
      title: '健康饮食指南',
      content: '均衡饮食是维持身体健康的关键。建议每天摄入多种蔬菜和水果，选择全谷物食品，适量摄入蛋白质。同时要控制糖分和饱和脂肪的摄入，保持充足的水分补充。规律的用餐时间和适量的运动也有助于维持健康的生活方式。'
    }
  ];

  const genreAudiencePairs = [
    { genre: '学术论文', audience: '气候科学研究者' },
    { genre: '儿童故事', audience: '6-10岁小学生' },
    { genre: '新闻报道', audience: '普通公众' },
    { genre: '政策文件', audience: '政府决策者' },
    { genre: '教学材料', audience: '高中生' }
  ];

  const reformulationExamples: Record<string, string> = {
    '学术论文-气候科学研究者': '本研究基于IPCC第六次评估报告的数据分析，全球平均气温自1850年以来已上升约1.1°C。温室气体浓度的增加与人类活动密切相关，其中CO2浓度已达到415ppm的历史新高...',
    '儿童故事-6-10岁小学生': '从前，地球妈妈身上有一件漂亮的大气层外衣。可是最近，小朋友们发现地球妈妈越来越热了。原来是因为工厂和汽车排出的烟雾让外衣变厚了，热量散不出去...',
    '新闻报道-普通公众': '据最新科学报告显示，全球气温持续上升趋势明显。专家表示，这一现象与工业活动排放的温室气体密切相关。气候变化已经开始影响我们的日常生活，包括更频繁的极端天气事件...',
    '政策文件-政府决策者': '根据《巴黎协定》目标，各国需制定具体的碳减排计划。建议采取以下措施：1）推进清洁能源转型；2）加强森林保护和植树造林；3）实施碳定价机制；4）促进国际合作...',
    '教学材料-高中生': '气候变化知识要点：\n1. 温室效应原理：太阳辐射→地表吸收→红外辐射→温室气体吸收\n2. 主要温室气体：CO2、CH4、N2O等\n3. 观测证据：气温记录、冰川变化、海平面数据\n4. 影响评估：生态系统、农业、人类社会'
  };

  const handleTextSelect = (text: any) => {
    setSelectedText(text.content);
    setCurrentStep(1);
    setGeneratedPairs([]);
    setReformulatedTexts([]);
  };

  const generatePairs = () => {
    setIsGenerating(true);
    setCurrentStep(2);
    
    // 模拟生成过程
    setTimeout(() => {
      setGeneratedPairs(genreAudiencePairs);
      setIsGenerating(false);
      setCurrentStep(3);
    }, 2000);
  };

  const reformulateText = () => {
    setIsGenerating(true);
    setCurrentStep(4);
    
    // 模拟重构过程
    setTimeout(() => {
      const reformulated = generatedPairs.map(pair => ({
        ...pair,
        text: reformulationExamples[`${pair.genre}-${pair.audience}`] || '重构文本生成中...'
      }));
      setReformulatedTexts(reformulated);
      setIsGenerating(false);
      setCurrentStep(5);
    }, 3000);
  };

  const resetDemo = () => {
    setSelectedText('');
    setGeneratedPairs([]);
    setReformulatedTexts([]);
    setCurrentStep(0);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            MGA 交互式演示
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            体验 MGA 方法的完整流程：从原始文本到多样化重构
          </p>
          
          <button
            onClick={resetDemo}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            <span>重新开始</span>
          </button>
        </motion.div>

        {/* 步骤指示器 */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[
              { id: 1, label: '选择文本', icon: FileText },
              { id: 2, label: '生成配对', icon: Sparkles },
              { id: 3, label: '查看结果', icon: Eye },
              { id: 4, label: '文本重构', icon: ArrowRight },
              { id: 5, label: '完成演示', icon: Users }
            ].map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep >= step.id;
              const isCurrent = currentStep === step.id;
              
              return (
                <React.Fragment key={step.id}>
                  <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                    isCurrent ? 'bg-blue-100 text-blue-700' : 
                    isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCurrent ? 'bg-blue-500 text-white' :
                      isActive ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                    }`}>
                      <StepIcon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{step.label}</span>
                  </div>
                  {index < 4 && (
                    <ArrowRight className={`w-5 h-5 ${
                      currentStep > step.id ? 'text-green-500' : 'text-gray-300'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* 内容区域 */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <AnimatePresence mode="wait">
            {/* 步骤1: 选择原始文本 */}
            {currentStep === 0 && (
              <motion.div
                key="select-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">选择原始文本</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {sampleTexts.map((text, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleTextSelect(text)}
                      className="text-left p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <h3 className="font-bold text-lg text-gray-900 mb-3">{text.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-4">{text.content}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 步骤1+: 显示选中的文本 */}
            {currentStep === 1 && (
              <motion.div
                key="selected-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">原始文本</h2>
                <div className="bg-blue-50 rounded-2xl p-6 mb-8">
                  <p className="text-gray-800 leading-relaxed">{selectedText}</p>
                </div>
                <div className="text-center">
                  <button
                    onClick={generatePairs}
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>生成 Genre-Audience 配对</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* 步骤2: 生成配对中 */}
            {currentStep === 2 && (
              <motion.div
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-8 h-8 text-white" />
                  </motion.div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">正在生成 Genre-Audience 配对</h2>
                <p className="text-gray-600">使用 3.3B MoE 模型分析文本特征...</p>
              </motion.div>
            )}

            {/* 步骤3: 显示生成的配对 */}
            {currentStep === 3 && (
              <motion.div
                key="pairs-result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">生成的 Genre-Audience 配对</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {generatedPairs.map((pair, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <FileText className="w-5 h-5 text-purple-600" />
                        <span className="font-bold text-purple-900">{pair.genre}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-pink-600" />
                        <span className="text-pink-800">{pair.audience}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="text-center">
                  <button
                    onClick={reformulateText}
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                  >
                    <Play className="w-5 h-5" />
                    <span>开始文本重构</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* 步骤4: 重构中 */}
            {currentStep === 4 && (
              <motion.div
                key="reformulating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <ArrowRight className="w-8 h-8 text-white" />
                  </motion.div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">正在重构文本</h2>
                <p className="text-gray-600">根据每个 Genre-Audience 配对生成定制化内容...</p>
              </motion.div>
            )}

            {/* 步骤5: 最终结果 */}
            {currentStep === 5 && (
              <motion.div
                key="final-result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">重构结果展示</h2>
                <div className="space-y-6">
                  {reformulatedTexts.map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-5 h-5 text-green-600" />
                          <span className="font-bold text-green-900">{result.genre}</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                        <div className="flex items-center space-x-2">
                          <Users className="w-5 h-5 text-emerald-600" />
                          <span className="font-bold text-emerald-900">{result.audience}</span>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-4">
                        <p className="text-gray-800 leading-relaxed whitespace-pre-line">{result.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <p className="text-lg text-gray-600 mb-4">
                    🎉 演示完成！一个原始文本成功扩展为 {reformulatedTexts.length} 个不同风格的变体
                  </p>
                  <button
                    onClick={resetDemo}
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span>尝试其他文本</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemo;