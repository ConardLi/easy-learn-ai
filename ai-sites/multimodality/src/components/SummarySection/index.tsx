/**
 * 学习要点总结组件
 * 提供知识点回顾和学习测验
 */
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import KeyPoints from './KeyPoints';
import Quiz from './Quiz';
import FutureOutlook from './FutureOutlook';

const SummarySection: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <section id="summary" className="py-20 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">学习总结</span> 与展望
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            回顾关键知识点，巩固学习成果，展望多模态AI的未来发展方向
          </p>
        </motion.div>

        <div className="space-y-16">
          <KeyPoints inView={inView} />
          <Quiz inView={inView} />
          <FutureOutlook inView={inView} />
        </div>
      </div>
    </section>
  );
};

export default SummarySection;
