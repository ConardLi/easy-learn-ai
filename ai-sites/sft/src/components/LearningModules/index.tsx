/**
 * 学习模块组件
 * 展示四种不同类型的SFT微调方法
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Settings, FileText, BarChart3 } from 'lucide-react';

export function LearningModules() {
  const [activeModule, setActiveModule] = useState(0);

  const modules = [
    {
      title: "指令微调",
      icon: MessageCircle,
      color: "bg-blue-500",
      description: "训练模型理解和遵循各种用户指令",
      example: {
        instruction: "将下列文本翻译成英文：",
        input: "今天天气真好",
        output: "Today is a nice day！"
      },
      scenarios: ["智能教育", "智能办公", "智能翻译", "数据分析"]
    },
    {
      title: "对话微调",
      icon: MessageCircle,
      color: "bg-green-500",
      description: "通过多轮对话数据训练模型生成连贯回复",
      example: {
        dialogue: [
          { role: "user", content: "今天天气怎么样？" },
          { role: "assistant", content: "北京今日多云转晴，气温 22℃" },
          { role: "user", content: "那适合去长城吗？" },
          { role: "assistant", content: "适合，建议携带外套注意防晒" }
        ]
      },
      scenarios: ["智能客服", "聊天机器人", "语音助手"]
    },
    {
      title: "领域适配",
      icon: Settings,
      color: "bg-purple-500",
      description: "让模型适应特定领域的专业任务",
      example: {
        instruction: "分析患者症状",
        input: "55岁男性，胸骨后疼痛3小时",
        output: "可能诊断：急性心肌梗死，建议立即检查",
        domain: "医疗"
      },
      scenarios: ["医疗诊断", "法律咨询", "金融分析"]
    },
    {
      title: "文本分类",
      icon: BarChart3,
      color: "bg-orange-500",
      description: "训练模型对文本进行准确的类别预测",
      example: {
        text: "这款手机续航48小时，拍照惊艳",
        label: "positive"
      },
      scenarios: ["情感分析", "内容审核", "新闻分类", "意图识别"]
    }
  ];

  return (
    <section id="modules" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            SFT 微调类型
          </h2>
          <p className="text-xl text-gray-600">
            了解四种主要的有监督微调方法
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center mb-8 gap-4">
          {modules.map((module, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveModule(index)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeModule === index
                  ? `${module.color} text-white shadow-lg`
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <module.icon className="w-5 h-5" />
              <span className="font-medium">{module.title}</span>
            </motion.button>
          ))}
        </div>

        <motion.div
          key={activeModule}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {modules[activeModule].title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {modules[activeModule].description}
              </p>
              
              <h4 className="text-lg font-semibold text-gray-700 mb-3">
                应用场景：
              </h4>
              <div className="flex flex-wrap gap-2">
                {modules[activeModule].scenarios.map((scenario, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {scenario}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">
                数据示例：
              </h4>
              <div className="space-y-3 text-sm">
                {modules[activeModule].example.instruction && (
                  <div>
                    <span className="font-medium text-blue-600">指令:</span>
                    <div className="bg-white p-2 rounded mt-1">
                      {modules[activeModule].example.instruction}
                    </div>
                  </div>
                )}
                
                {modules[activeModule].example.input && (
                  <div>
                    <span className="font-medium text-green-600">输入:</span>
                    <div className="bg-white p-2 rounded mt-1">
                      {modules[activeModule].example.input}
                    </div>
                  </div>
                )}
                
                {modules[activeModule].example.output && (
                  <div>
                    <span className="font-medium text-purple-600">输出:</span>
                    <div className="bg-white p-2 rounded mt-1">
                      {modules[activeModule].example.output}
                    </div>
                  </div>
                )}

                {modules[activeModule].example.dialogue && (
                  <div>
                    <span className="font-medium text-indigo-600">对话:</span>
                    <div className="space-y-2 mt-1">
                      {modules[activeModule].example.dialogue.map((turn, idx) => (
                        <div key={idx} className={`p-2 rounded ${
                          turn.role === 'user' ? 'bg-blue-50' : 'bg-green-50'
                        }`}>
                          <span className="font-medium">
                            {turn.role === 'user' ? '用户:' : '助手:'}
                          </span>
                          <span className="ml-2">{turn.content}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
