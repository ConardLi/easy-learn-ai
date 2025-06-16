/**
 * 网站底部组件
 * 包含版权信息和相关链接
 */
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Github, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo和简介 */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-3 mb-4"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">T5学习站</span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-400 leading-relaxed mb-6"
            >
              通过生动的可视化和交互式演示，帮助学习者深入理解T5模型的核心概念和工作原理。
              让复杂的NLP技术变得简单易懂。
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex space-x-4"
            >
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          {/* 学习资源 */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg font-bold mb-4"
            >
              学习资源
            </motion.h3>
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-2 text-gray-400"
            >
              <li><a href="#" className="hover:text-white transition-colors">T5论文解读</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Transformer架构</a></li>
              <li><a href="#" className="hover:text-white transition-colors">预训练技术</a></li>
              <li><a href="#" className="hover:text-white transition-colors">NLP基础知识</a></li>
            </motion.ul>
          </div>

          {/* 相关模型 */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg font-bold mb-4"
            >
              相关模型
            </motion.h3>
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-2 text-gray-400"
            >
              <li><a href="#" className="hover:text-white transition-colors">BERT详解</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GPT系列</a></li>
              <li><a href="#" className="hover:text-white transition-colors">BART模型</a></li>
              <li><a href="#" className="hover:text-white transition-colors">UL2框架</a></li>
            </motion.ul>
          </div>
        </div>

        {/* 分割线 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 my-8"
        />

        {/* 版权信息 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between"
        >
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2024 T5学习站. 致力于让AI知识更加普及和易懂.
          </p>
          <div className="flex items-center space-x-2 text-gray-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>for AI learning</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
