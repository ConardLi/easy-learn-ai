import { motion, AnimatePresence } from 'motion/react';
import { UserCircle, Palette, Copy, ListOrdered, FileJson, ShieldAlert } from 'lucide-react';

const TAGS = [
  { id: 1, text: '角色设定', icon: UserCircle, color: 'text-[#8B5CF6]', bg: 'bg-[#8B5CF6]/10', border: 'border-[#8B5CF6]/20', pos: { x: -280, y: -120 } },
  { id: 2, text: '风格约束', icon: Palette, color: 'text-[#EC4899]', bg: 'bg-[#EC4899]/10', border: 'border-[#EC4899]/20', pos: { x: 280, y: -140 } },
  { id: 3, text: 'few-shot 示例', icon: Copy, color: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10', border: 'border-[#F59E0B]/20', pos: { x: -350, y: 60 } },
  { id: 4, text: '分步引导', icon: ListOrdered, color: 'text-[#3B82F6]', bg: 'bg-[#3B82F6]/10', border: 'border-[#3B82F6]/20', pos: { x: 350, y: 50 } },
  { id: 5, text: '输出格式', icon: FileJson, color: 'text-[#14B8A6]', bg: 'bg-[#14B8A6]/10', border: 'border-[#14B8A6]/20', pos: { x: -200, y: 200 } },
  { id: 6, text: '拒答边界', icon: ShieldAlert, color: 'text-[#EF4444]', bg: 'bg-[#EF4444]/10', border: 'border-[#EF4444]/20', pos: { x: 200, y: 220 } },
];

// Generate deterministic random dots for the probability system
const DOTS = Array.from({ length: 100 }).map((_, i) => {
  const rx = (Math.sin(i * 123.45) * 400); // -400 to 400
  const ry = (Math.cos(i * 678.90) * 200); // -200 to 200
  const size = Math.abs(Math.sin(i * 321)) * 6 + 4; // 4px to 10px
  return { id: i, rx, ry, size };
});

const STEP_TEXTS: Record<number, React.ReactNode> = {
  3: <span>大模型本质上是一个对上下文非常敏感的<span className="text-[#8B5CF6] mx-2">概率生成系统</span></span>,
  4: <span>你给它什么身份，它更容易<span className="text-[#8B5CF6] mx-2">沿着那个身份</span>去回答</span>,
  5: <span>你给它什么样例，它更容易<span className="text-[#F59E0B] mx-2">沿着那个范式</span>去补全</span>,
  6: <span>你强调什么约束，它就更容易<span className="text-[#14B8A6] mx-2">把那部分当成重点</span></span>,
};

const getDotState = (dot: any, step: number) => {
  if (step === 3) {
    // Random chaotic cloud
    return {
      x: dot.rx,
      y: dot.ry,
      backgroundColor: '#9CA3AF',
      scale: 1,
      opacity: 0.4,
    };
  }
  if (step === 4) {
    // Identity: Branching paths, one highlighted
    const isHighlighted = dot.id % 3 === 0;
    return {
      x: dot.rx,
      y: isHighlighted ? (Math.sin(dot.rx / 80) * 60) : dot.ry * 0.8 + 120,
      backgroundColor: isHighlighted ? '#8B5CF6' : '#E5E7EB',
      scale: isHighlighted ? 1.5 : 0.5,
      opacity: isHighlighted ? 0.9 : 0.2,
    };
  }
  if (step === 5) {
    // Pattern: Structured grid (10x10 for 100 dots)
    const col = dot.id % 10;
    const row = Math.floor(dot.id / 10);
    return {
      x: (col * 70) - 315,
      y: (row * 50) - 225,
      backgroundColor: '#F59E0B',
      scale: 1.2,
      opacity: 0.8,
    };
  }
  if (step >= 6) {
    // Constraint: Funnel converging to the right
    const normalizedX = (dot.rx + 400) / 800; // 0 to 1
    const spread = Math.max(0, 1 - normalizedX); 
    return {
      x: dot.rx,
      y: dot.ry * (spread * 0.8 + 0.05),
      backgroundColor: '#14B8A6',
      scale: normalizedX * 2 + 0.5,
      opacity: normalizedX * 0.8 + 0.2,
    };
  }
  return { x: dot.rx, y: dot.ry, opacity: 0, scale: 0, backgroundColor: '#000' };
};

export default function Chapter6({ step }: { step: number }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Steps 0-2: Intro & Tags */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <AnimatePresence mode="wait">
          {step <= 1 && (
            <motion.h2
              key="title1"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: step === 0 ? 0 : -80 }}
              exit={{ opacity: 0, y: -150 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="text-5xl font-bold text-[#43302B]"
            >
              于是大家开始疯狂研究 <span className="text-[#8B5CF6]">prompt</span>：
            </motion.h2>
          )}
          {step === 2 && (
            <motion.h2
              key="title2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="text-7xl font-black text-[#14B8A6]"
            >
              这些东西为什么有效？
            </motion.h2>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {step === 1 && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            {TAGS.map((tag, i) => (
              <motion.div
                key={tag.id}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ opacity: 1, scale: 1, x: tag.pos.x, y: tag.pos.y }}
                exit={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, delay: i * 0.05, type: 'spring', bounce: 0.4 }}
                className={`absolute flex items-center gap-3 px-6 py-3 rounded-full ${tag.bg} ${tag.border} border shadow-lg backdrop-blur-sm`}
              >
                <tag.icon className={`w-6 h-6 ${tag.color}`} />
                <span className={`text-xl font-bold ${tag.color}`}>{tag.text}</span>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Steps 3-8: Probability System Visualization */}
      <AnimatePresence>
        {step >= 3 && step <= 8 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              filter: step >= 7 ? 'blur(12px)' : 'blur(0px)',
              scale: step >= 7 ? 0.95 : 1
            }}
            exit={{ opacity: 0, filter: 'blur(20px)' }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-0"
          >
            {/* Dynamic Text at the top */}
            <div className="absolute top-32 text-center w-full px-10 z-10">
              <AnimatePresence mode="wait">
                {step <= 6 && (
                  <motion.h3
                    key={step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-4xl font-bold text-[#43302B] bg-white/80 backdrop-blur-md inline-block px-8 py-4 rounded-full shadow-sm border border-gray-100"
                  >
                    {STEP_TEXTS[step]}
                  </motion.h3>
                )}
              </AnimatePresence>
            </div>

            {/* The Dots Network */}
            <div className="relative w-[800px] h-[500px] mt-20">
              {DOTS.map(dot => {
                const state = getDotState(dot, step);
                return (
                  <motion.div
                    key={dot.id}
                    initial={false}
                    animate={{
                      x: state.x,
                      y: state.y,
                      backgroundColor: state.backgroundColor,
                      scale: state.scale,
                      opacity: state.opacity,
                    }}
                    transition={{ duration: 1.2, type: 'spring', bounce: 0.3 }}
                    className="absolute left-1/2 top-1/2 rounded-full"
                    style={{
                      width: dot.size,
                      height: dot.size,
                      marginLeft: -dot.size / 2,
                      marginTop: -dot.size / 2,
                      willChange: 'transform, opacity, background-color'
                    }}
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 7: Overlay 1 */}
      <AnimatePresence>
        {step === 7 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="absolute z-50 text-center bg-white/90 backdrop-blur-xl p-20 rounded-[4rem] shadow-2xl border border-[#8B5CF6]/20 max-w-5xl"
          >
            <p className="text-4xl text-gray-500 font-medium mb-8 tracking-wide">
              所以 Prompt Engineering 本质上不是“命令模型”
            </p>
            <h2 className="text-6xl font-black text-[#43302B] leading-[1.4] tracking-tight">
              而是塑造一个<br/>
              <span className="text-[#8B5CF6] text-7xl mt-4 inline-block">局部概率空间</span>
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 8: Overlay 2 */}
      <AnimatePresence>
        {step === 8 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="absolute z-50 text-center bg-white/90 backdrop-blur-xl p-20 rounded-[4rem] shadow-2xl border border-[#14B8A6]/20 max-w-5xl"
          >
            <p className="text-4xl text-gray-500 font-medium mb-8 tracking-wide">
              这个阶段最重要的能力
            </p>
            <h2 className="text-6xl font-black text-[#43302B] leading-[1.4] tracking-tight">
              不是系统设计，而是<br/>
              <span className="text-[#14B8A6] text-8xl mt-6 inline-block">语言设计</span>
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
