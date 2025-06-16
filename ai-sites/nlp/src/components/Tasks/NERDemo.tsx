/**
 * 命名实体识别演示组件
 * 展示实体识别的过程和结果
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, MapPin, Building, Calendar } from 'lucide-react';

const NERDemo: React.FC = () => {
  const [inputText, setInputText] = useState('李雷和韩梅梅是北京市海淀区的居民，他们计划在2024年4月7日去上海旅行。');
  const [entities, setEntities] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedText, setProcessedText] = useState('');

  const entityTypes = {
    '人名': { color: '#3B82F6', icon: User },
    '地名': { color: '#10B981', icon: MapPin },
    '组织': { color: '#F59E0B', icon: Building },
    '日期': { color: '#EF4444', icon: Calendar }
  };

  const examples = [
    {
      text: '李雷和韩梅梅是北京市海淀区的居民，他们计划在2024年4月7日去上海旅行。',
      entities: [
        { text: '李雷', type: '人名', start: 0, end: 2 },
        { text: '韩梅梅', type: '人名', start: 3, end: 6 },
        { text: '北京市海淀区', type: '地名', start: 7, end: 13 },
        { text: '2024年4月7日', type: '日期', start: 22, end: 31 },
        { text: '上海', type: '地名', start: 32, end: 34 }
      ]
    },
    {
      text: '比尔·盖茨是微软公司的创始人，总部位于美国西雅图。',
      entities: [
        { text: '比尔·盖茨', type: '人名', start: 0, end: 5 },
        { text: '微软公司', type: '组织', start: 6, end: 10 },
        { text: '美国', type: '地名', start: 17, end: 19 },
        { text: '西雅图', type: '地名', start: 19, end: 22 }
      ]
    }
  ];

  const processNER = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setEntities([]);
    
    // 模拟处理过程
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 查找匹配的示例
    const example = examples.find(ex => ex.text === inputText) || examples[0];
    
    // 逐个显示实体
    for (let i = 0; i < example.entities.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setEntities(prev => [...prev, example.entities[i]]);
    }
    
    // 生成带标注的文本
    let annotatedText = inputText;
    const sortedEntities = [...example.entities].sort((a, b) => b.start - a.start);
    
    sortedEntities.forEach(entity => {
      const color = entityTypes[entity.type as keyof typeof entityTypes]?.color || '#6B7280';
      const replacement = `<span class="entity-highlight" style="background-color: ${color}20; color: ${color}; padding: 2px 4px; border-radius: 4px; font-weight: 600;">${entity.text}</span>`;
      annotatedText = annotatedText.slice(0, entity.start) + replacement + annotatedText.slice(entity.end);
    });
    
    setProcessedText(annotatedText);
    setIsProcessing(false);
  };

  const reset = () => {
    setEntities([]);
    setProcessedText('');
    setIsProcessing(false);
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">命名实体识别演示</h3>
          <p className="text-gray-600">自动识别文本中的人名、地名、组织等实体</p>
        </div>

        {/* 输入区域 */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">输入文本：</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
              placeholder="输入要进行实体识别的文本..."
              disabled={isProcessing}
            />
          </div>

          <div className="flex gap-3">
            <motion.button
              onClick={processNER}
              disabled={isProcessing || !inputText.trim()}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search size={16} />
              <span>{isProcessing ? '识别中...' : '开始识别'}</span>
            </motion.button>

            <motion.button
              onClick={reset}
              className="px-6 py-3 bg-gray-500 text-white rounded-xl font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              重置
            </motion.button>
          </div>
        </div>

        {/* 处理结果 */}
        {(processedText || isProcessing) && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* 标注文本 */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-800">标注结果：</h4>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 min-h-[60px]">
                {isProcessing ? (
                  <div className="flex items-center justify-center h-16">
                    <motion.div
                      className="w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="ml-3 text-gray-600">正在识别实体...</span>
                  </div>
                ) : (
                  <div className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: processedText }} />
                )}
              </div>
            </div>

            {/* 实体列表 */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">识别的实体：</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {entities.map((entity, index) => {
                    const entityType = entityTypes[entity.type as keyof typeof entityTypes];
                    const Icon = entityType?.icon || User;
                    return (
                      <motion.div
                        key={index}
                        className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${entityType?.color}20` }}
                          >
                            <Icon size={20} style={{ color: entityType?.color }} />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{entity.text}</div>
                            <div className="text-sm text-gray-500">{entity.type}</div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {entities.length > 0 && (
                <motion.div
                  className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg border border-green-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  ✅ 识别完成！共找到 <strong>{entities.length}</strong> 个实体
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* 实体类型说明 */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">支持的实体类型：</h4>
          <div className="flex flex-wrap gap-3">
            {Object.entries(entityTypes).map(([type, config]) => {
              const Icon = config.icon;
              return (
                <div key={type} className="flex items-center space-x-2 px-3 py-2 bg-white rounded-lg border border-gray-200">
                  <Icon size={16} style={{ color: config.color }} />
                  <span className="text-sm text-gray-700">{type}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 示例选择 */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">试试这些例子：</h4>
          <div className="space-y-2">
            {examples.map((example, index) => (
              <motion.button
                key={index}
                onClick={() => setInputText(example.text)}
                className="w-full p-3 text-left text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {example.text}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NERDemo;
