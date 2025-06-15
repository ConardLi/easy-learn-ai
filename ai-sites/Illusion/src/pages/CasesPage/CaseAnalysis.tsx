/**
 * 案例分析组件
 * 深入分析AI幻觉案例的成因和特征
 * 提供详细的问题解读和学习要点
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Chip } from '@nextui-org/react';
import { 
  AlertTriangle, 
  Brain, 
  Target, 
  Lightbulb,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isHallucination?: boolean;
  issues?: string[];
}

interface Case {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  messages: Message[];
}

interface CaseAnalysisProps {
  case_: Case;
}

const CaseAnalysis: React.FC<CaseAnalysisProps> = ({ case_ }) => {
  const hallucinationMessage = case_.messages.find(msg => msg.isHallucination);
  
  const analysisData = {
    1: {
      causes: ["训练数据中包含虚构内容", "缺乏现实世界验证", "模式匹配生成虚假信息"],
      prevention: ["明确询问信息来源", "要求区分虚构与现实", "交叉验证关键信息"],
      severity: "高",
      impact: "可能误导用户对现实世界的认知"
    },
    2: {
      causes: ["学术数据库覆盖不全", "倾向于生成看似权威的内容", "无法验证引用真实性"],
      prevention: ["要求提供可验证的链接", "使用专业数据库交叉检验", "明确标注信息获取时间"],
      severity: "极高",
      impact: "严重影响学术研究和决策制定"
    },
    3: {
      causes: ["复杂计算中的逻辑链断裂", "中间步骤验证不足", "数学推理能力限制"],
      prevention: ["分步骤验证计算过程", "使用专业计算工具核实", "要求详细的推理步骤"],
      severity: "中",
      impact: "可能导致计算错误和误判"
    }
  };

  const currentAnalysis = analysisData[case_.id as keyof typeof analysisData];

  return (
    <div className="space-y-6">
      {/* Analysis Header */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-400">
        <CardBody className="p-4">
          <div className="flex items-center space-x-3 mb-3">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <h3 className="text-lg font-bold text-gray-800">幻觉分析报告</h3>
          </div>
          <p className="text-sm text-gray-600">
            针对案例：{case_.title}
          </p>
        </CardBody>
      </Card>

      {/* Hallucination Detection */}
      <Card>
        <CardBody className="p-4">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-500" />
            <span>幻觉识别</span>
          </h4>
          
          {hallucinationMessage ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <XCircle className="w-5 h-5 text-red-500" />
                <span className="text-sm font-medium text-red-700">检测到幻觉内容</span>
              </div>
              
              <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-400">
                <p className="text-sm text-gray-700 mb-2">问题回答：</p>
                <p className="text-sm text-red-800 italic">
                  "{hallucinationMessage.content.slice(0, 100)}..."
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-800 mb-2">具体问题：</p>
                <div className="space-y-1">
                  {hallucinationMessage.issues?.map((issue, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-sm text-gray-700">{issue}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">此案例显示正确回答</span>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Cause Analysis */}
      <Card>
        <CardBody className="p-4">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-500" />
            <span>成因分析</span>
          </h4>
          
          <div className="space-y-2">
            {currentAnalysis.causes.map((cause, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-2 bg-purple-50 rounded-lg"
              >
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <span className="text-sm text-gray-700">{cause}</span>
              </motion.div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Prevention Strategies */}
      <Card>
        <CardBody className="p-4">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-green-500" />
            <span>防范策略</span>
          </h4>
          
          <div className="space-y-2">
            {currentAnalysis.prevention.map((strategy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-2 bg-green-50 rounded-lg"
              >
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <span className="text-sm text-gray-700">{strategy}</span>
              </motion.div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Risk Assessment */}
      <Card>
        <CardBody className="p-4">
          <h4 className="font-semibold text-gray-800 mb-3">风险评估</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">严重程度：</span>
              <Chip 
                size="sm"
                className={
                  currentAnalysis.severity === '极高' ? 'bg-red-500 text-white' :
                  currentAnalysis.severity === '高' ? 'bg-orange-500 text-white' :
                  'bg-yellow-500 text-white'
                }
              >
                {currentAnalysis.severity}
              </Chip>
            </div>
            
            <div>
              <span className="text-sm text-gray-600">潜在影响：</span>
              <p className="text-sm text-gray-800 mt-1">{currentAnalysis.impact}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default CaseAnalysis;
