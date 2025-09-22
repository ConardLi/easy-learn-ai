/**
 * 概念介绍组件
 * 展示单模态到多模态AI的演进过程
 */
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ModalityEvolution from './ModalityEvolution';
import ConceptCards from './ConceptCards';

const ConceptSection: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section id="concept" className="py-20 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            什么是<span className="gradient-text">多模态 AI</span>？
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            从只能处理单一类型数据的AI，到能够同时理解文本、图像、音频、视频的智能系统，
            这就是多模态AI带来的革命性变化
          </p>
        </motion.div>

        <ModalityEvolution inView={inView} />
        <ConceptCards inView={inView} />
      </div>
    </section>
  );
};

export default ConceptSection;
