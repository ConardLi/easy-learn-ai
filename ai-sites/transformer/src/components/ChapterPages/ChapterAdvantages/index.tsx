/**
 * 优缺点章节
 * 分析 Transformer 的优势与挑战
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Button, Switch } from '@nextui-org/react';
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
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ChapterAdvantages: React.FC = () => {
  const [showAdvantages, setShowAdvantages] = useState(true);

  const advantages = [
    {
      title: '并行加速',
      subtitle: '闪电般的处理速度',
      icon: Zap,
      color: 'from-yellow-400 to-orange-500',
      description: 'RNN 像排队买票，每次只能处理一个人；Transformer 像10个窗口同时售票',
      details: [
        '处理1000词的句子时速度快数百倍',
        '充分利用GPU的并行计算能力', 
        '训练时间大幅减少'
      ],
      comparison: 'RNN需要1000个时间步，Transformer只需要1步'
    },
    {
      title: '长距离记忆',
      subtitle: '过目不忘的大脑',
      icon: Brain,
      color: 'from-blue-400 to-purple-500',
      description: '能直接关联文本中任意距离的词语，不会因为距离远而遗忘',
      details: [
        '处理长文本时保持完整语义理解',
        '捕捉远距离词语之间的依赖关系',
        '避免梯度消失问题'
      ],
      comparison: '处理"三年前小明在巴黎买的书"时，能直接关联"巴黎"和"书"'
    },
    {
      title: '万能适配',
      subtitle: '百变星君的能力',
      icon: TrendingUp,
      color: 'from-green-400 to-teal-500',
      description: '同一架构可以适用于各种不同的NLP任务',
      details: [
        '机器翻译、文本生成、问答系统',
        '只需要更换训练数据即可',
        '为大模型发展奠定基础'
      ],
      comparison: '就像同一台机器既能生产汽车零件，也能生产家电零件'
    }
  ];

  const disadvantages = [
    {
      title: '计算量大',
      subtitle: '吃显卡的"怪兽"',
      icon: Cpu,
      color: 'from-red-400 to-pink-500',
      description: '注意力机制的计算复杂度为O(n²)，序列越长计算量越大',
      details: [
        '处理1000词需要计算100万次词语关联',
        '相当于同时运行100个大型游戏',
        '需要高端GPU支持'
      ],
      impact: '限制了处理超长文本的能力'
    },
    {
      title: '数据饥渴',
      subtitle: '海量知识的"吃货"',
      icon: Database,
      color: 'from-orange-400 to-red-500',
      description: '需要大量高质量的训练数据才能发挥最佳性能',
      details: [
        '训练基础模型需要数亿单词的语料',
        '相当于10万本小说的文本量',
        '数据不足时容易过拟合'
      ],
      impact: '小数据集上表现可能不如传统方法'
    },
    {
      title: '位置感知缺失',
      subtitle: '需要"路标"的旅行者',
      icon: MapPin,
      color: 'from-purple-400 to-indigo-500',
      description: '原生不理解词语的位置顺序，需要额外的位置编码',
      details: [
        '无位置编码时"小明吃苹果"和"苹果吃小明"相同',
        '位置编码像给词语标上"第1个""第2个"的路标',
        '增加了模型的复杂性'
      ],
      impact: '处理位置敏感任务时需要特别设计'
    }
  ];

  const currentData = showAdvantages ? advantages : disadvantages;
  const currentIcon = showAdvantages ? CheckCircle : XCircle;
  const currentColor = showAdvantages ? 'text-green-600' : 'text-red-600';

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
        key={showAdvantages ? 'advantages' : 'disadvantages'}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            {React.createElement(currentIcon, {
              className: `w-8 h-8 ${currentColor}`
            })}
            <h2 className="text-3xl font-bold text-gray-800">
              {showAdvantages ? '三大优势让它脱颖而出' : '发展中的三大挑战'}
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
                      <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto`}>
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
                        {showAdvantages ? '具体表现：' : '具体影响：'}
                      </div>
                      <ul className="space-y-2">
                        {item.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                              showAdvantages ? 'bg-green-400' : 'bg-red-400'
                            }`} />
                            <span className="text-sm text-gray-600">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={`p-3 rounded-lg ${
                      showAdvantages ? 'bg-green-50' : 'bg-orange-50'
                    }`}>
                      <div className={`text-sm font-medium mb-1 ${
                        showAdvantages ? 'text-green-700' : 'text-orange-700'
                      }`}>
                        {showAdvantages ? '类比理解：' : ('impact' in item ? '影响：' : '类比理解：')}
                      </div>
                      <div className={`text-sm ${
                        showAdvantages ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {'comparison' in item ? item.comparison : item.impact}
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
            <h3 className="text-2xl font-bold text-gray-800">
              总结与展望
            </h3>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Transformer 的三大优势使其成为现代 NLP 的基石，推动了从 BERT 到 GPT 系列模型的发展。
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
