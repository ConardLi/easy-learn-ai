import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Chapter1 from './components/chapters/Chapter1';
import Chapter2 from './components/chapters/Chapter2';
import Chapter3 from './components/chapters/Chapter3';
import Chapter4 from './components/chapters/Chapter4';
import Chapter5 from './components/chapters/Chapter5';
import Chapter6 from './components/chapters/Chapter6';
import Chapter7 from './components/chapters/Chapter7';
import Chapter8 from './components/chapters/Chapter8';
import Chapter9 from './components/chapters/Chapter9';
import Chapter10 from './components/chapters/Chapter10';
import Chapter11 from './components/chapters/Chapter11';
import Chapter12 from './components/chapters/Chapter12';
import Chapter13 from './components/chapters/Chapter13';
import Chapter14 from './components/chapters/Chapter14';
import Chapter15 from './components/chapters/Chapter15';
import Chapter16 from './components/chapters/Chapter16';
import Chapter17 from './components/chapters/Chapter17';
import Chapter18 from './components/chapters/Chapter18';
import Chapter19 from './components/chapters/Chapter19';
import Chapter20 from './components/chapters/Chapter20';
import Chapter21 from './components/chapters/Chapter21';
import Chapter22 from './components/chapters/Chapter22';
import Chapter23 from './components/chapters/Chapter23';
import Chapter24 from './components/chapters/Chapter24';
import Chapter25 from './components/chapters/Chapter25';
import Chapter26 from './components/chapters/Chapter26';
import Chapter27 from './components/chapters/Chapter27';
import Chapter28 from './components/chapters/Chapter28';
import Chapter29 from './components/chapters/Chapter29';
import Chapter30 from './components/chapters/Chapter30';

const CHAPTERS = [
  { id: 'intro', component: Chapter1, steps: 6, title: '引言：什么是 Harness' },
  { id: 'story', component: Chapter2, steps: 7, title: '真实案例：从 70% 到 95%' },
  { id: 'agenda', component: Chapter3, steps: 7, title: '核心议题：彻底讲清楚 Harness' },
  { id: 'evolution', component: Chapter4, steps: 10, title: '演进史：问题一层层往外扩' },
  { id: 'prompt', component: Chapter5, steps: 7, title: '阶段一：Prompt Engineering' },
  { id: 'prompt-deepdive', component: Chapter6, steps: 9, title: '深入：塑造概率空间' },
  { id: 'prompt-ceiling', component: Chapter7, steps: 8, title: '瓶颈：Prompt 的天花板' },
  { id: 'agent-era', component: Chapter8, steps: 7, title: '范式转移：从 Chatbot 到 Agent' },
  { id: 'context-engineering', component: Chapter9, steps: 7, title: '阶段二：Context Engineering' },
  { id: 'rag-pipeline', component: Chapter10, steps: 7, title: 'RAG 与完整链路' },
  { id: 'agent-skills', component: Chapter11, steps: 7, title: '高级实践：Agent Skills' },
  { id: 'execution-problem', component: Chapter12, steps: 6, title: '新问题：执行侧的失控' },
  { id: 'harness-intro', component: Chapter13, steps: 5, title: '阶段三：Harness Engineering' },
  { id: 'analogy', component: Chapter14, steps: 6, title: '通俗比喻：新人拜访客户' },
  { id: 'equation', component: Chapter15, steps: 5, title: '核心公式：Agent - Model' },
  { id: 'layer1', component: Chapter16, steps: 6, title: '第一层：上下文管理' },
  { id: 'layer2', component: Chapter17, steps: 6, title: '第二层：工具系统' },
  { id: 'layer3', component: Chapter18, steps: 7, title: '第三层：执行编排' },
  { id: 'layer4', component: Chapter19, steps: 7, title: '第四层：状态与记忆' },
  { id: 'layer5', component: Chapter20, steps: 9, title: '第五层：评估与观测' },
  { id: 'layer6', component: Chapter21, steps: 8, title: '第六层：约束与恢复' },
  { id: 'real-world', component: Chapter22, steps: 5, title: '真实实践：一线公司案例' },
  { id: 'anthropic-insight', component: Chapter23, steps: 6, title: '深度洞察：上下文焦虑' },
  { id: 'anthropic-eval', component: Chapter24, steps: 9, title: '深度洞察：自评失真' },
  { id: 'openai-insight', component: Chapter25, steps: 7, title: '深度洞察：重塑工程师' },
  { id: 'progressive-disclosure', component: Chapter26, steps: 5, title: '典型实践：渐进式披露' },
  { id: 'agent-verification', component: Chapter27, steps: 7, title: '进阶实践：让 Agent 自己验' },
  { id: 'auto-governance', component: Chapter28, steps: 5, title: '进阶实践：自动治理系统' },
  { id: 'conclusion', component: Chapter29, steps: 7, title: '总结：决定落地的 Harness' },
  { id: 'final-thought', component: Chapter30, steps: 5, title: '结语：尽早想明白' },
];

export default function App() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < CHAPTERS[currentChapter].steps - 1) {
      setCurrentStep(prev => prev + 1);
    } else if (currentChapter < CHAPTERS.length - 1) {
      setCurrentChapter(prev => prev + 1);
      setCurrentStep(0);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else if (currentChapter > 0) {
      setCurrentChapter(prev => prev - 1);
      setCurrentStep(CHAPTERS[currentChapter - 1].steps - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'Enter') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentChapter, currentStep]);

  const CurrentChapterComponent = CHAPTERS[currentChapter].component;

  return (
    <div
      className="w-screen h-screen bg-[#FDFBF7] text-[#43302B] overflow-hidden flex items-center justify-center relative select-none font-sans"
      onClick={handleNext}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 pointer-events-none"
           style={{
             backgroundSize: '40px 40px',
             backgroundImage: 'linear-gradient(to right, rgba(225, 215, 200, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(225, 215, 200, 0.4) 1px, transparent 1px)'
           }}
      />

      {/* 16:9 Container */}
      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8 pointer-events-none">
        <div
          className="relative w-full aspect-video max-h-full flex-shrink-0 pointer-events-auto overflow-hidden rounded-2xl"
          style={{ maxWidth: 'calc(100vh * 16 / 9)' }}
        >
          <AnimatePresence mode="wait">
            <CurrentChapterComponent key={currentChapter} step={currentStep} />
          </AnimatePresence>
        </div>
      </div>

      {/* Invisible Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-12 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end pb-2 px-8 z-50">
        <div className="w-full flex gap-2 h-2">
          {CHAPTERS.map((chap, idx) => (
            <div
              key={chap.id}
              className="flex-1 h-full bg-black/10 rounded-full overflow-hidden cursor-pointer relative"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentChapter(idx);
                setCurrentStep(0);
              }}
              title={chap.title}
            >
              {idx === currentChapter && (
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#14B8A6]"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / chap.steps) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              )}
              {idx < currentChapter && (
                <div className="absolute top-0 left-0 h-full w-full bg-[#14B8A6]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
