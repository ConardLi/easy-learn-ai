/**
 * 交互式演示组件
 * 提供多模态AI功能的模拟演示
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Wand2, Download, Sparkles } from 'lucide-react';

interface InteractiveDemoProps {
  inView: boolean;
}

const InteractiveDemo: React.FC<InteractiveDemoProps> = ({ inView }) => {
  const [activeDemo, setActiveDemo] = useState('text-to-image');
  const [isGenerating, setIsGenerating] = useState(false);
  const [inputText, setInputText] = useState('一只穿着宇航服的猫咪在太空中漂浮');

  const demos = [
    {
      id: 'text-to-image',
      title: '文生图',
      description: '将文字描述转换为图像',
      placeholder: '描述你想要的图像...',
      resultType: 'image'
    },
    {
      id: 'image-to-text',
      title: '图生文',
      description: '分析图像并生成文字描述',
      placeholder: '上传图像进行分析...',
      resultType: 'text'
    },
    {
      id: 'style-transfer',
      title: '风格转换',
      description: '将图像转换为指定艺术风格',
      placeholder: '选择目标风格...',
      resultType: 'image'
    }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 3000);
  };

  const activeTab = demos.find(demo => demo.id === activeDemo);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        <Sparkles className="inline w-8 h-8 text-purple-600 mr-2" />
        体验多模态AI魔法
      </h3>

      {/* 演示标签 */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {demos.map((demo) => (
          <motion.button
            key={demo.id}
            onClick={() => setActiveDemo(demo.id)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeDemo === demo.id
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {demo.title}
          </motion.button>
        ))}
      </div>

      {/* 演示界面 */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* 输入区域 */}
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h4 className="text-lg font-semibold text-gray-800">输入</h4>
          <p className="text-sm text-gray-600">{activeTab?.description}</p>

          {activeDemo === 'text-to-image' && (
            <div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={activeTab?.placeholder}
                className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          )}

          {activeDemo === 'image-to-text' && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">点击上传图像</p>
            </div>
          )}

          {activeDemo === 'style-transfer' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-300 rounded-lg p-4 text-center">
                <img
                  src="https://picsum.photos/150/150?random=13"
                  alt="原图"
                  className="w-full h-24 object-cover rounded mb-2"
                />
                <span className="text-sm text-gray-600">原图</span>
              </div>
              <div className="border border-gray-300 rounded-lg p-4 text-center">
                <div className="w-full h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded mb-2"></div>
                <span className="text-sm text-gray-600">梵高风格</span>
              </div>
            </div>
          )}

          <motion.button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
            whileHover={!isGenerating ? { scale: 1.02 } : {}}
            whileTap={!isGenerating ? { scale: 0.98 } : {}}
          >
            {isGenerating ? (
              <motion.div
                className="flex items-center justify-center space-x-2"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Wand2 className="w-5 h-5" />
                <span>生成中...</span>
              </motion.div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Wand2 className="w-5 h-5" />
                <span>开始生成</span>
              </div>
            )}
          </motion.button>
        </motion.div>

        {/* 输出区域 */}
        <motion.div
          key={`${activeDemo}-output`}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-800">输出结果</h4>
            <motion.button
              className="flex items-center space-x-2 text-purple-600 hover:text-purple-700"
              whileHover={{ scale: 1.05 }}
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">下载</span>
            </motion.button>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 h-64 flex items-center justify-center">
            {isGenerating ? (
              <motion.div
                className="text-center"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="w-16 h-16 bg-purple-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Wand2 className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-gray-600">AI 正在创作中...</p>
              </motion.div>
            ) : activeTab?.resultType === 'image' ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <img
                  src="https://picsum.photos/200/150?random=14"
                  alt="生成结果"
                  className="rounded-lg shadow-md mx-auto mb-2"
                />
                <p className="text-sm text-gray-600">AI 生成的图像</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-gray-700 leading-relaxed">
                    这是一张美丽的风景照片，展现了壮观的山脉和湖泊。
                    照片中可以看到层次分明的山峦，倒映在平静的湖水中，
                    天空中飘着几朵白云，整体色调温暖宁静。
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InteractiveDemo;
