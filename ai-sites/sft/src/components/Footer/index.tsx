/**
 * 页面底部组件
 * 提供总结信息和相关链接
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Github, BookOpen, Mail, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">关于 SFT</h3>
            <p className="text-gray-300 leading-relaxed">
              有监督微调是大语言模型从预训练到实用化的关键桥梁，
              通过精心设计的训练数据和指令格式，
              让AI真正理解人类意图并提供有价值的回复。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-4">核心要点</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• 指令微调训练通用能力</li>
              <li>• 多轮对话增强交互体验</li>
              <li>• 领域适配专业化应用</li>
              <li>• 数据质量决定效果</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4">学习资源</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors">
                <BookOpen className="w-4 h-4" />
                <span>深入理解 SFT</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors">
                <Github className="w-4 h-4" />
                <span>开源数据集</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors">
                <Mail className="w-4 h-4" />
                <span>联系我们</span>
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 mt-12 pt-8 text-center"
        >
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400" />
            <span>for AI Education</span>
          </div>
          <p className="mt-2 text-gray-500">
            © 2024 SFT 学习平台. 致力于让AI知识更易懂
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
