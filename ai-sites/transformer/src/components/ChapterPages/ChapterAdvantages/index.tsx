/**
 * 优缺点章节
 * 分析 Transformer 的优势与挑战
 */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardBody, Button, Switch } from "@nextui-org/react";
import {
  ArrowRight,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Brain,
  Cpu,
  Database,
  MapPin,
  TrendingUp,
  ArrowRight as ArrowIcon,
  Play,
  Pause,
  FastForward,
  Layers,
  Target,
  RotateCcw,
} from "lucide-react";
import { Link } from "react-router-dom";

const ChapterAdvantages: React.FC = () => {
  const [showAdvantages, setShowAdvantages] = useState(true);
  const [currentComparisonStep, setCurrentComparisonStep] = useState(0);

  const advantages = [
    {
      title: "并行加速",
      subtitle: "闪电般的处理速度",
      icon: Zap,
      color: "from-yellow-400 to-orange-500",
      description:
        "RNN 像排队买票，每次只能处理一个人；Transformer 像10个窗口同时售票",
      details: [
        "处理1000词的句子时速度快数百倍",
        "充分利用GPU的并行计算能力",
        "训练时间大幅减少",
      ],
      comparison: "RNN需要1000个时间步，Transformer只需要1步",
    },
    {
      title: "长距离记忆",
      subtitle: "过目不忘的大脑",
      icon: Brain,
      color: "from-blue-400 to-purple-500",
      description: "能直接关联文本中任意距离的词语，不会因为距离远而遗忘",
      details: [
        "处理长文本时保持完整语义理解",
        "捕捉远距离词语之间的依赖关系",
        "避免梯度消失问题",
      ],
      comparison: '处理"三年前小明在巴黎买的书"时，能直接关联"巴黎"和"书"',
    },
    {
      title: "万能适配",
      subtitle: "百变星君的能力",
      icon: TrendingUp,
      color: "from-green-400 to-teal-500",
      description: "同一架构可以适用于各种不同的NLP任务",
      details: [
        "机器翻译、文本生成、问答系统",
        "只需要更换训练数据即可",
        "为大模型发展奠定基础",
      ],
      comparison: "就像同一台机器既能生产汽车零件，也能生产家电零件",
    },
  ];

  const disadvantages = [
    {
      title: "计算量大",
      subtitle: '吃显卡的"怪兽"',
      icon: Cpu,
      color: "from-red-400 to-pink-500",
      description: "注意力机制的计算复杂度为O(n²)，序列越长计算量越大",
      details: [
        "处理1000词需要计算100万次词语关联",
        "相当于同时运行100个大型游戏",
        "需要高端GPU支持",
      ],
      impact: "限制了处理超长文本的能力",
    },
    {
      title: "数据饥渴",
      subtitle: '海量知识的"吃货"',
      icon: Database,
      color: "from-orange-400 to-red-500",
      description: "需要大量高质量的训练数据才能发挥最佳性能",
      details: [
        "训练基础模型需要数亿单词的语料",
        "相当于10万本小说的文本量",
        "数据不足时容易过拟合",
      ],
      impact: "小数据集上表现可能不如传统方法",
    },
    {
      title: "位置感知缺失",
      subtitle: '需要"路标"的旅行者',
      icon: MapPin,
      color: "from-purple-400 to-indigo-500",
      description: "原生不理解词语的位置顺序，需要额外的位置编码",
      details: [
        '无位置编码时"小明吃苹果"和"苹果吃小明"相同',
        '位置编码像给词语标上"第1个""第2个"的路标',
        "增加了模型的复杂性",
      ],
      impact: "处理位置敏感任务时需要特别设计",
    },
  ];

  // 架构对比数据
  const comparisonExample = {
    sentence: "苹果很甜",
    characters: ["苹", "果", "很", "甜"],
    rnnSteps: [
      {
        step: 1,
        current: "苹",
        processed: ["苹"],
        description: "RNN 开始处理第一个字'苹'",
      },
      {
        step: 2,
        current: "果",
        processed: ["苹", "果"],
        description: "顺序处理第二个字'果'，记忆'苹'",
      },
      {
        step: 3,
        current: "很",
        processed: ["苹", "果", "很"],
        description: "处理'很'，前面的记忆开始衰减",
      },
      {
        step: 4,
        current: "甜",
        processed: ["苹", "果", "很", "甜"],
        description: "处理'甜'，'苹果'的关联已经很弱",
      },
    ],
    transformerAttention: [
      {
        from: "苹",
        to: "果",
        weight: 0.9,
        description: "'苹'与'果'强关联，形成'苹果'概念",
      },
      {
        from: "苹果",
        to: "甜",
        weight: 0.8,
        description: "'苹果'与'甜'建立语义关联",
      },
      {
        from: "很",
        to: "甜",
        weight: 0.7,
        description: "'很'修饰'甜'，加强程度",
      },
      {
        from: "甜",
        to: "苹果",
        weight: 0.8,
        description: "'甜'回馈到'苹果'，完整理解",
      },
    ],
  };

  const architectureComparison = [
    {
      title: "传统 RNN 架构",
      subtitle: "像单线程程序员",
      icon: Play,
      color: "from-gray-400 to-gray-600",
      problems: [
        "逐词顺序计算：'苹'→'果'→'很'→'甜'",
        "无法并行：必须等前一个词处理完",
        "长距离遗忘：处理'甜'时已忘记'苹果'",
        "训练效率低：需要 4 个时间步骤",
      ],
      example: "处理'苹果很甜'需要4步，且'甜'与'苹果'的关联很弱",
    },
    {
      title: "Transformer 架构",
      subtitle: "像多线程团队",
      icon: Layers,
      color: "from-blue-400 to-purple-600",
      advantages: [
        "并行计算：同时处理所有词",
        "自注意力：直接计算词间关联权重",
        "长距离记忆：'甜'直接关联'苹果'(权重0.8)",
        "训练效率高：只需要 1 个步骤",
      ],
      example: "一步完成，'甜'与'苹果'建立强关联(权重0.8)",
    },
  ];

  const currentData = showAdvantages ? advantages : disadvantages;
  const currentIcon = showAdvantages ? CheckCircle : XCircle;
  const currentColor = showAdvantages ? "text-green-600" : "text-red-600";

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Transformer 的优缺点
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          全面分析 Transformer 的突出优势和面临的挑战
        </p>
      </motion.div>

      {/* Architecture Comparison Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="space-y-8"
      >
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            🏗️ 架构对比：传统方法 vs Transformer
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            通过"苹果很甜"这个简单例子，直观理解两种架构的根本差异
          </p>
        </div>

        {/* Interactive Example */}
        <Card className="shadow-lg border-0 bg-gradient-to-r from-indigo-50 to-blue-50">
          <CardBody className="p-8 space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                实例对比："{comparisonExample.sentence}"
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* RNN 处理方式 */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg flex items-center justify-center">
                    <Play className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">
                    传统 RNN：逐步处理
                  </h4>
                </div>

                <div className="bg-white rounded-lg p-4 space-y-3">
                  {comparisonExample.rnnSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50"
                    >
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">
                          当前处理：
                          <span className="text-blue-600 font-bold">
                            {step.current}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {step.description}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <span className="font-medium text-red-700">问题</span>
                  </div>
                  <p className="text-sm text-red-600">
                    处理到"甜"时，"苹果"的语义关联已经很弱，难以建立完整的语义理解
                  </p>
                </div>
              </div>

              {/* Transformer 处理方式 */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
                    <Layers className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">
                    Transformer：并行关联
                  </h4>
                </div>

                <div className="bg-white rounded-lg p-4 space-y-3">
                  {comparisonExample.transformerAttention.map(
                    (attention, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.15 }}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-blue-600">
                            {attention.from}
                          </span>
                          <ArrowIcon className="w-4 h-4 text-gray-400" />
                          <span className="font-bold text-purple-600">
                            {attention.to}
                          </span>
                        </div>
                        <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white px-2 py-1 rounded text-sm font-bold">
                          {attention.weight}
                        </div>
                        <div className="flex-1 text-sm text-gray-600">
                          {attention.description}
                        </div>
                      </motion.div>
                    )
                  )}
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-green-700">优势</span>
                  </div>
                  <p className="text-sm text-green-600">
                    一步完成所有关联计算，"甜"与"苹果"建立强关联(权重0.8)，语义理解更准确
                  </p>
                </div>
              </div>
            </div>

            {/* 核心差异总结 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
              <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">
                核心差异一览
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center space-y-2">
                  <Clock className="w-8 h-8 text-orange-500 mx-auto" />
                  <div className="font-medium text-gray-800">处理方式</div>
                  <div className="text-sm text-gray-600">
                    <div className="text-red-600">RNN: 顺序(4步)</div>
                    <div className="text-green-600">Transformer: 并行(1步)</div>
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <Target className="w-8 h-8 text-blue-500 mx-auto" />
                  <div className="font-medium text-gray-800">语义关联</div>
                  <div className="text-sm text-gray-600">
                    <div className="text-red-600">RNN: 衰减遗忘</div>
                    <div className="text-green-600">Transformer: 精准捕捉</div>
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <Zap className="w-8 h-8 text-purple-500 mx-auto" />
                  <div className="font-medium text-gray-800">训练效率</div>
                  <div className="text-sm text-gray-600">
                    <div className="text-red-600">RNN: 慢(无法并行)</div>
                    <div className="text-green-600">
                      Transformer: 快(数十倍提升)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Architecture Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {architectureComparison.map((arch, index) => {
            const Icon = arch.icon;
            const isRNN = index === 0;
            return (
              <motion.div
                key={arch.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full shadow-lg hover:shadow-xl transition-all border-0">
                  <CardBody className="p-6 space-y-4">
                    <div className="text-center space-y-3">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${arch.color} rounded-2xl flex items-center justify-center mx-auto`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {arch.title}
                        </h3>
                        <p className="text-sm text-gray-600 italic">
                          {arch.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-sm font-medium text-gray-700">
                        {isRNN ? "主要问题：" : "核心优势："}
                      </div>
                      <ul className="space-y-2">
                        {(isRNN ? arch.problems : arch.advantages)?.map(
                          (item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start space-x-2"
                            >
                              <div
                                className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                                  isRNN ? "bg-red-400" : "bg-green-400"
                                }`}
                              />
                              <span className="text-sm text-gray-600">
                                {item}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div
                      className={`p-3 rounded-lg ${
                        isRNN ? "bg-red-50" : "bg-green-50"
                      }`}
                    >
                      <div
                        className={`text-sm font-medium mb-1 ${
                          isRNN ? "text-red-700" : "text-green-700"
                        }`}
                      >
                        实例效果：
                      </div>
                      <div
                        className={`text-sm ${
                          isRNN ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {arch.example}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* 总结 */}
        <Card className="shadow-lg border-0 bg-gradient-to-r from-amber-50 to-orange-50">
          <CardBody className="p-6 text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <Brain className="w-8 h-8 text-orange-600" />
              <h3 className="text-2xl font-bold text-gray-800">
                为什么 Transformer 能引领 AI 革命？
              </h3>
            </div>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              传统 NLP
              架构就像单线程的程序员，必须逐个处理问题，效率低且容易遗忘。 而
              Transformer 就像一个高效的多线程团队，能够同时关注所有信息，
              建立精准的语义关联，这种革命性的设计使其能够支撑更大规模的数据和参数，
              为 GPT、BERT 等大语言模型的诞生奠定了基础。
            </p>
          </CardBody>
        </Card>
      </motion.section>

      {/* Toggle Switch */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex justify-center"
      >
        <Card className="shadow-lg border-0">
          <CardBody className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <XCircle className="w-5 h-5 text-red-500" />
                <span className="text-gray-700">挑战</span>
              </div>
              <Switch
                isSelected={showAdvantages}
                onValueChange={setShowAdvantages}
                color="success"
                size="lg"
              />
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">优势</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Content Section */}
      <motion.section
        key={showAdvantages ? "advantages" : "disadvantages"}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            {React.createElement(currentIcon, {
              className: `w-8 h-8 ${currentColor}`,
            })}
            <h2 className="text-3xl font-bold text-gray-800">
              {showAdvantages ? "三大优势让它脱颖而出" : "发展中的三大挑战"}
            </h2>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {currentData.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full shadow-lg hover:shadow-xl transition-all border-0">
                  <CardBody className="p-6 space-y-4">
                    <div className="text-center space-y-3">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 italic">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed text-center">
                      {item.description}
                    </p>

                    <div className="space-y-3">
                      <div className="text-sm font-medium text-gray-700">
                        {showAdvantages ? "具体表现：" : "具体影响："}
                      </div>
                      <ul className="space-y-2">
                        {item.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <div
                              className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                                showAdvantages ? "bg-green-400" : "bg-red-400"
                              }`}
                            />
                            <span className="text-sm text-gray-600">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      className={`p-3 rounded-lg ${
                        showAdvantages ? "bg-green-50" : "bg-orange-50"
                      }`}
                    >
                      <div
                        className={`text-sm font-medium mb-1 ${
                          showAdvantages ? "text-green-700" : "text-orange-700"
                        }`}
                      >
                        {showAdvantages
                          ? "类比理解："
                          : "impact" in item
                          ? "影响："
                          : "类比理解："}
                      </div>
                      <div
                        className={`text-sm ${
                          showAdvantages ? "text-green-600" : "text-orange-600"
                        }`}
                      >
                        {"comparison" in item ? item.comparison : item.impact}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Summary */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardBody className="p-8 text-center space-y-4">
            <h3 className="text-2xl font-bold text-gray-800">总结与展望</h3>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Transformer 的三大优势使其成为现代 NLP 的基石，推动了从 BERT 到
              GPT 系列模型的发展。
              虽然在计算效率、数据需求和位置感知方面仍有挑战，但随着技术不断进步，
              这些问题正在被逐步解决，为更强大的 AI 系统铺平道路。
            </p>
          </CardBody>
        </Card>
      </motion.section>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex justify-between items-center"
      >
        <Link to="/components">
          <Button
            variant="bordered"
            startContent={<ArrowRight className="w-5 h-5 rotate-180" />}
          >
            上一章：核心组件
          </Button>
        </Link>
        <Link to="/to-llm">
          <Button
            size="lg"
            color="primary"
            endContent={<ArrowRight className="w-5 h-5" />}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white"
          >
            下一章：到大语言模型
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ChapterAdvantages;
