/**
 * 案例体验页面
 * 让用户通过真实的AI对话案例体验各种幻觉现象
 * 包含互动聊天界面和实时幻觉检测
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardBody, Button, Tabs, Tab } from '@nextui-org/react';
import { 
  MessageCircle, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  Lightbulb,
  Brain
} from 'lucide-react';
import ChatInterface from './ChatInterface';
import CaseAnalysis from './CaseAnalysis';

const CasesPage: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const cases = [
    {
      id: 1,
      title: "虚构地理位置",
      description: "AI声称虚构国家瓦坎达的具体地理位置",
      category: "虚构事实",
      difficulty: "初级",
      messages: [
        {
          role: "user",
          content: "请告诉我瓦坎达的地理位置在哪里？",
          timestamp: "10:30"
        },
        {
          role: "assistant",
          content: "瓦坎达位于非洲东部，具体在埃塞俄比亚和肯尼亚的边界附近。这个国家拥有丰富的振金资源，首都是比拉基亚。瓦坎达的地理位置非常隐蔽，被山脉和森林包围，这也是为什么它能够保持神秘性的原因。",
          timestamp: "10:31",
          isHallucination: true,
          issues: ["虚构了真实地理位置", "编造了具体细节", "提供了不存在的事实信息"]
        }
      ]
    },
    {
      id: 2,
      title: "虚假学术引用",
      description: "AI引用了不存在的研究论文和作者",
      category: "虚假引用",
      difficulty: "中级",
      messages: [
        {
          role: "user",
          content: "能否提供一些关于AI伦理的最新研究论文？",
          timestamp: "14:20"
        },
        {
          role: "assistant",
          content: "以下是一些重要的AI伦理研究论文：\n\n1. Johnson, M. & Smith, K. (2023). \"Ethical Frameworks for AI Decision Making\". Journal of AI Ethics, 15(3), 45-62.\n\n2. Rodriguez, A. (2023). \"Bias Mitigation in Large Language Models\". Nature AI Review, 8(7), 234-251.\n\n3. Chen, L. & Williams, R. (2024). \"Transparency and Accountability in AI Systems\". IEEE Ethics in AI, 12(2), 78-95.\n\n这些论文详细探讨了AI伦理的各个方面，包括决策透明度、偏见消除和责任归属等关键问题。",
          timestamp: "14:21",
          isHallucination: true,
          issues: ["虚构了作者姓名", "编造了期刊名称", "提供了假的发表信息"]
        }
      ]
    },
    {
      id: 3,
      title: "错误数学计算",
      description: "AI在复杂计算中出现逻辑错误",
      category: "逻辑错误",
      difficulty: "高级",
      messages: [
        {
          role: "user",
          content: "如果一个正方形的对角线长度是10厘米，那么这个正方形的面积是多少？",
          timestamp: "16:45"
        },
        {
          role: "assistant",
          content: "根据正方形的性质，如果对角线长度是10厘米，我们可以这样计算：\n\n设正方形的边长为a，那么对角线长度 = a√2\n因此：a√2 = 10\n所以：a = 10/√2 = 5√2 ≈ 7.07厘米\n\n正方形面积 = a² = (5√2)² = 25 × 2 = 50平方厘米\n\n等等，让我重新计算一下... 实际上面积应该是 a² = (10/√2)² = 100/2 = 50平方厘米。所以答案是50平方厘米。",
          timestamp: "16:46",
          isHallucination: false,
          issues: []
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Brain className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI幻觉案例体验
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            通过真实的AI对话案例，亲身体验各种幻觉现象，学会识别和分析AI生成内容的可靠性
          </p>
        </motion.div>

        {/* Case Selection */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <Tabs 
            selectedKey={selectedCase.toString()}
            onSelectionChange={(key) => {
              setSelectedCase(parseInt(key as string));
              setShowAnalysis(false);
            }}
            className="w-full"
            classNames={{
              tabList: "grid w-full grid-cols-1 md:grid-cols-3 gap-4 bg-transparent",
              cursor: "w-full bg-gradient-to-r from-purple-500 to-blue-500",
              tab: "max-w-full h-auto p-0",
              tabContent: "group-data-[selected=true]:text-white"
            }}
          >
            {cases.map((case_, index) => (
              <Tab
                key={index.toString()}
                title={
                  <Card className={`w-full transition-all duration-300 ${
                    selectedCase === index 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                      : 'bg-white hover:bg-gray-50'
                  }`}>
                    <CardBody className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${
                          selectedCase === index ? 'bg-white/20' : 'bg-purple-100'
                        }`}>
                          <MessageCircle className={`w-5 h-5 ${
                            selectedCase === index ? 'text-white' : 'text-purple-600'
                          }`} />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="font-semibold text-sm mb-1">{case_.title}</h3>
                          <p className={`text-xs ${
                            selectedCase === index ? 'text-purple-100' : 'text-gray-600'
                          }`}>
                            {case_.description}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              selectedCase === index 
                                ? 'bg-white/20 text-white' 
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {case_.category}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              selectedCase === index 
                                ? 'bg-white/20 text-white' 
                                : case_.difficulty === '初级' 
                                  ? 'bg-green-100 text-green-600'
                                  : case_.difficulty === '中级'
                                    ? 'bg-yellow-100 text-yellow-600'
                                    : 'bg-red-100 text-red-600'
                            }`}>
                              {case_.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                }
              />
            ))}
          </Tabs>
        </motion.div>

        {/* Case Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCase}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <ChatInterface 
                  case_={cases[selectedCase]}
                  onAnalyze={() => setShowAnalysis(true)}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Analysis Panel */}
          <div className="lg:col-span-1">
            <AnimatePresence>
              {showAnalysis && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.5 }}
                >
                  <CaseAnalysis case_={cases[selectedCase]} />
                </motion.div>
              )}
            </AnimatePresence>

            {!showAnalysis && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0">
                  <CardBody className="p-6 text-center">
                    <Lightbulb className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      准备好分析了吗？
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      仔细阅读左侧的对话内容，然后点击"分析幻觉"按钮来深入了解这个案例中的问题
                    </p>
                    <div className="space-y-2 text-xs text-gray-500">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>识别幻觉现象</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>分析成因机制</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>学习防范方法</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasesPage;
