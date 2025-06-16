/**
 * 机器翻译演示组件
 * 展示机器翻译的过程和结果
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Languages, Volume2 } from 'lucide-react';

const TranslationDemo: React.FC = () => {
  const [sourceText, setSourceText] = useState('今天天气很好。');
  const [targetText, setTargetText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [sourceLang, setSourceLang] = useState('zh');
  const [targetLang, setTargetLang] = useState('en');

  const languages = {
    'zh': '中文',
    'en': 'English',
    'ja': '日本語',
    'ko': '한국어',
    'fr': 'Français'
  };

  const translations: { [key: string]: { [key: string]: string } } = {
    '今天天气很好。': {
      'en': 'The weather is very nice today.',
      'ja': '今日の天気はとても良いです。',
      'ko': '오늘 날씨가 매우 좋습니다.',
      'fr': 'Le temps est très beau aujourd\'hui.'
    },
    'Hello, how are you?': {
      'zh': '你好，你好吗？',
      'ja': 'こんにちは、元気ですか？',
      'ko': '안녕하세요, 어떻게 지내세요?',
      'fr': 'Bonjour, comment allez-vous ?'
    },
    '我喜欢学习自然语言处理。': {
      'en': 'I like studying natural language processing.',
      'ja': '私は自然言語処理の勉強が好きです。',
      'ko': '저는 자연어 처리를 공부하는 것을 좋아합니다.',
      'fr': 'J\'aime étudier le traitement du langage naturel.'
    }
  };

  const examples = [
    { zh: '今天天气很好。', en: 'The weather is very nice today.' },
    { zh: '我喜欢学习自然语言处理。', en: 'I like studying natural language processing.' },
    { zh: '人工智能正在改变世界。', en: 'Artificial intelligence is changing the world.' },
    { en: 'Hello, how are you?', zh: '你好，你好吗？' },
    { en: 'Technology makes life better.', zh: '科技让生活更美好。' }
  ];

  const translate = async () => {
    if (isTranslating || !sourceText.trim()) return;
    
    setIsTranslating(true);
    setTargetText('');
    
    // 模拟翻译过程
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 查找翻译结果
    const result = translations[sourceText]?.[targetLang] || 
      (sourceLang === 'zh' && targetLang === 'en' ? 'The weather is very nice today.' : 
       sourceLang === 'en' && targetLang === 'zh' ? '你好，你好吗？' : 
       'Translation result');
    
    // 逐字显示翻译结果
    for (let i = 0; i <= result.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      setTargetText(result.slice(0, i));
    }
    
    setIsTranslating(false);
  };

  const swapLanguages = () => {
    if (isTranslating) return;
    
    const newSourceLang = targetLang;
    const newTargetLang = sourceLang;
    const newSourceText = targetText;
    
    setSourceLang(newSourceLang);
    setTargetLang(newTargetLang);
    setSourceText(newSourceText);
    setTargetText('');
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">机器翻译演示</h3>
          <p className="text-gray-600">将一种语言自动翻译成另一种语言</p>
        </div>

        {/* 语言选择器 */}
        <div className="flex items-center justify-center space-x-4">
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isTranslating}
          >
            {Object.entries(languages).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>

          <motion.button
            onClick={swapLanguages}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={isTranslating}
          >
            <ArrowRight size={20} className="text-gray-600" />
          </motion.button>

          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isTranslating}
          >
            {Object.entries(languages).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>

        {/* 翻译区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 源文本 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                源文本 ({languages[sourceLang as keyof typeof languages]})
              </label>
              <motion.button
                className="p-1 hover:bg-gray-100 rounded"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Volume2 size={16} className="text-gray-500" />
              </motion.button>
            </div>
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="输入要翻译的文本..."
              disabled={isTranslating}
            />
          </div>

          {/* 目标文本 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                译文 ({languages[targetLang as keyof typeof languages]})
              </label>
              <motion.button
                className="p-1 hover:bg-gray-100 rounded"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Volume2 size={16} className="text-gray-500" />
              </motion.button>
            </div>
            <div className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-xl overflow-y-auto">
              {isTranslating ? (
                <div className="flex items-center space-x-2 text-gray-500">
                  <motion.div
                    className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span>翻译中...</span>
                </div>
              ) : (
                <div className="text-gray-800 leading-relaxed">
                  {targetText || '翻译结果将显示在这里'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 翻译按钮 */}
        <div className="text-center">
          <motion.button
            onClick={translate}
            disabled={isTranslating || !sourceText.trim()}
            className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Languages size={20} />
            <span>{isTranslating ? '翻译中...' : '开始翻译'}</span>
          </motion.button>
        </div>

        {/* 翻译质量评估 */}
        {targetText && !isTranslating && (
          <motion.div
            className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border border-green-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">翻译质量评估</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-400 to-blue-500"
                    initial={{ width: '0%' }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                <span className="text-sm font-semibold text-green-600">85%</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* 示例选择 */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">试试这些例子：</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {examples.map((example, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  if ('zh' in example && 'en' in example) {
                    setSourceText(example.zh);
                    setSourceLang('zh');
                    setTargetLang('en');
                    setTargetText('');
                  }
                }}
                className="p-3 text-left text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-medium text-gray-800">
                  {'zh' in example ? example.zh : (example as any).en}
                </div>
                <div className="text-gray-500 text-xs mt-1">
                  → {'en' in example ? example.en : (example as any).zh}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslationDemo;
